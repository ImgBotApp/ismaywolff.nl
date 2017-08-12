import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbWorkDetail } from './index'

describe('<DumbWorkDetail />', () => {
  it('renders correctly', () => {
    const match = { params: { id: 'workId' } }

    const wrapper = shallow(
      <DumbWorkDetail
        match={match}
        fetchWorksIfNeeded={() => {}}
        fetchImagesIfNeeded={() => {}}
        fetchingImages={false}
        hasValidImages
        imageEntities={{ imageId: {} }}
        imagesError={''}
        imagesHasError={false}
        fetchingWorks={false}
        hasValidWorks
        workEntities={{ workId: {} }}
        worksError={''}
        worksHasError={false}
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

    mount(
      <DumbWorkDetail
        match={match}
        fetchingImages={false}
        hasValidImages={false}
        imageEntities={{}}
        imagesError={''}
        imagesHasError={false}
        fetchingWorks={false}
        hasValidWorks={false}
        workEntities={{}}
        worksError={''}
        worksHasError={false}
        fetchWorksIfNeeded={spyWorks}
        fetchImagesIfNeeded={spyImages}
      />
    )

    expect(spyWorks).toHaveBeenCalled()
    expect(spyImages).toHaveBeenCalled()
  })
})
