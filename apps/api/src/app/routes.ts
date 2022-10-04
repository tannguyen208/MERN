import type {Express} from 'express'

import todoApis from './apis/todos'

export default function (app: Express) {
  todoApis(app)
}
