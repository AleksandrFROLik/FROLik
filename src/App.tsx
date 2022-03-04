import React, {useCallback, useEffect} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/icons-material/Menu';
import CircularProgress from "@mui/material/CircularProgress";

import './App.css';

import {useAppSelector} from './state/store';
import {RequestStatusType} from "./state/app-reducer";
import {TodolistLists} from "./features/TodolistLists/TodolistLists";
import {Login} from "./features/Login/Login";
import {Error} from "./features/Error/Error";
import {ErrorSnackbar} from "./components/errorSnackbar/ErrorSnackbar";
import {useDispatch} from "react-redux";
import {initializeAppTC, logoutTC} from "./features/Login/auth-reducer";


function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    const logoutHandler = () => {
        dispatch(logoutTC())
    }

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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
            </AppBar>

            {status === 'loading' && <LinearProgress/>}

            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistLists/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='404' element={<Error/>}/>
                    <Route path='*' element={<Navigate to='404'/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default React.memo(App);
