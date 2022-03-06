import axios, {AxiosResponse} from "axios";
import {ResponseType} from "./todolists-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": 'a91e2a50-b598-40d2-8669-617f8002697a'
    }
})



export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('/auth/login', data)
    },
    me() {
        return instance.get<ResponseType<ResponseAuthMe>>('/auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    }
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
}

export type ResponseAuthMe = {
    id: number,
    email: string,
    login: string
}