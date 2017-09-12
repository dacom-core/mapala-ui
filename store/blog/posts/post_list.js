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

      let { data } = await Post(this.$axios).query(params) // Retrieving all posts

      if (state.postList.page > 1) { // Then combine with existing post list
        data.results = state.postList.data.concat(data.results)
      }
      if (!data.next) { // There are no more posts to load
        commit('IS_LOADING_ALLOWED', false)
      }
      commit('SET_POST_LIST', data.results)

      commit('TOGGLE_POSTS_LOADING_STATUS')
    } catch (error) {
      commit('TOGGLE_POSTS_LOADING_STATUS')
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
  },
  PUSH_NEW_COMMENT (state, structure) {
    for (const post in state.postList.data) {
      if (post.id === structure.id) {
        post.comments.push(structure.comment)
      }
    }
  }
}
