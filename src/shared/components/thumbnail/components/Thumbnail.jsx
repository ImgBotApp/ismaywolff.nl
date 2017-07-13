import React from 'react'
import { string, number, shape, arrayOf, bool } from 'prop-types'
import { utils } from '../../../data/images'
import { Placeholder } from '../../placeholder'
import { Button } from '../../button'
import { Link } from '../../link'
import ThumbnailGridItem from './ThumbnailGridItem'
import ThumbnailButtonWrapper from './ThumbnailButtonWrapper'

const Thumbnail = ({ work, image }) => {
  const ratio = 2 / 3

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
   * The breakpoints that influence how wide images are displayed, from the bottom up it's:
   *
   * - By default images are displayed at one image per row (so 100vw)
   * - From 30em wide the wrapping container constrains the width to 30rem & 2 img (so max is 15rem)
   */

  const sizes = `
    (min-width: 30em) 15rem,
    100vw
  `

  return (
    <ThumbnailGridItem>
      <Link to={`/work/${work.slug}`}>
        <Placeholder width={1} height={1 * ratio}>
          <img src={src} srcSet={srcSet} sizes={sizes} alt={image.title} />
        </Placeholder>
        <ThumbnailButtonWrapper>
          <Button dark>View work →</Button>
        </ThumbnailButtonWrapper>
      </Link>
    </ThumbnailGridItem>
  )
}

Thumbnail.propTypes = {
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

export default Thumbnail
