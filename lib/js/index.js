/* eslint-env browser */
/* eslint-disable no-var, func-names, vars-on-top, no-plusplus, prefer-template */

var mediumZoom = require("./medium-zoom");
var getZoomedWidth = require("./get-zoomed-width");

/**
 * Allow image zooming
 */

var zoomImages = document.querySelectorAll("[data-zoom]");

if (zoomImages.length > 0) {
  // Calculate and set zoomed-width data attribute for zoomable images
  for (var i = 0; i < zoomImages.length; i++) {
    var image = zoomImages[i].dataset;
    var zoomedWidth = getZoomedWidth(image);

    image.zoomTarget = image.url + "?w=" + zoomedWidth;
  }

  // Enable medium-zoom
  mediumZoom(zoomImages, { margin: 16 });
}
