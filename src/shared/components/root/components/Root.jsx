import React from 'react'
import { Routes } from '../../routes'
import { Header } from '../../header'
import { Wrapper } from '../../wrapper'
import { Link } from '../../link'
import { Title } from '../../text'
import { Layout, LayoutContent, LayoutFooter } from '../../layout'
import { NewsletterContainer } from '../../newsletter'

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
        <Title tag="h3">Download my work</Title>
        <p>
          My work can be downloaded for free from {' '}
          <Link href="https://keybase.pub/ismay">Keybase</Link> and my code, including the code for
          this website, is open source on <Link href="https://github.com/ismay">Github</Link>. Feel
          free to use it for your own projects!
        </p>
        <Title tag="h3">Contact</Title>
        <p>
          If you want to email me feel free to do so at{' '}
          <Link href="mailto:hello+website@ismaywolff.nl">hello+website@ismaywolff.nl</Link>, or
          subscribe to my newsletter to receive updates about new work and exhibitions. I won't spam
          you or share your email address with others and you can unsubscribe at any time:
        </p>
        <NewsletterContainer />
      </Wrapper>
    </LayoutFooter>
  </Layout>

export default Root
