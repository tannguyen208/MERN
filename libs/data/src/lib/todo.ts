import * as Yup from 'yup'
import type {IEntity} from '../_entity'
import {Schema} from '../_schema'

export interface ITodo extends IEntity {
  title: string
  done: boolean
}

export class TodoSchema extends Schema<ITodo> {
  static validation() {
    return Yup.object({
      title: Yup.string().required(),
      done: Yup.boolean(),
    })
  }

  constructor(schema: ITodo) {
    super(schema, '@todo')
  }
}
