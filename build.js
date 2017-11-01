const metalsmith = require('metalsmith');
const inPlace = require('metalsmith-in-place');
const htmlMinifier = require('metalsmith-html-minifier');
const metadata = require('./metadata');

metalsmith(__dirname)
  .metadata(metadata)
  .use(inPlace())
  .use(htmlMinifier())
  .build((err) => {
    if (err) {
      throw err;
    }
  });
