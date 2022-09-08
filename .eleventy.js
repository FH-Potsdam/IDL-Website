
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const moment = require('moment');

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const slugify = require('@sindresorhus/slugify')

const util = require('util')

module.exports = function(config) {

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor,{ slugify: s => slugify(s) }, {
    permalink: false,
  });
  config.setLibrary("md", markdownLibrary);
  

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Load netlify CMS markdown folders as collections:
  const mdCollections = [
    ['projects_de', '/de/projects/*.md'],
    ['projects_en', '/en/projects/*.md'],
    ['people_de', '/de/people/*.md'],
    ['people_en', '/en/people/*.md'],
    ['events_de', '/de/events/*.md'],
    ['events_en', '/en/events/*.md'],
    ['publications', '/publications/*.md'],
  ];

  mdCollections.forEach(c => {
    config.addCollection(c[0], function (collectionApi) {
      return collectionApi.getFilteredByGlob('./src/site' + c[1]);
    });
  });

  config.addCollection('map', function (collectionApi) {
    const all = collectionApi.getAll();
    return [];
  });

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/default.njk');

  // Add some utility filters
  config.addFilter("squash", require("./src/utils/filters/squash.js") );

  config.addFilter('dumper', obj => {
    return util.inspect(obj)
  });

  // add support for syntax highlighting
  config.addPlugin(syntaxHighlight);

  // minify the html output
  // this breaks for permalink: false
  // config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // compress and combine js files
  config.addFilter("jsmin", function(code) {
    const UglifyJS = require("uglify-js");
    let minified = UglifyJS.minify(code);
      if( minified.error ) {
          console.log("UglifyJS error: ", minified.error);
          return code;
      }
      return minified.code;
  });

  config.addNunjucksFilter("date", function (date, format, locale) {
    locale = locale ? locale : "en";
    moment.locale(locale);
    return moment(date).format(format);
  });

  // pass some assets right through
  config.addPassthroughCopy("./src/site/images");
  config.addPassthroughCopy("./src/site/fonts");
  config.addPassthroughCopy("./src/site/admin");

  // make the seed target act like prod
  env = (env=="seed") ? "prod" : env;
  return {
    dir: {
      input: "src/site",
      output: "dist"
    },
    templateFormats : ["njk", "md", "11ty.js"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

  

};