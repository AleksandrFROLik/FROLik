import React, {useCallback, useEffect} from 'react'
import {useDispatch} from "react-redux";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';

import {AddItemForm} from '../../../components/addItemForm/AddItemForm'
import {EditableSpan} from '../../../components/editAbleSpan/EditableSpan'
import {Task} from './Task/Task'

import {getTasksTC} from "../tasks-reducer";
import {TaskStatuses, TaskType} from "../../../api/tasks-api";
import {FilterValuesType} from "../todolists-reducer";
import {RequestStatusType} from "../../../state/app-reducer";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (params: { filter: FilterValuesType, todolistId: string }) => void
    addTask: (params:{title: string, todolistId: string}) => void
    changeTaskStatus: (params:{taskId: string, status: TaskStatuses, todolistId: string}) => void
    changeTaskTitle: (params:{taskId: string, newTitle: string, todolistId: string}) => void
    removeTask: (params:{taskId: string, todolistId: string}) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (params: { todolistId: string, newTitle: string }) => void
    filter?: FilterValuesType
    entityStatus?: RequestStatusType

}

export const Todolist = React.memo(function (props: PropsType) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, [])


    const addTask = useCallback((title: string) => {
        props.addTask({title, todolistId:props.id})
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle({todolistId: props.id, newTitle: title})
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter({
        filter: 'all',
        todolistId: props.id
    }), [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter({
        filter: 'active',
        todolistId: props.id
    }), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter({
        filter: 'completed',
        todolistId: props.id
    }), [props.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}
            >Active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
            >Completed</Button>
        </div>
    </div>
})


