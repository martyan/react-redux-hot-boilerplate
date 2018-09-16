import React from 'react'
import ReactDOM from 'react-dom'
// import Raven from 'raven-js'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import configureStore from './store'
import App from './containers/App'
import LocalizationProvider from './containers/Localization/LocalizationProvider'

const history = createBrowserHistory()
const store = configureStore(history)

if(process.env.NODE_ENV === 'production') {
//   Raven.config('<YOUR-SENTRY-ID>').install()
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
			<LocalizationProvider store={store}>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
			</LocalizationProvider>
    </Provider>,
    document.getElementById('app')
  )
}

render()

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render()
  })
}