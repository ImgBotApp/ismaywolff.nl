import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbWork } from './index'

jest.mock('./components/WorkBody', () => () => <div />)
Date.now = jest.fn(() => 1)

describe('<DumbWork />', () => {
  it('renders correctly', () => {
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
      <DumbWork
        fetchWorksIfNeeded={() => {}}
        fetchImagesIfNeeded={() => {}}
        workEntities={{ workId: {} }}
        imageEntities={{ imageId: {} }}
        works={works}
        images={images}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('has server side data needs defined', () => {
    expect(DumbWork.needs()).toMatchSnapshot()
  })

  it('fetches data after mounting', () => {
    const spyImages = jest.fn()
    const spyWorks = jest.fn()
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
      <DumbWork
        fetchWorksIfNeeded={spyWorks}
        fetchImagesIfNeeded={spyImages}
        workEntities={{}}
        imageEntities={{}}
        works={works}
        images={images}
      />
    )

    expect(spyWorks).toHaveBeenCalled()
    expect(spyImages).toHaveBeenCalled()
  })
})
