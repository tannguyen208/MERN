import {useEffect, useState} from 'react'
import {Button, Input, Todos} from '@apps/ui'
import TodoService from './services/todo.service'
import styles from './app.module.scss'

import type {ITodo} from '@apps/data'

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [inputText, setInputText] = useState('')
  const [selected, setSelected] = useState<ITodo>()

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const response = await TodoService.getAll({
      page: 1,
      limit: 10,
    })

    setTodos((response?.payload?.data as unknown as ITodo[]) || [])
  }

  async function addTodo(todo: Partial<ITodo>) {
    await TodoService.addOne(todo)
    refresh()
  }

  async function updateTodo(todo: ITodo) {
    await TodoService.updateOne(todo)
    refresh()
  }

  async function removeTodo(todo: ITodo) {
    await TodoService.deleteOne(todo._id)
    refresh()
  }

  function refresh() {
    fetchTodos()

    // Reset state
    setInputText('')
    setSelected(undefined)
  }

  return (
    <div className={styles['container']}>
      <h1>Todos</h1>
      <div style={{display: 'flex'}}>
        <Input value={inputText} onChange={(event) => setInputText(event.target.value)} />
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
