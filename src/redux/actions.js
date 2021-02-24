import { LOGOUT, GET_TODOS, SHOW_LOADER, HIDE_LOADER, INCREMENT, DECREMENT, CHANGE_TEXT, AUTH } from "./types"

export const nextPage = () => {
    return {
        type: INCREMENT
    }
}

export const previousPage = () => {
    return {
        type: DECREMENT
    }
}

export const getTodos = (page) => {
    return async dispatch => {
        dispatch(showLoader())
        const responce = await fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Vlad&page=${page}`)
        const data = await responce.json()
        const countPages = Math.ceil(data.message.total_task_count / 3)
        dispatch({type: GET_TODOS, payload: data.message.tasks, totalCount: data.message.total_task_count, countPages: countPages})
        dispatch(hideLoader())
    }
}

export const textForChangeAC = (newText) => {
    return {type: CHANGE_TEXT, newText}
}

export const showLoader = () => {
    return {type: SHOW_LOADER}
}

export const hideLoader = () => {
    return {type: HIDE_LOADER}
}

export const authAC = (token) => {
    return {type: AUTH, token}
}

export const logout = () => {
    return {type: LOGOUT}
}
