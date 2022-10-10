import {AutoMap} from '@automapper/classes'
import {Entity} from '../_entity'
import {Schema} from '../_schema'
import * as Yup from 'yup'

export class Todo extends Entity {
  @AutoMap()
  done!: boolean

  @AutoMap()
  title!: string
}

export class TodoDto extends Todo {}

export class TodoSchema extends Schema<Todo> {
  static validation() {
    return Yup.object({
      done: Yup.boolean(),
      title: Yup.string().required(),
    })
  }

  constructor(schema: Todo) {
    super(schema, '@todo')
  }
}
