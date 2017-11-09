var utils = require("./utils");
var classes = require("./classes");
var attr = require("./attr");

/**
 * ZoomImage class
 */

function ZoomImage(img, options) {
  this.img = img;
  this.margin = options.margin || 0;
  this.preservedTransform = img.style.transform;

  this.zoom = function() {
    /**
     * If the zoomed width is known, attempt to load a highres version of the image, and swap it out
     * with the zoomed image when loaded
     */

    if (this.img.dataset[attr.zoomedWidth]) {
      var clone = this.img.cloneNode();
      var zoomedWidth = this.img.dataset[attr.zoomedWidth];

      clone.onload = function() {
        this.img.setAttribute("sizes", zoomedWidth);
      }.bind(this);

      clone.setAttribute("sizes", zoomedWidth);
    }

    // Run calculations before changing DOM
    var imgTransform = utils.calculateImgTransform(this.img, this.margin);
    var wrapTransform = utils.calculateWrapTransform(this.img);

    // Create wrapping div
    this.wrap = document.createElement("div");
    this.wrap.classList.add(classes.wrap);

    // Create overlay
    this.overlay = document.createElement("div");
    this.overlay.classList.add(classes.overlay);

    // Write to dom
    this.img.classList.add(classes.img, classes.zoomable.isZoomed);
    this.img.parentNode.insertBefore(this.wrap, this.img);
    this.wrap.appendChild(this.img);
    document.body.appendChild(this.overlay);

    // Apply styles as soon as possible after repaint
    utils.afterPaint(
      function() {
        this.img.style.transform = imgTransform;
        this.wrap.style.transform = wrapTransform;

        // Set classes to transition overlay and set pointer
        document.body.classList.add(classes.body.zoom, classes.body.isZoomed);
      }.bind(this)
    );
  };

  this.close = function() {
    // Start transitioning back
    document.body.classList.add(classes.body.isUnzooming);

    // Put original transform back
    this.img.style.transform = this.preservedTransform;

    // Remove style if it's empty
    if (this.img.style.length === 0) {
      this.img.removeAttribute("style");
    }

    // Remove transform from the wrap
    this.wrap.style.transform = "none";

    // Clean elements and classes when the transition is done
    utils.once(this.img, "transitionend", this.dispose.bind(this));
  };

  this.dispose = function() {
    if (!this.wrap || !this.wrap.parentNode) {
      return;
    }

    // Remove image classes
    this.img.classList.remove(classes.img, classes.zoomable.isZoomed);

    // Put image back and remove wrap
    this.wrap.parentNode.insertBefore(this.img, this.wrap);
    this.wrap.parentNode.removeChild(this.wrap);

    // Remove overlay and body classes
    document.body.removeChild(this.overlay);
    document.body.classList.remove(
      classes.body.isUnzooming,
      classes.body.zoom,
      classes.body.isZoomed
    );
  };
}

/**
 * Main export
 */

module.exports = ZoomImage;
