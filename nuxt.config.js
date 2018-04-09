module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Mapala',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Mapala Travel Community' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/mapala.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Sans:400,700' },
      { rel: 'stylesheet', href: 'https://necolas.github.io/normalize.css/3.0.3/normalize.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap-grid.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  css: [
    { src: 'animate.css/animate.min.css' },
    { src: 'font-awesome/css/font-awesome.css' },
    { src: 'element-ui/lib/theme-default/index.css' },
    { src: '~/assets/styles/general.styl', lang: 'stylus' },
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  router: {
    middleware: ['history-logger', 'i18n']
    // scrollBehavior: function (to, from, savedPosition) {
    // }
  },
  plugins: [
    { src: '~/plugins/element-ui.js', ssr: true },
    { src: '~/plugins/i18n.js', ssr: true },
    { src: '~/plugins/actionToRoute.js', ssr: true },
    { src: '~/plugins/pathMaker.js', ssr: true },
    { src: '~/plugins/vue-cookies.js', ssr: true },
    { src: '~/plugins/vue-google-maps.js', ssr: false },
    // { src: '~/plugins/vue-lazyload.js', ssr: true },
    // { src: '~/plugins/vue-scroll-to.js', ssr: false },
    { src: '~/plugins/filters.js', ssr: true },
    { src: '~/plugins/http.js', ssr: true },
    { src: '~/plugins/nuxt-quill-plugin.js', ssr: false }
  ],
  /*
  ** Build configuration
  */
  render: {
    resourceHints: false,
    ssr: {
      shouldPreload: () => false
    },
    bundleRenderer: {
      cache: require('lru-cache')({
        maxAge: 1000 * 60 * 5
      })
    }
  },
  build: {
    performance: {
      gzip: true,
      prefetch: false
    },
    //
    ssr: {
      shouldPreload: () => false
    },
    /*
    ** Run ESLINT on save
    */
    // extend (config, ctx) {
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
    vendor: [
      'vuex-class', 
      'nuxt-class-component',
      'vue-i18n',
      'axios',
      'element-ui',
      'steem',
      'esteem-lib',
      'bytebuffer',
      'bluebird',
      'katex',
      'unorm',
      'unicode-slug',
      'uslug',
      'markdown-it',
      'markdown-it-katex',
      'markdown-it-abbr',
      'markdown-it-task-lists',
      'markdown-it-mark',
      'markdown-it-deflist',
      'markdown-it-ins',
      'markdown-it-emoji',
      'markdown-it-footnote',
      'markdown-it-toc-and-anchor',
      'vue-markdown',
      'lodash',
      'clone',
      'store',
      '~/plugins/element-ui.js',
      '~/plugins/filters.js',
      '~/plugins/i18n.js',
      '~/plugins/nuxt-quill-plugin.js',
      '~/plugins/vue-cookies.js',
      '~/plugins/vue-google-maps.js',
    ]
  },
  modules: ['@/modules/typescript.ts']
}
