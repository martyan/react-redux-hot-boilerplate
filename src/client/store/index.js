import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import logger from '../middleware/logger'
import api from '../middleware/api'

export default (history) => {
	const router = routerMiddleware(history)
	const reducer = connectRouter(history)(rootReducer)
	return createStore(
    reducer,
    applyMiddleware(router, thunk, api, logger),
	)
}
