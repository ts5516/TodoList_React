import React from 'react';
import { Todo, useTodoList } from './TodoList';

type Props = { todo: Todo }

export function TodoListItem(props: Props) {
    const todo = props.todo;

    return (
        todo.editable ? <EditableTodoListItem todo={todo} />
            : <UneditableTodoListItem todo={todo} />
    );
}

function EditableTodoListItem(props: Props) {
    const todoListFunc = useTodoList();

    const handleKeyDownTodo =
        (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
            if (e.key === "Enter") {
                const changeTodo = { ...todo };
                changeTodo.content = (e.target as HTMLInputElement).value;
                changeTodo.editable = !changeTodo.editable;
                todoListFunc.updateItem(todo, changeTodo);
            }
        }

    return (
        <li className={"item"}>
            < input
                className="input"
                onKeyDown={(e) => handleKeyDownTodo(e, props.todo)
                }
                defaultValue={props.todo.content} >
            </input >
        </li >

    );
}

function UneditableTodoListItem(props: Props) {
    const todoListFunc = useTodoList();

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

    const handleClickDeleteButton = (todo: Todo) => {
        todoListFunc.deleteItem(Array(todo));
    }

    const todo = props.todo;
    return (
        <li className={todo.isCompleted ? "item checked" : "item"}>
            <div
                className="checkbox"
                onClick={() => handleClickCheckbox(todo)}>
                {todo.isCompleted ? '✔' : ''}
            </div>
            <div
                className="todo"
                onDoubleClick={() => handleDoubleClickTodo(todo)}>
                {todo.content}
            </div>
            <button
                className="deleteButton"
                onClick={() => handleClickDeleteButton(todo)}>
                {'X'}
            </button>
        </li >
    );
}