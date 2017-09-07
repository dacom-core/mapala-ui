<template lang="pug">
  div(
    v-show="isVisible",
    class="pop_back",
    @click.self="closeModal"
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
  import { mapState, mapMutations, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapState({
        isVisible: state => state.modal.isShown
      }),

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
</style>
