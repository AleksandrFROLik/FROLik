import React from "react";

type ButtonType = {
    name: string
    callBack: () => void
    className:string
}

export const Button = ({name, callBack, className}: ButtonType) => {
    const onClickHandler = () => {
        callBack()
    }

    return (
        <button onClick={onClickHandler} className={className}>{name}</button>
    )
}