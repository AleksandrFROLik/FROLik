import React, {ChangeEvent} from "react";
import {Button} from "../Button/Button";
import {TaskType} from "../../Todolist";

type MapTasksType = {
    tasks: Array<TaskType>
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    todolistID: string
    onClickHandler: (taskId: string) => void
}

export const MapTasks = ({tasks, changeTaskStatus, todolistID, onClickHandler}: MapTasksType) => {
    return (
        <ul>
            {
                tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'X'} callBack={() => onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
    )
}