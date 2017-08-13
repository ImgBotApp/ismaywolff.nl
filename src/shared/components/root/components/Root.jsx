import React from 'react'
import { Routes } from '../../routes'
import { Header } from '../../header'
import { Footer } from '../../footer'
import { Wrapper } from '../../wrapper'
import { Layout, LayoutContent, LayoutFooter } from '../../layout'

const Root = () =>
  <Layout>
    <LayoutContent>
      <Wrapper>
        <Header />
        <Routes />
      </Wrapper>
    </LayoutContent>
    <LayoutFooter>
      <Wrapper>
        <Footer />
      </Wrapper>
    </LayoutFooter>
  </Layout>

export default Root
