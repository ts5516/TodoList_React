import { createContext } from "react";

export type Todo = {
    id: string,
    content: string,
    isCompleted: boolean,
    editable: boolean
}

export type TodoListType = {
    todos: Todo[],
    addItem: (todo: Todo) => void,
    deleteItem: (todoToDelete: Todo[]) => void,
    updateItem: (todo: Todo, afterChangeTodo: Todo) => void
};

export const TodoList = createContext<TodoListType | null>(null);