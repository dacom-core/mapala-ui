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
  isLoading: false,
  isLoadingAllowed: true
})

export const actions = {
  async fetch_posts ({ commit, state, rootState }) {
    try {
      commit('TOGGLE_POST_LOADING_STATUS')

      const params = { page: state.postList.page, ...rootState.filters }

      let { data: { results } } = await Post.query(params) // Retrieving all posts

      if (state.postList.page > 1) {
        results = state.postList.data.concat(results)
      }
      commit('SET_POST_LIST', results)

      commit('TOGGLE_POST_LOADING_STATUS')
    } catch (error) {
      console.error(error)
      commit('TOGGLE_POST_LOADING_STATUS')
      commit('IS_LOADING_ALLOWED', false) // There are no posts (more), loading next ones should be stopped.
    }
  },
  async fetch_single_post ({ commit }, urlParams) {
    const { data } = await Post.get(urlParams.username + '*@*' + urlParams.slug)
    commit('SET_POST_SINGLE', data)
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
  SET_POST_SINGLE (state, payload) {
    state.postSingle = payload
  },
  SET_NEXT_PAGE (state) {
    state.postList.page++
  },
  TOGGLE_POST_LOADING_STATUS (state) {
    state.isLoading = !state.isLoading // Reverse bool
  },
  RESET_PAGE (state) { // Reset page variable to 1
    state.postList.page = 1
  },
  NO_MORE_POSTS (state) {
    state.thereAreNoPosts = true
  },
  IS_LOADING_ALLOWED (state, payload) {
    state.isLoadingAllowed = payload
  }
}
