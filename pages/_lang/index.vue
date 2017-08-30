<template lang="pug">
</template>

<script>
export default {
  async fetch ({ store: { dispatch, commit, state } }) {
    await dispatch('blog/posts/fetch_posts')
    commit('map/SET_FILTERS', {}) // Reset filters to see all kind of posts.

    if (state.map.isReady) {
      // 1. If the page is loaded on client-side. (vue-router transition)
      dispatch('map/fetch_markers')
    }
  }
}
</script>
пы
