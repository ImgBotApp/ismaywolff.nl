import React from 'react'
import { Link } from '../../link'
import { Title } from '../../text'
import { Table, Td } from '../../table'
import { NewsletterContainer } from '../../newsletter'

const Footer = () =>
  <div>
    <Title tag="h3">Links</Title>
    <Table>
      <tbody>
        <tr>
          <Td>Download my work</Td>
          <Td>
            <Link href="https://keybase.pub/ismay">Keybase</Link>
          </Td>
        </tr>
        <tr>
          <Td>Check out my code</Td>
          <Td>
            <Link href="https://github.com/ismay">Github</Link>
          </Td>
        </tr>
        <tr>
          <Td>Email me</Td>
          <Td>
            <Link href="mailto:hello+website@ismaywolff.nl">hello+website@ismaywolff.nl</Link>
          </Td>
        </tr>
      </tbody>
    </Table>
    <Title tag="h3">Newsletter</Title>
    <p>
      Subscribe to my newsletter to receive updates about new work and exhibitions. I won't spam you
      or share your email address with others and you can unsubscribe at any time:
    </p>
    <NewsletterContainer />
  </div>

export default Footer
