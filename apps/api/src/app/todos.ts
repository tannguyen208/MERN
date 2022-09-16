import { Express } from 'express';
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  done: {
    type: Boolean,
  },
});

const TodoModel = mongoose.model('todo', todoSchema);

export function addTodoRoutes(app: Express) {
  // Get all
  app.get('/api/todos', async (req, res) => {
    try {
      const data = await TodoModel.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get one
  app.get('/api/todos/:id', async (req, res) => {
    try {
      const data = await TodoModel.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Add
  app.post('/api/todos', async (req, res) => {
    const todo = new TodoModel({
      title: 'Added:: ' + new Date().toLocaleString(),
      done: false,
    });

    try {
      const todoToSave = await todo.save();
      res.status(200).json(todoToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update
  app.put('/api/todos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const options = { new: true };

      const result = await TodoModel.findByIdAndUpdate(
        id,
        { title: 'Update:: ' + new Date().toLocaleString() },
        options
      );

      res.send(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete
  app.delete('/api/todos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = await TodoModel.findByIdAndDelete(id);
      res.send(`Document with ${data.id} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
}
