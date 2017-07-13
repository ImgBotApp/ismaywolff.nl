import React from 'react'
import { Link } from '../../link'
import { Navigation } from '../../navigation'
import HeaderTitle from './HeaderTitle'
import HeaderWrapper from './HeaderWrapper'

const Header = () =>
  <HeaderWrapper>
    <HeaderTitle>
      <Link to="/" clean>Ismay Wolff</Link>
    </HeaderTitle>
    <Navigation />
  </HeaderWrapper>

export default Header
