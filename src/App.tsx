import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {InputButton} from "./components/Input+Button_for_addNewTodoList/InputButton";
import {useSelector} from "react-redux";
import {rootReducerType} from "./components/reducer/store";

export type FilterValuesType = "All" | "Active" | "Completed";
export type TodoListType = { id: string, title: string, filter: FilterValuesType };
export type TasksType = { [key: string]: Array<TaskType> }
export type TodoListsType = Array<TodoListType>

function App() {

    let todoLists = useSelector<rootReducerType, TodoListsType>(state => state.todoLists)

    return (
        <div className="App">
            <InputButton />
            {todoLists.map(todoLists => {
                // let tasksForTodolist = tasks[todoLists.id];
                // if (todoLists.filter === "Active") {
                //     tasksForTodolist = tasks[todoLists.id].filter(f => !f.isDone);
                // }
                // if (todoLists.filter === "Completed") {
                //     tasksForTodolist = tasks[todoLists.id].filter(f => f.isDone);
                // }
                return (
                    <Todolist
                        key={todoLists.id}
                        todolistID={todoLists.id}
                        // title={todoLists.title}
                        // tasks={tasksForTodolist}
                        // removeTask={removeTask}
                        // changeFilter={changeFilter}
                        // addTask={addTask}
                        // changeTaskStatus={changeStatus}
                        // filter={todoLists.filter}
                        // removeTodolist={removeTodolist}
                        // upDateTasks={upDateTasks}
                        // upDateTodoList={upDateTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
