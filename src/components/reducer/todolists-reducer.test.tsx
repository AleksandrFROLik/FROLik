import React from 'react';
import {
    addNewTodolistAC,
    removeTodolistAC,
    changeFilterAC,
    upDateTodoListAC,
} from './todolistReducer';

import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../../App';
import {TodolistReducer} from "./todolistReducer";

let todolistId1: string;
let todolistId2: string;

let startState: TodoListType []

beforeEach( ()=> {
    todolistId1 = v1();
    todolistId2 = v1();

     startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"},
    ]
})

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";
    const endState = TodolistReducer(startState, addNewTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("All");
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should be removed', () => {

    const endState = TodolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "Completed";

    const action = changeFilterAC(todolistId2, newFilter);
    const endState = TodolistReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = upDateTodoListAC( newTodolistTitle, todolistId2);

    const endState = TodolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});




