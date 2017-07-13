/* global window */

import React from 'react'
import { string, shape, number } from 'prop-types'
import ImageZoom from 'react-medium-image-zoom'
import { utils } from '../../../data/images'
import { Placeholder } from '../../placeholder'
import ZoomableGridItem from './ZoomableGridItem'

/**
 * Fallback viewport size when window isn't available (so on the server).
 * Taken from: http://gs.statcounter.com/screen-resolution-stats
 */

const fallbackViewport = {
  height: 640,
  width: 360
}

const Zoomable = ({ image }) => {
  /* istanbul ignore next: window isn't available when testing */
  const viewport = {
    height: typeof window === 'object' ? window.innerHeight : fallbackViewport.height,
    width: typeof window === 'object' ? window.innerWidth : fallbackViewport.width
  }

  /**
   * Fallback for browsers that don't support responsive images
   */

  const src = utils.createUrl({ url: image.url, width: 250 })

  /**
   * The available image sizes for the browser to choose from
   */

  const srcSet = `
    ${utils.createUrl({ url: image.url, width: 1500 })} 1500w,
    ${utils.createUrl({ url: image.url, width: 1250 })} 1250w,
    ${utils.createUrl({ url: image.url, width: 1000 })} 1000w,
    ${utils.createUrl({ url: image.url, width: 750 })} 750w,
    ${utils.createUrl({ url: image.url, width: 500 })} 500w,
    ${utils.createUrl({ url: image.url, width: 250 })} 250w
  `

  /**
   * The breakpoints that influence how wide the thumbnail images are displayed, from the bottom up
   * it's:
   *
   * - By default images are displayed at one image per row (so 100vw)
   * - From 25em wide the grid snaps to two images per row (so 50vw)
   * - From 30em wide the wrapping container constrains the width to 30rem & 2 img (so max is 15rem)
   * - From 40em wide the grid snaps to three images per row (so 10rem)
   */

  const sizes = `
    (min-width: 40em) 10rem,
    (min-width: 30em) 15rem,
    100vw
  `

  return (
    <ZoomableGridItem>
      <Placeholder height={1} width={image.width / image.height}>
        <ImageZoom
          image={{
            src,
            srcSet,
            sizes,
            alt: image.title
          }}
          zoomImage={{
            src,
            srcSet,
            sizes: `${utils.getRatio({ image, viewport })}vw`,
            alt: image.title
          }}
        />
      </Placeholder>
    </ZoomableGridItem>
  )
}

Zoomable.propTypes = {
  image: shape({
    title: string.isRequired,
    url: string.isRequired,
    width: number.isRequired,
    height: number.isRequired
  }).isRequired
}

export default Zoomable
