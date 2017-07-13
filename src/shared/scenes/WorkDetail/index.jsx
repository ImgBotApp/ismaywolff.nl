import React, { Component } from 'react'
import { object, objectOf, bool, func, shape, string, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { actions as workActions, selectors as workSelectors } from '../../data/works'
import { actions as imageActions, selectors as imageSelectors } from '../../data/images'
import WorkDetailBody from './components/WorkDetailBody'

export class DumbWorkDetail extends Component {
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
        <WorkDetailBody
          id={this.props.match.params.id}
          images={this.props.images}
          works={this.props.works}
          workEntities={this.props.workEntities}
          imageEntities={this.props.imageEntities}
        />
      </div>
    )
  }
}

DumbWorkDetail.propTypes = {
  fetchImagesIfNeeded: func.isRequired,
  fetchWorksIfNeeded: func.isRequired,
  workEntities: objectOf(object).isRequired,
  imageEntities: objectOf(object).isRequired,
  works: shape({
    didFetch: bool.isRequired,
    errorMessage: string.isRequired,
    isFetching: bool.isRequired,
    result: arrayOf(string).isRequired
  }).isRequired,
  images: shape({
    didFetch: bool.isRequired,
    errorMessage: string.isRequired,
    isFetching: bool.isRequired,
    result: arrayOf(string).isRequired
  }).isRequired,
  match: shape({
    params: object.isRequired
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

export default connect(mapStateToProps, actions)(DumbWorkDetail)
