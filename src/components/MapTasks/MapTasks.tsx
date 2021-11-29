import React, {ChangeEvent, useCallback} from "react";
import {Button} from "../Button/Button";
import {TaskType} from "../../Todolist";
import {EditAbleSpan} from "../EditAbleSpan/EditAbleSpan";
import {useDispatch} from "react-redux";
import {changeStatusAC} from "../reducer/tasksActions";


type MapTasksType = {
    tasksForTodolist: TaskType[]
    todolistID: string
    onClickHandler: (taskId: string) => void
    addNewTitleTask: (newTaskTitle: string, todolistID: string) => void
}

export const MapTasks = React.memo(({
                                        tasksForTodolist,
                                        todolistID,
                                        onClickHandler,
                                        addNewTitleTask
                                    }: MapTasksType) => {
    console.log('Map')

    const dispatch = useDispatch()

    const addTaskHandler = useCallback((newTaskTitle: string, taskID: string) => {
        addNewTitleTask(newTaskTitle, taskID)

    }, [addNewTitleTask])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        dispatch(changeStatusAC(todolistID, taskID, e.currentTarget.checked))
    }, [ onClickHandler, todolistID])

    return (
        <ul>
            {
                tasksForTodolist.map(tasks => {

                    return <li key={tasks.id} className={tasks.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={(e) => onChangeHandler(e, tasks.id)}
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
})