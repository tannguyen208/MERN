import type {IPagination, ITodo} from '@apps/data'
import TodoApiImpl from '../apis/todo.api'

class TodoService {
  getAll(params: Partial<IPagination<ITodo>>) {
    return TodoApiImpl.getAll(params)
  }

  getOne(_id: string) {
    return TodoApiImpl.getOne(_id)
  }

  addOne(todo: Partial<ITodo>) {
    return TodoApiImpl.addOne(todo)
  }

  updateOne(todo: Partial<ITodo>) {
    return TodoApiImpl.updateOne(todo)
  }

  deleteOne(_id: string) {
    return TodoApiImpl.deleteOne(_id)
  }
}

export default new TodoService()
