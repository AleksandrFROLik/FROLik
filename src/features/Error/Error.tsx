import React from 'react';
import {useAppSelector} from "../../state/store";

export const Error = () => {
    // const errorMassege = useAppSelector(state => state.app.error)
    return (
       <h1 style={{textAlign:'center', color:'red', fontSize:'28'}}>Page not found. Error 404</h1>
       // <h1 style={{textAlign:'center', color:'red', fontSize:'28'}}>{errorMassege}</h1>
    );
};

