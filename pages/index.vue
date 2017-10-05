<template lang="pug">
</template>

<script>
  export default {
    async fetch ({ store: { dispatch, commit, state } }) {
      // LAYOUT BLOCK
      commit('layout/SET_RIGHT_COLUMN', 'map')
      commit('layout/SET_COMMON_BLOCK_VISIBLE')

      // RESET BLOCK
      commit('blog/posts/post_list/RESET_PAGINATE')
      commit('blog/posts/post_list/RESET_TAGS')
      commit('blog/posts/post_list/RESET_RANGE')

      // FILTERS BLOCK
      commit('blog/posts/post_list/IS_LOADING_ALLOWED', true) // Allow making requests for new posts.
      commit('SET_FILTERS', {}) // Reset filters for markers/post

      // ACTIONS BLOCK
      await dispatch('blog/posts/post_list/fetch_posts')

      if (state.map.isReady) {
        // 1. If the page is loaded on client-side. (vue-router transition).
        dispatch('map/fetch_markers')
      }
    }
  }
</script>
