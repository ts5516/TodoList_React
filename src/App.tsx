import React from 'react';
import uuid from 'react-uuid';
import { TodoListItem, Todo } from './TodoListItem';

type Props = {};
type State = {
  todos: Todo[]
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      this.setState({
        todos: this.state.todos.concat({
          id: uuid(),
          content: (e.target as HTMLInputElement).value,
          isCompleted: false,
          editable: false
        })
      });
      (e.target as HTMLInputElement).value = '';
    }
  }

  handleClickCheckbox(todo: Todo): void {
    const _todos = this.state.todos;
    const index = _todos.indexOf(todo);
    _todos[index].isCompleted = !_todos[index].isCompleted;
    this.setState({
      todos: _todos
    })
  }

  handleDoubleClickTodo(todo: Todo): void {
    const _todos = this.state.todos;
    const index = _todos.indexOf(todo);
    _todos[index].editable = !_todos[index].editable;
    this.setState({
      todos: _todos
    })
  }

  handleKeyDownTodo(e: React.KeyboardEvent<HTMLInputElement>, todo: Todo)
    : void {
    if (e.key === "Enter") {
      const _todos = this.state.todos;
      const index = _todos.indexOf(todo);
      _todos[index].content = (e.target as HTMLInputElement).value;
      this.setState({
        todos: _todos
      })
    }
  }

  handleClickDeleteButton(todo: Todo): void {
    const _todos = this.state.todos;
    const index = _todos.indexOf(todo);
    _todos.splice(index, 1);
    this.setState({
      todos: _todos
    })
  }

  handleClickRemoveCheckedItemButton(): void {
    const _todos = this.state.todos;
    for (let i = _todos.length; i--;) {
      if (_todos[i].isCompleted) {
        _todos.splice(i, 1);
      }
    }
    this.setState({
      todos: _todos
    })
  }

  render(): React.ReactNode {
    const todos = this.state.todos;
    const renderTodos = todos.map((todo) => {
      return (
        <TodoListItem
          item={todo}
          onClickCheckbox={() => this.handleClickCheckbox(todo)}
          onClickDeleteButton={() => this.handleClickDeleteButton(todo)}
          onDoubleClickTodo={() => this.handleDoubleClickTodo(todo)}
          onKeyDownTodo={(e) => this.handleKeyDownTodo(e, todo)}
        />
      )
    });
    const leftItem = todos.filter(todo => todo.isCompleted === false).length;

    return (
      <div className="app" >
        <div className="title">Todo List</div>
        <div className="contentWrapper">
          <div className="inputWrapper">
            <i className="inputIcon">✔</i>
            <input
              type="text"
              className="input"
              onKeyDown={(e) => this.handleKeyDown(e)}
              placeholder="해야 할 일을 입력해주세요."
            />
          </div>
          <ul className="list">
            {renderTodos}
          </ul>
          <div className="bottomContent">
            <div id="leftTodo">{leftItem}개 남음</div>
            <button
              id="removeCheckedItem"
              onClick={() => this.handleClickRemoveCheckedItemButton()}>
              체크된 항목 삭제
            </button>
          </div>
        </div>
        <p className='info'>더블클릭 시 수정 가능!</p>
      </div>
    );
  }
}

export default App;