import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbHome } from './index'

jest.mock('./components/HomeBody', () => () => <div />)

describe('<DumbHome />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <DumbHome
        fetchWorksIfNeeded={() => {}}
        fetchImagesIfNeeded={() => {}}
        featured={['workId']}
        hero={['workId']}
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
    expect(DumbHome.needs()).toMatchSnapshot()
  })

  it('fetches data after mounting', () => {
    const spyImages = jest.fn()
    const spyWorks = jest.fn()

    mount(
      <DumbHome
        fetchWorksIfNeeded={spyWorks}
        fetchImagesIfNeeded={spyImages}
        featured={['workId']}
        hero={['workId']}
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

    expect(spyWorks).toHaveBeenCalled()
    expect(spyImages).toHaveBeenCalled()
  })
})
