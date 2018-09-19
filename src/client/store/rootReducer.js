import { combineReducers } from 'redux'
import localization from '../containers/Localization/reducer'
import app from '../containers/App/reducer'

const rootReducer = combineReducers({
  localization,
  app
})

export default rootReducer