import React from 'react'
import { number, object, objectOf, shape, bool, string, arrayOf } from 'prop-types'
import { Thumbnail, ThumbnailGrid } from '../../../components/thumbnail'
import { Title, TitleWithLine } from '../../../components/text'
import { AppError } from '../../../components/errors'
import { Spinner } from '../../../components/spinner'
import { Link } from '../../../components/link'
import { Hero } from '../../../components/hero'
import { Box } from '../../../components/box'

const HomeBody = ({ works, images, workEntities, imageEntities, featured, hero }) => {
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

  // For multiple heros an item is picked randomly
  const heroId = hero[Math.floor(Math.random() * hero.length)]

  return (
    <div>
      <Hero work={workEntities[heroId]} image={imageEntities[workEntities[heroId].thumbnail]} />
      <Box margin="var(--size-larger) 0 var(--size-larger) 0">
        <Title tag="h2">Hi there</Title>
        <p>
          I'm an artist, a social scientist and a software engineer. My work is a combination of the
          most inspiring parts of those disciplines and an expression of everything that interests,
          moves or inspires me.
        </p>
        <Box center>
          <Link size="var(--size-small)" to="/about">
            Learn more
          </Link>
        </Box>
      </Box>
      <Box margin="var(--size-larger) 0 0 0">
        <TitleWithLine tag="h2" size="var(--size-small)">
          Featured work
        </TitleWithLine>
        <Box margin="var(--size-regular) 0 var(--size-regular) 0">
          <ThumbnailGrid>
            {featured.map(id =>
              <Thumbnail
                work={workEntities[id]}
                image={imageEntities[workEntities[id].thumbnail]}
                key={id}
              />
            )}
          </ThumbnailGrid>
        </Box>
        <Box center>
          <Link size="var(--size-small)" to="/work">
            See all work
          </Link>
        </Box>
      </Box>
    </div>
  )
}

HomeBody.propTypes = {
  hero: arrayOf(string).isRequired,
  featured: arrayOf(string).isRequired,
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

export default HomeBody
