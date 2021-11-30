import {v1} from "uuid";
import {FilterValuesType} from "../../App";

export enum ACTIONS_TYPE {
    ADD_NEW_TODOLIST = 'ADD-NEW-TODOLIST',
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
}

export type TodoListReducerType =
    AddNewTodolistACType
    | RemoveTodolistACType
    | ChangeFilterACType
    | UpDateTodoListACType

export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (titleForTodoList: string) => {
    return {
        type: 'ADD-NEW-TODOLIST',
        titleForTodoList,
        todoListID: v1()
    } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistID,
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistID,
        value,
    } as const
}

type UpDateTodoListACType = ReturnType<typeof upDateTodoListAC>
export const upDateTodoListAC = (title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todolistID,
    } as const
}