const metalsmith = require("metalsmith");
const inPlace = require("metalsmith-in-place");
const htmlMinifier = require("metalsmith-html-minifier");
const sitemap = require("metalsmith-sitemap");

// eslint-disable-next-line import/no-unresolved
const metadata = require("./metadata");

metalsmith(__dirname)
  .metadata(metadata)
  .use(inPlace())
  .use(htmlMinifier())
  .use(
    sitemap({
      hostname: metadata.hostname,
      omitIndex: true,
      omitExtension: true,
      lastmod: new Date()
    })
  )
  .build(err => {
    if (err) {
      throw err;
    }
  });
