import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API-Task'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
       let todolistId = 'cb8188a9-a39f-49de-ad41-93450d3a2a86'
        tasksAPI.getTasks( todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'cb8188a9-a39f-49de-ad41-93450d3a2a86'
        const title = 'New Task'
        tasksAPI.createTask({todolistId, title})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cb8188a9-a39f-49de-ad41-93450d3a2a86'
        const taskId = 'a8111545-1818-4f27-a2d7-479912c79d7d'
        tasksAPI.deleteTask({todolistId, taskId})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Yang Task'
        const todolistId = 'cb8188a9-a39f-49de-ad41-93450d3a2a86'
        const taskId = 'a8111545-1818-4f27-a2d7-479912c79d7d'
        tasksAPI.upDateTask({title, todolistId, taskId})
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

