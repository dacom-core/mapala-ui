<template lang="pug">
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['content'],

  mounted () {

    this.setModalContent(this.content) // Component name
    this.showModal()
  },

  methods: {
    ...mapMutations({
      'showModal': 'modal/index/SHOW_MODAL',
      'setModalContent': 'modal/index/SET_MODAL_CONTENT'
    })
  }
}
</script>

<style lang="stylus" scoped>
</style>
