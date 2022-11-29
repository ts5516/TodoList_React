import React from 'react';
import { Todo } from './dataStructure';
import { TodoListFunction } from './App';

type Props = {
    todo: Todo;
}

export function TodoListItem(props: Props) {
    const todoListFunc = React.useContext(TodoListFunction);

    const handleClickCheckbox = (todo: Todo) => {
        const changeTodo = { ...todo };
        changeTodo.isCompleted = !changeTodo.isCompleted;
        todoListFunc.updateItem(todo, changeTodo);
    }

    const handleDoubleClickTodo = (todo: Todo) => {
        const changeTodo = { ...todo };
        changeTodo.editable = !changeTodo.editable;
        todoListFunc.updateItem(todo, changeTodo);
    }

    const handleKeyDownTodo =
        (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
            if (e.key === "Enter") {
                const changeTodo = { ...todo };
                changeTodo.content = (e.target as HTMLInputElement).value;
                changeTodo.editable = !changeTodo.editable;
                todoListFunc.updateItem(todo, changeTodo);
            }
        }

    const handleClickDeleteButton = (todo: Todo) => {
        todoListFunc.deleteItem(Array(todo));
    }

    if (props.todo.editable) {
        return (
            <li
                key={props.todo.id}
                className={props.todo.isCompleted ? "item checked" : "item"}>
                <input
                    className="input"
                    onKeyDown={(e) => handleKeyDownTodo(e, props.todo)}
                    defaultValue={props.todo.content}>
                </input>
            </li >
        );
    } else {
        return (
            <li
                key={props.todo.id}
                className={props.todo.isCompleted ? "item checked" : "item"}>
                <div
                    className="checkbox"
                    onClick={() => handleClickCheckbox(props.todo)}>
                    {props.todo.isCompleted ? '✔' : ''}
                </div>
                <div
                    className="todo"
                    onDoubleClick={() => handleDoubleClickTodo(props.todo)}>
                    {props.todo.content}
                </div>
                <button
                    className="deleteButton"
                    onClick={() => handleClickDeleteButton(props.todo)}>
                    {'X'}
                </button>
            </li >
        );
    }
}