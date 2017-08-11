import React from 'react'
import { shallow } from 'enzyme'
import HomeBody from './HomeBody'

const recentFetch = 1
Date.now = jest.fn(() => recentFetch + 1)

describe('<HomeBody />', () => {
  it('renders correctly', () => {
    const images = {
      lastUpdated: recentFetch,
      errorMessage: '',
      isFetching: false,
      result: ['imageId']
    }
    const works = {
      lastUpdated: recentFetch,
      errorMessage: '',
      isFetching: false,
      result: ['workId']
    }
    const featured = ['workId']
    const hero = ['workId']
    const workEntities = {
      workId: {
        title: 'title',
        slug: 'slug',
        thumbnail: 'imageId',
        type: 'type',
        published: '10-01-2010',
        summary: 'summary',
        images: ['imageId'],
        hero: true,
        featured: true
      }
    }
    const imageEntities = {
      imageId: {
        title: 'title',
        url: 'https://url.com',
        width: 100,
        height: 100
      }
    }

    const wrapper = shallow(
      <HomeBody
        featured={featured}
        hero={hero}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a loading state for works', () => {
    const images = {
      lastUpdated: recentFetch,
      errorMessage: '',
      isFetching: false,
      result: ['imageId']
    }
    const works = {
      lastUpdated: 0,
      errorMessage: '',
      isFetching: true,
      result: []
    }
    const featured = []
    const hero = []
    const workEntities = {}
    const imageEntities = {
      imageId: {
        title: 'title',
        url: 'https://url.com',
        width: 100,
        height: 100
      }
    }

    const wrapper = shallow(
      <HomeBody
        featured={featured}
        hero={hero}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a loading state for images', () => {
    const images = {
      lastUpdated: 0,
      errorMessage: '',
      isFetching: true,
      result: []
    }
    const works = {
      lastUpdated: recentFetch,
      errorMessage: '',
      isFetching: false,
      result: ['workId']
    }
    const featured = ['workId']
    const hero = ['workId']
    const workEntities = {
      workId: {
        title: 'title',
        slug: 'slug',
        thumbnail: 'imageId',
        type: 'type',
        published: '10-01-2010',
        summary: 'summary',
        images: ['imageId'],
        hero: true,
        featured: true
      }
    }
    const imageEntities = {}

    const wrapper = shallow(
      <HomeBody
        featured={featured}
        hero={hero}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders work errors', () => {
    const images = {
      lastUpdated: recentFetch,
      errorMessage: '',
      isFetching: false,
      result: ['imageId']
    }
    const works = {
      lastUpdated: recentFetch,
      errorMessage: 'Error while fetching works',
      isFetching: false,
      result: []
    }
    const featured = []
    const hero = []
    const workEntities = {}
    const imageEntities = {
      imageId: {
        title: 'title',
        url: 'https://url.com',
        width: 100,
        height: 100
      }
    }

    const wrapper = shallow(
      <HomeBody
        featured={featured}
        hero={hero}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders image errors', () => {
    const images = {
      lastUpdated: recentFetch,
      errorMessage: 'Error while fetching images',
      isFetching: false,
      result: []
    }
    const works = {
      lastUpdated: recentFetch,
      errorMessage: '',
      isFetching: false,
      result: ['workId']
    }
    const featured = ['workId']
    const hero = ['workId']
    const workEntities = {
      workId: {
        title: 'title',
        slug: 'slug',
        thumbnail: 'imageId',
        type: 'type',
        published: '10-01-2010',
        summary: 'summary',
        images: ['imageId'],
        hero: true,
        featured: true
      }
    }
    const imageEntities = {}

    const wrapper = shallow(
      <HomeBody
        featured={featured}
        hero={hero}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
