import {Pagination} from '@_/models/_pagination'
import {Response} from '@_/models/lib/api'
import {Todo} from '@_/models/lib/todo'
import http from './http'
import {requestParams} from '@_/models/_requestParams'

interface TodoApi {
  getAll(params: Partial<Pagination<Todo>>): Promise<Response<Pagination<Todo>>>
  getOne(_id: string): Promise<Response<Todo>>
  addOne(todo: Partial<Todo>): Promise<Response<Todo>>
  updateOne(todo: Partial<Todo>): Promise<Response<Todo>>
  deleteOne(_id: string): Promise<Response<Todo>>
}

class TodoApiImpl implements TodoApi {
  _namespace = '/todos'

  getAll(params: Partial<Pagination<Todo>>): Promise<Response<Pagination<Todo>>> {
    const url = requestParams(this._namespace, params)
    return http.get(url)
  }

  getOne(_id: string): Promise<Response<Todo>> {
    const url = requestParams(this._namespace, {_id})
    return http.get(url)
  }

  addOne(todo: Partial<Todo>): Promise<Response<Todo>> {
    const url = requestParams(this._namespace)
    return http.post(url, todo)
  }

  updateOne(todo: Partial<Todo>): Promise<Response<Todo>> {
    const url = requestParams(this._namespace, {_id: todo._id})
    return http.put(url, todo)
  }

  deleteOne(_id: string): Promise<Response<Todo>> {
    const url = requestParams(this._namespace, {_id})
    return http.delete(url)
  }
}

export default new TodoApiImpl()
