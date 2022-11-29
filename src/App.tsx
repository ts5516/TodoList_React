import React from 'react';
import { TodoListInputHeader } from './TodoListInputHeader'
import { TodoListItem } from './TodoListItem';
import { TodoListBottomContent } from './TodoListBottomContent';
import { Todo } from './dataStructure';

type Props = {};
type State = {
  todos: Todo[],
};

const TodoListFunction = React.createContext({
  addItem: (todo: Todo) => { },
  deleteItem: (todoToDelete: Todo[]) => { },
  updateItem: (todo: Todo, afterChangeTodo: Todo) => { }
});

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      todos: [],
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
    const todoListFunc = {
      addItem: this.addTodoListItem,
      deleteItem: this.deleteTodoListItem,
      updateItem: this.updateTodoListItem
    };

    return (
      <div className="app" >
        <div className="title">Todo List</div>
        <div className="contentWrapper">
          <TodoListFunction.Provider value={todoListFunc}>
            <TodoListInputHeader />
            <ul className="todoList">
              {
                this.state.todos.map((todo) => {
                  return (<TodoListItem todo={todo} />)
                })
              }
            </ul>
            <TodoListBottomContent todos={this.state.todos} />
          </TodoListFunction.Provider>
        </div>
        <p className='info'>더블클릭 시 수정 가능!</p>
      </div >
    );
  }
}

export { App, TodoListFunction };