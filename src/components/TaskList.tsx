import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  tags: string[];
  completed: boolean;
  get uncompleted(): boolean; 
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
}


//functional component
// const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
//   return (
//     <div className='list'>
//       <h2>Tasks</h2>
//       {tasks.map(task => (
//         <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
//           <h3>{task.title}</h3>
//           <p>{task.description}</p>
//           <p>Tags: {task.tags.join(', ')}</p>
//           <p>Created on: {new Date(task.creationDate).toLocaleDateString()}</p>
//           <button onClick={() => onToggleComplete(task.id)}>
//             {task.completed ? 'Completed' : 'Mark as Completed'}
//           </button>
//           <button onClick={() => onDelete(task.id)}>Edit</button>
//           <button onClick={() => onDelete(task.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };
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

// TaskItem component to handle individual task
const TaskItem: React.FC<{ task: Task; onDelete: (id: string) => void; onToggleComplete: (id: string) => void; onEdit: (id: string, updatedTask: Partial<Task>) => void; }> = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [tags, setTags] = useState(task.tags.join(', '));

  const handleSave = () => {
    console.log('Saving:', { title, description, tags });
    onEdit(task.id, { title, description, tags: tags.split(',').map(tag => tag.trim()) });
    setIsEditing(false);
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

export default TaskList;
