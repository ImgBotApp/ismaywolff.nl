/**
 * Returns the part of the viewport that the image will fill when zoomed.
 */

module.exports = function getZoomedWidth(image, margin) {
  var imageRatio = image.height / image.width;
  var windowRatio = window.innerHeight / window.innerWidth;
  var zoomedWidthInPixels;

  /**
   * For this ratio difference, height of the image is the limiting factor. So we use height to
   * proportionally calculate the rendered width.
   */

  if (imageRatio > windowRatio) {
    zoomedWidthInPixels = image.width * (window.innerHeight - margin) / image.height;
    return Math.round(zoomedWidthInPixels / window.innerWidth * 100) + "vw";
  }

  // Otherwise the image will fill a 100% of the viewport (minus margin)
  zoomedWidthInPixels = window.innerWidth - margin;
  return Math.round(zoomedWidthInPixels / window.innerWidth * 100) + "vw";
};
