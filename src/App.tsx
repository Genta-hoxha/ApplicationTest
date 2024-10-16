import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AboutUs from './components/AboutUs';
import TaskDetails from './components/TaskDetails';
import ContactUs from './components/ContactUs';
import CompletedTasks from './components/CompletedTasks';
import UncompletedTasks from './components/UncompletedTasks';
import { Task } from './tasks';

// Defines the structure of a task object
// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   creationDate: Date;
//   tags: string[];
//   completed: boolean;
//   get uncompleted(): boolean; 
// }

// Main functional component of the application
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {  // Runs once on component mount
    const fetchTasks = async () => { // Fetch async tasks from backend API and updates state
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data.tasks);
    };
    fetchTasks();
  }, []);

  // Adding a new task
  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Deleting a task
  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Toggle completed status of a task
  const toggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      setTasks(prevTasks => prevTasks.map(t => (t.id === id ? updatedTask : t)));
    }
  };
  
  const handleEditTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Searching a task
  const searchTasks = (term: string) => {
    const isCompletedFilter = term.toLowerCase() === 'completed';
    const isUncompletedFilter = term.toLowerCase() === 'uncompleted';
    return tasks.filter(task =>
      task.title.toLowerCase().includes(term.toLowerCase()) ||
      task.description.toLowerCase().includes(term.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())) ||
      (isCompletedFilter && task.completed) ||
      (isUncompletedFilter && !task.completed)
    );
  };

  return (
    <Router>
      <div className="container">
        <h1>My Task Application</h1>
      
        <nav style={{ display: 'flex', justifyContent: 'center', padding: '10px', background: '#C9c9c9' }}>
           <Link to="/" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>Home</Link>
           <Link to="/aboutus" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>About Us</Link>
           <Link to="/contactus" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>Contact Us</Link>
           <Link to="/completedtasks" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>Completed Tasks</Link>
           <Link to="/uncompletedtasks" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>Uncompleted Tasks</Link>
           <input
             style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', background: '#f0f0f0' }}
             className='search'
             type="text"
             placeholder="🔍  Search tasks..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </nav>

        <Routes>
          <Route path="/" element={
                      <>
              <TaskForm 
                onTaskAdded={addTask}
                completedTasksCount={tasks.filter(task => task.completed).length} 
                totalTasksCount={tasks.length} 
              />
              <TaskList 
                tasks={searchTasks(searchTerm)} 
                onDelete={deleteTask} 
                onToggleComplete={toggleComplete} 
                onEdit={handleEditTask} 
              />
            </>
          } />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/completedtasks" element={<CompletedTasks tasks={tasks} />} />
          <Route path="/uncompletedtasks" element={<UncompletedTasks tasks={tasks} />} />
          <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
