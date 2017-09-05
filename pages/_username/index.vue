<template lang="pug">
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { User } from '@/api/services'

export default {
  async fetch ({ store: { commit, dispatch, state }, params: { username } }) { // Grab user's name from url.
    commit('blog/posts/post_list/RESET_PAGE') // Reset paginate.
    commit('blog/posts/post_list/IS_LOADING_ALLOWED', true) // Allow making requests for new posts.
    commit('SET_FILTERS', { author__username: username })
    commit('SET_USER_PROFILE_BLOCK_VISIBILITY_TO', true)
    await dispatch('blog/posts/post_list/fetch_posts')

    const { data: user } = await User.query({ username: username })
    commit('blog/posts/posts_author/SET_PAGE_AUTHOR_BC_USERNAME', user[0].bc_username)

    if (state.map.isReady) {
      // 1. If the page is loaded on client-side. (vue-router transition)
      dispatch('map/fetch_markers')
    }
  },

  computed: mapState({ isMapReady: state => state.map.isMapReady }),

  watch: {
    // 2. Else if the page is rendered on the server side,
    // we must to wait while the map component will be ready.
    isMapReady () {
      this.fetchMarkers()
    }
  },

  methods: mapActions({ fetchMarkers: 'map/fetch_markers' }),

  mounted () {
    document.body.scrollTop = 0
  },

  beforeDestroy () {
    // If user's post is opened, do not hide the user profile block.
    this.$store.commit('SET_USER_PROFILE_BLOCK_VISIBILITY_TO', false)
  }
}
</script>

<style lang="stylus" scoped>
</style>
