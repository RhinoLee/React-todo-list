import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from  'prop-types';

const API_ENDPOINT = 'https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc'

const Page = styled.div`
  width: 360px;
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

  & + & {
    margin-top: 8px;
  }
`

const MessageHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
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

const ErrorMessage = styled.div`
  margin-top: 16px;
  color: red;
`

const Loading = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node,
}

function App() {
  const [messages, setMessage] = useState(null)
  const [messageApiError, setMessageApiError] = useState(null)
  const [value, setValue] = useState('')
  const [postMessageError, setPostMessageError] = useState(null)
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false)

  const fetchMessages = () => {
    return fetch(API_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        setMessage(data)
      })
      .catch(err => {
        setMessageApiError(err.message)
      })
  } 

  const handleTextareaChange = e => {
    setValue(e.target.value)
  }

  const handleTextareaFocus = () => {
    setPostMessageError(null)
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    if (isLoadingPostMessage) return

    setIsLoadingPostMessage(true)

    fetch('https://student-json-api.lidemy.me/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nickname: 'Thino',
        body: value
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsLoadingPostMessage(false)
      if (data.ok === 0) {
        setPostMessageError(data.message)
        return
      }
      setValue('')
      fetchMessages()
    }).catch (err => {
      setIsLoadingPostMessage(false)
      setPostMessageError(err.message)
    })
  }

  useEffect(() => {
    fetchMessages(0)
  }, [])


  return (
    <Page>
      { isLoadingPostMessage && <Loading>Loading...</Loading> }
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea value={value} onChange={handleTextareaChange} onFocus={handleTextareaFocus} rows={10}></MessageTextArea>
        <SubmitButton>送出留言</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageApiError && (
        <ErrorMessage>
          Something went wrong. {messageApiError.toString()}
        </ErrorMessage>
      )}
      {messages && messages.length === 0 && <div>No Message</div>}
      <MessageList>
        {messages && messages.map(message => (
          <Message key={message.id} author={message.nickname} time={new Date(message.createdAt).toLocaleString()}>{message.body}</Message>
        ))}
      </MessageList>
    </Page>
  )
}

export default App;
