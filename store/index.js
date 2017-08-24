import MobileDetect from 'mobile-detect'

export const state = () => ({
  locales: ['en', 'ru'],
  locale: 'ru',
  isMobile: false,
  historyStack: ['/']
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
  PUSH_TO_HISTORY_STACK (state, path) {
    state.historyStack.push(path)
  }
}

export const getters = {
  /**
  * Return the penultimate path from the history stack
  */
  previousURL (state) {
    return state.historyStack[state.historyStack.length - 1]
  }
}

export const actions = {
  nuxtServerInit ({ dispatch, commit }, { req, app: { $axios }}) {
    console.log('haha')
    const cookieHasToken = false
    const isMobile = new MobileDetect(req.headers['user-agent']).phone() //  Is the page loaded from a phone
    commit('SET_MOBILE', isMobile)

    if (cookieHasToken) { //  Must be token check.
      dispatch('user/auth/fetch_user')
    }
  }
}
