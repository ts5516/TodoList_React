export type Todo = {
    id: string,
    content: string,
    isCompleted: boolean,
    editable: boolean
}

export interface TodoListProps {
    todos: Todo[]
    addItem(todo: Todo): void;
    deleteItem(todosToDelete: Todo[]): void;
    updateItem(nowTodo: Todo, afterChangeTodo: Todo): void;
}