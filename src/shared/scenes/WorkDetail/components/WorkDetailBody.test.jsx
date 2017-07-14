import React from 'react'
import { shallow } from 'enzyme'
import WorkDetailBody from './WorkDetailBody'

describe('<WorkDetailBody />', () => {
  it('renders correctly', () => {
    const id = 'workId'
    const images = {
      didFetch: true,
      errorMessage: '',
      isFetching: false,
      result: ['imageId']
    }
    const works = {
      didFetch: true,
      errorMessage: '',
      isFetching: false,
      result: ['workId']
    }
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
      <WorkDetailBody
        id={id}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a loading state for works', () => {
    const id = 'workId'
    const images = {
      didFetch: true,
      errorMessage: '',
      isFetching: false,
      result: ['imageId']
    }
    const works = {
      didFetch: false,
      errorMessage: '',
      isFetching: true,
      result: []
    }
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
      <WorkDetailBody
        id={id}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a loading state for images', () => {
    const id = 'workId'
    const images = {
      didFetch: false,
      errorMessage: '',
      isFetching: true,
      result: []
    }
    const works = {
      didFetch: true,
      errorMessage: '',
      isFetching: false,
      result: ['workId']
    }
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
        featured: true,
        text: 'text'
      }
    }
    const imageEntities = {}

    const wrapper = shallow(
      <WorkDetailBody
        id={id}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders work errors', () => {
    const id = 'workId'
    const images = {
      didFetch: true,
      errorMessage: '',
      isFetching: false,
      result: ['imageId']
    }
    const works = {
      didFetch: true,
      errorMessage: 'Error while fetching works',
      isFetching: false,
      result: []
    }
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
      <WorkDetailBody
        id={id}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders image errors', () => {
    const id = 'workId'
    const images = {
      didFetch: true,
      errorMessage: 'Error while fetching images',
      isFetching: false,
      result: []
    }
    const works = {
      didFetch: true,
      errorMessage: '',
      isFetching: false,
      result: ['workId']
    }
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
      <WorkDetailBody
        id={id}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a missing page error for missing work', () => {
    const id = 'doesNotExist'
    const images = {
      didFetch: true,
      errorMessage: '',
      isFetching: false,
      result: ['imageId']
    }
    const works = {
      didFetch: true,
      errorMessage: '',
      isFetching: false,
      result: ['workId']
    }
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
      <WorkDetailBody
        id={id}
        images={images}
        works={works}
        imageEntities={imageEntities}
        workEntities={workEntities}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
