import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbHome } from './index'

jest.mock('./components/HomeBody', () => () => <div />)

describe('<DumbHome />', () => {
  it('renders correctly', () => {
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
      <DumbHome
        fetchWorksIfNeeded={() => {}}
        fetchImagesIfNeeded={() => {}}
        featured={['workId']}
        hero={['workId']}
        images={images}
        works={works}
        imageEntities={{ imageId: {} }}
        workEntities={{ workId: {} }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('has server side data needs defined', () => {
    expect(DumbHome.needs()).toMatchSnapshot()
  })

  it('fetches data after mounting', () => {
    const spyImages = jest.fn()
    const spyWorks = jest.fn()
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
      <DumbHome
        fetchWorksIfNeeded={spyWorks}
        fetchImagesIfNeeded={spyImages}
        featured={[]}
        hero={[]}
        images={images}
        works={works}
        imageEntities={{}}
        workEntities={{}}
      />
    )

    expect(spyWorks).toHaveBeenCalled()
    expect(spyImages).toHaveBeenCalled()
  })
})