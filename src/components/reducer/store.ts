import {combineReducers, createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {TodolistReducer} from "./todolistReducer";

let rootReducer = combineReducers ({
    tasks: taskReducer,
    todoLists: TodolistReducer,
})

export type rootReducerType = ReturnType<typeof rootReducer>

export  let store = createStore(rootReducer)
