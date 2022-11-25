export type Todo = {
    id: string,
    content: string,
    isCompleted: boolean,
    editable: boolean
}

export interface TodoListProps {
    todos: Todo[]
    addItem(todo: Todo): void;
    removeItem(todo: Todo): void;
    editItem(nowTodo: Todo, afterChangeTodo: Todo): void;
}