
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
    ['people_de', '/de/people/*.md'],
    ['people_en', '/en/people/*.md'],
    ['publications', '/publications/*.md'],
    ['projects_de', '/de/projects/*.md'],
    ['projects_en', '/en/projects/*.md'],
    ['events_de', '/de/events/*.md'],
    ['events_en', '/en/events/*.md'],
  ];

  mdCollections.forEach(c => {
    config.addCollection(c[0], function (collectionApi) {
      const items = collectionApi.getFilteredByGlob('./src/site' + c[1]);
      if (c[0] === 'publications' || c[0] === 'projects_de' || c[0] === 'projects_en'){
        items.sort((a, b) => {
          const aYear = a.data.year || 0;
          const bYear = b.data.year || 0;
          return parseInt(bYear) - parseInt(aYear);
        });
      }
      return items;
    });
  });

  const stripUrl = (url) => {
    if (url) {
      url = url.trim();
      if (url.slice(-1) === '/') {
        url = url.slice(0, -1);
      }
    }
    return url;
  };

  config.addCollection('map', function (collectionApi) {
    const map = {
      indices: {},
      lists: {}
    };

    mdCollections.forEach(c => {
      if (!(c[0] in map.indices)) {
        map.indices[c[0]] = {};
      }

      let items = collectionApi.getFilteredByGlob('./src/site' + c[1]);
      if (c[0] === 'publications' || c[0] === 'projects_de' || c[0] === 'projects_en'){
        items.sort((a, b) => {
          const aYear = a.data.year || 0;
          const bYear = b.data.year || 0;
          return parseInt(bYear) - parseInt(aYear);
        });
      }

      items.forEach((item, i) => {
        // from url to index in collection
        map.indices[c[0]][stripUrl(item.url)] = i;

        if (c[0] === 'publications') {
          if (!('people_de_publications' in map.lists)) {
            map.lists['people_de_publications'] = {};
            map.lists['people_en_publications'] = {};
          }
          // create list of publications per author
          const foundAuthors = {de:[],en:[]};
          item.data.authors.forEach(a => {
            if (a.internal_author_de && a.internal_author_de.length > 3) {
              foundAuthors.de.push(stripUrl(a.internal_author_de));
              foundAuthors.en.push(stripUrl(a.internal_author_en));
            }
          });
          Object.keys(foundAuthors).forEach(lang => {
            foundAuthors[lang].forEach(author => {
              if(!(author in map.lists['people_' + lang + '_publications'])) {
                map.lists['people_' + lang + '_publications'][author] = [];
              }
              map.lists['people_' + lang + '_publications'][author].push(i);
            });
          });
        }

        if (c[0] === 'projects_de' || c[0] === 'projects_en') {
          if (!('people_de_projects' in map.lists)) {
            map.lists['people_de_projects'] = {};
            map.lists['people_en_projects'] = {};
          }
          // create list of publications per author
          // const foundAuthors = {de:[],en:[]};
          // item.data.authors.forEach(a => {
          //   if (a.internal_author_de && a.internal_author_de.length > 3) {
          //     foundAuthors.de.push(stripUrl(a.internal_author_de));
          //     foundAuthors.en.push(stripUrl(a.internal_author_en));
          //   }
          // });
          // Object.keys(foundAuthors).forEach(lang => {
          //   foundAuthors[lang].forEach(author => {
          //     if(!(author in map.lists['people_' + lang + '_publications'])) {
          //       map.lists['people_' + lang + '_publications'][author] = [];
          //     }
          //     map.lists['people_' + lang + '_publications'][author].push(i);
          //   });
          // });
        }
      });
    });

    return map;
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

  config.addNunjucksFilter("stripUrl", function (url) {
    return stripUrl(url);
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