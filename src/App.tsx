import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputButton} from "./components/Input+Button_for_addNewTodoList/InputButton";
import {
    addNewTodoListAC,
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    TaskReducer,
    upDateTasksAC
} from "./components/reducer/TaskReducer";
import {
    addNewTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    TodoListReducer, upDateTodoListAC
} from "./components/reducer/TodoListReducer";

export type FilterValuesType = "All" | "Active" | "Completed";
export type todoListsType = { id: string, title: string, filter: FilterValuesType };
export type Type = { [key: string]: TaskType[] }
export type TodoListType = todoListsType[]


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, todoListsDispatch] = useReducer(TodoListReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, tasksDispatch] = useReducer(TaskReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    const addNewTodoList = (titleForTodoList: string) => {
        let newTodoListID = v1()
        todoListsDispatch(addNewTodolistAC(titleForTodoList, newTodoListID))
        tasksDispatch(addNewTodoListAC(newTodoListID))
    }
    const addTask=(todolistID: string, title: string)=> {
        tasksDispatch(addTaskAC(todolistID, title))
    }
    const removeTodolist = (todolistID: string) => {
        todoListsDispatch(removeTodolistAC(todolistID))
    }
    const removeTask=(todolistID: string, id: string)=> {
        tasksDispatch(removeTaskAC(todolistID, id))
    }
    const changeStatus=(todolistID: string, taskId: string, isDone: boolean)=> {
        tasksDispatch(changeStatusAC(todolistID, taskId, isDone ))
    }
    const changeFilter =(todolistID: string, value: FilterValuesType)=> {
        todoListsDispatch(changeFilterAC(todolistID, value))
    }
    const upDateTasks = (newTaskTitle: string, todolistID: string, taskId: string) => {
        tasksDispatch(upDateTasksAC(newTaskTitle, todolistID, taskId))
    }
    const upDateTodoList = (title: string, todolistID: string) => {
        todoListsDispatch(upDateTodoListAC(title, todolistID))
    }

    return (
        <div className="App">
            <InputButton callBack={addNewTodoList}/>
            {todoLists.map(m => {
                let tasksForTodolist = tasks[m.id];
                if (m.filter === "Active") {
                    tasksForTodolist = tasks[m.id].filter(f => !f.isDone);
                }
                if (m.filter === "Completed") {
                    tasksForTodolist = tasks[m.id].filter(f => f.isDone);
                }
                return (
                    <Todolist
                        key={m.id}
                        todolistID={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
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
