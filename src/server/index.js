import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import configureStore from '../common/store'
import history from '../common/history'
import Template from './template'
import LocalizationProvider from '../client/containers/Localization/LocalizationProvider'
import App from '../client/containers/App'
import routes from '../common/routes'
import stats from '../../public/react-loadable.json'

export default function serverRenderer({ clientStats, serverStats }) {
    return (req, res, next) => {

        const context = {}
        const store = configureStore(history)

        const dataRequirements =
            routes
                .filter(route => matchPath(req.url, route)) // filter matching paths
                .map(route => route.component) // map to components
                .filter(comp => comp.getData) // check if components have data requirement
                .map(comp => store.dispatch(comp.getData())) // dispatch data requirement

        console.log(dataRequirements)

        Promise.all(dataRequirements)
            .then(() => {

                const modules = []
                const bundles = getBundles(stats, modules)

                const styles = bundles.filter(bundle => bundle.file.endsWith('.css'))
                const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'))

                const markup = ReactDOMServer.renderToString(
                    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                        <Provider store={store}>
                            <LocalizationProvider store={store}>
                                <StaticRouter location={req.url} context={context}>
                                    <App/>
                                </StaticRouter>
                            </LocalizationProvider>
                        </Provider>
                    </Loadable.Capture>
                )

                const helmet = Helmet.renderStatic()

                res.status(200).send(Template({
                    markup: markup,
                    helmet: helmet,
                    reduxState: store.getState(),
                    scripts,
                    styles
                }))
            })
            .catch(console.error)

    }
}
