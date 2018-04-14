import { get_cookie } from '@/utils/cookies'
import MobileDetect from 'mobile-detect'
import _ from 'lodash'
import axios from 'axios'

export const state = () => ({
  locales: ['en', 'ru'],
  locale: 'ru',
  API_SERVER: '',
  isMobile: false,
  historyStack: [], // All urls(paths) which have been visited.
  backPath: '', // The Url Before Modal Was Opened
  homePage: '/',
  filters: {}, // Global filters for markers/posts (for example: user/group)
  isUserProfileBlockVisible: false,
  isGroupPreviewBlockVisible: false
})

export const mutations = {
  SET_API_SERVER_ADDRESS (state, payload) {
    state.API_SERVER = payload 
  },
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
    return state.backPath ? state.backPath : `${process.env.API_SERVER}${state.locale}/`
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch, commit }, { req }) {
    // commit('SET_API_SERVER_ADDRESS', process.env.API_SERVER || 'https://dev.mapala.net/')
    commit('SET_API_SERVER_ADDRESS', process.env.API_SERVER || 'https://mapala.net/')
    const isMobile = new MobileDetect(req.headers['user-agent']).phone() //  Is the page loaded from a phone
    commit('SET_MOBILE', isMobile)

    const JWTtoken = get_cookie('jwt', req)

    if (JWTtoken) {
      commit('user/auth/SET_JWT_TOKEN', JWTtoken)
      try {
        await dispatch('user/auth/fetch_user')
      } catch (e) {
        console.log(e)
      }
      
    } else {
      commit('user/auth/LOGOUT')
      commit('user/personal/RESET_USER')
      commit('user/auth/RESET_JWT_TOKEN')
    }
  }
}
