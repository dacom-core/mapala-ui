import MobileDetect from 'mobile-detect'

export const state = () => ({
  locales: ['en', 'ru'],
  locale: 'ru',
  isMobile: false,
  historyStack: [], // All urls(paths) which have been visited.
  backPath: '/', // The Url Before Modal Was Opened
  filters: {} // Global filters for markers/posts (for example: user/group)
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_MOBILE (state, payload) {
    state.isMobile = payload
  },
  SET_BACK_PATH (state, url) {
    state.backPath = url
  },
  PUSH_TO_HISTORY_STACK (state, path) {
    state.historyStack.push(path)
  },
  SET_FILTERS (state, payload) {
    state.filters = payload
  }
}

export const getters = {
  /**
  * Return the penultimate path from the history stack
  */
  backPath (state) {
    return state.backPath
  }
}

export const actions = {
  nuxtServerInit ({ dispatch, commit }, { req, app: { $axios }}) {
    const cookieHasToken = false
    const isMobile = new MobileDetect(req.headers['user-agent']).phone() //  Is the page loaded from a phone
    commit('SET_MOBILE', isMobile)

    if (cookieHasToken) { //  Must be token check.
      dispatch('user/auth/fetch_user')
    }
  }
}
