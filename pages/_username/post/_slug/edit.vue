<template lang="pug">
  modal-backdrop
    modal-box
      modal-content
        post-form(:isEditForm="true", @updatePost="updatePost", :resetForm="resetForm", :isFormSaving="isFormSaving")
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

    data () {
      return {
        resetForm: false,
        isFormSaving: false
      }
    },
    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL',
        hideModal: 'modal/HIDE_MODAL'
      }),

      async updatePost (form) {
        try {
          this.isFormSaving = true
          await bc.updatePost(this, form)
          this.isFormSaving = false

          this.hideModal()
          this.$router.go(-1)
          this.resetForm = true

          this.$notify({ message: this.$t('post_updated'), type: 'success' })
        } catch (error) {
          this.$notify({ message: error, type: 'warning' })
        }
      }
    },
    mounted () {
      this.showModal()
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
