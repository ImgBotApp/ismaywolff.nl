/* eslint-env browser */
/* eslint-disable no-var */

/**
 * Returns the width in pixels that the image needs to have to fill the entire viewport, without
 * scaling and without being cut-off.
 */

module.exports = function getZoomedWidth(image) {
  var imageRatio = image.height / image.width;
  var windowRatio = window.innerHeight / window.innerWidth;

  /**
   * For this ratio difference, height of the image is the limiting factor.
   * So we use height to proportionally calculate the rendered width.
   */

  if (imageRatio > windowRatio) {
    return Math.round(image.width * window.innerHeight / image.height);
  }

  // Otherwise the image will fill a 100% of the viewport
  return window.innerWidth;
};
