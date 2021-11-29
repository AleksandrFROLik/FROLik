import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import style from './Button.module.css'
import {FilterValuesType} from "../../App";


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ButtonType = DefaultButtonPropsType & {
    name: string
    callBack: () => void
    filter?: FilterValuesType
}

export const Button: React.FC<ButtonType> = React.memo ((
    {
        name, callBack, filter,
        ...restProps
    }
) => {
    // console.log('button')
    const onClickHandler = () => {
        callBack()
    }
    return (
        <button onClick={onClickHandler} className={filter === name ? `${style.activeFilter}` : ''}>{name}</button>

    )
})

