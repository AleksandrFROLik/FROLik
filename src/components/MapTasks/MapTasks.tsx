import React, {ChangeEvent} from "react";
import {Button} from "../Button/Button";
import {TaskType} from "../../Todolist";
import {EditAbleSpan} from "../EditAbleSpan/EditAbleSpan";


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



    const addTaskHandler = (newTaskTitle: string, taskID: string) => {
        addNewTitleTask(newTaskTitle, taskID)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, taskID:string) => {
        changeTaskStatus(todolistID, taskID, e.currentTarget.checked);
    }
    return (
        <ul>
            {
                tasks.map(tasks => {

                    return <li key={tasks.id} className={tasks.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={(e)=>onChangeHandler(e, tasks.id)}
                               checked={tasks.isDone}/>
                        <EditAbleSpan mapTitle={tasks.title}
                                      callBack={(newTaskTitle: string) => addTaskHandler(newTaskTitle, tasks.id)}
                        />
                        <Button name={'X'}
                                callBack={() => onClickHandler(tasks.id)}/>
                    </li>
                })
            }
        </ul>
    )
}