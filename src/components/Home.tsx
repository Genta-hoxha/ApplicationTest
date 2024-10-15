import React, { useState, useRef, useEffect } from 'react';

interface Todo {
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValueTitle, setInputValueTitle] = useState<string>('');
  const [inputValueDescription, setInputValueDescription] = useState<string>('');
  const [clickedTodo, setClickedTodo] = useState<Todo | null>(null);
  const [editInputTitle, setEditInputTitle] = useState<string>('');
  const [editInputDescription, setEditInputDescription] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Add task
  const handleAddTodo = (): void => {
    if (inputValueTitle.trim() === '') return;

    const capitalizedTitle = inputValueTitle.charAt(0).toUpperCase() + inputValueTitle.slice(1);
    const capitalizedDescription = inputValueDescription.charAt(0).toUpperCase() + inputValueDescription.slice(1);

    const newTodo: Todo = { title: capitalizedTitle, description: capitalizedDescription };
    setTodos([...todos, newTodo]);
    setInputValueTitle('');
    setInputValueDescription('');
  };

  const clickItem = (todo: Todo): void => {
    if (clickedTodo === todo) {
      setClickedTodo(null);
      setEditInputTitle('');
      setEditInputDescription('');
    } else {
      setClickedTodo(todo);
      setEditInputTitle(todo.title);
      setEditInputDescription(todo.description);
    }
  };

  const handleEdit = (todo: Todo) => {
    const updatedTodos = todos.map(t => 
      t === todo ? { title: editInputTitle, description: editInputDescription } : t
    );
    setTodos(updatedTodos);
    setClickedTodo(null);
    setEditInputTitle('');
    setEditInputDescription('');
  };

  const handleDelete = (todo: Todo) => {
    const updatedTodos = todos.filter(t => t !== todo);
    setTodos(updatedTodos);
    setClickedTodo(null);
    setEditInputTitle('');
    setEditInputDescription('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
    if (e.key === 'Enter') {
      handleEdit(todo);
    }
  };

  useEffect(() => {
    if (inputRef.current && clickedTodo !== null) {
      inputRef.current.focus();
    }
  }, [clickedTodo]);

  function enter(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  }

  return (
    <div className='container'>
      <h1>My Task Application</h1>
     
      <input 
        type="text" 
        value={inputValueTitle} 
        onChange={e => setInputValueTitle(e.target.value)} 
        placeholder="Add a new task title" 
        onKeyDown={enter}
      />
      <input 
        type="text" 
        value={inputValueDescription} 
        onChange={e => setInputValueDescription(e.target.value)} 
        placeholder="Add a new task description" 
        onKeyDown={enter}
      />
      <button className='addbutton' onClick={handleAddTodo}>Add</button>
      <br/> <br />
      <table className='table'>
        <thead>
          <tr>
            <th className='title'>My Tasks</th>
            <th className='description'>Description</th>
          </tr>
        </thead>
        <tbody>
        {todos.map((todo, index) => (
  <tr key={index}> 
    <td onClick={() => clickItem(todo)}>
      {clickedTodo === todo ? (
        <input 
          value={editInputTitle} 
          onChange={e => setEditInputTitle(e.target.value)} 
          onKeyDown={(e) => handleKeyDown(e, todo)} 
          ref={inputRef} 
        />
      ) : (
        <span>{todo.title}</span>
      )}
    </td>
    <td onClick={() => clickItem(todo)}>
      {clickedTodo === todo ? (
        <input 
          value={editInputDescription} 
          onChange={e => setEditInputDescription(e.target.value)} 
          onKeyDown={(e) => handleKeyDown(e, todo)} 
        />
      ) : (
        <span>{todo.description}</span>
      )}
    </td>
    <td>  
      {clickedTodo === todo && (
        <>
          <button className='savebtn' onClick={() => handleEdit(todo)}>Save</button>
          <button className='deletebtn' onClick={() => handleDelete(todo)}>Delete</button>
        </>
      )}
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default Home;
