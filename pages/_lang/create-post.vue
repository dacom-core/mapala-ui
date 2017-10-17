<template lang="pug">
  modal-backdrop(@click.native.self="goBack")
    modal-box
      modal-close-button
      modal-content
        post-form(:isEditForm="false", @createPost="createPost", :resetForm="resetForm", :isFormSaving="isFormSaving")
</template>

<script>
import ModalBackdrop from '@/components/modal/__parts__/_backdrop.vue'
import ModalCloseButton from '@/components/modal/__parts__/_close-button.vue'
import ModalBox from '@/components/modal/__parts__/_modal-box.vue'
import ModalContent from '@/components/modal/__parts__/_modal-content.vue'
import PostForm from '@/components/blog/__parts__/form'
import bc from '@/api/blockchain'
import { mapMutations, mapGetters } from 'vuex'

export default {
  head: {
    bodyAttrs: {
      class: 'overflowHidden'
    }
  },

  middleware: ['auth', 'has-posting-key'],

  fetch ({ store: { commit }, from, isServer }) {
    isServer ? commit('blog/posts/post_list/IS_LOADING_ALLOWED', false) : ''// Disallow making requests for new posts.
    commit('SET_BACK_PATH', from || {})
  },

  data () {
    return {
      resetForm: false,
      isFormSaving: false
    }
  },

  computed: {
      ...mapGetters({
        backPath: 'backPath'
      })
  },

  methods: {
    ...mapMutations({
      showModal: 'modal/SHOW_MODAL',
      hideModal: 'modal/HIDE_MODAL',
      resetBackPath: 'RESET_BACK_PATH'
    }),
    async createPost (form) {
      try {
        this.isFormSaving = true

        await bc.createPost(this, form)

        this.isFormSaving = false

        this.hideModal()

        this.$router.push(this.backPath)

        this.resetForm = true

        this.$notify({ message: this.$t('published'), type: 'success' })
      } catch (error) {
        this.isFormSaving = false
        this.$notify({ message: error.message, type: 'warning' })
      }
    },
    goBack () {
      this.hideModal()
      this.$router.push(this.backPath)
      this.resetBackPath()
    }
  },

  created () {
    this.showModal()
  },

  mounted () {
//    const username = this.$store.state.user.personal.username
//    if (!bc.getPostingKey(undefined, username)) {
//      this.$notify({ message: this.$t('add_key'), type: 'warning' })
//      this.$router.push('/')
//    }
  },

  beforeDestroy () {
    this.hideModal()
  },

  components: {
    PostForm,
    ModalBackdrop,
    ModalBox,
    ModalContent,
    ModalCloseButton
  }
}
</script>
