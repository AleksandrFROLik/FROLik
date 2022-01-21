import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {Dispatch} from "redux";
import {todolistsApi, TodoType} from "../api/todolists-api";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodoListActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {

        case "GET-TODO-LISTS":
            return action.todoLists.map((todoLists) => ({...todoLists, filter: 'all'}))


        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (params:{todolistId: string, newTitle: string}): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: params.todolistId, title: params.newTitle}
}
export const changeTodolistFilterAC = (params:{todolistId: string, filter: FilterValuesType}): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: params.todolistId, filter: params.filter}
}

export const getTodoListsAC = (todoLists: TodoType[]) => ({type: 'GET-TODO-LISTS', todoLists}) as const
export type GetTodoListActionType = ReturnType<typeof getTodoListsAC>

//THUNKS

export const getTodoListsTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodoLists()
        .then((res) => {
            let todoLists = res.data
            dispatch(getTodoListsAC(todoLists))
        })
}
export const createTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTodoList(title)
        .then(() => {
            dispatch(addTodolistAC(title))
        })
}

export const deleteTodoListTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTodoList(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const upDateTodoListTC = (params:{todolistId:string, newTitle:string}) => (dispatch: Dispatch) => {
    todolistsApi.upDateTodoList(params)
        .then(()=>{
            dispatch(changeTodolistTitleAC(params))
        })
}


