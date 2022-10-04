import type {Express} from 'express'
import {ResponseUtils} from '@apps/utils'
import {PaginationSchema} from '@apps/data'
import * as CommonMiddleware from '../middleware'
import * as TodoServices from '../services/todo.service'

export default function (app: Express) {
  // Get all
  app.get('/api/todos', CommonMiddleware.id, async (req, res) => {
    try {
      const {_id, limit, page} = req.query as Record<string, undefined>
      if (_id) {
        const payload = await TodoServices.act.getOne(_id as string)
        res
          .status(ResponseUtils.StatusCodes.OK) //
          .json(ResponseUtils.success({payload}))
      }

      const todos = await TodoServices.act.getAll()
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
  app.post('/api/todos', TodoServices.middleware.validation, async (req, res) => {
    try {
      const payload = await TodoServices.act.insertOne({
        title: req.body.title,
      })

      res
        .status(ResponseUtils.StatusCodes.CREATED) //
        .json(ResponseUtils.success({payload, _id: payload._id.toString()}))
    } catch (error) {
      res
        .status(ResponseUtils.StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseUtils.failure({error, message: error.message}))
    }
  })

  // Update
  app.put('/api/todos/', CommonMiddleware.id, TodoServices.middleware.validation, async (req, res): Promise<void> => {
    try {
      const _id = req.query._id as string
      const payload = await TodoServices.act.updateOne({...req.body, _id})

      res
        .status(ResponseUtils.StatusCodes.OK) //
        .json(ResponseUtils.success({payload}))
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
      await TodoServices.act.deleteOne(_id)

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
