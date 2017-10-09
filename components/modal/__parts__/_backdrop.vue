<template lang="pug">
  div(
    v-show="isVisible",
    class="pop_back"
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
        isVisible: state => state.modal.isShown
      })
    }
  }

</script>

<style lang="stylus">
</style>
