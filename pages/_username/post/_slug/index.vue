<template lang="pug">
  post-view
</template>

<script>
import { Post } from '@/api/posts'
import { mapMutations } from 'vuex'
import PostView from '~/components/blog/post-view'

export default {
  head: {
    bodyAttrs: {
      class: 'overflowHidden'
    }
  },
  async fetch ({ store: { commit }, params }) {
    const { data } = await Post.get(params.username + '*@*' + params.slug)
    commit('blog/posts/SET_POST_SINGLE', data)
  },

  methods: {
    ...mapMutations({
      showModal: 'modal/SHOW_MODAL',
      setBackPath: 'SET_BACK_PATH'
    })
  },

  mounted () {
    this.showModal()
  },

  components: {
    PostView
  }
}
</script>
