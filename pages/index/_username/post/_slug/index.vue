<template lang="pug">
  mapala-modal
    post-view(:post="post")
</template>

<script>
import PostView from '~/components/blog/mapala-post-view'
import MapalaModal from '~/components/modal/mapala-modal-window'
import { Post } from '@/api/posts'

export default {
  async asyncData ({ store, params }) {
    const { data } = await Post.get(params.username + '*@*' + params.slug)
    return { post: data }
  },

  components: {
    MapalaModal,
    PostView
  }
}
</script>

<style lang="stylus" scoped>
</style>
