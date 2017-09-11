import { Post } from '@/api/services'

export const state = () => ({
  postList: {
    data: [],
    author: null,
    page: 1,
    has_not_pages: false,
    loading: false,
    range: {
      gte: null,
      lte: null
    },
    tags: null
  },
  isLoading: false,
  isLoadingAllowed: true
})

export const actions = {
  async fetch_posts ({ commit, state, rootState }) {
    try {
      commit('TOGGLE_POSTS_LOADING_STATUS')

      const params = { page: state.postList.page, ...rootState.filters }

      let { data: { results } } = await Post(this.$axios).query(params) // Retrieving all posts

      if (state.postList.page > 1) {
        results = state.postList.data.concat(results)
      }
      commit('SET_POST_LIST', results)

      commit('TOGGLE_POSTS_LOADING_STATUS')
    } catch (error) {
      console.log('There are no posts more')
      commit('TOGGLE_POSTS_LOADING_STATUS')
      commit('IS_LOADING_ALLOWED', false) // There are no posts (more), loading next ones should be stopped.
    }
  },
  async fetch_next_posts ({ commit, dispatch }) {
    commit('SET_NEXT_PAGE')
    return dispatch('fetch_posts')
  }
}

export const mutations = {
  SET_POST_LIST (state, payload) {
    state.postList.data = payload
  },
  SET_NEXT_PAGE (state) {
    state.postList.page++
  },
  TOGGLE_POSTS_LOADING_STATUS (state) {
    state.isLoading = !state.isLoading // Reverse bool
  },
  IS_LOADING_ALLOWED (state, payload) {
    state.isLoadingAllowed = payload
  },
  RESET_PAGE (state) { // Reset page variable to 1
    state.postList.page = 1
  },
  INSERT_POST_UNSHIFT (state, payload) {
    state.postList.unshift(payload)
  }
}
