import {AddTodolistActionType, GetTodoListActionType, RemoveTodolistActionType} from './todolists-reducer';
import {tasksAPI, TaskStatuses, TaskType, UpDateTask} from "../../api/tasks-api";
import {AppRootStateType, AppThunkType} from "../../state/store";
import {AppActionsType, setAppStatus} from "../../state/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type GetTasksType = ReturnType<typeof getTasksAC>

export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodoListActionType
    | GetTasksType
    | AppActionsType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'GET-TODO-LISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((todoLists) => stateCopy[todoLists.id] = [])
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: state[action.todolistId] = action.tasks}

        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, status: action.status}
                    : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, title: action.title}
                    : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            return {...state, [action.id]: state[action.id]}
        }
        default:
            return state;
    }
}

export const removeTaskAC = (params: { taskId: string, todolistId: string }) => ({
    type: 'REMOVE-TASK', taskId: params.taskId, todolistId: params.todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const)
export const changeTaskTitleAC = (params: { taskId: string, newTitle: string, todolistId: string }) =>
    ({type: 'CHANGE-TASK-TITLE', title: params.newTitle, todolistId: params.todolistId, taskId: params.taskId} as const)
export const getTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todolistId, tasks} as const)


//THUNK

export const getTasksTC = (todolistID: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus("loading"))
    tasksAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setAppStatus("succeeded"))
            const tasks = res.data.items
            dispatch(getTasksAC(todolistID, tasks))
        })
}

export const createTaskTC = (params: { todolistId: string, title: string }): AppThunkType => (dispatch) => {
    dispatch(setAppStatus("loading"))
    tasksAPI.createTask(params)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus("succeeded"))
                let task = res.data.data.item
                dispatch(addTaskAC(task))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err.message)
        })

}

export const deleteTaskTC = (params: { taskId: string, todolistId: string }):AppThunkType => (dispatch) => {
    dispatch(setAppStatus("loading"))
    tasksAPI.deleteTask(params)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus("succeeded"))
                dispatch(removeTaskAC(params))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const upDateTaskTitleTC = (params: { taskId: string, todolistId: string, newTitle: string }):AppThunkType => (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus("loading"))
    const task = getState().tasks[params.todolistId].find(task => task.id === params.taskId)
    if (task) {
        const model: UpDateTask = {
            title: params.newTitle,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        dispatch(setAppStatus("loading"))
        tasksAPI.upDateTask(params.todolistId, params.taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatus("succeeded"))
                    dispatch(changeTaskTitleAC(params))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

export const upDateTaskStatusTC = (params: { taskId: string, status: TaskStatuses, todolistId: string }):AppThunkType => (dispatch, getStatus: () => AppRootStateType) => {
    const task = getStatus().tasks[params.todolistId].find(task => task.id === params.taskId)
    if (task) {
        const model: UpDateTask = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: params.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        dispatch(setAppStatus("loading"))
        tasksAPI.upDateTask(params.todolistId, params.taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatus("succeeded"))
                    dispatch(changeTaskStatusAC(params.taskId, params.status, params.todolistId))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }


}
