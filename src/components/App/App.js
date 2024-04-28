import React from "react";
import styled from "styled-components";

const Page = styled.div`
  width: 300px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: #333;
`

const MessageForm = styled.form`
  margin-top: 16px;
`

const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
`

const SubmitButton = styled.button`
  margin-top: 8px;
`

const MessageList = styled.div`
  margin-top: 16px;
`

const MessageContainer = styled.div`
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 8px;
`

const MessageHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MessageAuthor = styled.div`
  color: rgba(23, 78, 55, 0.3);
  font-size: 14px;
`

const MessageTime = styled.div``

const MessageBody = styled.div`
  margin-top: 10px;
  font-size: 16px;
`

function Message({ author, time, children }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>

      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  )
}

function App() {
  return (
    <Page>
      <Title>留言板</Title>
      <MessageForm>
        <MessageTextArea rows={10}></MessageTextArea>
        <SubmitButton>送出留言</SubmitButton>
      </MessageForm>
      <MessageList>
        <Message author={'Rhino'} time="2020-11-11 11:11:11">我的留言</Message>
      </MessageList>
    </Page>
  )
}

export default App;
