const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:8080',
  },
  production: {
    url: 'https://www.ecrosstexas.com/',
  },
};

module.exports = {
  title: 'ecrosstexas.com',
  author: 'Eric Wallace',
  email: '',
  description: '',
  keywords: [],
  language: 'en-US',
  favicon: {
    widths: [32, 57, 76, 96, 128, 192, 228],
    format: 'png',
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
