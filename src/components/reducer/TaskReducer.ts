import {v1} from "uuid";

import {TasksType} from "../../App";
import {AddNewTodolistACType} from "./TodolistReducer";

let todolistId1 = v1()
let todolistId2 = v1()

const InitialState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
};

export const TaskReducer = (state: TasksType = InitialState, action: ActionsType): TasksType => {

    switch (action.type) {
        case "ADD-TASK": {
            let task = {id: v1(), title: action.title, isDone: false};

            return {...state, [action.todolistID]: [task, ...state[action.todolistID]]}
        }
        case "REMOVE-TASK": {
            return ({...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskID)})
        }
        case "CHANGE-STATUS": {
            return ({
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            })
        }
        case "UP-DATE-TASKS": {
            return ({
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                    ...m,
                    title: action.newTaskTitle
                } : m)
            })
        }
        case "ADD-NEW-TODOLIST": {
            return ({[action.todoListID]: [], ...state})
        }
        default:
            return state
    }
}

type ActionsType = AddTaskACType
    | RemoveTaskACType
    | ChangeStatusACType
    | UpDateTasksAC
    | AddNewTodolistACType

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        todolistID,
        title,
    } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        todolistID,
        taskID,

    } as const
}

type ChangeStatusACType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        todolistID,
        taskID,
        isDone,
    } as const
}

type UpDateTasksAC = ReturnType<typeof upDateTasksAC>

export const upDateTasksAC = (newTaskTitle: string, todolistID: string, taskID: string) => {
    return {
        type: "UP-DATE-TASKS",
        newTaskTitle,
        todolistID,
        taskID,
    } as const
}
