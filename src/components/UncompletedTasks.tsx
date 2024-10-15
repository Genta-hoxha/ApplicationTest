import React from "react";
import { Link } from "react-router-dom";
import { StringLiteral } from "typescript";

interface Task {
    id: string;
    title: string;
    description: string,
    creationDate: Date;
    tags: string[];
    completed: boolean;
    get uncompleted(): boolean; 
}

interface UncompletedTasksProps {
    tasks: Task[];
}

const UncompletedTasks: React.FC<UncompletedTasksProps> = ({tasks}) => {
    const uncompletedTasks = tasks.filter(task => !task.completed);

return (
    <div className="uncompleted-tasks">
<h2>Uncompleted Tasks</h2>
{uncompletedTasks.length === 0 ? (
    <p>No uncompleted tasks found.</p>
) : (
    uncompletedTasks.map(task => (
    <div key={task.id} className="task">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Tags: {task.tags.join(', ')}</p>
        <p>Created on: {new Date(task.creationDate).toLocaleDateString()}</p>
        </div>
    ))
)}
<Link to='/'>Go Back</Link>

    </div>
)

}

export default UncompletedTasks;