import {TasksType, TodoListType} from '../../App';
import {addNewTodolistAC, TodoListReducer} from './TodolistReducer'
import {TaskReducer} from './TaskReducer';

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodoListsState: Array<TodoListType> = [];

    const action = addNewTodolistAC("new todolist");
    const endTasksState = TaskReducer(startTasksState, action)
    const endTodoListsState = TodoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodoLists).toBe(action.todoListID);
});
