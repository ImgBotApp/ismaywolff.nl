import React from 'react'
import { shape, string, arrayOf, objectOf, object, bool } from 'prop-types'
import dateformat from 'dateformat'
import { Helmet } from 'react-helmet'
import { Title } from '../../../components/text'
import { Spinner } from '../../../components/spinner'
import { Box } from '../../../components/box'
import { AppError, MissingPageError } from '../../../components/errors'
import { Zoomable, ZoomableGrid } from '../../../components/zoomable'
import { AsyncReactMarkdown } from '../../../components/async'

const WorkDetailBody = ({ id, images, works, workEntities, imageEntities }) => {
  const fetchingWorks = works.isFetching || !works.didFetch
  const fetchingImages = images.isFetching || !images.didFetch
  const worksError = works.errorMessage
  const imagesError = images.errorMessage

  if (fetchingWorks || fetchingImages) {
    return <Spinner />
  }

  if (worksError || imagesError) {
    return <AppError errorMessage={worksError || imagesError} />
  }

  const requestedWork = workEntities[id]

  // If there's work but not the requested one
  if (works.result.length > 0 && !requestedWork) {
    return <MissingPageError />
  }

  return (
    <div>
      <Helmet>
        <title>{`${requestedWork.title} • Ismay Wolff`}</title>
        <meta name="description" content={`Detailed view of ${requestedWork.title}`} />
      </Helmet>
      <Box margin="var(--size-large) 0">
        <Title size="var(--size-large)" margin="0" tag="h2" center>{requestedWork.title}</Title>
        <Box margin="0" center>{`${requestedWork.type} - ${dateformat(
          requestedWork.published,
          'mmmm yyyy'
        )}`}</Box>
      </Box>
      <p>{requestedWork.summary}</p>
      <ZoomableGrid>
        {requestedWork.images.map(imageId =>
          <Zoomable image={imageEntities[imageId]} key={imageId} />
        )}
      </ZoomableGrid>
      {!!requestedWork.text && <AsyncReactMarkdown source={requestedWork.text} />}
    </div>
  )
}

WorkDetailBody.propTypes = {
  id: string.isRequired,
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
  }).isRequired
}

export default WorkDetailBody
