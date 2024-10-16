

import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../../tasks';
// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   creationDate: Date;
//   tags: string[];
//   completed: boolean;
// }

interface CompletedTasksProps {
  tasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="completed-tasks">
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks found.</p>
      ) : (
        <div className='task-cards'>
        {completedTasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><span style={{fontSize: '20px', color: '#e350a8'}}>Tags:</span> {task.tags.join(', ')}</p>
            <p><span style={{fontSize: '20px', color: '#9543a7'}}>Created on:</span> {new Date(task.creationDate).toLocaleDateString()}</p>
          </div>
        ))}
        </div>
        )}
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default CompletedTasks;
