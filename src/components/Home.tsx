// import React, { useState, useRef, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

// interface Todo {
//   // id:string;
//   title: string;
//   description: string;
// // complated?: boolean;
// }

// const Home: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [inputValueTitle, setInputValueTitle] = useState<string>('');
//   const [inputValueDescription, setInputValueDescription] = useState<string>('');
//   const [clickedTodo, setClickedTodo] = useState<Todo | null>(null);
//   const [editInputTitle, setEditInputTitle] = useState<string>('');
//   const [editInputDescription, setEditInputDescription] = useState<string>('');
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   // Add task
//   const handleAddTodo = (): void => {
//     if (inputValueTitle.trim() === '') return;

//     const capitalizedTitle = inputValueTitle.charAt(0).toUpperCase() + inputValueTitle.slice(1);
//     const capitalizedDescription = inputValueDescription.charAt(0).toUpperCase() + inputValueDescription.slice(1);

//     const newTodo: Todo = {
//       title: capitalizedTitle, description: capitalizedDescription
    
//     };
//     setTodos([...todos, newTodo]);
//     setInputValueTitle('');
//     setInputValueDescription('');
//   };

//   const clickItem = (todo: Todo): void => {
//     if (clickedTodo === todo) {
//       setClickedTodo(null);
//       setEditInputTitle('');
//       setEditInputDescription('');
//     } else {
//       setClickedTodo(todo);
//       setEditInputTitle(todo.title);
//       setEditInputDescription(todo.description);
//     }
//   };

//   const handleEdit = (todo: Todo) => {
//     const updatedTodos = todos.map(t => 
//       t === todo ? { title: editInputTitle, description: editInputDescription } : t
//     );
//     setTodos(updatedTodos);
//     setClickedTodo(null);
//     setEditInputTitle('');
//     setEditInputDescription('');
//   };

//   const handleDelete = (todo: Todo) => {
//     const updatedTodos = todos.filter(t => t !== todo);
//     setTodos(updatedTodos);
//     setClickedTodo(null);
//     setEditInputTitle('');
//     setEditInputDescription('');
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
//     if (e.key === 'Enter') {
//       handleEdit(todo);
//     }
//   };

//   useEffect(() => {
//     if (inputRef.current && clickedTodo !== null) {
//       inputRef.current.focus();
//     }
//   }, [clickedTodo]);

//   function enter(event: React.KeyboardEvent<HTMLInputElement>): void {
//     if (event.key === 'Enter') {
//       handleAddTodo();
//     }
//   }

//   return (
//     <div className='container'>
//       <h1>My Task Application</h1>
     
//       <input 
//         type="text" 
//         value={inputValueTitle} 
//         onChange={e => setInputValueTitle(e.target.value)} 
//         placeholder="Add a new task title" 
//         onKeyDown={enter}
//       />
//       <input 
//         type="text" 
//         value={inputValueDescription} 
//         onChange={e => setInputValueDescription(e.target.value)} 
//         placeholder="Add a new task description" 
//         onKeyDown={enter}
//       />
//       <button className='addbutton' onClick={handleAddTodo}>Add</button>
//       <br/> <br />
//       <table className='table'>
//         <thead>
//           <tr>
//             <th className='title'>My Tasks</th>
//             <th className='description'>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//         {todos.map((todo, index) => (
//   <tr key={index}> 
//     <td onClick={() => clickItem(todo)}>
//       {clickedTodo === todo ? (
//         <input 
//           value={editInputTitle} 
//           onChange={e => setEditInputTitle(e.target.value)} 
//           onKeyDown={(e) => handleKeyDown(e, todo)} 
//           ref={inputRef} 
//         />
//       ) : (
//         <span>{todo.title}</span>
//       )}
//     </td>
//     <td onClick={() => clickItem(todo)}>
//       {clickedTodo === todo ? (
//         <input 
//           value={editInputDescription} 
//           onChange={e => setEditInputDescription(e.target.value)} 
//           onKeyDown={(e) => handleKeyDown(e, todo)} 
//         />
//       ) : (
//         <span>{todo.description}</span>
//       )}
//     </td>
//     <td>  
//       {clickedTodo === todo && (
//         <>
//           <button className='savebtn' onClick={() => handleEdit(todo)}>Save</button>
//           <button className='deletebtn' onClick={() => handleDelete(todo)}>Delete</button>
//         </>
//       )}
//     </td>
//   </tr>
// ))}

//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import TaskForm from './TaskForm'; 

interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskAdded = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
        <TaskForm onTaskAdded={handleTaskAdded} />
  );
};

export default Home;



{/**
  import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  tags: string[];
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data.tasks);
    };
    fetchTasks();
  }, []);

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

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

  const searchTasks = (term: string) => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(term.toLowerCase()) ||
      task.description.toLowerCase().includes(term.toLowerCase())
    );
  };

  return (
    <div className="container">
      <h1>My Task Application</h1>
      <TaskForm onTaskAdded={addTask} />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TaskList 
        tasks={searchTasks(searchTerm)} 
        onDelete={deleteTask} 
        onToggleComplete={toggleComplete} 
        onEdit={handleEditTask} 
      />
    </div>
  );
};

export default App;
/////////////////////

import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  tags: string[];
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void; // Add edit prop
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className='list'>
      <h2>Tasks</h2>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDelete={onDelete} 
          onToggleComplete={onToggleComplete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

export default TaskList;
///////////////////////
import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  tags: string[];
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [tags, setTags] = useState(task.tags.join(', '));

  const handleSave = () => {
    onEdit(task.id, { title, description, tags: tags.split(',').map(tag => tag.trim()) });
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <input 
            type="text" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="Tags (comma separated)" 
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title} <span onClick={() => setIsEditing(true)} style={{ cursor: 'pointer', color: 'blue' }}>✏️</span></h3>
          <p>{task.description}</p>
          <p>Tags: {task.tags.join(', ')}</p>
          <p>Created on: {new Date(task.creationDate).toLocaleDateString()}</p>
          <button onClick={() => onToggleComplete(task.id)}>
            {task.completed ? 'Completed' : 'Mark as Completed'}
          </button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
//////////////////////
import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
  onTaskAdded: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      creationDate: new Date(),
      completed: false,
    };

    const response = await axios.post('http://localhost:5000/api/tasks', newTask);
    onTaskAdded(response.data);
    setTitle('');
    setDescription('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

*/}