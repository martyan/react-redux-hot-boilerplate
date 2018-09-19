import * as ActionTypes from './ActionTypes'
import { fallbackLang } from './localization'

const initialState = {
  ln: fallbackLang
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.SET_LN:
      return {...state, ln: action.ln}

    default:
      return state
  }
}

export default reducer