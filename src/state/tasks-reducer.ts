import {AddTodolistActionType, GetTodoListActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {Dispatch} from "redux";
import {tasksAPI, TaskType} from "../api/tasks-api";

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
    isDone: boolean
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
            const newTasks = tasks.filter(t => t.id != action.taskId);
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
            // let todolistTasks = state[action.todolistId].map(t => t.id === action.taskId ? {
            //     ...t,
            //     isDone: action.isDone
            // } : t);
            // state[action.todolistId] = todolistTasks;
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

export const removeTaskAC = (params:{taskId: string, todolistId: string}): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: params.taskId, todolistId: params.todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export type GetTasksType = ReturnType<typeof getTasksAC>

//THUNK

export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistID)
        .then((res) => {
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

export const deleteTaskTC = (params:{taskId:string, todolistId:string})=> (dispatch:Dispatch)=> {
    tasksAPI.deleteTask(params)
        .then(()=>{
            dispatch(removeTaskAC(params))
        })
}
