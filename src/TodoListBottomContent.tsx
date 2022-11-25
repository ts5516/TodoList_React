import { Todo } from './dataStructure';


type Props = {
    todos: Todo[],
    removeItem(todo: Todo): void;
}

export function TodoListBottomContent(props: Props) {
    function handleClickRemoveCheckedItemButton(): void {
        const todos = props.todos;
        for (let i = todos.length; i--;) {
            if (todos[i].isCompleted) {
                props.removeItem(todos[i]);
            }
        }
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