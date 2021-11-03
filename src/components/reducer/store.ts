import {combineReducers, createStore} from "redux";
import {TaskReducer} from "./TaskReducer";
import {TodoListReducer} from "./TodoListReducer";

let rootReducer = combineReducers ({
    tasks: TaskReducer,
    todoLists: TodoListReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export  let store = createStore(rootReducer)
