const metalsmith = require("metalsmith");
const inPlace = require("metalsmith-in-place");
const htmlMinifier = require("metalsmith-html-minifier");
const uglify = require("metalsmith-uglify");
const sitemap = require("metalsmith-sitemap");
const rss = require("metalsmith-rss");
const assets = require("metalsmith-assets");

// eslint-disable-next-line import/no-unresolved
const metadata = require("./metadata");

/**
 * Rss settings
 */

const rssSettings = {
  collection: "rss",
  feedOptions: {
    title: metadata.title,
    description: metadata.description,
    language: metadata.language,
    feed_url: metadata.rssAbsoluteUrl,
    site_url: metadata.host,
    pubDate: Date.now(),
    image_url: metadata.banner
  },
  destination: metadata.rssFilename
};

/**
 * Metalsmith build script
 */

metalsmith(__dirname)
  .metadata(metadata)
  .use(inPlace())
  .use(rss(rssSettings))
  .use(
    sitemap({
      hostname: metadata.host,
      omitIndex: true,
      omitExtension: true,
      lastmod: new Date()
    })
  )
  .use(htmlMinifier())
  .use(
    uglify({
      sameName: true
    })
  )
  .use(
    assets({
      source: "./lib/static",
      destination: "./"
    })
  )
  .build(err => {
    if (err) {
      throw err;
    }
  });
