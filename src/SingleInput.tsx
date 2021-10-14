import React, {ChangeEvent, KeyboardEvent} from "react";

type propsSingleInput = {
    title: string
    setTitle: (title: string)=>void
    callBack: ()=>void
}
const SingleInput =({title, setTitle, callBack, ...props}:propsSingleInput)=> {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter') {
             callBack();
             setTitle('')
         }
     }
    return(
        <input value={title}
               onChange={ onChangeHandler }
               onKeyPress={ onKeyPressHandler }
        />
    )
}