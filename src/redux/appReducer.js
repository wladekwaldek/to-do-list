import { AUTH, CHANGE_TEXT, HIDE_LOADER, LOGOUT, SHOW_LOADER, STATUS } from "./types"

const initialState = {
    loading: false,
    isAuthenticated: false,
    textForChange: {},
    token: null
}

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_LOADER: 
            return {...state, loading: true}
        case HIDE_LOADER:
            return {...state, loading: false}
        case CHANGE_TEXT:
            return {...state, textForChange: action.newText}
        case AUTH:
            return {...state, isAuthenticated: true, token: action.token}
        case LOGOUT:
                return {...state, isAuthenticated: false}
        default:
            return state
    }
}