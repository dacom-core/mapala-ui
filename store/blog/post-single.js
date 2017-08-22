import { Post } from '@/api/posts'

export const state = () => ({

})

export const actions = {
  fetch_post ({ commit }) {
    Post.get({ permlink: this.$route.params.author + '*@*' + this.$route.params.permlink })
  }
}

export const mutations = {
  SET_POST (state, payload) {
    state.current = payload
  }
}
