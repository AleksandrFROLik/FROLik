export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType

const initialState = {status: 'loading' as RequestStatusType, error: null as string | null}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET_ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: string | null)=> ({type: 'APP/SET_ERROR', error})as const

export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>



