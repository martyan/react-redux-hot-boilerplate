import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader' /* react-hot-loader v3 */
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import configureStore from './store'
import App from './containers/App'
import LocalizationProvider from './containers/Localization/LocalizationProvider'

const store = configureStore()
const history = createBrowserHistory()

const render = () => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <Provider store={store}>
				<LocalizationProvider store={store}>
					<Router history={history}>
						<App />
					</Router>
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