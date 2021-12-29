import React, {useCallback, useState} from 'react';
import style from './Todolist.module.css'
import {FilterValuesType, TodoListType} from './App';
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import {MapTasks} from "./components/MapTasks/MapTasks";
import {EditAbleSpan} from "./components/EditAbleSpan/EditAbleSpan";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./components/reducer/store";
import {changeFilterAC, removeTodolistAC, upDateTodoListAC} from "./components/reducer/todoListActions";
import {addTaskAC, removeTaskAC, upDateTasksAC} from "./components/reducer/tasksActions";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
}

export const Todolist = ({
                             todolistID,
                         }: PropsType) => {


    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const todoList = useSelector<rootReducerType, TodoListType>(state => state.todoLists.filter(todoLists => todoLists.id === todolistID)[0])
    const tasks = useSelector<rootReducerType, Array<TaskType>>(state => state.tasks[todolistID])

    const dispatch = useDispatch()

    const addTask = useCallback(() => {
        if (title.trim() !== "") {
            dispatch(addTaskAC(todolistID, title.trim()))
            setTitle("");
        } else {
            if (error !== null) {
                setError("Title is required");
            }

        }
    }, [dispatch, error, title, todolistID])

    const onClickHandlerForRemoveTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch, todolistID])

    const superButton = useCallback((value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [dispatch, todolistID])

    const onClickHandler = useCallback((taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }, [dispatch, todolistID])

    const addNewTitleTask = useCallback((newTaskTitle: string, taskID: string) => {
        if (newTaskTitle.trim() !== "") {
            dispatch(upDateTasksAC(newTaskTitle, todolistID, taskID))
        } else {
            if (error !== null) {
                setError("Title is required");
            }
        }
    }, [dispatch, error, todolistID])

    const addNewTitleTodoList = useCallback((newTitleTodoList: string) => {
        if (newTitleTodoList.trim() !== "") {
            dispatch(upDateTodoListAC(newTitleTodoList, todolistID))
        } else {
            if (error !== null) {
                setError("Title is required");
            }
        }
    }, [dispatch, error, todolistID])


    let tasksForTodolist = tasks;
    if (todoList.filter === "Active") {
        tasksForTodolist = tasks.filter(tasks => !tasks.isDone);
    }
    if (todoList.filter === "Completed") {
        tasksForTodolist = tasks.filter(tasks => tasks.isDone);
    }


    return <div className={style.todoListBlock}>
        <h3>
            <EditAbleSpan
                mapTitle={todoList.title}
                callBack={addNewTitleTodoList}
            />
            <Button name={'X'}
                    callBack={onClickHandlerForRemoveTodolist}/>
        </h3>
        <div>
            <Input title={title} setTitle={setTitle} error={error} setError={setError} callBack={addTask}/>
            <Button name={'+'} callBack={addTask}/>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
        <MapTasks
            tasksForTodolist={tasksForTodolist}
            todolistID={todolistID}
            onClickHandler={onClickHandler}
            addNewTitleTask={addNewTitleTask}
        />
        <div>
            <Button name={'All'} callBack={() => superButton('All')} filter={todoList.filter}/>
            <Button name={'Active'} callBack={() => superButton('Active')} filter={todoList.filter}/>
            <Button name={'Completed'} callBack={() => superButton('Completed')} filter={todoList.filter}/>
        </div>
    </div>
};
