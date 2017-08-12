import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbWork } from './index'

jest.mock('./components/WorkBody', () => () => <div />)

describe('<DumbWork />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <DumbWork
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
        workResults={['workId']}
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

    mount(
      <DumbWork
        fetchWorksIfNeeded={spyWorks}
        fetchImagesIfNeeded={spyImages}
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
        workResults={[]}
      />
    )

    expect(spyWorks).toHaveBeenCalled()
    expect(spyImages).toHaveBeenCalled()
  })
})
