<template lang="pug">
  a(@click="openModal")
    slot
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['modalContentComponent'],

  mounted () {
  },

  data () {
    return {
    }
  },

  methods: {
    ...mapActions({
      'showModal': 'modal/index/showModal',
      'hideModal': 'modal/index/hideModal'
    }),

    async openModal () {
      try {
        const path = await this.showModal(this.modalContentComponent)
        this.router.push(path)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
