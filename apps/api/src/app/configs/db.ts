import mongoose from 'mongoose'
import {environment} from '../../environments/environment'

export default function () {
  mongoose.connect(environment.DB_CONNECTION)
  const database = mongoose.connection
  database.on('error', (error) => {
    console.log(error)
  })

  database.once('connected', () => {
    console.log('Database Connected')
  })
}
