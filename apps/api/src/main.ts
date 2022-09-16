import * as express from 'express';
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

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});
addTodoRoutes(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
