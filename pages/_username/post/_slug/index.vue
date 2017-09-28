<template lang="pug">
  modal-backdrop
    modal-box
      modal-close-button
      modal-content
        post-view
</template>

<script>
  import { mapMutations } from 'vuex'
  import PostView from '~/components/blog/post-view'
  import ModalBackdrop from '@/components/modal/__parts__/_backdrop.vue'
  import ModalBox from '@/components/modal/__parts__/_modal-box.vue'
  import ModalContent from '@/components/modal/__parts__/_modal-content.vue'
  import ModalCloseButton from '@/components/modal/__parts__/_close-button.vue'

  export default {
    name: 'post_view',
    head () {
      return {
        title: this.$store.state.blog.posts.post_single.postSingle.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.$store.state.blog.posts.post_single.postSingle.body.substring(0, 200)
          }
        ],
        bodyAttrs: {
          class: 'overflowHidden'
        }
      }
    },
    async fetch ({ store: { dispatch, commit }, params, from }) {
      commit('SET_BACK_PATH', from || {})
      await dispatch('blog/posts/post_single/fetch_single_post', params)
    },

    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL'
      })
    },
    mounted () {
      this.showModal()
    },
    components: {
      PostView,
      ModalBackdrop,
      ModalBox,
      ModalContent,
      ModalCloseButton
    }
  }
</script>

