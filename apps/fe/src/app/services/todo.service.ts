import {Pagination} from '@_/models/_pagination'
import {Todo} from '@_/models/lib/todo'

import TodoApiImpl from '../apis/todo.api'

class TodoService {
  getAll(params: Partial<Pagination<Todo>>) {
    return TodoApiImpl.getAll(params)
  }

  getOne(_id: string) {
    return TodoApiImpl.getOne(_id)
  }

  addOne(todo: Partial<Todo>) {
    return TodoApiImpl.addOne(todo)
  }

  updateOne(todo: Partial<Todo>) {
    return TodoApiImpl.updateOne(todo)
  }

  deleteOne(_id: string) {
    return TodoApiImpl.deleteOne(_id)
  }
}

export default new TodoService()
