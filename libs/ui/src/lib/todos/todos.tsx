import { Todo } from '@apps/data';
import './todos.module.scss';

export interface TodosProps {
  todos: Todo[];
  onItem: (item: Todo) => void;
  onRemoveItem: (item: Todo) => void;
}

export function Todos(props: TodosProps) {
  console.log("🚀 ~ Todos ~ props", props)
  return (
    <ul>
      {props.todos.map((t) => (
        <li key={t._id} className={'todo'}>
          <span onClick={() => props.onItem(t)}>{t.title}</span>
          <button onClick={() => props.onRemoveItem(t)}>X</button>
        </li>
      ))}
    </ul>
  );
}

export default Todos;
