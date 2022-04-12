const plugins = require("./11ty/plugins.js");

const { toAbsoluteUrl } = require("./11ty/filters");
const { dateToISO } = require("./11ty/filters/date.js");
const dir = require("./11ty/constants/dir.js");
const imageShortcode = require("./11ty/shortcodes/image.js");
const faviconShortcode = require("./11ty/shortcodes/favicon.js");
const sanitizeHTML = require('sanitize-html')

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


// WEBMENTIONS FILTER
eleventyConfig.addFilter('webmentionsForUrl', (webmentions, url) => {
  // define which types of webmentions should be included per URL.
  // possible values listed here:
  // https://github.com/aaronpk/webmention.io#find-links-of-a-specific-type-to-a-specific-page
  const allowedTypes = ['mention-of', 'in-reply-to'];

  // define which HTML tags you want to allow in the webmention body content
  // https://github.com/apostrophecms/sanitize-html#what-are-the-default-options
  const allowedHTML = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href']
    }
  };

  // clean webmention content for output
  const clean = entry => {
    const {html, text} = entry.content;

    if (html) {
      // really long html mentions, usually newsletters or compilations
      entry.content.value =
        html.length > 2000
          ? `mentioned this in <a href="${entry['wm-source']}">${entry['wm-source']}</a>`
          : sanitizeHTML(html, allowedHTML);
    } else {
      entry.content.value = sanitizeHTML(text, allowedHTML);
    }

    return entry;
  };

  // sort webmentions by published timestamp chronologically.
  // swap a.published and b.published to reverse order.
  const orderByDate = (a, b) => new Date(b.published) - new Date(a.published);

  // only allow webmentions that have an author name and a timestamp
  const checkRequiredFields = entry => {
    const {author, published} = entry;
    return !!author && !!author.name && !!published;
  };

  // run all of the above for each webmention that targets the current URL
  return webmentions
    .filter(entry => entry['wm-target'] === url)
    .filter(entry => allowedTypes.includes(entry['wm-property']))
    .filter(checkRequiredFields)
    .sort(orderByDate)
    .map(clean);
});

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
