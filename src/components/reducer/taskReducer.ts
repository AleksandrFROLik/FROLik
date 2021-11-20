import {v1} from "uuid";
import {TasksType} from "../../App";
import {todoListID1, todoListID2} from "./todolistReducer";
import {ACTIONS_TYPE, TasksActionsType} from "./tasksActions";


let InitialState: TasksType = {
    [todoListID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
    ],
    [todoListID2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true},
    ],
};

export const taskReducer = (state: TasksType = InitialState, action: TasksActionsType): TasksType => {

    switch (action.type) {
        case ACTIONS_TYPE.ADD_TASK: {
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        }
        case ACTIONS_TYPE.REMOVE_TASK: {
            return ({...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskID)})
        }
        case ACTIONS_TYPE.CHANGE_STATUS: {
            return ({
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            })
        }
        case ACTIONS_TYPE.UP_DATE_TASKS: {
            return ({
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                    ...m,
                    title: action.newTaskTitle
                } : m)
            })
        }
        case "ADD-NEW-TODOLIST": {
            return ({[action.todoListID]: [], ...state})
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.todolistID]
            return stateCopy;
        }
        default:
            return state
    }
}

