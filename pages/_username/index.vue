<template lang="pug">
  div
</template>

<script>
export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',

  async fetch ({ store, params: { username } }) { // Grab user's name from url.
    await store.dispatch('blog/posts/fetch_posts', { author__username: username })
  },

  mounted () {

  },

  data () {
    return {}
  },

  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>
