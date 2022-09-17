import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { addTodoRoutes } from './app/todos';
import { environment } from './environments/environment';

mongoose.connect(environment.DB_CONNECTION);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});
addTodoRoutes(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
