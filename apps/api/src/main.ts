import * as express from 'express'
import bodyParsers from './app/configs/bodyParser'
import cors from './app/configs/cors'
import db from './app/configs/db'
import routes from './app/routes'

// connect to the database
db()

// running application
const app = express()
app.use(cors())
bodyParsers().forEach((body) => {
  app.use(body)
})

// add routes apis
routes(app)

const main = (port: number) => {
  try {
    app.listen(port, () => {
      console.log(`Api running at: http://localhost:${port}`)
    })
  } catch (err) {
    console.error(err)
    process.exit()
  }
}
main((process.env.port as unknown as number) || 3333)
