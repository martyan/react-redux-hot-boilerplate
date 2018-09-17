import axios from 'axios'

export const ROOT_URI = process.env.ENDPOINT_BASEURI
export const CALL_API = 'Call API'

const callApi = ({ endpoint, method, data }) => {
  const headers = {
    // 'X-Origin': window ? window.location.href : ''
  }

  const ln = null //window ? window.localStorage.getItem('ln') : null
  if(ln) headers['Accept-Language'] = ln
  
  const config = {
    method,
    url: ROOT_URI + endpoint,
    data: data || null,
    validateStatus: () => true,
    headers
  }

  return axios(config)
}

export default store => next => action => {

  const callAPI = action[CALL_API]
  if(typeof callAPI === 'undefined') return next(action)

  const { actions, endpoint, method, data, messages } = callAPI
  const [ requestAction, successAction, failureAction ] = actions
  const [ successMsg, failureMsg ] = messages || []

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  next(actionWith(requestAction()))

  return callApi({endpoint, method, data}).then(
    response => {
      
      if(response.status >= 200 && response.status < 400) {
        //success
        next(actionWith(successAction(response.data)))
        
        if(successMsg) console.log(successMsg)

        return Promise.resolve(response.data)        
      } else {
        //failure
        next(actionWith(failureAction()))
        
        if(response.data && response.data.errors) response.data.errors.forEach(error => console.log(error.title))
        else if(failureMsg) console.log(failureMsg)

        return Promise.reject(response.data.errors || response.data)
      }

    }, error => {
      //network error
      next(actionWith(failureAction()))
      
      if(failureMsg) console.log(failureMsg)

      return Promise.reject(error)
    }
  )

}
