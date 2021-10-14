import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Button/Button";
import {Input} from "./Input/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}

export function Todolist({
                             todolistID,
                             tasks,
                             removeTodolist,
                             changeFilter,
                             changeTaskStatus,
                             filter,
                             removeTask,
                             ...props
                         }: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onClickHandlerForRemoveTodolist = () => {
        removeTodolist(todolistID)
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(todolistID, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const superButton = (value: FilterValuesType) => {
        changeFilter(todolistID, value)
    }
    const onClickHandler = (taskId: string) => removeTask(todolistID, taskId)


    return <div>
        <h3>{props.title} <Button name={'X'} callBack={onClickHandlerForRemoveTodolist} className={"active-filter"}/></h3>
        <div>
            <Input title={title} setTitle={setTitle} error={error} setError={setError} callBack={addTask}/>
            <Button name={'+'} callBack={() => addTask()} className={"active-filter"}/>
            {error && <div className="error-message">{error}</div>}
        </div>
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
                        <Button name={'X'} callBack={() => onClickHandler(t.id)} className={"active-filter"}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => superButton('all') } className={filter === 'all' ? "active-filter" : ""}/>
            <Button name={'Active'} callBack={() => superButton('active')} className={filter === 'active' ? "active-filter" : ""}/>
            <Button name={'Completed'} callBack={() => superButton('completed')} className={filter === 'completed' ? "active-filter" : ""}/>
        </div>
    </div>
}
