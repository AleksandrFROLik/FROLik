import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": 'a91e2a50-b598-40d2-8669-617f8002697a'
    }
})

export const todolistsApi = {
    getTodoLists() {
        return instance.get<TodoType>('/todo-lists')
    },

    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>(`/todo-lists`, {title})
    },

    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },

    upDateTodoList(title: string, todolistId: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}

type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    fieldsError: string,
    data: T
}

// type CreateTodoType = {
//     resultCode: number
//     messages: string[],
//     fieldsError: string,
//     data: {
//         item:  TodoType
//     }
// }
// type DeleteAndUpDateTodoType = {
//     resultCode: number
//     messages: string[],
//     fieldsError: string,
//     data: {}
// }