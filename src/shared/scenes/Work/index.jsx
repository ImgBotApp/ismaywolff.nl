import React, { Component } from 'react'
import { number, func, objectOf, object, shape, bool, string, arrayOf } from 'prop-types'
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
          images={this.props.images}
          works={this.props.works}
          workEntities={this.props.workEntities}
          imageEntities={this.props.imageEntities}
        />
      </div>
    )
  }
}

DumbWork.propTypes = {
  fetchImagesIfNeeded: func.isRequired,
  fetchWorksIfNeeded: func.isRequired,
  workEntities: objectOf(object).isRequired,
  imageEntities: objectOf(object).isRequired,
  works: shape({
    lastUpdated: number.isRequired,
    errorMessage: string.isRequired,
    isFetching: bool.isRequired,
    result: arrayOf(string).isRequired
  }).isRequired,
  images: shape({
    lastUpdated: number.isRequired,
    errorMessage: string.isRequired,
    isFetching: bool.isRequired,
    result: arrayOf(string).isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  imageEntities: imageSelectors.getImageEntities(state),
  images: imageSelectors.getImageState(state),
  workEntities: workSelectors.getWorkEntities(state),
  works: workSelectors.getWorkState(state)
})

const actions = {
  fetchWorksIfNeeded: workActions.fetchWorksIfNeeded,
  fetchImagesIfNeeded: imageActions.fetchImagesIfNeeded
}

export default connect(mapStateToProps, actions)(DumbWork)
