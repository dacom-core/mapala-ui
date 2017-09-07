<template lang="pug">
  div.close(@click="closeModal")
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['backPath'])
    },
    methods: {
      ...mapMutations({
        hideModal: 'modal/HIDE_MODAL'
      }),

      closeModal () {
        this.hideModal()
        this.$router.push(this.backPath)
      }
    }
  }

</script>


<style lang="stylus">

  .close
    position: absolute
    right: 30px
    top: 25px
    background: url('~/assets/icon-close-black.svg') no-repeat center center
    width: 40px
    height: 40px;
    cursor: pointer
</style>
