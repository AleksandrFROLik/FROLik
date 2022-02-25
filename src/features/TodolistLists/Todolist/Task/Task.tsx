import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../../../../components/editAbleSpan/EditableSpan'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";


type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (params:{taskId: string, status: TaskStatuses, todolistId: string}) => void
    changeTaskTitle: (params:{taskId: string, newTitle: string, todolistId: string}) => void
    removeTask: (params:{taskId: string, todolistId: string}) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask({taskId:props.task.id, todolistId:props.todolistId}), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus({taskId:props.task.id, status:newIsDoneValue ? TaskStatuses.Completed: TaskStatuses.New, todolistId:props.todolistId})
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle({taskId:props.task.id, newTitle: newValue, todolistId:props.todolistId})
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
