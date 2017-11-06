const htmlTag = require("html-tag");

/**
 * Renders tag info supplied by dato to actual html
 */

const renderTag = ({ tagName, attributes = {}, content = "" }) =>
  htmlTag(tagName, attributes, content);

/**
 * Returns a src for an image
 */

const imageToSrc = (image, width, ratio) =>
  image.url({
    w: width,
    h: Math.floor(width * ratio),
    fit: "crop"
  });

/**
 * Returns a srcSet for an image, according to a ratio and a predefined set of widths
 */

const imageToSrcSet = (image, ratio) => {
  const widths = [100, 250, 500, 750, 1000];

  const srcSetParts = widths.map(width => {
    const src = imageToSrc(image, width, ratio);
    return `${src} ${width}w`;
  });

  return srcSetParts.join(", ");
};

module.exports = {
  renderTag,
  imageToSrc,
  imageToSrcSet
};
