import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {InputButton} from "./components/Input+Button_for_addNewTodoList/InputButton";
import {
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    upDateTasksAC,
} from "./components/reducer/TaskReducer";

import {
    addNewTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    upDateTodoListAC,
} from "./components/reducer/TodolistReducer";

import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./components/reducer/store";

export type FilterValuesType = "All" | "Active" | "Completed";
export type TodoListType = { id: string, title: string, filter: FilterValuesType };
export type TasksType = { [key: string]: Array<TaskType> }
export type TodoListsType = Array<TodoListType>

function App() {

    let todoLists = useSelector<rootReducerType, TodoListsType>(state => state.todoLists)
    let tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)
    let dispatch = useDispatch()

    const addNewTodoList = (titleForTodoList: string) => {
        dispatch(addNewTodolistAC(titleForTodoList))
    }
    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }
    const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeStatusAC(todolistID, taskID, isDone))
    }
    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }
    const upDateTasks = (newTaskTitle: string, todolistID: string, taskId: string) => {
        dispatch(upDateTasksAC(newTaskTitle, todolistID, taskId))
    }
    const upDateTodoList = (title: string, todolistID: string) => {
        dispatch(upDateTodoListAC(title, todolistID))
    }

    return (
        <div className="App">
            <InputButton callBack={addNewTodoList}/>
            {todoLists.map(todoLists => {
                let tasksForTodolist = tasks[todoLists.id];
                if (todoLists.filter === "Active") {
                    tasksForTodolist = tasks[todoLists.id].filter(f => !f.isDone);
                }
                if (todoLists.filter === "Completed") {
                    tasksForTodolist = tasks[todoLists.id].filter(f => f.isDone);
                }
                return (
                    <Todolist
                        key={todoLists.id}
                        todolistID={todoLists.id}
                        title={todoLists.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={todoLists.filter}
                        removeTodolist={removeTodolist}
                        upDateTasks={upDateTasks}
                        upDateTodoList={upDateTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
