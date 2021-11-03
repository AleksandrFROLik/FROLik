import React, {ChangeEvent, KeyboardEvent, DetailedHTMLProps, InputHTMLAttributes,} from "react";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputType = DefaultInputPropsType & {
    title: string
    setTitle: (value: string) => void
    error: string | null
    setError: (value: string) => void
    callBack: () => void
}

export const Input: React.FC<InputType> = (
    {
        title, setTitle, error, setError, callBack, onChange, onKeyPress, ...restProps
    }
) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        setTitle && setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        setError('');
        callBack
        && e.key === "Enter"
        && callBack()
    }

    return (
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />
    )
}
