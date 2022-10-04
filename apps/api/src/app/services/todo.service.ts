import type {Request, Response, NextFunction} from 'express'
import {ITodo, TodoSchema} from '@apps/data'
import {ResponseUtils} from '@apps/utils'
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  done: {
    type: Boolean,
  },
})

const TodoModel = mongoose.model('todo', schema)

export const middleware = {
  validation: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await TodoSchema.validation().validate({
        title: req.body.title,
        done: req.body.done,
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
