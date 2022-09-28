import type {ITodo} from '@apps/data'
import type {Request, Response, NextFunction} from 'express'
import {checkSchema, validationResult, body} from 'express-validator'
import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  done: {
    type: Boolean,
  },
})

const TodoModel = mongoose.model('todo', todoSchema)

export const middleware = {
  id: checkSchema({
    _id: {
      in: ['params', 'query'],
      errorMessage: '_id is required!',
      isString: true,
    },
  }),
  title: body('title').isString().notEmpty(),
  done: body('done').isBoolean(),
  validation: (req: Request, res: Response, next: NextFunction): void => {
    try {
      validationResult(req).throw()
      next()
    } catch (errors) {
      res.status(400).json(errors)
    }
  },
}

export const act = {
  getOne: (_id: string) => {
    return TodoModel.findById(_id)
  },

  getAll: () => {
    return TodoModel.find()
  },

  insertOne: (todo: Pick<ITodo, 'title'>) => {
    const doc = new TodoModel({
      title: todo.title,
      done: false,
    })

    return doc.save()
  },

  updateOne: (todo: Partial<ITodo>) => {
    return TodoModel.findByIdAndUpdate(todo._id, todo)
  },

  deleteOne: (_id: string) => {
    return TodoModel.findByIdAndDelete(_id)
  },
}
