import React from 'react'
import { Routes } from '../../routes'
import { Header } from '../../header'
import { Wrapper } from '../../wrapper'
import { Link } from '../../link'
import { Title } from '../../text'
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
        <Title tag="h3">Prints and support</Title>
        <p>
          All my work can be downloaded for free{' '}
          <Link href="https://github.com/ismay/images">here</Link>. However if you want to support
          my work you can buy prints I{"'"}ve made and signed from{' '}
          <Link href="https://www.saatchiart.com/ismay">Saatchi Art</Link> or support me on{' '}
          <Link href="https://www.patreon.com/ismay">Patreon</Link>.
        </p>
        <Title tag="h3">Get in touch</Title>
        <p>
          My code, including the code for this website, is open source on{' '}
          <Link href="https://github.com/ismay">Github</Link> and I publish my articles on{' '}
          <Link href="https://medium.com/@ismay">Medium</Link>. Feel free to send me difficult
          questions at <Link href="mailto:hello@ismaywolff.nl">hello@ismaywolff.nl</Link> and hope
          to see you again!
        </p>
      </Wrapper>
    </LayoutFooter>
  </Layout>

export default Root
