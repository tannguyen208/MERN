import type {Express} from 'express'
import * as CommonMiddleware from './middleware'
import * as TodoServices from './services/todo.service'
import {PaginationSchema} from '@apps/data'

export function addTodoRoutes(app: Express) {
  // Get all
  app.get('/api/todos', CommonMiddleware.id, async (req, res) => {
    try {
      const {_id, limit, page} = req.query as Record<string, undefined>
      if (_id) {
        const todo = await TodoServices.act.getOne(_id as string)
        res.status(200).json(todo)
      }

      const todos = await TodoServices.act.getAll()
      const pagination = new PaginationSchema({
        limit,
        page,
      }).build(todos)

      res.status(200).json(pagination)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

  // Add
  app.post(
    '/api/todos',
    TodoServices.middleware.title,
    TodoServices.middleware.validation,
    async (req, res) => {
      try {
        const doc = await TodoServices.act.insertOne({
          title: req.body.title,
        })

        res.status(200).json(doc)
      } catch (error) {
        res.status(400).json({message: error.message})
      }
    }
  )

  // Update
  app.put(
    '/api/todos/',
    CommonMiddleware.id,
    TodoServices.middleware.id,
    TodoServices.middleware.title,
    TodoServices.middleware.done,
    TodoServices.middleware.validation,
    async (req, res): Promise<void> => {
      try {
        const _id = req.query._id as string
        const result = await TodoServices.act.updateOne({...req.body, _id})

        res.status(200).json(result)
      } catch (error) {
        res.status(400).json({message: error.message})
      }
    }
  )

  // Delete
  app.delete('/api/todos', CommonMiddleware.id, async (req, res) => {
    try {
      const _id = req.query._id as string
      const data = await TodoServices.act.deleteOne(_id)
      res.send(`Document with ${data._id} has been deleted..`)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  })
}
