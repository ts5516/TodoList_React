import { createContext, useContext } from "react";

export type Todo = {
    id: string,
    content: string,
    isCompleted: boolean,
    editable: boolean
}

type TodoListType = {
    todos: Todo[],
    addItem: (todo: Todo) => void,
    deleteItem: (todoToDelete: Todo[]) => void,
    updateItem: (todo: Todo, afterChangeTodo: Todo) => void
};

export const TodoList = createContext<TodoListType | undefined>(undefined);

export function useTodoList(): TodoListType {
    const context = useContext(TodoList);
    if (context === undefined) {
        throw Error("TodoList is undefined");
    }

    return context;
}