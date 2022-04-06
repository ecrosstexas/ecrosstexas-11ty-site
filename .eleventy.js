const plugins = require("./11ty/plugins.js");

const { toAbsoluteUrl } = require("./11ty/filters");
const { dateToISO } = require("./11ty/filters/date.js");
const dir = require("./11ty/constants/dir.js");
const imageShortcode = require("./11ty/shortcodes/image.js");
const faviconShortcode = require("./11ty/shortcodes/favicon.js");

// Template language for the site: https://www.11ty.dev/docs/languages/liquid/
const TEMPLATE_ENGINE = 'liquid';

module.exports = (eleventyConfig) => {
  // Watch targets
  eleventyConfig.addWatchTarget(`${dir.input}/assets/styles`);
  eleventyConfig.addWatchTarget(`${dir.input}/_generate`);

  // Custom shortcodes
  eleventyConfig.addShortcode('image', imageShortcode);
  eleventyConfig.addShortcode('favicon', faviconShortcode);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);


  // Custom filters
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('dateToISO', dateToISO);
  eleventyConfig.addFilter('toJson', JSON.stringify);
  eleventyConfig.addFilter('fromJson', JSON.parse);
  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  // Custom collections

  // Plugins
  // Add Eleventy plugins from /11ty/plugins.js
  console.group("🔌 Plugins (/11ty/plugins.js)");
  Object.keys(plugins).forEach((pluginName) => {
    console.log(" · " + pluginName);
    plugins[pluginName](eleventyConfig);
  });
  console.groupEnd();

  // Post-processing


  return {
    dir,
    dataTemplateEngine: TEMPLATE_ENGINE,
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['html', 'liquid', 'md', 'njk'],
  };
};
