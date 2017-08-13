import React from 'react'
import { Link } from '../../link'
import { Title } from '../../text'
import { List, ListItem } from '../../list'
import { NewsletterContainer } from '../../newsletter'

const Footer = () =>
  <div>
    <Title tag="h3">Links</Title>
    <List>
      <ListItem>
        Download my work: <Link href="https://keybase.pub/ismay">Keybase</Link>
      </ListItem>
      <ListItem>
        Check out my code: <Link href="https://github.com/ismay">Github</Link>
      </ListItem>
      <ListItem>
        Email me: <Link href="mailto:hello+website@ismaywolff.nl">hello+website@ismaywolff.nl</Link>
      </ListItem>
    </List>
    <Title tag="h3">Newsletter</Title>
    <p>
      Subscribe to my newsletter to receive updates about new work and exhibitions. I won't spam you
      or share your email address with others and you can unsubscribe at any time:
    </p>
    <NewsletterContainer />
  </div>

export default Footer
