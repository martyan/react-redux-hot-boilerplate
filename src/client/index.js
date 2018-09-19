import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
// import Raven from 'raven-js'
// import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
// import { createBrowserHistory } from 'history'
// import configureStore from './store'
import App from './containers/App'
// import LocalizationProvider from './containers/Localization/LocalizationProvider'

// const history = createBrowserHistory()
// const store = configureStore(history)

if(process.env.NODE_ENV === 'production') {
//   Raven.config('<YOUR-SENTRY-ID>').install()
}

ReactDOM.hydrate((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'));
