<template lang="pug">
  div(
    v-if="isVisible",
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
  data () {
    return {}
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
      hideModal: 'modal/HIDE_MODAL'
    }),

    closeModal () {
      this.hideModal()
      this.$router.push(window.history.back())
    }
  },

  mounted () {
    this.showModal()
  },

  beforeDestroy () {
    this.hideModal()
  }
}

</script>
