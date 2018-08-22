import { fallbackLang } from './localization'
import translations from '../../translations'
import {
  DETECT_LN,
  SET_LN
} from './ActionTypes'
import loadLanguageFromLS from './utils/loadLanguageFromLS'
import saveLanguageToLS from './utils/saveLanguageToLS'
import detectNavigatorLanguage from './utils/detectNavigatorLanguage'


/* action creators */
export const detectLn = (routeLn, location) => ({ type: DETECT_LN, routeLn, location })
export const setLn = (ln) => ({ type: SET_LN, ln })


/* thunx */ 
export const setLanguage = (ln) => (dispatch) => {
  dispatch(setLn(ln))
  saveLanguageToLS(ln)
}

export const detectLanguage = () => (dispatch) => {
  const storageLn = loadLanguageFromLS()
  const detectedLn = detectNavigatorLanguage()
  
  const ln = storageLn || detectedLn
  dispatch(setLanguage(ln))
}

export const getTranslation = (key) => (dispatch, getState) => {
  const ln = getState().localization.ln
  if(translations.hasOwnProperty(ln) && translations[ln].hasOwnProperty(key)) return translations[ln][key]
  else if(translations[fallbackLang].hasOwnProperty(key)) return translations[fallbackLang][key]
  else return key
}
