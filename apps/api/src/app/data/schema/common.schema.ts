import mongoose from 'mongoose'
import type {SchemaDefinition} from 'mongoose'

export const ObjectId = mongoose.Schema.Types.ObjectId

export class Schema extends mongoose.Schema {
  static create(
    schema?: SchemaDefinition,
    options?: mongoose.SchemaOptions<
      'type',
      mongoose.FlatRecord<{
        _createdAt: Date
        _createdBy: mongoose.Types.ObjectId
        _deleted: boolean
        _updatedAt: Date
        _updatedBy: mongoose.Types.ObjectId
      }>
    >
  ) {
    const _now = new Date()
    const _schema = new mongoose.Schema(
      {
        ...schema,
        _createdAt: {
          default: _now,
          type: Date,
        },
        _createdBy: {
          default: null,
          type: ObjectId,
        },
        _deleted: {
          default: false,
          type: Boolean,
        },
        _updatedAt: {
          default: _now,
          type: Date,
        },
        _updatedBy: {
          default: null,
          type: ObjectId,
        },
      },
      options
    )

    return _schema
  }
}
