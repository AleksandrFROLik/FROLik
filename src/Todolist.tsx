import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import {MapTasks} from "./components/MapTasks/MapTasks";
import {EditAbleSpan} from "./components/EditAbleSpan/EditAbleSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks:  Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    upDateTasks: (newTaskTitle: string, todolistID: string, taskId: string) => void
    upDateTodoList: (title: string, todolistID: string) => void
}

export function Todolist({
                             todolistID,
                             tasks,
                             removeTodolist,
                             changeFilter,
                             changeTaskStatus,
                             filter,
                             removeTask,
                             upDateTasks,
                             upDateTodoList,
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
    const addNewTitleTask = (newTitleTask: string, taskId: string) => {
        if (newTitleTask.trim() !== "") {
            upDateTasks(newTitleTask.trim(), todolistID, taskId);
        } else {
            setError("Title is required");
        }
    }
    const addNewTitleTodoList = (newTitleTodoList: string) => {
        if (newTitleTodoList.trim() !== "") {
            upDateTodoList(newTitleTodoList, todolistID);
        } else {
            setError("Title is required");
        }
    }

    return <div>
        <h3>
            <EditAbleSpan
                mapTitle={props.title}
                callBack={addNewTitleTodoList}
            />
            <Button name={'X'}
                    callBack={onClickHandlerForRemoveTodolist}/>
        </h3>
        <div>
            <Input title={title} setTitle={setTitle} error={error} setError={setError} callBack={addTask}/>
            <Button name={'+'} callBack={addTask}/>
            {error && <div className="error-message">{error}</div>}
        </div>
        <MapTasks
            title={title}
            tasks={tasks}
            changeTaskStatus={changeTaskStatus}
            todolistID={todolistID}
            onClickHandler={onClickHandler}
            addNewTitleTask={addNewTitleTask}
        />
        <div>
            <Button name={'All'} callBack={() => superButton('All')} filter={filter}/>
            <Button name={'Active'} callBack={() => superButton('Active')} filter={filter}/>
            <Button name={'Completed'} callBack={() => superButton('Completed')} filter={filter}/>
        </div>
    </div>
}
