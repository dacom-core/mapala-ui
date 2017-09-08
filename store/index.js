import MobileDetect from 'mobile-detect'
import { get_cookie } from '@/utils/cookies'
import _ from 'lodash'

export const state = () => ({
  locales: ['en', 'ru'],
  locale: 'ru',
  isMobile: false,
  historyStack: [], // All urls(paths) which have been visited.
  backPath: '', // The Url Before Modal Was Opened
  homePage: '/',
  filters: {}, // Global filters for markers/posts (for example: user/group)
  isUserProfileBlockVisible: false,
  isGroupPreviewBlockVisible: false
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
  SET_BACK_PATH (state, { path }) {
    if (_.isEmpty(state.backPath)) {
      state.backPath = path
    }
  },
  RESET_BACK_PATH (state) {
    state.backPath = ''
  },
  PUSH_TO_HISTORY_STACK (state, path) {
    state.historyStack.push(path)
  },
  SET_FILTERS (state, payload) {
    state.filters = payload
  },
  SET_USER_PROFILE_BLOCK_VISIBILITY_TO (state, payload) {
    state.isUserProfileBlockVisible = payload
  },
  SET_GROUP_PREVIEW_BLOCK_VISIBILITY_TO (state, payload) {
    state.isGroupPreviewBlockVisible = payload
  }
}

export const getters = {
  /**
  * Return the penultimate path from the history stack
  */
  backPath (state) {
    return state.backPath ? state.backPath : state.homePage
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch, commit }, { req }) {
    const isMobile = new MobileDetect(req.headers['user-agent']).phone() //  Is the page loaded from a phone
    commit('SET_MOBILE', isMobile)

    const JWTtoken = get_cookie('jwt', req)

    if (JWTtoken) {
      try {
        commit('user/auth/SET_JWT_TOKEN', JWTtoken)
        await dispatch('user/auth/fetch_user')
      } catch (error) {
        // Если токен просрочен или не правильный
        console.error('Auth error: ', error)
        commit('user/auth/LOGOUT')
        commit('user/personal/RESET_USER')
      }
    }
  }
}
