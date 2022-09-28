import type {IEntity} from '../_entity'
import {Schema} from '../_schema'

export interface ITodo extends IEntity {
  title: string
  done: boolean
}

export class TodoSchema extends Schema<ITodo> {
  constructor(schema: ITodo) {
    super(schema, '@todo')
  }
}
