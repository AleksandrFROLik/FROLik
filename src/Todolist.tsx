import React, {useState} from 'react';
import {FilterValuesType,  TodoListType} from './App';
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import {MapTasks} from "./components/MapTasks/MapTasks";
import {EditAbleSpan} from "./components/EditAbleSpan/EditAbleSpan";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./components/reducer/store";
import {changeFilterAC, removeTodolistAC, upDateTodoListAC} from "./components/reducer/todolistReducer";
import {addTaskAC, removeTaskAC, upDateTasksAC} from "./components/reducer/tasksActions";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
}

export function Todolist({
                             todolistID,
                         }: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const todo = useSelector<rootReducerType, TodoListType>(state => state.todoLists.filter(todoLists => todoLists.id === todolistID)[0])
    const tasks = useSelector<rootReducerType, Array<TaskType>>(state => state.tasks[todolistID])

    const dispatch = useDispatch()
    const addTask = () => {
        if (title.trim() !== "") {
            dispatch(addTaskAC(todolistID, title.trim()))
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onClickHandlerForRemoveTodolist = () => {
        dispatch(removeTodolistAC(todolistID))
    }

    const superButton = (value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }
    const onClickHandler = (taskID: string) =>{
        dispatch(removeTaskAC(todolistID, taskID))
    }
    const addNewTitleTask = (newTaskTitle: string, taskID: string) => {
        if (newTaskTitle.trim() !== "") {
            dispatch(upDateTasksAC(newTaskTitle, todolistID, taskID))
        } else {
            setError("Title is required");
        }
    }
    const addNewTitleTodoList = (newTitleTodoList: string) => {
        if (newTitleTodoList.trim() !== "") {
            dispatch(upDateTodoListAC(newTitleTodoList, todolistID))
        } else {
            setError("Title is required");
        }
    }


    return <div>
        <h3>
            <EditAbleSpan
                mapTitle={todo.title}
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
            // tasks={tasks}
            // changeTaskStatus={changeTaskStatus}
            todolistID={todolistID}
            onClickHandler={onClickHandler}
            addNewTitleTask={addNewTitleTask}
        />
        <div>
            <Button name={'All'} callBack={() => superButton('All')} filter={todo.filter}/>
            <Button name={'Active'} callBack={() => superButton('Active')} filter={todo.filter}/>
            <Button name={'Completed'} callBack={() => superButton('Completed')} filter={todo.filter}/>
        </div>
    </div>
}
