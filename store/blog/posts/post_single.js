import { Post } from '@/api/services'

export const state = () => ({
  postSingle: {
    author: {},
    body: '',
    comments: [],
    comments_count: '',
    created_at: '',
    id: '',
    meta: {},
    next_page: null,
    payout: '',
    permlink: '',
    position: null,
    position_text: '',
    prev_page: null,
    title: ''
  },
  isLoading: false
})

export const actions = {
  async fetch_single_post ({ commit }, urlParams) {
    commit('TOGGLE_POST_LOADING')
    const { data } = await Post.get({ permlink: urlParams.username + '*@*' + urlParams.slug })
    commit('TOGGLE_POST_LOADING')
    commit('SET_POST_SINGLE', data)
  }
}

export const mutations = {
  SET_POST_SINGLE (state, payload) {
    state.postSingle = payload
  },
  RESET_POST_SINGLE (state) {
    state.postSingle = false
  },
  PUSH_NEW_COMMENT (state, comment) {
    state.postSingle.comments.push(comment)
  },
  SET_COMMENT (state, payload) {
    state.postSingle.comments = payload
  },
  TOGGLE_POST_LOADING (state) {
    state.isLoading = !state.isLoading
  }
}

export const getters = {

  postMetaDescription (state) {
    return state.postSingle.body ? state.postSingle.body.substr(0, 200) : 'Mapala.net user\'s post'
  },
  postMetaTitle (state) {
    return state.postSingle.title ? state.postSingle.title : 'Mapala.net post'
  }
}
