import { Todo } from './dataStructure';
import React from 'react';
import { TodoListFunction } from './App';

type Props = { todos: Todo[]; }

export function TodoListBottomContent(props: Props) {
    const todoListFunc = React.useContext(TodoListFunction);

    function handleClickRemoveCheckedItemButton(): void {
        const todos = props.todos;
        const todosToDelete: Todo[] = [];

        for (let i = todos.length; i--;) {
            if (todos[i].isCompleted) {
                todosToDelete.push(todos[i]);
            }
        }
        todoListFunc.deleteItem(todosToDelete);
    }

    function getLeftItem(): number {
        const todos = props.todos;
        return todos.filter(todo => todo.isCompleted === false).length;
    }

    return (
        <div className="bottomContent" >
            <div id="leftTodo">{getLeftItem()}개 남음</div>
            <button
                id="removeCheckedItem"
                onClick={() => handleClickRemoveCheckedItemButton()}>
                체크된 항목 삭제
            </button>
        </div>
    );
}