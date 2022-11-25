import React from 'react';
import uuid from 'react-uuid';
import { Todo } from './dataStructure';

type Props = {
    addItem(todo: Todo): void;
}

export function TodoListInputHeader(props: Props): JSX.Element {
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            const todo = {
                id: uuid(),
                content: (e.target as HTMLInputElement).value,
                isCompleted: false,
                editable: false
            }
            props.addItem(todo);
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