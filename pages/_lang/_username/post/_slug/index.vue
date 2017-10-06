<template lang="pug">
  modal-backdrop
    modal-box
      modal-close-button
      modal-content
        clip-loader.loading_spinner(:loading="isLoading", color="#4FBEFF")
        template(v-if="isLoading ? false : true")
          post-view
</template>

<script>
  import { mapMutations, mapGetters, mapState } from 'vuex'
  import PostView from '~/components/blog/post-view'
  import ModalBackdrop from '@/components/modal/__parts__/_backdrop.vue'
  import ModalBox from '@/components/modal/__parts__/_modal-box.vue'
  import ModalContent from '@/components/modal/__parts__/_modal-content.vue'
  import ModalCloseButton from '@/components/modal/__parts__/_close-button.vue'
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

  export default {
    name: 'post_view',
    head () {
      return {
        title: this.postMetaTitle,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.postMetaDescription
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

    computed: {
      ...mapGetters({
        postMetaDescription: 'blog/posts/post_single/postMetaDescription',
        postMetaTitle: 'blog/posts/post_single/postMetaTitle'
      }),

      ...mapState({
        isLoading: state => state.blog.posts.post_single.isLoading
      })
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
      ModalCloseButton,
      ClipLoader
    }
  }
</script>

