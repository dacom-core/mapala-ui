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
      nuxt-child

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: mapState({
    'isVisible': 'modal/modalWindow.isShown'
  }),
  methods: mapActions({
    'hideModal': 'modal/hideModal'
  })
}
</script>
