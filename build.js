const metalsmith = require('metalsmith');
const inPlace = require('metalsmith-in-place');
const metadata = require('./metadata');

metalsmith(__dirname)
  .metadata(metadata)
  .use(inPlace())
  .build((err) => {
    if (err) {
      throw err;
    }
  });
