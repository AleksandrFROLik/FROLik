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

const App = React.memo (() => {
    console.log('app')
    let todoLists = useSelector<rootReducerType, TodoListsType>(state => state.todoLists)

    return (
        <div className="App">
            <InputButton/>
            {/*<InputButton/>*/}
            {todoLists.map(todoLists => {
                return (
                    <Todolist
                        key={todoLists.id}
                        todolistID={todoLists.id}
                    />
                )
            })}

        </div>
    );
})

export default App;
