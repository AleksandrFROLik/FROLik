import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";

type EditAbleSpanType = {
    mapTitle: string
    callBack: (newTaskTitle: string) => void
}
export const EditAbleSpan = React.memo (({mapTitle, callBack}: EditAbleSpanType) => {
    console.log('editAbleSpan')
    let [edit, setEdit] = useState(false)
    let [newTaskTitle, setTaskTitle] = useState(mapTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            editOff();
        }
    }
    const editOn = () => {
        setEdit(true)
    }
    const editOff = useCallback (() => {
        setEdit(false)
        callBack(newTaskTitle)
    }, [newTaskTitle, callBack])

    return (
        edit
            ? <input value={newTaskTitle}
                     onChange={onChangeHandler}
                     onBlur={editOff}
                     autoFocus
                     onKeyPress={onKeyPressHandler}
            />
            : <span onDoubleClick={editOn}>{mapTitle}</span>


    )
})