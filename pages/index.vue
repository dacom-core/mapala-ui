<template lang="pug">
</template>

<script>
  export default {
    async fetch ({ store: { dispatch, commit, state } }) {
      commit('layout/SET_COMMON_BLOCK_VISIBLE')
      commit('blog/posts/post_list/RESET_PAGE') // Reset paginate.
      commit('blog/posts/post_list/IS_LOADING_ALLOWED', true) // Allow making requests for new posts.
      commit('SET_FILTERS', {}) // Reset filters to see all kind of posts.
      await dispatch('blog/posts/post_list/fetch_posts')

      if (state.map.isReady) {
        // 1. If the page is loaded on client-side. (vue-router transition).
        dispatch('map/fetch_markers')
      }
    }
  }
</script>
