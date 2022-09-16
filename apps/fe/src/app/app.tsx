import { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '@apps/data';
import { Todos } from '@apps/ui';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get('/api/todos').then(({ data }) => {
      setTodos(data as Todo[]);
    });
  }, []);

  function addTodo() {
    axios.post('/api/todos').then(({ data }) => {
      setTodos([...todos, data as Todo]);
    });
  }

  function updateTodo(todo: Todo) {
    axios.put(`/api/todos/${todo._id}`).then(({ data }) => {
      setTodos(
        todos.map((t) => {
          if (t._id === data._id) {
            t.title = data.title;
            t.done = data.done;
          }

          return t;
        })
      );
    });
  }

  function removeTodo(todo: Todo) {
    axios.delete(`/api/todos/${todo._id}`).then((message) => {
      setTodos(todos.filter((t) => t._id !== todo._id));
    });
  }

  return (
    <>
      <h1>Todos</h1>
      <Todos todos={todos} onItem={updateTodo} onRemoveItem={removeTodo} />
      <button id={'add-todo'} onClick={addTodo}>
        Add Todo
      </button>
    </>
  );
};

export default App;
