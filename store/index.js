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

export const getters = {
  isMobile (state) {
    return state.isMobile
  }
}

export const actions = {
  nuxtServerInit ({ state, dispatch, commit }, { req }) {
    const isAuth = true
    //  Does mobile phone load the app
    state.isMobile = new MobileDetect(req.headers['user-agent']).phone()

    if (isAuth) { //  Must be auth check.
      // dispatch('user/actions/fetch_user')
      state.user.state.isAuth = true
    }
  }
}
