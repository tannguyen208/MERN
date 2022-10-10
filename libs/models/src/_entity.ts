import {AutoMap} from '@automapper/classes'

export class Entity {
  @AutoMap()
  _id!: string

  _createdAt!: Date

  _createdBy!: string

  _deleted!: boolean

  _updatedAt!: Date

  _updatedBy!: string
}
