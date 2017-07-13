import React from 'react'
import { shallow } from 'enzyme'
import Thumbnail from './Thumbnail'

describe('<Thumbnail />', () => {
  it('renders correctly', () => {
    const work = {
      title: 'title',
      slug: 'slug',
      thumbnail: 'thumbnailId',
      type: 'type',
      published: '10-01-2010',
      summary: 'summary',
      images: ['imageId'],
      hero: false,
      featured: false
    }
    const image = {
      title: 'title',
      url: 'https://image.com',
      width: 10,
      height: 10
    }
    const wrapper = shallow(<Thumbnail work={work} image={image} />)
    expect(wrapper).toMatchSnapshot()
  })
})
