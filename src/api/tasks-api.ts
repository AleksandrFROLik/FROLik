import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": 'a91e2a50-b598-40d2-8669-617f8002697a',
        "API-KEY": 'a91e2a50-b598-40d2-8669-617f8002697a'
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
    status: number
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