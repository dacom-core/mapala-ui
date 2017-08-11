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
  },

  SET_MOBILE (state, payload) {
    state.isMobile = payload
  }
}

export const getters = {
}

export const actions = {
  nuxtServerInit ({ dispatch, commit }, { req, app: { $axios }}) {
    const cookieHasToken = false
    const isMobile = new MobileDetect(req.headers['user-agent']).phone() //  Is the page loaded from a phone
    commit('SET_MOBILE', isMobile)

    if (cookieHasToken) { //  Must be token check.
      dispatch('user/auth/fetch_user').then(() => {
        commit('user/auth/SET_AUTH', true)
      })
    }
  }
}
