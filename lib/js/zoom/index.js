var ZoomImage = require("./zoom-image");
var classes = require("./classes");

var current;
var globalOptions;
var initialScrollPos;
var initialTouchPos;

/**
 * Sets up listener for clicks on all elements in the nodeList
 */

var init = function(nodeList, options) {
  globalOptions = options || {};

  for (var i = 0; i < nodeList.length; i += 1) {
    nodeList[i].addEventListener("click", prepareZoom);
  }
};

/**
 * Handles clicks to zoom zoomable images
 */

var prepareZoom = function(event) {
  // Do nothing if already zoomed
  if (document.body.classList.contains(classes.body.isZoomed)) {
    return;
  }

  // Allow opening in new window
  if (event.metaKey || event.ctrlKey) {
    var url = event.target.currentSrc || event.target.src;
    window.open(url, "_blank");

    return;
  }

  // Create a new zoom image, set it to current and zoom
  current = new ZoomImage(event.target, globalOptions);
  current.zoom();

  // Listen for anything that should close the zoomed image
  addCloseListeners();
};

/**
 * Close the currently zoomed image
 */

var closeCurrent = function() {
  if (!current) {
    return;
  }

  current.close();

  removeCloseListeners();
  current = undefined;
};

/**
 * Add and remove event listeners for closing the image
 */

var addCloseListeners = function() {
  document.addEventListener("scroll", handleScroll);
  document.addEventListener("keyup", handleKeyup);
  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("click", handleClick, true);
};

var removeCloseListeners = function() {
  document.removeEventListener("scroll", handleScroll);
  document.removeEventListener("keyup", handleKeyup);
  document.removeEventListener("touchstart", handleTouchStart);
  document.removeEventListener("click", handleClick, true);
};

/**
 * Event handlers
 */

var handleScroll = function() {
  if (!initialScrollPos) {
    initialScrollPos = window.pageYOffset;
  }

  var deltaY = Math.abs(initialScrollPos - window.pageYOffset);
  if (deltaY >= 40) {
    closeCurrent();
  }
};

var handleKeyup = function(event) {
  if (event.keyCode === 27) {
    closeCurrent();
  }
};

var handleTouchStart = function(event) {
  var t = event.touches[0];
  if (t == null) {
    return;
  }

  initialTouchPos = t.pageY;
  event.target.addEventListener("touchmove", handleTouchMove);
};

var handleTouchMove = function(event) {
  var t = event.touches[0];
  if (t == null) {
    return;
  }

  if (Math.abs(t.pageY - initialTouchPos) > 10) {
    closeCurrent();
    event.target.removeEventListener("touchmove", handleTouchMove);
  }
};

var handleClick = function() {
  closeCurrent();
};

/**
 * Main export
 */

module.exports = init;
