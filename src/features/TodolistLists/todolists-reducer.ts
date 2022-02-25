import {todolistsApi, TodoType} from "../../api/todolists-api";
import {AppActionsType, RequestStatusType, setAppStatus} from "../../state/app-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {AppThunkType} from "../../state/store";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type GetTodoListActionType = ReturnType<typeof getTodoListsAC>
export type  ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistsActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodoListActionType
    | AppActionsType
    | ChangeTodolistEntityStatusActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodoType & { filter: FilterValuesType, entityStatus: RequestStatusType }

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
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
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, title: action.title} : todolist)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return  state.map(todolist => todolist.id === action.todolistId ? {...todolist, filter:  action.filter} : todolist)
        }
        case "CHANGE-ENTITY-STATUS": {
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, entityStatus: action.entityStatus} : todolist)
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (params: { todolistId: string, newTitle: string }) => (
    {type: 'CHANGE-TODOLIST-TITLE', todolistId: params.todolistId, title: params.newTitle} as const)
export const changeTodolistFilterAC = (params: { todolistId: string, filter: FilterValuesType }) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId: params.todolistId, filter: params.filter} as const)
export const getTodoListsAC = (todoLists: TodoType[]) => ({type: 'GET-TODO-LISTS', todoLists}) as const
export const changeTodolistEntityStatusAC = (params: { todolistId: string, entityStatus: RequestStatusType }) => ({
    type: 'CHANGE-ENTITY-STATUS', todolistId: params.todolistId, entityStatus: params.entityStatus}) as const


//THUNKS

export const getTodoListsTC = ():AppThunkType => (dispatch) => {
    dispatch(setAppStatus("loading"))
    todolistsApi.getTodoLists()
        .then((res) => {
            dispatch(setAppStatus("succeeded"))
            let todolists = res.data
            dispatch(getTodoListsAC(todolists))
        })
}
export const createTodoListTC = (title: string):AppThunkType => (dispatch) => {
    dispatch(setAppStatus("loading"))
    todolistsApi.createTodoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus("succeeded"))
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
}

export const deleteTodoListTC = (todolistId: string):AppThunkType => (dispatch) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'}))
    todolistsApi.deleteTodoList(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus("succeeded"))
                dispatch(removeTodolistAC(todolistId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
}

export const upDateTodoListTC = (params: { todolistId: string, newTitle: string }):AppThunkType => (dispatch) => {
    dispatch(setAppStatus("loading"))
    todolistsApi.upDateTodoList(params)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus("succeeded"))
                dispatch(changeTodolistTitleAC(params))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
}


