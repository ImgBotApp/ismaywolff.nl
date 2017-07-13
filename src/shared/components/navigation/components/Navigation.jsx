import React from 'react'
import NavLink from './NavLink'
import NavWrapper from './NavWrapper'

const Navigation = () =>
  <NavWrapper>
    <NavLink to="/" exact>Home</NavLink>
    <NavLink to="/work">Work</NavLink>
    <NavLink to="/about">About</NavLink>
  </NavWrapper>

export default Navigation
