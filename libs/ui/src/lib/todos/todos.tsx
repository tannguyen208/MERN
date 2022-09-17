import { Todo } from '@apps/data';
import { Button } from '@apps/ui';
import classNames from 'classnames';
import styles from './todos.module.scss';

export interface TodosProps {
  todos: Todo[];
  onItem: (item: Todo) => void;
  onRemoveItem: (item: Todo) => void;
}

export function Todos(props: TodosProps) {
  return (
    <>
      {props.todos.map((t) => (
        <div
          key={t._id}
          className={classNames(styles['fs-todo-item'], 'box-shadow')}
        >
          <span
            className={classNames(
              'un-selectable',
              styles['fs-todo-item__title']
            )}
            onClick={() => props.onItem(t)}
          >
            {t.title}
          </span>
          <Button title="X" onClick={() => props.onRemoveItem(t)} />
        </div>
      ))}
    </>
  );
}

export default Todos;
