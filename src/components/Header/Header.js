import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts"
import { setAuthToken } from "../../utils"

import { Link, useLocation, useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
  box-sizing: border-box;
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
`

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  color: black;
  text-decoration: none;

  ${props => props.$active && `
    background: rgba(0, 0, 0, 0.1);
  `}
`

const LeftContainer = styled.div`
  display: flex;
  aligin-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`

export default function Header() {
  const location = useLocation()
  const history = useHistory()
  const { user, setUser } = useContext(AuthContext)

  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    if (location.pathname !== '/') history.push('/')
  }

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>史萊母的部落格</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === '/'}>首頁</Nav>
          {user && <Nav to="/new-post" $active={location.pathname === '/new-post'}>發布文章</Nav>}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {!user && <Nav to="/login" $active={location.pathname === '/login'}>登入</Nav>}
        {user && <Nav onClick={handleLogout}>登出</Nav>}
      </NavbarList>
    </HeaderContainer>
  )
}
