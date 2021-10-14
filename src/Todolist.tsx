import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Button/Button";

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

    const addTask = (todolistID: string) => {
        if (title.trim() !== "") {
            props.addTask(todolistID, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask(todolistID);
        }
    }

    // const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    // const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    // const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");
    const superButton = (value: FilterValuesType) => {
        changeFilter(todolistID, value)
    }
    const onClickHandler = (taskId: string) => removeTask(todolistID, taskId)


    return <div>
        <h3>{props.title} <Button name={'X'} callBack={onClickHandlerForRemoveTodolist}/></h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button name={'+'} callBack={() => addTask(todolistID)}/>
            {/*<button onClick={addTask}>+</button>*/}
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                tasks.map(t => {
                    // const onClickHandler = () => props.removeTask(props.todolistID,t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'X'} callBack={() => onClickHandler(t.id)}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => superButton('all')}/>
            <Button name={'Active'} callBack={() => superButton('active')}/>
            <Button name={'Completed'} callBack={() => superButton('completed')}/>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*    onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*    onClick={onCompletedClickHandler}>Completed</button>*/}
        </div>
    </div>
}
