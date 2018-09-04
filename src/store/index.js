import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import logger from '../middleware/logger'

export default (history) => {
	const router = routerMiddleware(history)
	return createStore(
    rootReducer,
    compose(
      applyMiddleware(router, thunk, logger),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
	)
}
