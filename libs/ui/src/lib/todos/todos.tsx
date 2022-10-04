import {ITodo} from '@apps/data'
import {Button, MinusCircleOutlined, CheckCircleTwoTone} from '@apps/ui'
import cn from 'classnames'
import {} from '../icons/icons'
import './todos.scss'

export interface TodosProps {
  todos: ITodo[]
  selected?: ITodo
  onItem?: (item: ITodo) => void
  onUpdateItem?: (item: ITodo) => void
  onRemoveItem?: (item: ITodo) => void
}

export function Todos(props: TodosProps) {
  const {
    selected = undefined,
    onItem = () => {}, //
    onUpdateItem = () => {}, //
    onRemoveItem = () => {},
  } = props

  return (
    <>
      {props.todos.map((t) => (
        <div
          key={t._id}
          className={cn('fs-todo-item', 'box-shadow', {'fs-todo-item:selected': selected && selected._id === t._id})}
        >
          <span className="fs-todo-item__act" onClick={() => onItem(t)}>
            {t.done ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <MinusCircleOutlined />}
            <i className={cn('un-selectable', 'fs-todo-item__title', {'fs-todo-item__title:done': t.done})}>
              {t.title}
            </i>
          </span>
          <div className={cn('fs-todo-item__actions')}>
            <Button size="small" onClick={() => onUpdateItem(t)}>
              ❏
            </Button>
            <Button size="small" danger onClick={() => onRemoveItem(t)}>
              ✗
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}

export default Todos
