import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import localization from '../containers/Localization/reducer'

const rootReducer = combineReducers({
	router: routerReducer,
  localization
})

export default rootReducer