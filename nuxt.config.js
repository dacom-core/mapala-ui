module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Mapala',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Sans:400,700' }
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
    { src: '~/assets/styles/general.styl', lang: 'stylus' }
  ],
  router: {
    middleware: ['i18n']
  },
  plugins: [
    { src: '~/plugins/element-ui.js', ssr: true },
    { src: '~/plugins/i18n.js', ssr: true },
    { src: '~/plugins/vue-cookies.js', ssr: true },
    { src: '~/plugins/vue-google-maps.js', ssr: true },
    { src: '~/plugins/vue-lazyload.js', ssr: true },
    { src: '~/plugins/vue-scroll-to.js', ssr: false },
    { src: '~/plugins/on-click-outside-directive.js', ssr: false }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['vue-i18n']
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    redirectError: {
      401: '/'
    },
    requestInterceptor: (config, { store }) => {
      if (store.state.locale) {
        config.headers.common['Locale'] = store.state.locale
      }
      return config
    }
  }
}
