import {useEffect, useState} from 'react'
import {Button, Input, Todos} from '@apps/ui'
import {TodoApi} from './apis/todo.api'
import styles from './app.module.scss'

import type {Todo} from '@apps/data'

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [selected, setSelected] = useState<Todo>()

  useEffect(() => {
    async function fetchTodos() {
      const response = await TodoApi.getAll()
      setTodos(response as unknown as Todo[])
    }

    fetchTodos()
  }, [])

  async function addTodo(todo: Partial<Todo>) {
    // Need to use validation field here!
    if (!todo.title) {
      return
    }

    const response = await TodoApi.addOne(todo)

    setTodos([...todos, response as unknown as Todo])
    resetState()
  }

  async function updateTodo(todo: Todo) {
    // Need to use validation field here!
    if (!Boolean(todo.title)) {
      return
    }

    const response = (await TodoApi.updateOne(todo)) as unknown as Todo
    const nextTodos = todos.map((t) => {
      if (t._id === response._id) {
        t.title = response.title
        t.done = response.done
      }

      return t
    })

    setTodos(nextTodos)
    resetState()
  }

  async function removeTodo(todo: Todo) {
    await TodoApi.deleteOne(todo)
    setTodos(todos.filter((t) => t._id !== todo._id))
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
