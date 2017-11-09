var zoom = require("./zoom");
var getZoomedWidth = require("./get-zoomed-width");

/**
 * Allow image zooming
 */

var zoomImages = document.querySelectorAll(".Zoomable");
var margin = 32;

if (zoomImages.length > 0) {
  // Set zoomed-width data attribute for all images
  for (var i = 0; i < zoomImages.length; i += 1) {
    var imageDataset = zoomImages[i].dataset;
    imageDataset.zoomedWidth = getZoomedWidth(zoomImages[i], margin);
  }

  zoom(zoomImages, { margin: margin });
}
