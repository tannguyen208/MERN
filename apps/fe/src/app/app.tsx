import {useRef, useEffect, useState} from 'react'
import {Button, Input, Todos} from '@_/ui'
import TodoService from './services/todo.service'
import UserService from './services/user.service'
import styles from './app.module.scss'

import {Todo} from '@_/models/lib/todo'
import {UserDto} from '@_/models/lib/user'

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [user, setUser] = useState<UserDto>()
  const [selected, setSelected] = useState<Todo>()

  useEffect(() => {
    fetchUser()
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await TodoService.getAll({
      limit: 10,
      page: 1,
    })

    setTodos((response?.payload?.data as unknown as Todo[]) || [])
  }

  const fetchUser = async () => {
    const response = await UserService.getUserByUsername('tanna@gmail.com')
    setUser(response.payload)
  }

  const addTodo = async (todo: Partial<Todo>) => {
    await TodoService.addOne(todo)
    refresh()
  }

  const updateTodo = async (todo: Todo) => {
    await TodoService.updateOne(todo)
    refresh()
  }

  const removeTodo = async (todo: Todo) => {
    await TodoService.deleteOne(todo._id)
    refresh()
  }

  const onAdd = () => {
    addTodo({title: inputText})
  }

  const onUpdateItem = () => {
    if (!selected) return

    updateTodo({...selected, title: inputText})
  }

  const refresh = () => {
    fetchTodos()

    // Reset state
    setInputText('')
    setSelected(undefined)
  }

  return (
    <div className={styles['container']}>
      <div style={{width: 320}}>
        <h1>Todos</h1>
        <div style={{whiteSpace: 'pre'}}>{JSON.stringify(user, null, '\t')}</div>
        <div style={{display: 'flex'}}>
          <Input
            ref={inputRef}
            value={inputText}
            size="small"
            onChange={(event: React.FormEvent<HTMLInputElement>) => setInputText(event.currentTarget.value)}
            onPressEnter={onAdd}
          />
          {selected && (
            <>
              <div className="fs-spacingDefault" />
              <Button size="small" onClick={onUpdateItem}>
                Update
              </Button>
            </>
          )}
          <div className="fs-spacingDefault" />
          <Button size="small" onClick={onAdd}>
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

            // focus the input field
            inputRef.current?.focus()
          }}
          onRemoveItem={removeTodo}
        />
      </div>
    </div>
  )
}

export default App
