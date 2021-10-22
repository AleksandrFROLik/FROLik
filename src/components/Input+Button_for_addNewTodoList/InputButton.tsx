import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type InputButtonType = {
    callBack: (titleForTodoList: string) => void
}

export const InputButton = ({callBack}: InputButtonType) => {

    let [newTitle, setNewTitle] = useState("")
    let [alarm, setAlarm] = useState<string | null>(null)

    const addTask = () => {
        let titleForTodoList = newTitle.trim();
        if (titleForTodoList !== "") {
            callBack(titleForTodoList);
            setNewTitle("");
        } else {
            setAlarm("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setAlarm(null);
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
}