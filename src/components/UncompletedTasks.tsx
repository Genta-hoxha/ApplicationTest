import React from "react";
import { Link } from "react-router-dom";
import { Task } from "../../tasks";
import './taskitem.css'
interface UncompletedTasksProps {
    tasks: Task[];
}

const UncompletedTasks: React.FC<UncompletedTasksProps> = ({ tasks }) => {
    const uncompletedTasks = tasks.filter(task => !task.completed);

    return (
        <div className="uncompleted-tasks">
            <h2>Uncompleted Tasks</h2>
            {uncompletedTasks.length === 0 ? (
                <p>No uncompleted tasks found.</p>
            ) : (
                <div className="task-cards">
                    {uncompletedTasks.map(task => (
                        <div key={task.id} className="task-card">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p><span style={{fontSize: '20px', color: '#e350a8'}}>Tags:</span> {task.tags.join(', ')}</p>
                            <p><span style={{fontSize: '20px', color: '#9543a7'}}>Created on:</span> {new Date(task.creationDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
            <Link to='/'>Go Back</Link>
        </div>
    );
}

export default UncompletedTasks;
