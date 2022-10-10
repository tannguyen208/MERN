import type {Express} from 'express'
import {ResponseUtils} from '@_/utils/lib/api.util'
import {PaginationSchema} from '@_/models/_pagination'
import * as CommonMiddleware from '../middleware'
import * as TodoService from '../services/todo.service'

export default function (app: Express) {
  // Get all
  app.get('/api/todos', CommonMiddleware.id, async (req, res) => {
    try {
      const {_id, limit, page} = req.query as Record<string, undefined>
      if (_id) {
        const payload = await TodoService.act.getOne(_id as string)
        res
          .status(ResponseUtils.StatusCodes.OK) //
          .json(ResponseUtils.success({payload}))
      }

      const todos = await TodoService.act.getAll()
      const pagination = new PaginationSchema({limit, page})
      const payload = pagination.build(todos).toJson()

      res
        .status(ResponseUtils.StatusCodes.OK) //
        .json(ResponseUtils.success({payload}))
    } catch (error) {
      res
        .status(ResponseUtils.StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseUtils.failure({error, message: error.message}))
    }
  })

  // Add
  app.post('/api/todos', TodoService.middleware.validation, async (req, res) => {
    try {
      const payload = await TodoService.act.insertOne({
        title: req.body.title,
      })

      res
        .status(ResponseUtils.StatusCodes.CREATED) //
        .json(ResponseUtils.success({_id: payload._id.toString(), payload}))
    } catch (error) {
      res
        .status(ResponseUtils.StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseUtils.failure({error, message: error.message}))
    }
  })

  // Update
  app.put('/api/todos/', CommonMiddleware.id, TodoService.middleware.validation, async (req, res): Promise<void> => {
    try {
      const _id = req.query._id as string
      await TodoService.act.updateOne({...req.body, _id})

      res
        .status(ResponseUtils.StatusCodes.OK) //
        .json(ResponseUtils.success({payload: {_id}}))
    } catch (error) {
      res
        .status(ResponseUtils.StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseUtils.failure({error, message: error.message}))
    }
  })

  // Delete
  app.delete('/api/todos', CommonMiddleware.id, async (req, res) => {
    try {
      const _id = req.query._id as string
      await TodoService.act.deleteOne(_id)

      res
        .status(ResponseUtils.StatusCodes.OK) //
        .json(ResponseUtils.success({payload: {_id}}))
    } catch (error) {
      res
        .status(ResponseUtils.StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseUtils.failure({error, message: error.message}))
    }
  })
}
