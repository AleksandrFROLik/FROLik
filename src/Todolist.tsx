import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import style from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (isDone: boolean, tID: string) => void
    filter: FilterValuesType
}

export function Todolist({tasks, removeTask,  addTask, changeStatus, changeFilter, filter, ...props}: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(true)

    const addTaskHandler = () => {
        addTask(title);
        setTitle("");
        setError(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(title);
            setTitle("");
        }
    }

    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");
    const onChangeHandlerStatus = (event: ChangeEvent<HTMLInputElement>, tID: string) => {
        changeStatus(event.currentTarget.checked, tID)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? style.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={style.errorMessage}>Title is required</div>}

        </div>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(event) => onChangeHandlerStatus(event, t.id)}/>
                        <span className={t.isDone  ? style.isDone :''}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? style.activeFilter : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? style.activeFilter: ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? style.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
