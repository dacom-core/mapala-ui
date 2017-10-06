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
      div.modal_wrapper
        div.close(@click="closeModal")
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
      this.resetBackPath()
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

  .close
    position: absolute
    right: 30px
    top: 25px
    background: url('~/assets/icon-close-black.svg') no-repeat center center
    width: 40px
    height: 40px;
    cursor: pointer
</style>
