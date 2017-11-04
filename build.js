const metalsmith = require("metalsmith");
const inPlace = require("metalsmith-in-place");
const htmlMinifier = require("metalsmith-html-minifier");
const uglify = require("metalsmith-uglify");
const sitemap = require("metalsmith-sitemap");

// eslint-disable-next-line import/no-unresolved
const metadata = require("./metadata");

metalsmith(__dirname)
  .metadata(metadata)
  .use(inPlace())
  .use(htmlMinifier())
  .use(
    uglify({
      sameName: true
    })
  )
  .use(
    sitemap({
      hostname: metadata.productionFrontendUrl,
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
