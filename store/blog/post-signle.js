import { Post } from '@/api/posts'

export const state = () => ({
  currentPost: { // info about current opened post
    author: '',
    permalink: ''
  }
})

export const actions = {
  fetch_post ({ commit }) {
    Post.get({ permlink: this.$route.params.author + '*@*' + this.$route.params.permlink })
  }
}
