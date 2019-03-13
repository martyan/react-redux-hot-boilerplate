import { combineReducers } from 'redux'
import localization from '../client/containers/Localization/reducer'
import app from '../client/containers/App/reducer'

const rootReducer = combineReducers({
    localization,
    app
})

export default rootReducer
