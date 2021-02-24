import { GET_TODOS, INCREMENT, DECREMENT } from "./types";

const initialState = {
    list: [],
    totalCount: null,
    currentPage: 1,
    countPages: null
}

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODOS:
            return {...state, 
                list: action.payload, 
                totalCount: action.totalCount, 
                countPages: action.countPages,
                completed: action.payload.status}
        case INCREMENT:
            return {...state, currentPage: state.currentPage + 1}
        case DECREMENT:
            return {...state, currentPage: state.currentPage - 1}
        default:
            return state
    }
    
}