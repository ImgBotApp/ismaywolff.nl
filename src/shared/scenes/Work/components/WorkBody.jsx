import React from 'react'
import { number, shape, bool, string, arrayOf, objectOf, object } from 'prop-types'
import { Spinner } from '../../../components/spinner'
import { AppError } from '../../../components/errors'
import { Thumbnail, ThumbnailGrid } from '../../../components/thumbnail'

const WorkBody = ({ images, works, imageEntities, workEntities }) => {
  const fetchingWorks = works.isFetching || !works.lastUpdated
  const fetchingImages = images.isFetching || !images.lastUpdated
  const worksError = works.errorMessage
  const imagesError = images.errorMessage

  if (fetchingWorks || fetchingImages) {
    return <Spinner />
  }

  if (worksError || imagesError) {
    return <AppError errorMessage={worksError || imagesError} />
  }

  return (
    <ThumbnailGrid>
      {works.result.map(id =>
        <Thumbnail
          work={workEntities[id]}
          image={imageEntities[workEntities[id].thumbnail]}
          key={id}
        />
      )}
    </ThumbnailGrid>
  )
}

WorkBody.propTypes = {
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

export default WorkBody
