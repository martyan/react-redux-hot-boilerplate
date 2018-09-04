import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import localization from '../containers/Localization/reducer'
import app from '../containers/App/reducer'

const rootReducer = combineReducers({
	router: routerReducer,
  localization,
  app
})

export default rootReducer