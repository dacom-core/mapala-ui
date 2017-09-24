<template lang="pug">
  modal-backdrop
    modal-box
      modal-content
        post-form(:isEditForm="false", @createPost="createPost", :resetForm="resetForm", :isFormSaving="isFormSaving")
</template>

<script>
  import ModalBackdrop from '@/components/modal/__parts__/_backdrop.vue'
  import ModalBox from '@/components/modal/__parts__/_modal-box.vue'
  import ModalContent from '@/components/modal/__parts__/_modal-content.vue'
  import PostForm from '@/components/blog/__parts__/form'
  import bc from '@/api/blockchain'
  import { mapMutations } from 'vuex'

  export default {
    head: {
      bodyAttrs: {
        class: 'overflowHidden'
      }
    },

//    middleware: ['has-posting-key'],

    data () {
      return {
        resetForm: false,
        isFormSaving: false
      }
    },

//    mounted () {
//      const username = this.$store.state.user.personal.username
//
//      if (!bc.getPostingKey(undefined, username)) {
//        this.$router.push('/')
//        this.$notify({ message: this.$t('add_key'), type: 'warning' })
//      }
//    },

    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL',
        hideModal: 'modal/HIDE_MODAL'
      }),

      async createPost (form) {
        try {
          this.isFormSaving = true
          await bc.createPost(this, form)

          this.isFormSaving = false

          this.hideModal()
          this.$router.push(history.back())

          this.resetForm = true

          this.$notify({ message: this.$t('published'), type: 'success' })
        } catch (error) {
          this.isFormSaving = false
          this.$notify({ message: error.message, type: 'warning' })
        }
      }
    },

    beforeDestroy () {
      this.hideModal()
    },

    components: {
      PostForm,
      ModalBackdrop,
      ModalBox,
      ModalContent
    }
  }
</script>
