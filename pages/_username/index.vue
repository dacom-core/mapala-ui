<template lang="pug">
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',

    async fetch ({ store: { commit, dispatch, state }, params: { username } }) { // Grab user's name from url.
      commit('SET_FILTERS', { author__username: username })
      await dispatch('blog/posts/' +
        '' +
        '' +
        '' +
        '')

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

    methods: mapActions({ fetchMarkers: 'map/fetch_markers' })
  }
</script>

<style lang="stylus" scoped>
</style>
