import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader' /* react-hot-loader v3 */
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import configureStore from './store'
import App from './containers/App'
import LocalizationProvider from './containers/Localization/LocalizationProvider'

const history = createBrowserHistory()
const store = configureStore(history)

const render = () => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <Provider store={store}>
				<LocalizationProvider store={store}>
					<ConnectedRouter history={history}>
						<App />
					</ConnectedRouter>
				</LocalizationProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render()

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render()
  })
}