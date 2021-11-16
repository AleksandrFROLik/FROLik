import { v1 } from "uuid"
import {FilterValuesType, TodoListType} from "../../App";

let todolistId1 = v1();
let todolistId2 = v1();

let InitialState:TodoListType = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
]

export const TodoListReducer = (state:TodoListType = InitialState, action:TodoListReducerType):TodoListType => {
    switch (action.type) {
        case 'ADD-NEW-TODOLIST':
            return [...state, {id: action.todoListID, title: action.titleForTodoList, filter: "All"}]

        case 'REMOVE-TODOLiST':
            return state.filter(tl => tl.id !== action.todolistID)

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.todolistID);if (todolist) {
                 // если нашёлся - изменим ему заголовок
                todolist.filter = action.value;
            }
            return [...state];
         }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.todolistID);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                 todolist.title = action.title;
             }
             return [...state]
         }
        default:
            return state
    }
}


export type TodoListReducerType = AddNewTodolistACType | RemoveTodolistACType | ChangeFilterACType |UpDateTodoListACType

 export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (titleForTodoList: string) => {
    return{
        type: 'ADD-NEW-TODOLIST',
        titleForTodoList,
        todoListID: v1()
    }as const
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return{
        type: 'REMOVE-TODOLiST',
        todolistID,
    }as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        todolistID,
        value,
    }as const
}

type UpDateTodoListACType = ReturnType<typeof upDateTodoListAC>
export const upDateTodoListAC = (title: string, todolistID: string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todolistID,
    }as const
}