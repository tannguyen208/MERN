import {Todo} from '@apps/data'
import {Button} from '@apps/ui'
import classNames from 'classnames'
import styles from './todos.module.scss'

export interface TodosProps {
  todos: Todo[]
  onItem?: (item: Todo) => void
  onUpdateItem?: (item: Todo) => void
  onRemoveItem?: (item: Todo) => void
}

export function Todos(props: TodosProps) {
  const {
    onItem = () => {}, //
    onUpdateItem = () => {}, //
    onRemoveItem = () => {},
  } = props

  return (
    <>
      {props.todos.map((t) => (
        <div
          key={t._id}
          className={classNames(styles['fs-todo-item'], 'box-shadow')}
        >
          <span
            onClick={() => onItem(t)}
            className={classNames(
              'un-selectable',
              styles['fs-todo-item__title'],
              t.done ? styles['fs-todo-item__title:done'] : ''
            )}
          >
            {t.title}
          </span>
          <div className={classNames(styles['fs-todo-item__actions'])}>
            <Button title="❏" onClick={() => onUpdateItem(t)} />
            <Button title="✗" onClick={() => onRemoveItem(t)} />
          </div>
        </div>
      ))}
    </>
  )
}

export default Todos
