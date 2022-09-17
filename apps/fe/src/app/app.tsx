import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Todos } from '@apps/ui';
import styles from './app.module.scss';
import type { Todo } from '@apps/data';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    axios.get('/api/todos').then(({ data }) => {
      setTodos(data as Todo[]);
    });
  }, []);

  function addTodo() {
    axios.post('/api/todos', { title: inputText }).then(({ data }) => {
      setTodos([...todos, data as Todo]);
      setInputText('');
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
    <div className={styles['container']}>
      <h1>Todos</h1>
      <div style={{ display: 'flex' }}>
        <Input
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <div className="fs-spacingDefault" />
        <Button title="Add Todo" onClick={addTodo} />
      </div>
      <div className="fs-spacingDefault" />
      <Todos todos={todos} onItem={updateTodo} onRemoveItem={removeTodo} />
    </div>
  );
};

export default App;
