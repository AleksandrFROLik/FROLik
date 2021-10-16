import React from "react";
import style from './Button.module.css'
type ButtonType = {
    name: string
    callBack: () => void
    filter?: string
}

export const Button = ({name, callBack, filter}: ButtonType) => {
    const onClickHandler = () => {
        callBack()
    }

    return (
        <button onClick={onClickHandler} className={filter === name ? `${style.activeFilter}` : ''}>{name}</button>
    )
}