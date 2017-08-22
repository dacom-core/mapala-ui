<template lang="pug">
  mapala-modal
    post-view
</template>

<script>
//  import {mapState, mapActions, mapMutations} from 'vuex';
import PostView from '~/components/blog/mapala-post-view'
import MapalaModal from '~/components/modal/mapala-modal-window'
import { Post } from '@/api/posts'

export default {
  async fetch ({ store, params }) {
    const { data } = await Post.get(params.username + '*@*' + params.slug)
    store.commit('blog/posts/SET_POST_SINGLE', data)

//    Post.query({ permlink: params.username + '*@*' + params.slug }).then(res => {
//      this.post = res.body
////      this.make_navigate()
//      // this.scrollTop()
//      document.title = res.body.title
//      this.meta = [
//        { property: 'og:title', content: res.body.title },
//        { property: 'og:site_name', content: 'mapala.net' },
//        { property: 'og:description', content: res.body.body.substring(0, 70) },
//        { property: 'og:image', content: res.body.meta.image[0] },
//      ]
//      this.mark_view = Vue.options.filters.markdown(this.post.body)
//    })
  },

  methods: {},

  components: {
    MapalaModal,
    PostView
  }
}
</script>

<style lang="stylus" scoped>
</style>
