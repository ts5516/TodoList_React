import React from 'react';
import { TodoListInputHeader } from './TodoListInputHeader'
import { TodoListItem } from './TodoListItem';
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
    const renderTodoList = this.state.todos.map((todo) => {
      return (
        <TodoListItem
          todo={todo}
          addItem={(todo) => this.addTodoListItem(todo)}
          deleteItem={(todoToDelete) => this.deleteTodoListItem(todoToDelete)}
          updateItem={(todo, afterChangeTodo) => this.updateTodoListItem(todo, afterChangeTodo)}
        />
      );
    });

    return (
      <div className="app" >
        <div className="title">Todo List</div>
        <div className="contentWrapper">
          <TodoListInputHeader
            addItem={(todo) => this.addTodoListItem(todo)} />
          <ul className="list">
            {renderTodoList}
          </ul>
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