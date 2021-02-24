import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import {listReducer} from './listReducer'

export const rootReducer = combineReducers({
    todos: listReducer,
    app: appReducer
})