<template lang="pug">
  div(v-if="modalWindow.isShown" class="pop_back", @click.self="closeModal")
    transition(
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    )
      nuxt-child(name="app-auth")

</template>

<script>
import { mapState } from 'vuex'
//  import Auth from '../auth/Auth.vue'
//  import Page from '../page/Page.vue'
//  import AddPage from '../page/AddPage.vue'
//  import EditPage from '../page/EditPage.vue'

export default {
  name: 'app-modal-window',

  data () {
    return {
      backTo: '/'
    }
  },
  computed: mapState([
    'modalWindow'
  ]),
  created () {
    this.setBackPath()
  },
  methods: {
    /**
     * Close modal window
     *
     */
    closeModal () {
      this.setBackPath()
      this.$store.commit('hideModal')
      this.$router.push(this.backTo)
    },
    /**
     * set redirect path
     */
    setBackPath () {
      if (this.checkModal()) {
        this.backTo = this.route.from.fullPath
      }
    },
    /**
     * Check modal window
     * @return boolean
     */
    checkModal () {
//      const routeFrom = this.route.from
//
//      return !routeFrom.meta.isModal
    }
  },
  components: {
  //  Auth,
  //  Page,
  //  AddPage,
  //  EditPage
  }
}
</script>
