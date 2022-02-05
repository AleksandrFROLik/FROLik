import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": 'a91e2a50-b598-40d2-8669-617f8002697a',
    }
})

type Created = ResponseType<{ item: TaskType }>

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(params: { todolistId: string, title: string }) {
        return instance.post<Created, AxiosResponse<Created>, { title: string }>(`/todo-lists/${params.todolistId}/tasks`, {title: params.title})
    },
    deleteTask(params: { todolistId: string, taskId: string }) {
        return instance.delete<ResponseType>(`/todo-lists/${params.todolistId}/tasks/${params.taskId}`)
    },
    upDateTask(todolistId: string, taskId: string, model: UpDateTask) {
        return instance.put<Created, AxiosResponse<Created>, { title: string }>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: null | string
    deadline: null | string
    id: string
    todoListId: string
    order: number
    addedDate: null
}

export type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
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

export type UpDateTask = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}


