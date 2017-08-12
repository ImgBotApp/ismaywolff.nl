import React from 'react'
import { arrayOf, bool, string, objectOf, object } from 'prop-types'
import { Spinner } from '../../../components/spinner'
import { AppError } from '../../../components/errors'
import { Thumbnail, ThumbnailGrid } from '../../../components/thumbnail'

const WorkBody = ({
  workEntities,
  imageEntities,
  fetchingImages,
  fetchingWorks,
  hasValidImages,
  hasValidWorks,
  imagesError,
  worksError,
  workResults,
  imagesHasError,
  worksHasError
}) => {
  if (fetchingWorks || fetchingImages) {
    return <Spinner />
  }

  if (worksHasError || imagesHasError) {
    return <AppError errorMessage={worksError || imagesError} />
  }

  if (!hasValidWorks || !hasValidImages) {
    return null
  }

  return (
    <ThumbnailGrid>
      {workResults.map(id =>
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

export default WorkBody
