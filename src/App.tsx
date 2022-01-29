import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Menu from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';

import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    changeTodolistFilterAC,
    createTodoListTC,
    deleteTodoListTC,
    getTodoListsTC,
    upDateTodoListTC
} from './state/todolists-reducer';
import {createTaskTC, deleteTaskTC, upDateTaskStatusTC, upDateTaskTitleTC} from './state/tasks-reducer';
import {AppRootStateType, useAppSelector} from './state/store';
import {TaskStatuses, TaskType} from './api/tasks-api';
import {RequestStatusType} from "./state/app-reducer";



export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    useEffect(()=>{
        dispatch(getTodoListsTC())
    },[])

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    // const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (params:{taskId: string, todolistId: string}) {
        dispatch(deleteTaskTC(params))
    }, []);

    const addTask = useCallback(function (params:{title: string, todolistId: string}) {
        dispatch(createTaskTC(params))
    }, []);

    const changeStatus = useCallback(function (params:{taskId: string, status: TaskStatuses, todolistId: string}) {
        dispatch(upDateTaskStatusTC(params))
    }, []);

    const changeTaskTitle = useCallback(function (params:{taskId: string, newTitle: string, todolistId: string}) {
        dispatch(upDateTaskTitleTC(params))
    }, []);

    const changeFilter = useCallback(function (params:{filter: FilterValuesType, todolistId: string}) {
        dispatch(changeTodolistFilterAC(params))
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(deleteTodoListTC(id))
    }, []);

    const changeTodolistTitle = useCallback(function (params:{todolistId: string, newTitle: string}) {
        dispatch(upDateTodoListTC(params))
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            {status === 'loading' &&  <LinearProgress />}

            <Container fixed>
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
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
