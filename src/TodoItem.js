import './App.css';
import styled from 'styled-components';
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from './constants/style';

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid black;
`;

const TodoContent = styled.div`
  color: ${(props) => props.theme.colors.primary_300};

  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 4px;
  color: black;
  font-size: 20px;

  ${MEDIA_QUERY_MD} {
    font-size: 16px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 12px;
  }

  &:hover {
    color: red;
  }

  & + & {
    margin-left: 4px;
  }
`;

const RedButton = styled(Button)`
  color: red;
`;

export default function TodoItem({ className, todo, handleDeleteTodo, handleToggleIsDone }) {
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <TodoItemWrapper className={className} data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <Button onClick={handleToggleClick}>{todo.isDone ? '未完成' : '已完成'}</Button>
        <RedButton onClick={handleDeleteClick}>刪除</RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
