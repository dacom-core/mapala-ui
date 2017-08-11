<template lang="pug">
  div(
    v-if="isVisible",
    class="pop_back",
    @click.self="hideModal",
    v-on-click-outside="hideModal"
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
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      isVisible: state => state.modal.isShown
    })
  },
  methods: {
    ...mapMutations({
      showModal: 'modal/SHOW_MODAL',
      hideModal: 'modal/HIDE_MODAL'
    })
  },
  mounted () {
    this.showModal()
  },

  beforeDestroy () {
    this.hideModal()
  }
}
</script>
