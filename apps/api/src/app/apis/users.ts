import type {Express} from 'express'
import {ResponseUtils} from '@_/utils/lib/api.util'
import * as UserService from '../services/user.service'

export default function (app: Express) {
  // Get all
  app.get('/api/users', async (req, res) => {
    try {
      const username = (req.params as any).username as string
      const payload = UserService.act.getUserByUsername(username)

      res
        .status(ResponseUtils.StatusCodes.OK) //
        .json(ResponseUtils.success({payload}))
    } catch (error) {
      res
        .status(ResponseUtils.StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseUtils.failure({error, message: error.message}))
    }
  })
}
