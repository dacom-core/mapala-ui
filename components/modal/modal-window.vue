<template lang="pug">
  div(
    v-show="isVisible",
    class="pop_back",
    @click.self="closeModal",
    v-on-click-outside="closeModal"
    )
    transition(
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      )
      div.modal_wrapper
        slot

</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  mounted () {
    this.setBackPath(this.$route.fullPath)
  },
  computed: {
    ...mapState({
      isVisible: state => state.modal.isShown
    }),

    ...mapGetters(['previousURL'])
  },
  methods: {
    ...mapMutations({
      showModal: 'modal/SHOW_MODAL',
      hideModal: 'modal/HIDE_MODAL',
      setBackPath: 'SET_BACK_PATH'
    }),

    closeModal () {
      this.hideModal()
      this.$router.push(this.previousURL)
    }
  }
}

</script>


<style lang="stylus">
  .modal_wrapper
    border-radius: 6px
    background-color: #ffffff
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
    border: solid 1px rgba(72, 84, 101, 0.2)
    max-width: 866px
    width: 100%
    margin: 0 auto 80px
    position: relative
</style>
