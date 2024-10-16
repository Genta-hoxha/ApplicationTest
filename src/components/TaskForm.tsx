
import React, { useState } from 'react';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Task } from '../tasks';

interface TaskFormProps {
  onTaskAdded: (task: Task) => void;
  completedTasksCount: number;
  totalTasksCount: number;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded, completedTasksCount, totalTasksCount }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [taskInfo, setTaskInfo] = useState<{ completed: number; uncompleted: number }>({
    completed: completedTasksCount,
    uncompleted: totalTasksCount - completedTasksCount,
  });

  const handleMouseMove = () => {
    setTaskInfo({
      completed: completedTasksCount,
      uncompleted: totalTasksCount - completedTasksCount,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newTask: Task = {
      id: '',
      title,
      description,
      creationDate: new Date(),
      tags: tags.split(',').map(tag => tag.trim()),
      completed: false,
      uncompleted: false
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      onTaskAdded(response.data);
      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      setError('Error adding task. Please try again.');
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedTasks = completedTasksCount || 0;
  const totalTasks = totalTasksCount || 0;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="row" onMouseMove={handleMouseMove}>
      <div className="column right">
        <form onSubmit={handleSubmit} className='form' onMouseMove={handleMouseMove}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            aria-label="Task Title"
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            aria-label="Task Description"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
            aria-label="Task Tags"
          />
          <br />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>
      </div>
      <div className="column left" onMouseMove={handleMouseMove}>
        <CircularProgressbar
          value={completionPercentage}
          text={`${Math.round(completionPercentage)}%`}
          styles={{
            path: {
              stroke: `#4caf50`,
            },
            text: {
              fill: '#000',
              fontSize: '16px',
            },
            trail: {
              stroke: '#f44336',
            },
          }}
        />
        <div className="task-info">
          <p>Completed Tasks: {taskInfo.completed}</p>
          <p>Uncompleted Tasks: {taskInfo.uncompleted}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
