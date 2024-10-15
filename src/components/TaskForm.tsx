import React, { useState } from 'react';
import axios from 'axios'; //is used for making HTTP requests, to send the task data to the server

interface TaskFormProps {  //structure of the props that TaskForm will accept
  onTaskAdded: (task: any) => void; //this property is a function that takes ane parameter(of type any) and does not return anything
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => { //functional component type, the props are destructed to directly access onTaskAdded
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>(''); ///pieces of state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { //async function triggered(aktivizohet) when the form is submitted
    e.preventDefault();  //stop the default form submission

    //new object is created using the current state values
    const newTask = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    //API CALL the new task is sent to server via a POST request
    const response = await axios.post('http://localhost:5000/api/tasks', newTask);
    onTaskAdded(response.data); //after the task is added onTaskAdded is called with the response data, notify parent component for new task
    setTitle('');
    setDescription('');
    setTags('');   //after submittion the input fields are reset to empty preparing for new input
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
