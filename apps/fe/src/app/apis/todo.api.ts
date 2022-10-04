import http from './http'
import {requestParams, IPagination, ITodo, IResponse} from '@apps/data'

interface TodoApi {
  getAll(params: Partial<IPagination<ITodo>>): Promise<IResponse<IPagination<ITodo>>>
  getOne(_id: string): Promise<IResponse<ITodo>>
  addOne(todo: Partial<ITodo>): Promise<IResponse<ITodo>>
  updateOne(todo: Partial<ITodo>): Promise<IResponse<ITodo>>
  deleteOne(_id: string): Promise<IResponse<ITodo>>
}

class TodoApiImpl implements TodoApi {
  _namespace = '/todos'

  getAll(params: Partial<IPagination<ITodo>>): Promise<IResponse<IPagination<ITodo>>> {
    const url = requestParams(this._namespace, params)
    return http.get(url)
  }

  getOne(_id: string): Promise<IResponse<ITodo>> {
    const url = requestParams(this._namespace, {_id})
    return http.get(url)
  }

  addOne(todo: Partial<ITodo>): Promise<IResponse<ITodo>> {
    const url = requestParams(this._namespace)
    return http.post(url, todo)
  }

  updateOne(todo: Partial<ITodo>): Promise<IResponse<ITodo>> {
    const url = requestParams(this._namespace, {_id: todo._id})
    return http.put(url, todo)
  }

  deleteOne(_id: string): Promise<IResponse<ITodo>> {
    const url = requestParams(this._namespace, {_id})
    return http.delete(url)
  }
}

export default new TodoApiImpl()
