import React, { Component } from 'react'
import { func, objectOf, object, bool, string, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { actions as workActions, selectors as workSelectors } from '../../data/works'
import { actions as imageActions, selectors as imageSelectors } from '../../data/images'
import WorkBody from './components/WorkBody'

export class DumbWork extends Component {
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
          <title>Work • Ismay Wolff</title>
          <meta name="description" content="An overview of my work" />
        </Helmet>
        <WorkBody
          fetchingImages={this.props.fetchingImages}
          hasValidImages={this.props.hasValidImages}
          imagesError={this.props.imagesError}
          imagesHasError={this.props.imagesHasError}
          imageEntities={this.props.imageEntities}
          fetchingWorks={this.props.fetchingWorks}
          hasValidWorks={this.props.hasValidWorks}
          worksError={this.props.worksError}
          workResults={this.props.workResults}
          worksHasError={this.props.worksHasError}
          workEntities={this.props.workEntities}
        />
      </div>
    )
  }
}

DumbWork.propTypes = {
  fetchImagesIfNeeded: func.isRequired,
  fetchWorksIfNeeded: func.isRequired,
  fetchingImages: bool.isRequired,
  hasValidImages: bool.isRequired,
  imageEntities: objectOf(object).isRequired,
  imagesError: string.isRequired,
  imagesHasError: bool.isRequired,
  fetchingWorks: bool.isRequired,
  hasValidWorks: bool.isRequired,
  workEntities: objectOf(object).isRequired,
  worksError: string.isRequired,
  workResults: arrayOf(string).isRequired,
  worksHasError: bool.isRequired
}

const mapStateToProps = state => ({
  imageEntities: imageSelectors.getImageEntities(state),
  fetchingImages: imageSelectors.getIsFetching(state),
  imagesError: imageSelectors.getError(state),
  imagesHasError: imageSelectors.getHasError(state),
  hasValidImages: imageSelectors.getHasValidResults(state),
  workEntities: workSelectors.getWorkEntities(state),
  fetchingWorks: workSelectors.getIsFetching(state),
  worksError: workSelectors.getError(state),
  workResults: workSelectors.getResults(state),
  worksHasError: workSelectors.getHasError(state),
  hasValidWorks: workSelectors.getHasValidResults(state)
})

const actions = {
  fetchWorksIfNeeded: workActions.fetchWorksIfNeeded,
  fetchImagesIfNeeded: imageActions.fetchImagesIfNeeded
}

export default connect(mapStateToProps, actions)(DumbWork)
