import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputButton} from "./components/Input+Button_for_addNewTodoList/InputButton";

export type FilterValuesType = "All" | "Active" | "Completed";
export  type todoListsType = { id: string, title: string, filter: FilterValuesType };

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
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

    const removeTodolist = (todolistID: string) => {
        setTodoLists(todoLists.filter(f => f.id !== todolistID))
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})

        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }
    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]})
    }
    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
   }
    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }
    const addNewTodoList =(titleForTodoList:string)=>{
        let newTodoListID = v1()
        setTodoLists([{id: newTodoListID, title:titleForTodoList, filter: 'All'},...todoLists])
        setTasks({ [newTodoListID]:[], ...tasks})
    }
    const upDateTasks = (newTaskTitle:string, todolistID: string, taskId: string) => {
        console.log(newTaskTitle)
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(m=>m.id === taskId ? {...m, title:newTaskTitle}: m)})
    }

    return (

        <div className="App">
            <InputButton callBack={addNewTodoList}/>
            {todoLists.map(m => {
                let tasksForTodolist = tasks[m.id];

                if (m.filter === "Active") {
                    tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
                }
                if (m.filter === "Completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone);
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
                    />
                )
            })}

        </div>
    );
}

export default App;
