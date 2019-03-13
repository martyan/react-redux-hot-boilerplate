import { CALL_API } from '../../../common/middleware/api'
import {
    GET_TODO_REQUEST,
    GET_TODO_SUCCESS,
    GET_TODO_FAILURE,
} from './ActionTypes'


/* action creators */
export const getTodoRequest = () => ({ type: GET_TODO_REQUEST })
export const getTodoSuccess = (todo) => ({ type: GET_TODO_SUCCESS, todo })
export const getTodoFailure = () => ({ type: GET_TODO_FAILURE })


export const getTodo = (todoId) => ({
    [CALL_API]: {
        endpoint: `/todos/${todoId}`,
        method: 'GET',
        actions: [getTodoRequest, getTodoSuccess, getTodoFailure]
    }
})
