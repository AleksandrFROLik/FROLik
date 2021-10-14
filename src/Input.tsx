import React, {ChangeEvent,KeyboardEvent, useState} from "react";

type propsType = {
    callback: (title:string)=>void


}
const Input = (props:propsType) => {

    let [title, setTitle] = useState("")

    const addTask = (title:string) => {
        props.callback(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.callback(title);
        }
    }

     const onClickHandler =()=> {
        props.callback(title)
     }
    return (
        <div>
            <input value={title}
                  onChange={ onChangeHandler }
                  onKeyPress={ onKeyPressHandler }
            />
            <button onClick={onClickHandler}>+</button>
        </div>
)

}