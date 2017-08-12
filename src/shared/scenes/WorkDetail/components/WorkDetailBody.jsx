import React from 'react'
import { string, objectOf, object, bool } from 'prop-types'
import dateformat from 'dateformat'
import { Helmet } from 'react-helmet'
import { Title } from '../../../components/text'
import { Spinner } from '../../../components/spinner'
import { Box } from '../../../components/box'
import { AppError } from '../../../components/errors'
import { Zoomable, ZoomableGrid } from '../../../components/zoomable'
import Missing from '../../Missing'

const WorkDetailBody = ({
  id,
  workEntities,
  imageEntities,
  fetchingImages,
  fetchingWorks,
  hasValidImages,
  hasValidWorks,
  imagesError,
  worksError,
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

  const requestedWork = workEntities[id]

  // If there's work but not the requested one
  if (!requestedWork) {
    return <Missing />
  }

  return (
    <div>
      <Helmet>
        <title>{`${requestedWork.title} • Ismay Wolff`}</title>
        <meta name="description" content={`Detailed view of ${requestedWork.title}`} />
      </Helmet>
      <Box margin="var(--size-large) 0">
        <Title size="var(--size-large)" margin="0" tag="h2" center>
          {requestedWork.title}
        </Title>
        <Box margin="0" center>{`${requestedWork.type} - ${dateformat(
          requestedWork.published,
          'mmmm yyyy'
        )}`}</Box>
      </Box>
      <p>
        {requestedWork.summary}
      </p>
      <ZoomableGrid>
        {requestedWork.images.map(imageId =>
          <Zoomable image={imageEntities[imageId]} key={imageId} />
        )}
      </ZoomableGrid>
      <Box
        color="var(--color-gray-dark)"
        size="var(--size-small)"
        margin="var(--size-regular) 0"
        center
      >
        Click the images to zoom
      </Box>
    </div>
  )
}

WorkDetailBody.propTypes = {
  id: string.isRequired,
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

export default WorkDetailBody
