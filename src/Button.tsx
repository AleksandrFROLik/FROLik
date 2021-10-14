import React from "react";

 type propsButtonType = {
     callBack: ()=>void
     setTitle: (title:string)=>void
}
const Button=({callBack, setTitle, ...props}:propsButtonType)=> {

    const onClickHandler = () => {
        callBack()
        setTitle('')
    }

    return(
        <button onClick={onClickHandler}>+</button>
    )
}