import {useEffect, useState, useCallback} from 'react'
import {Button, Input, Todos} from '@apps/ui'
import {TodoApi} from './apis/todo.api'
import styles from './app.module.scss'

import type {ITodo} from '@apps/data'

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [inputText, setInputText] = useState('')
  const [selected, setSelected] = useState<ITodo>()

  const fetchTodos = async () => {
    const response = await TodoApi.getAll({
      page: 1,
      limit: 10,
    })
    setTodos(response.data as unknown as ITodo[])
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  async function addTodo(todo: Partial<ITodo>): Promise<void> {
    await TodoApi.addOne(todo)
    fetchTodos()
    resetState()
  }

  async function updateTodo(todo: ITodo) {
    await TodoApi.updateOne(todo)
    fetchTodos()
    resetState()
  }

  async function removeTodo(todo: ITodo) {
    await TodoApi.deleteOne(todo)
    fetchTodos()
  }

  function resetState() {
    setInputText('')
    setSelected(undefined)
  }

  return (
    <div className={styles['container']}>
      <h1>Todos</h1>
      <div style={{display: 'flex'}}>
        <Input
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        {selected && (
          <>
            <div className="fs-spacingDefault" />
            <Button
              title="Update"
              onClick={() => {
                updateTodo({...selected, title: inputText})
              }}
            />
          </>
        )}
        <div className="fs-spacingDefault" />
        <Button title="Add" onClick={() => addTodo({title: inputText})} />
      </div>
      <div className="fs-spacingDefault" />
      <Todos
        todos={todos}
        onItem={(todo) => updateTodo({...todo, done: !todo.done})}
        onUpdateItem={(todo) => {
          setInputText(todo.title)
          setSelected(todo)
        }}
        onRemoveItem={removeTodo}
      />
    </div>
  )
}

export default App
