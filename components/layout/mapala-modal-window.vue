<template lang="pug">
  div(v-if="modalWindow.isShown" class="pop_back", @click.self="closeModal")
    transition(
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    )
      nuxt-child

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


<!--<section class="section">-->
  <!--<button class="button is-info" @click.prevent="openCreate">-->
    <!--<i class="fa fa-plus" aria-hidden="true">&nbsp;</i>Modal A-->
  <!--</button>-->

  <!--<button class="button is-warning" @click.prevent="openLogin">-->
    <!--<i class="fa fa-plus" aria-hidden="true">&nbsp;</i>Modal B-->
  <!--</button>-->

  <!--<modal-box>-->
    <!--<div class="content" slot="content">-->

      <!--<component :is="el"></component>-->

    <!--</div>-->
  <!--</modal-box>-->

<!--</section>-->

<!--</template>-->


<!--<script>-->

  <!--import { mapActions, mapState } from 'vuex'-->
  <!--import modalBox from '../4-components/modal/modalBox.vue'-->
  <!--import createArticle from '../4-components/forms/createArticle.vue'-->
  <!--import authLogin from '../4-components/forms/authLogin.vue'-->

  <!--export default {-->

    <!--components: {-->
      <!--'modal-box': modalBox,-->
      <!--'form-article': createArticle,-->
      <!--'form-login': authLogin-->
    <!--},-->

    <!--data () {-->
      <!--return {-->
        <!--el: ''-->
      <!--}-->
    <!--},-->

    <!--computed: mapState(['isModalOpen']),-->

    <!--methods: {-->
      <!--...mapActions(['closeModal', 'openModal']),-->

      <!--openCreate () {-->
        <!--this.el = 'form-article'-->
        <!--this.$store.dispatch('openModal')-->
      <!--},-->

      <!--openLogin() {-->
        <!--this.el = 'form-login'-->
        <!--this.$store.dispatch('openModal')-->
      <!--}-->
    <!--},-->

    <!--mounted () {-->
      <!--document.addEventListener(-->
        <!--'keydown', (e) => {-->
          <!--if (this.show && e.keyCode === 27) {-->
            <!--this.closeModal()-->
          <!--}-->
        <!--})-->
    <!--}-->
  <!--}-->

<!--</script>-->
