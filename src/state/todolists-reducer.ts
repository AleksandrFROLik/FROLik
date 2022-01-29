import {v1} from 'uuid';
import {Dispatch} from "redux";
import {todolistsApi, TodoType} from "../api/todolists-api";
import {AppActionsType, RequestStatusType, setAppErrorAC, setAppStatus} from "./app-reducer";

export type RemoveTodolistActionType = { type: 'REMOVE-TODOLIST', id: string }
export type AddTodolistActionType = { type: 'ADD-TODOLIST', todolist: TodolistType }
export type ChangeTodolistTitleActionType = { type: 'CHANGE-TODOLIST-TITLE', id: string, title: string }
export type ChangeTodolistFilterActionType = { type: 'CHANGE-TODOLIST-FILTER', id: string, filter: FilterValuesType }

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodoListActionType
    | AppActionsType
    | ChangeTodolistEntityStatusActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "GET-TODO-LISTS":
            return action.todoLists.map((todoLists) => ({...todoLists, filter: 'all', entityStatus: "idle"}))

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
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
        case "CHANGE-ENTITY-STATUS": {
            return  state.map(todolist => todolist.id === action.todolistId ? {...todolist, entityStatus: action.entityStatus}: todolist)
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodoType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (params: { todolistId: string, newTitle: string }): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: params.todolistId, title: params.newTitle}
}
export const changeTodolistFilterAC = (params: { todolistId: string, filter: FilterValuesType }): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: params.todolistId, filter: params.filter}
}

export const getTodoListsAC = (todoLists: TodoType[]) => ({type: 'GET-TODO-LISTS', todoLists}) as const
export type GetTodoListActionType = ReturnType<typeof getTodoListsAC>

export const changeTodolistEntityStatusAC = (params:{todolistId: string, entityStatus: RequestStatusType}) => ({
    type: 'CHANGE-ENTITY-STATUS',
    todolistId: params.todolistId,
    entityStatus: params.entityStatus
}) as const
export type  ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
//THUNKS

export const getTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    todolistsApi.getTodoLists()
        .then((res) => {
            dispatch(setAppStatus("succeeded"))
            let todoLists = res.data
            dispatch(getTodoListsAC(todoLists))
        })
}
export const createTodoListTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus("loading"))
    todolistsApi.createTodoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus("succeeded"))
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                dispatch(setAppStatus("failed"))
                dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : 'Some error'))
            }
        })
}

export const deleteTodoListTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus:'loading'}))
    todolistsApi.deleteTodoList(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus("succeeded"))
                dispatch(removeTodolistAC(todolistId))
            }else {
                dispatch(setAppStatus("failed"))
                dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : 'Some error'))
            }
            dispatch(setAppStatus("succeeded"))

        })
}

export const upDateTodoListTC = (params: { todolistId: string, newTitle: string }) => (dispatch: Dispatch) => {
    todolistsApi.upDateTodoList(params)
        .then(() => {
            dispatch(changeTodolistTitleAC(params))
        })
}


