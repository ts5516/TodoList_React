import React from 'react';
import uuid from 'react-uuid';
import { useTodoList } from './TodoList';

export function TodoListInputHeader(): JSX.Element {
    const todoListFunc = useTodoList();

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            const todo = {
                id: uuid(),
                content: (e.target as HTMLInputElement).value,
                isCompleted: false,
                editable: false
            }
            todoListFunc.addItem(todo);
            (e.target as HTMLInputElement).value = '';
        }
    }

    return (
        <div className="inputWrapper">
            <i className="inputIcon">✔</i>
            <input
                type="text"
                className="input"
                onKeyDown={(e) => handleKeyDown(e)}
                placeholder="해야 할 일을 입력해주세요."
            />
        </div>
    );
}