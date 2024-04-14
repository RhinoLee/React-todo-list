import './App.css';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useState, useRef, useEffect } from 'react';

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

function App() {
  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    console.log('init');
    let todosData = window.localStorage.getItem('todos') || '';
    if (todosData) {
      todosData = JSON.parse(todosData);
      id.current = todosData[0].id + 1;
    } else {
      todosData = [];
    }
    return todosData;
  });

  const [value, setValue] = useState('');

  useEffect(() => {
    writeTodosToLocalStorage(todos);
    console.log(todos);
  }, [todos]);

  const handleButtonClick = () => {
    setTodos([
      {
        id: id.current,
        content: value,
      },
      ...todos,
    ]);
    setValue('');
    id.current += 1;
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }),
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='App'>
      <input type='text' placeholder='todo' value={value} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Add todo</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
