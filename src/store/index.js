import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import logger from '../middleware/logger'
import api from '../middleware/api'

export default (history) => {
	const router = routerMiddleware(history)
	return createStore(
    rootReducer,
    applyMiddleware(router, thunk, api, logger),
	)
}
