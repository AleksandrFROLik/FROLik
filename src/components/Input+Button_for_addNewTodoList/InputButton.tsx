import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {addNewTodolistAC} from "../reducer/todoListActions";


export const InputButton = React.memo (() => {
    // console.log('input button')
    let [newTitle, setNewTitle] = useState("")
    let [alarm, setAlarm] = useState<string | null>(null)
    let dispatch = useDispatch()

    const addTask = () => {
        let titleForTodoList = newTitle.trim();
        if (titleForTodoList !== "") {
            dispatch(addNewTodolistAC(titleForTodoList))
            setNewTitle("");
        } else {
            setAlarm("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(alarm !== null) {
            setAlarm(null);
        }
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={alarm ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {alarm && <div className="error-message">{alarm}</div>}
        </div>
    )
})