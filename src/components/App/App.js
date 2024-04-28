import React, { useState, useEffect } from "react";
import "../../index.css"
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import Header from "../Header";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Root = styled.div``

function App() {
  return (
    <Root>
      <Router>
        <Header>header</Header>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/login">
            <LoginPage></LoginPage>
          </Route>
        </Switch>
      </Router>
    </Root>
  )
}

export default App;
