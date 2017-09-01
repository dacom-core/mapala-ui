<template lang="pug">
</template>

<script>
export default {
  async fetch ({ store: { dispatch, commit, state } }) {
    commit('SET_FILTERS', {}) // Reset filters to see all kind of posts.
    await dispatch('blog/posts/fetch_posts')

    if (state.map.isReady) {
      // 1. If the page is loaded on client-side. (vue-router transition)
      dispatch('map/fetch_markers')
    }
  }
}
</script>
