import React from 'react'
import { arrayOf, string, number, bool, shape } from 'prop-types'
import dateformat from 'dateformat'
import { utils } from '../../../data/images'
import { Title, utils as textUtils } from '../../text'
import { Box } from '../../box'
import { Placeholder } from '../../placeholder'
import { FakeButton } from '../../button'
import { Link } from '../../link'
import HeroDetail from './HeroDetail'
import HeroWrapper from './HeroWrapper'

const Hero = ({ work, image }) => {
  const ratio = 4 / 7

  /**
   * Fallback for browsers that don't support responsive images
   */

  const src = utils.createUrl({
    url: image.url,
    width: 250,
    height: Math.floor(250 * ratio),
    fill: true
  })

  /**
   * The available image sizes for the browser to choose from
   */

  const srcSet = `
    ${utils.createUrl({
      url: image.url,
      width: 1000,
      height: Math.floor(1000 * ratio),
      fill: true
    })} 1000w,
    ${utils.createUrl({
      url: image.url,
      width: 750,
      height: Math.floor(750 * ratio),
      fill: true
    })} 750w,
    ${utils.createUrl({
      url: image.url,
      width: 500,
      height: Math.floor(500 * ratio),
      fill: true
    })} 500w,
    ${utils.createUrl({
      url: image.url,
      width: 250,
      height: Math.floor(250 * ratio),
      fill: true
    })} 250w,
    ${utils.createUrl({
      url: image.url,
      width: 100,
      height: Math.floor(100 * ratio),
      fill: true
    })} 100w
  `

  /**
   * The breakpoints that influence how wide the hero image is displayed, from the bottom up it's:
   *
   * - By default the hero image is full width (so 100vw)
   * - From 30em wide the wrapping container constrains the width to 30rem
   */

  const sizes = `
    (min-width: 30em) 30rem,
    100vw
  `

  return (
    <HeroWrapper>
      <Link to={`/work/${work.slug}`}>
        <Placeholder ratio={ratio}>
          <img src={src} srcSet={srcSet} sizes={sizes} alt={image.title} />
        </Placeholder>
        <HeroDetail>
          <div>
            <Title tag="h2" margin="0">
              {textUtils.truncate(work.title, 30)}
            </Title>
            <Box size="var(--size-small)">
              {textUtils.truncate(`${work.type} - ${dateformat(work.published, 'mmmm yyyy')}`, 60)}
            </Box>
          </div>
          <Box margin="0 0 0 auto">
            <FakeButton>View work →</FakeButton>
          </Box>
        </HeroDetail>
      </Link>
    </HeroWrapper>
  )
}

Hero.propTypes = {
  work: shape({
    title: string.isRequired,
    slug: string.isRequired,
    thumbnail: string.isRequired,
    type: string.isRequired,
    published: string.isRequired,
    summary: string.isRequired,
    images: arrayOf(string).isRequired,
    hero: bool.isRequired,
    featured: bool.isRequired
  }).isRequired,
  image: shape({
    title: string.isRequired,
    url: string.isRequired,
    width: number.isRequired,
    height: number.isRequired
  }).isRequired
}

export default Hero
