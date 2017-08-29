<template lang="pug">
</template>

<script>
export default {
  async fetch ({ store }) {
    await store.dispatch('blog/posts/fetch_posts')
  }
}
</script>
