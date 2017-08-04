<template lang="pug">
  a(@click="showModal(content)")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['content'],

  mounted () {

  },

  data () {
    return {}
  },

  methods: {
    ...mapActions({
      'showModal': 'modal/showModal',
      'hideModal': 'modal/showModal'
    })
  }
}
</script>

<style lang="stylus" scoped>
</style>
