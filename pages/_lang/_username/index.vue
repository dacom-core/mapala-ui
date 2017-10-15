<template lang="pug">
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { User } from '@/api/services'
import _ from 'lodash'

export default {
  async fetch ({ store: { commit, dispatch, state }, params: { username }, error, app: { i18n } }) {
    // LAYOUT BLOCK
    commit('layout/SET_RIGHT_COLUMN', 'map')
    commit('layout/SET_USER_BLOCK_VISIBLE')

    // RESET BLOCK
    commit('blog/posts/post_list/RESET_TAGS')
    commit('blog/posts/post_list/RESET_PAGINATE')
    commit('blog/posts/post_list/RESET_RANGE')

    // FILTERS BLOCK
    commit('blog/posts/post_list/IS_LOADING_ALLOWED', true) // Allow making requests for new posts.
    commit('SET_FILTERS', { author__username: username }) // Filters for markers/post

    // ACTIONS BLOCK
    try {
      const { data: user } = await User.get({ username: username })
      commit('blog/posts/posts_author/SET_PAGE_AUTHOR_BC_USERNAME', user.bc_username)
      commit('blog/posts/posts_author/SET_PAGE_AUTHOR_AVATAR', user.avatar) 
    } catch (e) {
      error({ statusCode: 404, message: i18n.t('user_not_found') })
    }
    await dispatch('blog/posts/post_list/fetch_posts')

    if (state.map.isReady) {
      //  1. If the page is loaded on client-side. (vue-router transition)
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
