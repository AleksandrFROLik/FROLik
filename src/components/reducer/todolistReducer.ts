import {v1} from "uuid"
import {TodoListsType} from "../../App";
import {ACTIONS_TYPE, TodoListReducerType} from "./toodListActions";

export let todoListID1 = v1()
export let todoListID2 = v1()

let InitialState: TodoListsType = [
    {id: todoListID1, title: "What to learn", filter: "All"},
    {id: todoListID2, title: "What to buy", filter: "All"}
]

export const TodolistReducer = (state: TodoListsType = InitialState, action: TodoListReducerType): TodoListsType => {
    switch (action.type) {
        case ACTIONS_TYPE.ADD_NEW_TODOLIST:
            return [{id: action.todoListID, title: action.titleForTodoList, filter: "All"}, ...state]

        case ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.todolistID)

        case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER: {
            const todolist = state.find(tl => tl.id === action.todolistID);
            if (todolist) {
                todolist.filter = action.value;
            }
            return [...state];
        }

        case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE: {
            const todolist = state.find(tl => tl.id === action.todolistID);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        default:
            return state
    }
}
