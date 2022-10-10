import {Todo} from '@_/models/lib/todo'
import {$doc} from '../schema/todo.schema'

export default class TodoRepository {
  static instance: TodoRepository = new TodoRepository()

  deleteOne(_id: string) {
    return $doc.findByIdAndUpdate(_id, {_deleted: true})
  }

  getAll() {
    return $doc.find({_deleted: false}).lean().exec()
  }

  getOne(_id: string) {
    return $doc.find({_deleted: false, _id})
  }

  insertOne(todo: Omit<Todo, '_id'>) {
    return new $doc(todo).save()
  }

  updateOne(_id: string, todo: Partial<Todo>) {
    return $doc.findByIdAndUpdate(_id, todo)
  }
}
