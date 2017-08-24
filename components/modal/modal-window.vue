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
