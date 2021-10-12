import React from "react";

 type propsButtonType = {
     callBack: ()=>void
     setTitle: (title:string)=>void
}
export const Button=({callBack, setTitle, ...props}:propsButtonType)=> {

    const onClickHandler = () => {
        callBack()
        setTitle('')
    }

    return(
        <button onClick={onClickHandler}>+</button>
    )
}