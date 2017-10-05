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
    async fetch ({ store: { dispatch, commit }, params, from, isServer }) {
      commit('blog/posts/post_list/IS_LOADING_ALLOWED', false) // Disallow making requests for new posts.
      commit('SET_BACK_PATH', from || {})

      if (isServer) { // Prefetch post content if it's SSR page loading.
        await dispatch('blog/posts/post_single/fetch_single_post', params)
      } else { // Load post content after modal opening.
        dispatch('blog/posts/post_single/fetch_single_post', params)
      }
    },

    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL'
      })
    },
    created () {
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

