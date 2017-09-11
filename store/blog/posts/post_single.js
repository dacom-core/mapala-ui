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
  }
})

export const actions = {
  async fetch_single_post ({ commit }, urlParams) {
    const { data } = await Post(this.$axios).get(urlParams.username + '*@*' + urlParams.slug)
    commit('SET_POST_SINGLE', data)
  }
}

export const mutations = {
  SET_POST_SINGLE (state, payload) {
    state.postSingle = payload
  }
}

