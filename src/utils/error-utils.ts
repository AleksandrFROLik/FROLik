import {AppActionsType, setAppErrorAC, setAppStatus} from "../state/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/tasks-api";

export const handleServerNetworkError = (dispatch:Dispatch<AppActionsType>, message:string) => {
    dispatch(setAppStatus("failed"))
    dispatch(setAppErrorAC(message))
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppActionsType>, data: ResponseType<T>) => {
    dispatch(setAppStatus("failed"))
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Some error'))
}