import React from 'react'
import { shallow } from 'enzyme'
import WorkDetailBody from './WorkDetailBody'

describe('<WorkDetailBody />', () => {
  it('renders correctly', () => {
    const id = 'workId'
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
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a loading state for works', () => {
    const id = 'workId'
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
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a loading state for images', () => {
    const id = 'workId'
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
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders work errors', () => {
    const id = 'workId'
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
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders image errors', () => {
    const id = 'workId'
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
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a missing page error for missing work', () => {
    const id = 'doesNotExist'
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
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('returns null when there are no valid works', () => {
    const id = 'workId'
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
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('returns null when there are no valid images', () => {
    const id = 'workId'
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
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
