import React from 'react';
import { Todo } from './dataStructure';

type Props = {
    todo: Todo;
    addItem(todo: Todo): void;
    deleteItem(todosToDelete: Todo[]): void;
    updateItem(nowTodo: Todo, afterChangeTodo: Todo): void;
}

export function TodoListItem(props: Props) {
    const handleClickCheckbox = (todo: Todo) => {
        const changeTodo = { ...todo };
        changeTodo.isCompleted = !changeTodo.isCompleted;
        props.updateItem(todo, changeTodo);
    }

    const handleDoubleClickTodo = (todo: Todo) => {
        const changeTodo = { ...todo };
        changeTodo.editable = !changeTodo.editable;
        props.updateItem(todo, changeTodo);
    }

    const handleKeyDownTodo =
        (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
            if (e.key === "Enter") {
                const changeTodo = { ...todo };
                changeTodo.content = (e.target as HTMLInputElement).value;
                changeTodo.editable = !changeTodo.editable;
                props.updateItem(todo, changeTodo);
            }
        }

    const handleClickDeleteButton = (todo: Todo) => {
        props.deleteItem(Array(todo));
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