import { Todo, useTodoList } from './TodoList';

export function TodoListBottomContent() {
    let todoListFunc = useTodoList();

    function handleClickRemoveCheckedItemButton(): void {
        const todos = todoListFunc.todos;
        const todosToDelete: Todo[] = [];

        for (let i = todos.length; i--;) {
            if (todos[i].isCompleted) {
                todosToDelete.push(todos[i]);
            }
        }
        todoListFunc.deleteItem(todosToDelete);
    }

    function getLeftItem(): number {
        const todos = todoListFunc.todos;
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