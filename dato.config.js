const marked = require('marked');
const htmlTag = require('html-tag');
const dateformat = require('dateformat');

/**
 * Helpers
 */

// Renders tag info supplied by dato to actual html
const renderTag = ({ tagName, attributes = {}, content = '' }) => htmlTag(tagName, attributes, content);

// Returns a src for an image
const imageToSrc = (image, width, ratio) => image.url({
  w: width,
  h: Math.floor(width * ratio),
  fit: 'crop'
});

// Returns a srcSet for an image, according to a ratio and a predefined set of widths
const imageToSrcSet = (image, ratio) => {
  const widths = [100, 250, 500, 750, 1000];

  const srcSetParts = widths.map((width) => {
    const src = imageToSrc(image, width, ratio);
    return `${src} ${width}w`;
  });

  return srcSetParts.join(', ');
};

/**
 * Dato config
 */

module.exports = (dato, root) => {
  root.createDataFile('metadata.json', 'json', {
    faviconMetaTags: dato.site.faviconMetaTags.map(renderTag),
    footerLinks: marked(dato.footer.text)
  });

  root.createPost('src/index.njk', 'yaml', {
    frontmatter: {
      active: 'home',
      banner: {
        src: imageToSrc(dato.homePage.banner.thumbnail, 250, 4 / 7),
        srcSet: imageToSrcSet(dato.homePage.banner.thumbnail, 4 / 7),
        slug: dato.homePage.banner.slug,
        title: dato.homePage.banner.title,
        published: dateformat(dato.homePage.banner.published, 'mmmm yyyy'),
        medium: dato.homePage.banner.medium
      },
      homePageText: marked(dato.homePage.text),
      seoMetaTags: dato.homePage.seoMetaTags.map(renderTag),
      featured: dato.homePage.featured.map(work => ({
        src: imageToSrc(work.thumbnail, 250, 2 / 3),
        srcSet: imageToSrcSet(work.thumbnail, 2 / 3),
        slug: work.slug
      }))
    },
    content: '{% extends "./lib/pages/index.njk" %}'
  });

  root.createPost('src/work.njk', 'yaml', {
    frontmatter: {
      active: 'work',
      seoMetaTags: dato.workPage.seoMetaTags.map(renderTag),
      works: dato.works
        .sort((a, b) => b.published - a.published)
        .map(work => ({
          src: imageToSrc(work.thumbnail, 250, 2 / 3),
          srcSet: imageToSrcSet(work.thumbnail, 2 / 3),
          slug: work.slug
        }))
    },
    content: '{% extends "./lib/pages/work.njk" %}'
  });

  root.createPost('src/about.njk', 'yaml', {
    frontmatter: {
      active: 'about',
      aboutPageText: marked(dato.aboutPage.text),
      seoMetaTags: dato.aboutPage.seoMetaTags.map(renderTag)
    },
    content: '{% extends "./lib/pages/about.njk" %}'
  });

  root.directory('src/work', (workDir) => {
    dato.works.forEach((work) => {
      workDir.createPost(`${work.slug}.njk`, 'yaml', {
        frontmatter: {
          active: 'work',
          title: work.title,
          medium: work.medium,
          published: dateformat(work.published, 'mmmm yyyy'),
          text: work.text,
          images: work.images.map(image => ({
            src: image.url({ w: 250 }),
            srcSet: [100, 250, 500, 750, 1000, 1250, 1500]
              .map(width => `${image.url({ w: width })} ${width}w`).join(', ')
          })),
          seoMetaTags: work.seoMetaTags.map(renderTag)
        },
        content: '{% extends "./lib/pages/work-detail.njk" %}'
      });
    });
  });
};
