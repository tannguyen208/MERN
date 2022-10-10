import mongoose from 'mongoose'
import {Schema} from './common.schema'

export const $schema = Schema.create({
  done: {
    type: Boolean,
  },
  title: {
    required: true,
    type: String,
  },
})

$schema.pre('save', function (next) {
  const _now = new Date()

  this._updatedAt = _now
  if (this._createdAt === null) {
    this._createdAt = _now
  }
  next()
})

export const $doc = mongoose.model('todos', $schema)
