import http from './http'
import type {IPagination, ITodo} from '@apps/data'
import {requestParams} from '@apps/data'

const namespace = '/todos'

export const TodoApi = {
  getAll(params: Partial<IPagination<ITodo>>): Promise<IPagination<ITodo>> {
    const url = requestParams(namespace, params)
    return http.get(url)
  },
  getOne(_id: string) {
    const url = requestParams(namespace, {_id})
    return http.get(url)
  },
  addOne(todo: Partial<ITodo>) {
    const url = requestParams(namespace)
    return http.post(url, todo)
  },
  updateOne(todo: Partial<ITodo>) {
    const url = requestParams(namespace, {_id: todo._id})
    return http.put(url, todo)
  },
  deleteOne({_id}: Partial<ITodo>) {
    const url = requestParams(namespace, {_id})
    return http.delete(url)
  },
}
