/**
 * Appends any parameters to create a valid url for a
 * contentful image asset.
 */

export const createUrl = ({ url, width, height, fill }) => {
  const fillParam = fill ? 'fit=fill&' : ''
  const widthParam = width ? `w=${width}` : ''
  const heightParam = height ? `&h=${height}` : ''

  return `${url}?${fillParam}${widthParam}${heightParam}&fl=progressive`
}

/**
 * Calculates amount of the viewport that the image will fill when
 * displayed fullscreen. This depends on the proportions of the image vs
 * the proportions of the viewport, since for images that are taller than the
 * viewport the full width won't be used. Returns an integer that
 * represents the percentage of the viewport that the image will
 * fill horizontally.
 */

export const getRatio = ({ image, viewport }) => {
  // Ratio over 1 means portrait orientation, under 1 is landscape
  const imageRatio = image.height / image.width
  const viewportRatio = viewport.height / viewport.width

  /**
   * For this ratio difference, height of the image is the limiting factor.
   * So we use height to proportionally calculate the rendered width.
   */

  if (imageRatio > viewportRatio) {
    const renderedWidth = image.width * viewport.height / image.height
    return Math.round(renderedWidth / viewport.width * 100)
  }

  // Otherwise the image will fill a 100% of the viewport
  return 100
}
