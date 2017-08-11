import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbWorkDetail } from './index'

Date.now = jest.fn(() => 1)

describe('<DumbWorkDetail />', () => {
  it('renders correctly', () => {
    const match = { params: { id: 'workId' } }
    const images = {
      lastUpdated: 1,
      errorMessage: '',
      isFetching: false,
      result: ['imageId']
    }
    const works = {
      lastUpdated: 1,
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
      lastUpdated: 0,
      errorMessage: '',
      isFetching: false,
      result: []
    }
    const works = {
      lastUpdated: 0,
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
