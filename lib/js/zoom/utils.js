/**
 * Calculate the transform needed to zoom the image
 */

var calculateImgTransform = function(img, margin) {
  var imageHeight = img.height;
  var imageWidth = img.width;
  var windowHeight = window.innerHeight - margin;
  var windowWidth = window.innerWidth - margin;
  var imageRatio = imageHeight / imageWidth;
  var viewportRatio = windowHeight / windowWidth;

  // Calculate the width to zoom to
  var zoomedWidth;
  if (imageRatio > viewportRatio) {
    zoomedWidth = imageWidth * windowHeight / imageHeight;
  } else {
    zoomedWidth = windowWidth;
  }

  return "scale(" + zoomedWidth / imageWidth + ")";
};

/**
 * Calculates the transform needed to move the image to the center of the viewport
 */

var calculateWrapTransform = function(img) {
  var imageRect = img.getBoundingClientRect();
  var imageOffsetTop = imageRect.top + window.pageYOffset - document.documentElement.clientTop;
  var imageOffsetLeft = imageRect.left + window.pageXOffset - document.documentElement.clientLeft;
  var imageCenterX = imageOffsetLeft + img.width / 2;
  var imageCenterY = imageOffsetTop + img.height / 2;

  var scrollTop = window.pageYOffset;
  var viewportX = window.innerWidth / 2;
  var viewportY = scrollTop + window.innerHeight / 2;

  var tx = viewportX - imageCenterX;
  var ty = viewportY - imageCenterY;
  var tz = 0;

  return "translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
};

/**
 * Runs the provided callback as soon as possible after style and layout information have been
 * calculated and the paint has occurred
 *
 * https://developer.mozilla.org/en-US/Firefox/Performance_best_practices_for_Firefox_fe_engineers
 */

var afterPaint = function(cb) {
  window.requestAnimationFrame(function() {
    setTimeout(cb, 0);
  });
};

/**
 * Attach an event listener and remove it after it's been called
 */

var once = function(element, type, cb) {
  var fn = function(event) {
    event.target.removeEventListener(type, fn);
    cb();
  };
  element.addEventListener(type, fn);
};

/**
 * Main export
 */

module.exports = {
  calculateWrapTransform: calculateWrapTransform,
  calculateImgTransform: calculateImgTransform,
  afterPaint: afterPaint,
  once: once
};
