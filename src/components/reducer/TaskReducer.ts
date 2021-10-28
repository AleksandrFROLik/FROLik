import {v1} from "uuid";
import {Type} from "../../App";


export const TaskReducer = (state: Type, action: ActionsType): Type => {

    switch (action.type) {
        case "ADD-TASK": {
            let task = {id: v1(), title: action.title, isDone: false};

            return {...state, [action.todolistID]: [task, ...state[action.todolistID]]}
        }
        case "REMOVE-TASK": {
            return ({...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.id)})
        }
        case "CHANGE-STATUS": {
            return ({
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {...m, isDone: action.isDone} : m)
            })
        }
        case "UP-DATE-TASKS": {
            return ({...state, [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {...m, title:action.newTaskTitle} : m)
            })
        }
        case "ADD-NEW-TODOLIST": {
            return ({[action.newTodoListID]: [], ...state})
        }
        default:
            return state
    }
}

type ActionsType = AddTaskACType | RemoveTaskACType | ChangeStatusACType | UpDateTasksAC | AddNewTodoListACType

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        todolistID,
        title,
    } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        todolistID,
        id,

    } as const
}

type ChangeStatusACType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        todolistID,
        taskId,
        isDone,
    } as const
}

type UpDateTasksAC = ReturnType<typeof upDateTasksAC>

export const upDateTasksAC = (newTaskTitle: string, todolistID: string, taskId: string) => {
    return {
        type: "UP-DATE-TASKS",
        newTaskTitle,
        todolistID,
        taskId,
    }as const
}

type AddNewTodoListACType = ReturnType<typeof addNewTodoListAC>

export const addNewTodoListAC = (newTodoListID:string)=> {
    return{
        type:"ADD-NEW-TODOLIST",
        newTodoListID,
    } as const
}