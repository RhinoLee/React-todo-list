import React, { useState, useEffect } from "react";
import "../../index.css"
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import PostPage from "../../pages/PostPage";
import Header from "../Header";
import { getMe } from "../../WebAPI"
import { getAuthToken } from "../../utils"

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "../../contexts"

const Root = styled.div``

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!getAuthToken()) return

    getMe().then(res => {
      if (res.ok) {
        setUser(res.data)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header>header</Header>
          <Switch>
            <Route exact path="/">
              <HomePage></HomePage>
            </Route>
            <Route path="/posts/:postId">
              <PostPage></PostPage>
            </Route>
            <Route exact path="/login">
              <LoginPage></LoginPage>
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  )
}

export default App;
