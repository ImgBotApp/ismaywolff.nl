import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbWorkDetail } from './index'

describe('<DumbWorkDetail />', () => {
  it('renders correctly', () => {
    const match = { params: { id: 'workId' } }
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

    const wrapper = shallow(
      <DumbWorkDetail
        match={match}
        workEntities={{}}
        imageEntities={{}}
        works={works}
        images={images}
        fetchWorksIfNeeded={() => {}}
        fetchImagesIfNeeded={() => {}}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('has server side data needs defined', () => {
    expect(DumbWorkDetail.needs()).toMatchSnapshot()
  })

  it('fetches data after mounting', () => {
    const spyImages = jest.fn()
    const spyWorks = jest.fn()
    const match = { params: { id: 'one' } }
    const images = {
      didFetch: false,
      errorMessage: '',
      isFetching: false,
      result: []
    }
    const works = {
      didFetch: false,
      errorMessage: '',
      isFetching: false,
      result: []
    }

    mount(
      <DumbWorkDetail
        match={match}
        workEntities={{}}
        imageEntities={{}}
        works={works}
        images={images}
        fetchWorksIfNeeded={spyWorks}
        fetchImagesIfNeeded={spyImages}
      />
    )

    expect(spyWorks).toHaveBeenCalled()
    expect(spyImages).toHaveBeenCalled()
  })
})
