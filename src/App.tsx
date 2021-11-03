import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {InputButton} from "./components/Input+Button_for_addNewTodoList/InputButton";
import {
    addNewTodoListInTasksAC,
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


} from "./components/reducer/TodoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./components/reducer/store";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Active" | "Completed";
export type todoListsType = { id: string, title: string, filter: FilterValuesType };
export type Type = { [key: string]: Array<TaskType> }
export type TodoListType = todoListsType[]


function App() {

    let dispatch = useDispatch()
    let todoLists = useSelector<rootReducerType, TodoListType>(state => state.todoLists)
    let tasks = useSelector<rootReducerType, Type>(state => state.tasks)

    const addNewTodoList = (titleForTodoList: string) => {
        let newTodoListID = v1()
        dispatch(addNewTodolistAC(titleForTodoList, newTodoListID))
        dispatch(addNewTodoListInTasksAC(newTodoListID))
    }
    const addTask=(todolistID: string, title: string)=> {
        dispatch(addTaskAC(todolistID, title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const removeTask=(todolistID: string, id: string)=> {
       dispatch(removeTaskAC(todolistID, id))
    }
    const changeStatus=(todolistID: string, taskId: string, isDone: boolean)=> {
        dispatch(changeStatusAC(todolistID, taskId, isDone ))
    }
    const changeFilter =(todolistID: string, value: FilterValuesType)=> {
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

        </div> //
    );
}

export default App;
