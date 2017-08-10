<template lang="pug">
  div
    top-line
    div.gw
      nuxt
    modal-window
</template>
<script>
import TopLine from '~/components/layout/__parts__/mapala-top-line'
import ModalWindow from '~/components/modal/mapala-modal-window'

export default {
  components: {
    TopLine,
    ModalWindow
  },
  methods: {}
}
</script>

<style lang="stylus">
  body
    background none

  .gw
    margin-top 72px
    position relative

  .blue
    color #4a90e2

  .user_av
    display block
    width 100%

  .pop_back
    background-color rgba(72, 84, 101, 0.8)
    width 100%
    height 100%
    position fixed
    overflow auto
    top: 0
    left: 0
    padding-top 72px
    box-sizing border-box
    z-index 101
    padding-bottom 60px
</style>
