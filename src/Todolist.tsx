import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import {MapTasks} from "./components/MapTasks/MapTasks";

export type TaskType = {
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
        <h3>{props.title} <Button name={'X'} callBack={onClickHandlerForRemoveTodolist}/></h3>
        <div>
            <Input title={title} setTitle={setTitle} error={error} setError={setError} callBack={addTask}/>
            <Button name={'+'} callBack={() => addTask()}/>
            {error && <div className="error-message">{error}</div>}
        </div>
        <MapTasks tasks={tasks}
                  changeTaskStatus={changeTaskStatus}
                  todolistID={todolistID}
                  onClickHandler={onClickHandler}
        />
        <div>
            <Button name={'all'} callBack={() => superButton('All')} filter={filter}/>
            <Button name={'active'} callBack={() => superButton('Active')} filter={filter}/>
            <Button name={'completed'} callBack={() => superButton('Completed')} filter={filter}/>
        </div>
    </div>
}
