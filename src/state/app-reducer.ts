export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | setInitializedActionType

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        case 'APP/INITIALIZED':
            return {...state, isInitialized: action.initialized}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error}) as const
export const setInitializedAC = (initialized: boolean) => ({type: 'APP/INITIALIZED', initialized}) as const

export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setInitializedActionType = ReturnType<typeof setInitializedAC>



