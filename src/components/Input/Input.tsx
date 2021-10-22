import React, {ChangeEvent, KeyboardEvent} from "react";

type InputType = {
    title: string
    setTitle: (value: string) => void
    error: string | null
    setError: (value: string) => void
    callBack: () => void
}

export const Input = ({title, setTitle, error, setError, callBack}: InputType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if (e.key === "Enter") {
            callBack();
        }
    }

    return (
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />
    )
}