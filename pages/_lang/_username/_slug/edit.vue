<template lang="pug">
  modal-backdrop(@click.native.self="goBack")
    modal-box
      modal-close-button
      modal-content
        post-form(:isEditForm="true", :postData="postData", @updatePost="updatePost", :resetForm="resetForm", :isFormSaving="isFormSaving")
</template>

<script>
  import ModalBackdrop from '@/components/modal/__parts__/_backdrop.vue'
  import ModalCloseButton from '@/components/modal/__parts__/_close-button.vue'
  import ModalBox from '@/components/modal/__parts__/_modal-box.vue'
  import ModalContent from '@/components/modal/__parts__/_modal-content.vue'
  import PostForm from '@/components/blog/__parts__/form'
  import bc from '@/api/blockchain'
  import { Post } from '@/api/services'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    head: {
      bodyAttrs: {
        class: 'overflowHidden'
      }
    },
    middleware: ['auth', 'has-posting-key'],
    async fetch ({ store: { commit }, isServer }) {
      isServer ? commit('blog/posts/post_list/IS_LOADING_ALLOWED', false) : ''// Disallow making requests for new posts.
    },
    async asyncData ({ route }) {
      const { data: postData } = await Post.get({ 
        permlink: route.params.username + '*@*' + route.params.slug 
      })

      return { postData: postData }
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
      }),
    },
    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL',
        hideModal: 'modal/HIDE_MODAL',
        resetBackPath: 'RESET_BACK_PATH'
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
