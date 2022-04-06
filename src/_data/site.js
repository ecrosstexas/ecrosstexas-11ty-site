const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:8080'
  },
  production: {
    url: 'https://www.ecrosstexas.com/'
  }
};

module.exports = {
  title: 'ecrosstexas.com',
  author: 'Eric Wallace',
  email: 'ecrosstexas@gmail.com',
  description: 'The personal website of Eric Wallace, a digital rancher in Plano, Texas.',
  keywords: [
    'ecrosstexas',
    'Eric Wallace',
    'Christianity',
    'PCA',
    'presbyterian',
    'reformed',
    'Texas'
  ],
  lang: 'en',
  locale: 'en_us',
  repo: 'https://github.com/ecrosstexas/ecrosstexas-11ty-site',
  indieauth: true,
  indieauthAuth: 'https://indieauth.com/auth',
  indieauthToken: 'https://tokens.indieauth.com/token',
  favicon: {
    widths: [32, 57, 76, 96, 128, 192, 228],
    format: 'png'
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV]
};
