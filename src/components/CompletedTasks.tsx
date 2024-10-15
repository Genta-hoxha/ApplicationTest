

import React from 'react';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  tags: string[];
  completed: boolean;
}

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
        completedTasks.map(task => (
          <div key={task.id} className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Tags: {task.tags.join(', ')}</p>
            <p>Created on: {new Date(task.creationDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default CompletedTasks;
