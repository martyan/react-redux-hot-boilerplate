import React from 'react'
import ReactDOM from 'react-dom'
// import Raven from 'raven-js'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from './containers/App'
import LocalizationProvider from './containers/Localization/LocalizationProvider'
import configureStore from '../common/store'
import history from '../common/history'


window.main = () => {
    const store = configureStore(history, window.__INITIAL_STATE__)

    if(process.env.NODE_ENV === 'production') {
    //   Raven.config('<YOUR-SENTRY-ID>').install()
    }

    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            <Provider store={store}>
                <LocalizationProvider store={store}>
                    <ConnectedRouter history={history}>
                        <App/>
                    </ConnectedRouter>
                </LocalizationProvider>
            </Provider>,
            document.getElementById('app')
        )
    })
}
