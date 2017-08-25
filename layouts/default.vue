<template lang="pug">
  div
    top-line
    div.gw
      div.wrapper
        //- LEFT COLUMNT
        div.tape(v-bind:class="{ tapeMobile: isMobile }")

          create-post-button(v-if="isAuth")

          switch-blog-buttons

          post-list

        //- RIGHT COLUMNT
        post-map

        //- CONTENT
        modal-window
          keep-alive
            nuxt

</template>
<script>
import { mapState } from 'vuex'
import TopLine from '~/components/layout/__parts__/top-line'
import ModalWindow from '~/components/modal/modal-window'
import CreatePostButton from '~/components/blog/__parts__/button-create-post'
import PostList from '~/components/blog/post-list'
import PostMap from '~/components/blog/post-map'
import SwitchBlogButtons from '~/components/blog/__parts__/buttons-switch-blog'

export default {
  components: {
    TopLine,
    ModalWindow,
    CreatePostButton,
    PostList,
    PostMap,
    SwitchBlogButtons
  },
  computed: mapState({
    isMobile: state => state.isMobile,
    isAuth: state => state.user.auth.isAuth,
    isModalShown: state => state.modal.isShown
  }),
  methods: {}
}
</script>

<style lang="stylus">
  body
    background none
  .gw
    margin-top 72px
    position relative
  .blue
    color #4a90e2
  .user_av
    display block
    width 100%
  .pop_back
    background-color rgba(72, 84, 101, 0.8)
    width 100%
    height 100%
    position fixed
    overflow auto
    top: 0
    left: 0
    padding-top 72px
    box-sizing border-box
    z-index 101
    padding-bottom 60px
  .hideScroll
    overflow-y hidden

  .blog-nav
    margin-bottom 25px
    text-align center
    button
      width 100%

    .router-link-exact-active button
      border-color #50bfff
      color #50bfff

  .el-notification__content
    text-align left

  .tapeMobile
    margin-left 0!important

  .overflowHidden {
    overflow: hidden
  }
</style>
