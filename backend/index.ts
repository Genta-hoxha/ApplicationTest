import express, { Request, Response } from 'express'; //a web app framework for node, use to build APIs ; request and response are used for handling HTTP request and response
import bodyParser from 'body-parser'; //analysing json data
import cors from 'cors';  //used for API to be accessed  from different domains
import fs from 'fs';  //used for reading and writing files

const app = express();  //instance of Express app
const PORT = process.env.PORT || 5000;

app.use(cors());  //enables CORS
app.use(bodyParser.json()); //configure the app to parse JSON request

// Define the Task interface
interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  tags: string[];
  completed: boolean;
}

// In memory storage for tasks as an array
let tasks: Task[] = [];


const loadTasks = () => {   //check if a file named tasks.json exist and if yes , it reads the fileparses json content and populates the task array with existing tasks
  if (fs.existsSync('tasks.json')) {
    tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
  }
};


const saveTasks = () => { // save current task to tasks.json
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};

// calls the loadTasks function when the server starts to load
loadTasks();

// Get all tasks
app.get('/api/tasks', (req: Request, res: Response) => {
  res.json({ tasks });
});

// Create a new task
app.post('/api/tasks', (req: Request, res: Response) => {
  const newTask: Task = {
    id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description,
    creationDate: new Date(),
    tags: req.body.tags,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    saveTasks();
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
