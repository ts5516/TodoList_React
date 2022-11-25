import React from 'react';
import { Todo } from './dataStructure';

type Props = {
    item: Todo,
    onClickCheckbox(todo: Todo): void,
    onClickDeleteButton(todo: Todo): void,
    onDoubleClickTodo(todo: Todo): void,
    onKeyDownTodo(e: React.KeyboardEvent<HTMLInputElement>, todo: Todo): void
}

export function TodoListItem(props: Props) {
    const todo = props.item;
    if (todo.editable) {
        return (
            <li
                key={todo.id}
                className={todo.isCompleted ? "item checked" : "item"}>
                <input
                    className="input"
                    onKeyDown={(e) => props.onKeyDownTodo(e, todo)}
                    defaultValue={todo.content}>
                </input>
            </li >
        );
    } else {
        return (
            <li
                key={todo.id}
                className={todo.isCompleted ? "item checked" : "item"}>
                <div
                    className="checkbox"
                    onClick={() => props.onClickCheckbox(todo)}>
                    {todo.isCompleted ? '✔' : ''}
                </div>
                <div
                    className="todo"
                    onDoubleClick={() => props.onDoubleClickTodo(todo)}>
                    {todo.content}
                </div>
                <button
                    className="deleteButton"
                    onClick={() => props.onClickDeleteButton(todo)}>
                    {'X'}
                </button>
            </li >
        );
    }
}