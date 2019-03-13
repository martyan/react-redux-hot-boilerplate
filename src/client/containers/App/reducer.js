import * as ActionTypes from './ActionTypes'

const initialState = {
    todo: null,
    todoFetched: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.GET_TODO_SUCCESS:
            return { ...state, todo: action.todo, todoFetched: true }

        default:
            return state
    }
}

export default reducer
