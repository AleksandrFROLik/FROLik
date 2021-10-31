import React, {ChangeEvent} from "react";
import {Button} from "../Button/Button";
import {TaskType} from "../../Todolist";
import {EditAbleSpan} from "../EditAbleSpan/EditAbleSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


type MapTasksType = {
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    todolistID: string
    onClickHandler: (taskId: string) => void
    addNewTitleTask: (newTaskTitle: string, todolistID: string) => void
}

export const MapTasks = ({
                             tasks,
                             changeTaskStatus,
                             todolistID,
                             onClickHandler,
                             addNewTitleTask
                         }: MapTasksType) => {
    const addTaskHandler = (newTaskTitle: string, id: string) => {
        addNewTitleTask(newTaskTitle, id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id:string) => {
        changeTaskStatus(todolistID, id, e.currentTarget.checked);
    }
    return (
        <ul>
            {
                tasks.map(t => {

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={(e: ChangeEvent<HTMLInputElement>)=>onChangeHandler(e, t.id)}
                               checked={t.isDone}/>
                        <EditAbleSpan mapTitle={t.title}
                                      callBack={(newTaskTitle: string) => addTaskHandler(newTaskTitle, t.id)}
                        />
                        <Button name={'X'}
                                callBack={() => onClickHandler(t.id)}/>
                        {/*<IconButton aria-label="delete">*/}
                        {/*    <Delete callBack={() => onClickHandler(t.id)}/>*/}
                        {/*</IconButton>*/}

                    </li>
                })
            }
        </ul>
    )
}