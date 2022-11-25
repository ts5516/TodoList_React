import React from 'react';
import { TodoListItem } from './TodoListItem';
import { Todo, TodoListProps } from './dataStructure';

export class TodoListBody extends React.Component<TodoListProps>  {
    handleClickCheckbox(todo: Todo): void {
        const changeTodo = todo;
        changeTodo.isCompleted = !todo.isCompleted;
        this.props.editItem(todo, changeTodo);
    }

    handleDoubleClickTodo(todo: Todo): void {
        const changeTodo = todo;
        changeTodo.editable = !changeTodo.editable;
        this.props.editItem(todo, changeTodo);
    }

    handleKeyDownTodo(e: React.KeyboardEvent<HTMLInputElement>, todo: Todo)
        : void {
        if (e.key === "Enter") {
            const changeTodo = todo;
            changeTodo.content = (e.target as HTMLInputElement).value;
            changeTodo.editable = !changeTodo.editable;
            this.props.editItem(todo, changeTodo);
        }
    }

    handleClickDeleteButton(todo: Todo): void {
        this.props.removeItem(todo);
    }

    handleClickRemoveCheckedItemButton(): void {
        const todos = this.props.todos;
        for (let i = todos.length; i--;) {
            if (todos[i].isCompleted) {
                this.props.removeItem(todos[i]);
            }
        }
    }

    render() {
        const renderTodos = this.props.todos.map((todo) => {
            return (
                <TodoListItem
                    item={todo}
                    onClickCheckbox={() => this.handleClickCheckbox(todo)}
                    onClickDeleteButton={() => this.handleClickDeleteButton(todo)}
                    onDoubleClickTodo={() => this.handleDoubleClickTodo(todo)}
                    onKeyDownTodo={(e) => this.handleKeyDownTodo(e, todo)}
                />
            );
        });

        return (
            <ul className="list">
                {renderTodos}
            </ul>
        );
    }

}