import React, {useCallback} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {
    createTaskTC,
    deleteTaskTC,
    TasksStateType,
    upDateTaskStatusTC,
    upDateTaskTitleTC
} from "./tasks-reducer";

import {TaskStatuses} from "../../api/tasks-api";
import {
    changeTodolistFilterAC, createTodoListTC,
    deleteTodoListTC,
    FilterValuesType, TodolistDomainType,
    upDateTodoListTC
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType,} from "../../state/store";


export const TodolistLists = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();


    const removeTask = useCallback(function (params: { taskId: string, todolistId: string }) {
        dispatch(deleteTaskTC(params))
    }, []);

    const addTask = useCallback(function (params: { title: string, todolistId: string }) {
        dispatch(createTaskTC(params))
    }, []);

    const changeStatus = useCallback(function (params: { taskId: string, status: TaskStatuses, todolistId: string }) {
        dispatch(upDateTaskStatusTC(params))
    }, []);

    const changeTaskTitle = useCallback(function (params: { taskId: string, newTitle: string, todolistId: string }) {
        dispatch(upDateTaskTitleTC(params))
    }, []);

    const changeFilter = useCallback(function (params: { filter: FilterValuesType, todolistId: string }) {
        dispatch(changeTodolistFilterAC(params))
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(deleteTodoListTC(id))
    }, []);

    const changeTodolistTitle = useCallback(function (params: { todolistId: string, newTitle: string }) {
        debugger
        dispatch(upDateTodoListTC(params))
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch]);


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                entityStatus={tl.entityStatus}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
};

