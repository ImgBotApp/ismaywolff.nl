import React, { Component } from 'react'
import { func, bool, string, arrayOf, objectOf, object } from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { actions as workActions, selectors as workSelectors } from '../../data/works'
import { actions as imageActions, selectors as imageSelectors } from '../../data/images'
import HomeBody from './components/HomeBody'

export class DumbHome extends Component {
  static needs() {
    return [workActions.fetchWorksIfNeeded(), imageActions.fetchImagesIfNeeded()]
  }

  componentDidMount() {
    this.props.fetchWorksIfNeeded()
    this.props.fetchImagesIfNeeded()
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Ismay Wolff</title>
          <meta name="description" content="The portfolio of Ismay Wolff" />
        </Helmet>
        <HomeBody
          featured={this.props.featured}
          hero={this.props.hero}
          fetchingImages={this.props.fetchingImages}
          hasValidImages={this.props.hasValidImages}
          imagesError={this.props.imagesError}
          imagesHasError={this.props.imagesHasError}
          imageEntities={this.props.imageEntities}
          fetchingWorks={this.props.fetchingWorks}
          hasValidWorks={this.props.hasValidWorks}
          worksError={this.props.worksError}
          worksHasError={this.props.worksHasError}
          workEntities={this.props.workEntities}
        />
      </div>
    )
  }
}

DumbHome.propTypes = {
  fetchImagesIfNeeded: func.isRequired,
  fetchWorksIfNeeded: func.isRequired,
  featured: arrayOf(string).isRequired,
  hero: arrayOf(string).isRequired,
  fetchingImages: bool.isRequired,
  hasValidImages: bool.isRequired,
  imageEntities: objectOf(object).isRequired,
  imagesError: string.isRequired,
  imagesHasError: bool.isRequired,
  fetchingWorks: bool.isRequired,
  hasValidWorks: bool.isRequired,
  workEntities: objectOf(object).isRequired,
  worksError: string.isRequired,
  worksHasError: bool.isRequired
}

const mapStateToProps = state => ({
  featured: workSelectors.getFeatured(state),
  hero: workSelectors.getHero(state),
  imageEntities: imageSelectors.getImageEntities(state),
  fetchingImages: imageSelectors.getIsFetching(state),
  imagesError: imageSelectors.getError(state),
  imagesHasError: imageSelectors.getHasError(state),
  hasValidImages: imageSelectors.getHasValidResults(state),
  workEntities: workSelectors.getWorkEntities(state),
  fetchingWorks: workSelectors.getIsFetching(state),
  worksError: workSelectors.getError(state),
  worksHasError: workSelectors.getHasError(state),
  hasValidWorks: workSelectors.getHasValidResults(state)
})

const actions = {
  fetchWorksIfNeeded: workActions.fetchWorksIfNeeded,
  fetchImagesIfNeeded: imageActions.fetchImagesIfNeeded
}

export default connect(mapStateToProps, actions)(DumbHome)
