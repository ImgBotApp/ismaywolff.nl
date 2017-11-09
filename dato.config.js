const marked = require("marked");
const dateformat = require("dateformat");
const urlJoin = require("url-join");
const mime = require("mime-types");
const { renderTag, imageToSrc, imageToSrcSet } = require("./dato.helpers");

/**
 * Used by metalsmith-rss
 */

const rssFilename = "rss.xml";

/**
 * Dato config
 */

module.exports = (dato, root) => {
  /**
   * Make sure that there is a single language
   */

  if (dato.site.entity.locales.length !== 1) {
    throw Error("Check dato language settings, multiple languages or no language set.");
  }

  /**
   * Global metadata
   */

  root.createDataFile("metadata.json", "json", {
    title: dato.site.globalSeo.siteName,
    description: dato.site.globalSeo.fallbackSeo.description,
    host: dato.site.entity.productionFrontendUrl,
    language: dato.site.entity.locales[0],
    faviconMetaTags: dato.site.faviconMetaTags.map(renderTag),

    /**
     * Used by metalsmith-rss
     */

    rssFilename,
    rssAbsoluteUrl: urlJoin(dato.site.entity.productionFrontendUrl, rssFilename),
    rssRelativeUrl: `/${rssFilename}`,
    banner: dato.homePage.banner.thumbnail.url({ w: 500, auto: "format", q: 80 }),
    collections: {
      rss: dato.works.sort((a, b) => b.published - a.published).map(work => ({
        title: work.title,
        date: work.published,
        description: work.text,
        url: urlJoin(dato.site.entity.productionFrontendUrl, "/work/", work.slug),
        enclosure: {
          url: work.thumbnail
            .url({ w: 500, auto: "format", q: 80 })
            .replace(/^https:\/\//i, "http://"),
          type: mime.lookup(work.thumbnail.format)
        }
      }))
    }
  });

  /**
   * Home
   */

  root.createPost("src/index.njk", "yaml", {
    frontmatter: {
      active: "home",
      canonical: dato.site.entity.productionFrontendUrl,
      banner: {
        src: imageToSrc(dato.homePage.banner.thumbnail, 250, 4 / 7),
        srcSet: imageToSrcSet(dato.homePage.banner.thumbnail, 4 / 7),
        slug: dato.homePage.banner.slug,
        title: dato.homePage.banner.title,
        published: dateformat(dato.homePage.banner.published, "mmmm yyyy"),
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

  /**
   * Work index
   */

  root.createPost("src/work.njk", "yaml", {
    frontmatter: {
      active: "work",
      canonical: urlJoin(dato.site.entity.productionFrontendUrl, "work"),
      seoMetaTags: dato.workPage.seoMetaTags.map(renderTag),
      works: dato.works.sort((a, b) => b.published - a.published).map(work => ({
        src: imageToSrc(work.thumbnail, 250, 2 / 3),
        srcSet: imageToSrcSet(work.thumbnail, 2 / 3),
        slug: work.slug
      }))
    },
    content: '{% extends "./lib/pages/work.njk" %}'
  });

  /**
   * About
   */

  root.createPost("src/about.njk", "yaml", {
    frontmatter: {
      active: "about",
      canonical: urlJoin(dato.site.entity.productionFrontendUrl, "about"),
      aboutPageText: marked(dato.aboutPage.text),
      seoMetaTags: dato.aboutPage.seoMetaTags.map(renderTag)
    },
    content: '{% extends "./lib/pages/about.njk" %}'
  });

  /**
   * Work detail
   */

  root.directory("src/work", workDir => {
    dato.works.forEach(work => {
      workDir.createPost(`${work.slug}.njk`, "yaml", {
        frontmatter: {
          active: "work",
          canonical: urlJoin(dato.site.entity.productionFrontendUrl, "/work/", work.slug),
          title: work.title,
          medium: work.medium,
          published: dateformat(work.published, "mmmm yyyy"),
          text: work.text,
          images: work.images.map(image => ({
            src: image.url({ w: 250, auto: "format", q: 80 }),
            srcSet: [100, 250, 500, 750, 1000, 1250, 1500]
              .map(width => `${image.url({ w: width, auto: "format", q: 80 })} ${width}w`)
              .join(", ")
          })),
          seoMetaTags: work.seoMetaTags.map(renderTag)
        },
        content: '{% extends "./lib/pages/work-detail.njk" %}'
      });
    });
  });
};
