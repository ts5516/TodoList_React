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

  addTodoListItem(todo: Todo) {
    this.setState({
      todos: this.state.todos.concat(todo)
    });
  }

  deleteTodoListItem(todosToDelete: Todo[]) {
    this.setState({
      todos: this.state.todos.filter(todo => todosToDelete.indexOf(todo) < 0)
    });
  }

  updateTodoListItem(todo: Todo, afterChangeTodo: Todo) {
    this.setState({
      todos: this.state.todos.map((_todo) => {
        if (_todo === todo) {
          return afterChangeTodo;
        } else {
          return _todo;
        }
      })
    });
  }

  render(): React.ReactNode {
    return (
      <div className="app" >
        <div className="title">Todo List</div>
        <div className="contentWrapper">
          <TodoListInputHeader
            addItem={(todo) => this.addTodoListItem(todo)} />
          <TodoListBody
            todos={this.state.todos}
            addItem={(todo) => this.addTodoListItem(todo)}
            deleteItem={(todoToDelete) => this.deleteTodoListItem(todoToDelete)}
            updateItem={
              (todo, afterChangeTodo) =>
                this.updateTodoListItem(todo, afterChangeTodo)
            } />
          <TodoListBottomContent
            todos={this.state.todos}
            deleteItem={
              (todoToDelete) => this.deleteTodoListItem(todoToDelete)
            } />
        </div>
        <p className='info'>더블클릭 시 수정 가능!</p>
      </div>
    );
  }
}

export default App;