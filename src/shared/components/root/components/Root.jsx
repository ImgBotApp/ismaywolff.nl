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
        <Title tag="h3">Prints and support</Title>
        <p>
          All my work can be downloaded for free from {' '}
          <Link href="https://keybase.pub/ismay">Keybase</Link>. However if you want to support my
          work you can buy prints I{"'"}ve made and signed from{' '}
          <Link href="https://www.saatchiart.com/ismay">Saatchi Art</Link> or support me on{' '}
          <Link href="https://www.patreon.com/ismay">Patreon</Link>.
        </p>
        <Title tag="h3">Get in touch</Title>
        <p>
          My code, including the code for this website, is open source on{' '}
          <Link href="https://github.com/ismay">Github</Link> and I publish my articles on{' '}
          <Link href="https://medium.com/@ismay">Medium</Link>. If you want to email me feel free to
          do so at{' '}
          <Link href="mailto:hello+website@ismaywolff.nl">hello+website@ismaywolff.nl</Link>.
        </p>
        <Title tag="h3">Newsletter</Title>
        <p>
          Subscribe to my newsletter to receive updates about new work and exhibitions. I won't spam
          you or share your email address with others and you can unsubscribe at any time:
        </p>
        <NewsletterContainer />
      </Wrapper>
    </LayoutFooter>
  </Layout>

export default Root
