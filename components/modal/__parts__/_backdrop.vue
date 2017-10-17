<template lang="pug">
  div(
    v-show="isVisible",
    class="pop_back",
    :class="{ container: isMobile }"
    )
    transition(
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      )
      slot

</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        isVisible: state => state.modal.isShown,
        isMobile: state => state.isMobile
      })
    }
  }

</script>

<style lang="stylus">
</style>
