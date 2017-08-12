import React from 'react'
import { shallow } from 'enzyme'
import WorkBody from './WorkBody'

describe('<WorkBody />', () => {
  it('renders correctly', () => {
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
      <WorkBody
        fetchingImages={false}
        hasValidImages
        imageEntities={imageEntities}
        imagesError={''}
        imagesHasError={false}
        fetchingWorks={false}
        hasValidWorks
        workEntities={workEntities}
        worksError={''}
        worksHasError={false}
        workResults={['workId']}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a loading state for works', () => {
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
      <WorkBody
        fetchingImages={false}
        hasValidImages
        imageEntities={imageEntities}
        imagesError={''}
        imagesHasError={false}
        fetchingWorks
        hasValidWorks={false}
        workEntities={workEntities}
        worksError={''}
        worksHasError={false}
        workResults={[]}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a loading state for images', () => {
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
      <WorkBody
        fetchingImages
        hasValidImages={false}
        imageEntities={imageEntities}
        imagesError={''}
        imagesHasError={false}
        fetchingWorks={false}
        hasValidWorks
        workEntities={workEntities}
        worksError={''}
        worksHasError={false}
        workResults={['workId']}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders work errors', () => {
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
      <WorkBody
        fetchingImages={false}
        hasValidImages
        imageEntities={imageEntities}
        imagesError={''}
        imagesHasError={false}
        fetchingWorks={false}
        hasValidWorks={false}
        workEntities={workEntities}
        worksError={'Error while fetching works'}
        worksHasError
        workResults={[]}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders image errors', () => {
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
      <WorkBody
        fetchingImages={false}
        hasValidImages={false}
        imageEntities={imageEntities}
        imagesError={'Error while fetching images'}
        imagesHasError
        fetchingWorks={false}
        hasValidWorks
        workEntities={workEntities}
        worksError={''}
        worksHasError={false}
        workResults={['workId']}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('returns null when there are no valid works', () => {
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
      <WorkBody
        fetchingImages={false}
        hasValidImages
        imageEntities={imageEntities}
        imagesError={''}
        imagesHasError={false}
        fetchingWorks={false}
        hasValidWorks={false}
        workEntities={workEntities}
        worksError={''}
        worksHasError={false}
        workResults={['workId']}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('returns null when there are no valid images', () => {
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
      <WorkBody
        fetchingImages={false}
        hasValidImages={false}
        imageEntities={imageEntities}
        imagesError={''}
        imagesHasError={false}
        fetchingWorks={false}
        hasValidWorks
        workEntities={workEntities}
        worksError={''}
        worksHasError={false}
        workResults={['workId']}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
