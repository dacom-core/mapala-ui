import MobileDetect from 'mobile-detect'

export const state = () => ({
  locales: ['en', 'ru'],
  locale: 'ru',
  isMobile: false
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}

export const actions = {
  nuxtServerInit ({ state }, { req }) {
    //  Does mobile phone load the app
    state.isMobile = new MobileDetect(req.headers['user-agent']).phone()
  }
}
