
import React, { useState } from 'react';
import { Task } from '../tasks';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete);
      setTaskToDelete(null);
      setShowModal(false);
    }
  };

  return (
    <div className='list'>
      <h2>Tasks</h2>

      {sortedTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onEdit={onEdit} 
          onDelete={handleDeleteClick} 
        />
      ))}

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
};

// Confirmation of modal component
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void; }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete this task?</p>
        <button onClick={onConfirm}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

// TaskItem component to handle individual tasks
const TaskItem: React.FC<{ task: Task; onDelete: (id: string) => void; onToggleComplete: (id: string) => void; onEdit: (id: string, updatedTask: Partial<Task>) => void; }> = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [tags, setTags] = useState(task.tags.join(', '));

  const handleSave = () => {
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
          <h3>
            {task.title} 
            <span onClick={() => setIsEditing(true)} style={{ cursor: 'pointer', color: 'blue' }}>✏️</span>
          </h3>
          <p>{task.description}</p>
          <p>Tags: {task.tags.join(', ')}</p>
          <p>Created on: {new Date(task.creationDate).toLocaleDateString()} at {new Date(task.creationDate).toLocaleTimeString()}</p>

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
