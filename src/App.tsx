import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';

import './App.css';
import {getTodoListsTC} from './features/TodolistLists/todolists-reducer';
import {useAppSelector} from './state/store';
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./components/errorSnackbar/ErrorSnackbar";
import {TodolistLists} from "./features/TodolistLists/TodolistLists";


function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [])

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

            {status === 'loading' && <LinearProgress/>}

            <Container fixed>
                <TodolistLists/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
