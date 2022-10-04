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

  function onUpdateItem() {
    if (!selected) return

    updateTodo({...selected, title: inputText})
  }

  function refresh() {
    fetchTodos()

    // Reset state
    setInputText('')
    setSelected(undefined)
  }

  return (
    <div className={styles['container']}>
      <div style={{width: 320}}>
        <h1>Todos</h1>
        <div style={{display: 'flex'}}>
          <Input value={inputText} size="small" onChange={(event) => setInputText(event.target.value)} />
          {selected && (
            <>
              <div className="fs-spacingDefault" />
              <Button size="small" onClick={onUpdateItem}>
                Update
              </Button>
            </>
          )}
          <div className="fs-spacingDefault" />
          <Button size="small" onClick={() => addTodo({title: inputText})}>
            Add
          </Button>
        </div>
        {selected && (
          <>
            <div className="fs-spacingDefault" />
            <div style={{whiteSpace: 'pre'}}>{JSON.stringify(selected, null, '\t')}</div>
          </>
        )}
        <div className="fs-spacingDefault" />
        <Todos
          todos={todos}
          selected={selected}
          onItem={(todo) => updateTodo({...todo, done: !todo.done})}
          onUpdateItem={(todo) => {
            setInputText(todo.title)
            setSelected(todo)
          }}
          onRemoveItem={removeTodo}
        />
      </div>
    </div>
  )
}

export default App
