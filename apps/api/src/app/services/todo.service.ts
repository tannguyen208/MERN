import {mapper} from '@_/models/_mapper'
import type {NextFunction, Request, Response} from 'express'
import {ResponseUtils} from '@_/utils/lib/api.util'
import {Todo, TodoDto, TodoSchema} from '@_/models/lib/todo'
import TodoRepository from '../data/repositories/todo.repository'

export const middleware = {
  validation: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await TodoSchema.validation().validate({
        done: req.body.done,
        title: req.body.title,
      })

      next()
    } catch (error) {
      res
        .status(ResponseUtils.StatusCodes.BAD_REQUEST) //
        .json(
          ResponseUtils.failure({
            error,
            message: error.message || ResponseUtils.ReasonPhrases.BAD_REQUEST,
          })
        )
    }
  },
}

export const act = {
  deleteOne(_id: string) {
    return TodoRepository.instance.deleteOne(_id)
  },

  async getAll() {
    const todos = (await TodoRepository.instance.getAll()) as unknown as Todo[]
    return mapper.mapArray(todos, Todo, TodoDto)
  },

  getOne(_id: string) {
    return TodoRepository.instance.getOne(_id)
  },

  insertOne(todo: Partial<Todo>) {
    return TodoRepository.instance.insertOne({
      done: false,
      ...todo,
    } as Todo)
  },

  updateOne(todo: Partial<Todo>) {
    return TodoRepository.instance.updateOne(todo._id, todo)
  },
}
