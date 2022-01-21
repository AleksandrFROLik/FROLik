import axios from "axios";
import {TaskType} from "../Todolist";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": 'a91e2a50-b598-40d2-8669-617f8002697a',
    }
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(params:{todolistId: string, title: string}) {
        return instance.post<ResponseTaskType<{item: TasksType}>>(`/todo-lists/${params.todolistId}/tasks`, {title: params.title})
    },
    deleteTask(params:{todolistId: string, taskId: string}) {
        return instance.delete<ResponseTaskType>(`/todo-lists/${params.todolistId}/tasks/${params.taskId}`)
    },
    upDateTask(params:{todolistId: string, taskId: string, title: string}) {
        return instance.put<ResponseTaskType<TasksType>>(`/todo-lists/${params.todolistId}/tasks/${params.taskId}`, {title:params.title})
    },
}


type TasksType = {
    description: string
    title: string
    completed: boolean
    status: TaskPriorities
    priority: number
    startDate: null
    deadline: null
    id: string
    todoListId: string
    order: number
    addedDate: null
}

type ResponseTaskType<T = {}> = {
    fieldsErrors: []
    messages: []
    resultCode: number
    data: T
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type upDateTask = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
