<template lang="pug">
  post-view
</template>

<script>
  import { Post } from '@/api/services'
  import { mapMutations } from 'vuex'
  import PostView from '~/components/blog/post-view'
  export default {
    head: {
      bodyAttrs: {
        class: 'overflowHidden'
      }
    },
    async fetch ({ store: { commit, dispatch }, params }) {
      await dispatch('blog/posts/post_single/fetch_single_post', params)
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

