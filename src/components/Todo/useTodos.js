import { useState, useEffect, useRef } from 'react';
import useInput from './useInput';

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

export default function useTodos() {
  const id = useRef(1);
  const { value, setValue, handleChange } = useInput();

  const [todos, setTodos] = useState(() => {
    let todosData = window.localStorage.getItem('todos') || '';
    if (todosData) {
      todosData = JSON.parse(todosData);
      id.current = todosData[0].id + 1;
    } else {
      todosData = [];
    }
    return todosData;
  });

  useEffect(() => {
    writeTodosToLocalStorage(todos);
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

  return {
    todos,
    setTodos,
    id,
    value,
    handleButtonClick,
    handleToggleIsDone,
    handleDeleteTodo,
    handleChange,
  };
}
