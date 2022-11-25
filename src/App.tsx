import React from 'react';
import { TodoListInputHeader } from './TodoListInputHeader'
import { TodoListBody } from './TodoListBody';
import { TodoListBottomContent } from './TodoListBottomContent';
import { Todo } from './dataStructure';

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

  addListItem(todo: Todo) {
    this.setState({
      todos: this.state.todos.concat(todo)
    });
  }

  removeListItem(todo: Todo) {
    const _todos = this.state.todos;
    const index = _todos.indexOf(todo);
    _todos.splice(index, 1);
    this.setState({
      todos: _todos
    });
  }

  editListItem(todo: Todo, afterChangeTodo: Todo) {
    const _todos = this.state.todos;
    const index = _todos.indexOf(todo);
    _todos[index] = afterChangeTodo;
    this.setState({
      todos: _todos
    });
  }

  render(): React.ReactNode {
    return (
      <div className="app" >
        <div className="title">Todo List</div>
        <div className="contentWrapper">
          <TodoListInputHeader
            addItem={(todo) => this.addListItem(todo)} />
          <TodoListBody
            todos={this.state.todos}
            addItem={(todo) => this.addListItem(todo)}
            removeItem={(todo) => this.removeListItem(todo)}
            editItem={
              (todo, afterChangeTodo) =>
                this.editListItem(todo, afterChangeTodo)
            } />
          <TodoListBottomContent
            todos={this.state.todos}
            removeItem={(todo) => this.removeListItem(todo)} />
        </div>
        <p className='info'>더블클릭 시 수정 가능!</p>
      </div>
    );
  }
}

export default App;