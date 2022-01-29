import {AddTodolistActionType, GetTodoListActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {Dispatch} from "redux";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpDateTask} from "../api/tasks-api";
import {AppRootStateType} from "./store";
import {setAppStatus,  SetAppStatusActionType} from "./app-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodoListActionType
    | GetTasksType
    | SetAppStatusActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'GET-TODO-LISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((todoLists) => stateCopy[todoLists.id] = [])
            return stateCopy
        }
        case "SET-TASKS":
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy


        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy
        }


        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                status: action.status
            } : t);
            state[action.todolistId] = todolistTasks;
            return {...state};
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (params: { taskId: string, todolistId: string }): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: params.taskId, todolistId: params.todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (params: { taskId: string, newTitle: string, todolistId: string }): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title: params.newTitle, todolistId: params.todolistId, taskId: params.taskId}
}

export const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export type GetTasksType = ReturnType<typeof getTasksAC>

//THUNK

export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    tasksAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setAppStatus("succeeded"))
            const tasks = res.data.items
            dispatch(getTasksAC(todolistID, tasks))
        })

}

export const createTaskTC = (params: { todolistId: string, title: string }) => (dispatch: Dispatch) => {
    tasksAPI.createTask(params)
        .then((res) => {
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export const deleteTaskTC = (params: { taskId: string, todolistId: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    tasksAPI.deleteTask(params)
        .then(() => {
            dispatch(setAppStatus("succeeded"))
            dispatch(removeTaskAC(params))
        })
}

export const upDateTaskTitleTC = (params: { taskId: string, todolistId: string, newTitle: string }) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
        tasksAPI.upDateTask(params.todolistId, params.taskId, model)
            .then(() => {
                dispatch(changeTaskTitleAC(params))
            })
    }

}

export const upDateTaskStatusTC = (params: { taskId: string, status: TaskStatuses, todolistId: string }) => (dispatch: Dispatch, getStatus: () => AppRootStateType) => {
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

        tasksAPI.upDateTask(params.todolistId, params.taskId, model)
            .then(() => {
                dispatch(changeTaskStatusAC(params.taskId, params.status, params.todolistId))
            })
    }


}
