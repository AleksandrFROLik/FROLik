import {AddNewTodolistACType, RemoveTodolistACType} from "./todoListActions";

export enum ACTIONS_TYPE {
    ADD_TASK = "ADD-TASK",
    REMOVE_TASK = "REMOVE-TASK",
    CHANGE_STATUS = "CHANGE-STATUS",
    UP_DATE_TASKS = "UP-DATE-TASKS",
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: ACTIONS_TYPE.ADD_TASK,
        todolistID,
        title,
    } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: ACTIONS_TYPE.REMOVE_TASK,
        todolistID,
        taskID,
    } as const
}
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: ACTIONS_TYPE.CHANGE_STATUS,
        todolistID,
        taskID,
        isDone,
    } as const
}

type UpDateTasksAC = ReturnType<typeof upDateTasksAC>
export const upDateTasksAC = (newTaskTitle: string, todolistID: string, taskID: string) => {
    return {
        type: ACTIONS_TYPE.UP_DATE_TASKS,
        newTaskTitle,
        todolistID,
        taskID,
    } as const
}

export type TasksActionsType = AddTaskACType
    | RemoveTaskACType
    | ChangeStatusACType
    | UpDateTasksAC
    | AddNewTodolistACType
    | RemoveTodolistACType