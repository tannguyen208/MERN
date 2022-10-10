import type {Express} from 'express'

import userApis from './apis/users'
import todoApis from './apis/todos'

export default function (app: Express) {
  userApis(app)
  todoApis(app)
}
