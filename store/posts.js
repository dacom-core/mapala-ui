import { Post } from '@/api/posts'

export const state = () => ({
  posts: {
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
  }
})

export const actions = {
  fetch_posts ({ commit }) {
    return Post.get()
  }
}

export const mutations = {
  SET_POSTS (state, payload) {
    state.posts.data = payload
  }
}

