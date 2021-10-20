import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditAbleSpanType = {
    mapTitle: string
    callBack:(newTaskTitle:string)=>void

}
export const EditAbleSpan = ({mapTitle, callBack}:EditAbleSpanType)=> {

    let[edit, setEdit] = useState(false)

    let[newTaskTitle, setTaskTitle]= useState('')

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
    const editOff = () => {
        setEdit(false)
        callBack(newTaskTitle)
    }


    return(
        edit
            ?<input value={newTaskTitle}
                    onChange={onChangeHandler}
                    onBlur={editOff}
                    autoFocus
                    onKeyPress={onKeyPressHandler}
            />
            :<span onDoubleClick={editOn}>{mapTitle}</span>


    )
}