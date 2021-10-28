import {FilterValuesType, TodoListType} from "../../App";

export const TodoListReducer = (state:TodoListType, action:ActionType):TodoListType => {

    switch (action.type) {
        case "ADD-NEW-TODOLIST":{
            return ([{id: action.newTodoListID, title: action.titleForTodoList, filter: 'All'}, ...state])
        }
        case "REMOVE-TODOLIST": {
            return (state.filter(f => f.id !== action.todolistID))
        }
        case "CHANGE-FILTER": {
            return (state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m))
        }
        case "Up-DATE-TODOLIST": {
            return (state.map(m => m.id === action.todolistID ? {...m,title:action.title} : m))
        }
        default: return state
    }
}

type ActionType = AddNewTodolistACType | RemoveTodolistACType | ChangeFilterACType | UpDateTodoListACType

type  AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>

export const addNewTodolistAC = (titleForTodoList: string, newTodoListID:string )=> {
    return {
        type: "ADD-NEW-TODOLIST",
        titleForTodoList,
        newTodoListID
    }as const
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistID,
    }as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type:"CHANGE-FILTER",
        todolistID,
        value,
    }as const
}

type UpDateTodoListACType = ReturnType<typeof upDateTodoListAC>

export  const upDateTodoListAC = (title: string, todolistID: string) => {
    return{
        type: "Up-DATE-TODOLIST",
        title,
        todolistID,
    }as const
}