import './App.css';
import styled from 'styled-components'
import TodoItem from './TodoItem';

const BlackTodoItem = styled(TodoItem)`
  background: black;
`

function App() {
  return (
    <div className="App">
      <TodoItem content={123}></TodoItem>
      <BlackTodoItem content={456}></BlackTodoItem>
    </div>
  );
}

export default App;
