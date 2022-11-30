import React from 'react';
import { TodoListInputHeader } from './TodoListInputHeader'
import { TodoListItem } from './TodoListItem';
import { TodoListBottomContent } from './TodoListBottomContent';
import { Todo, TodoList } from './TodoList';

type Props = {};
type State = {
  todos: Todo[],
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      todos: [],
    }
  }

  addTodoListItem(todo: Todo): void {
    this.setState({
      todos: this.state.todos.concat(todo)
    });
  }

  deleteTodoListItem(todosToDelete: Todo[]): void {
    this.setState({
      todos: this.state.todos.filter(todo => todosToDelete.indexOf(todo) < 0)
    });
  }

  updateTodoListItem(todo: Todo, afterChangeTodo: Todo): void {
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
    const todoListProps = {
      todos: this.state.todos,
      addItem: (todo: Todo) => this.addTodoListItem(todo),
      deleteItem: (todoToDelete: Todo[]) =>
        this.deleteTodoListItem(todoToDelete),
      updateItem: (todo: Todo, afterChangeTodo: Todo) =>
        this.updateTodoListItem(todo, afterChangeTodo)
    };

    const todoListItemRender = this.state.todos.map((todo) => {
      return (<TodoListItem todo={todo} />)
    });

    return (
      <div className="app" >
        <div className="title">Todo List</div>
        <div className="contentWrapper">
          <TodoList.Provider value={todoListProps}>
            <TodoListInputHeader />
            <ul className="todoList">{todoListItemRender}</ul>
            <TodoListBottomContent />
          </TodoList.Provider>
        </div>
        <p className='info'>더블클릭 시 수정 가능!</p>
      </div >
    );
  }
}

export { App };