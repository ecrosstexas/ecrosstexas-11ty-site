/**
 * Add Eleventy plugins here
 */

module.exports = {
  sitemap: function (eleventyConfig) {
    /**
     * https://github.com/quasibit/eleventy-plugin-sitemap
     */
    const sitemap = require('@quasibit/eleventy-plugin-sitemap');
    eleventyConfig.addPlugin(sitemap, {
      sitemap: {
        hostname: 'https://www.ecrosstexas.com',
      },
    });
  },

  schema: function (eleventyConfig) {
    /**
     * https://github.com/quasibit/eleventy-plugin-schema
     */
    const schema = require('@quasibit/eleventy-plugin-schema');
    eleventyConfig.addPlugin(schema);
  },

  readingTime: function (eleventyConfig) {
    /**
     * https://github.com/johanbrook/eleventy-plugin-reading-time
     */
    const readingTime = require('eleventy-plugin-reading-time');
    eleventyConfig.addPlugin(readingTime);
  },

  metagen: function (eleventyConfig) {
    /**
     * https://github.com/tannerdolby/eleventy-plugin-metagen
     */
    let plugin = require('eleventy-plugin-metagen');
    eleventyConfig.addPlugin(plugin);
  },

  svgContents: function (eleventyConfig) {
    /**
     * https://github.com/brob/eleventy-plugin-svg-contents
     */
    let plugin = require('eleventy-plugin-svg-contents');
    eleventyConfig.addPlugin(plugin);
  },
};
