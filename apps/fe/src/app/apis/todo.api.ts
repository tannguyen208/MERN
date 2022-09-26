import http from './http'
import type {Todo} from '@apps/data'

const namespace = '/todos'

export const TodoApi = {
  getAll() {
    return http.get(namespace)
  },
  getOne(todoId: string) {
    return http.get(namespace + '/' + todoId)
  },
  addOne(todo: Partial<Todo>) {
    return http.post(namespace, todo)
  },
  updateOne(todo: Partial<Todo>) {
    return http.put(namespace + '/' + todo._id, todo)
  },
  deleteOne(todo: Partial<Todo>) {
    return http.delete(namespace + '/' + todo._id)
  },
}
