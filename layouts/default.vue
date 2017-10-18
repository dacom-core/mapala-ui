<template lang="pug">
  div
    top-line
    div.gw
      div.wrapper(:class="{ container: isMobile }")
        //- LEFT COLUMNT
        div.tape(v-bind:class="{ tapeMobile: isMobile }")

          user-view(v-if="isUserViewVisible")

          group-view(v-else-if="isGroupViewVisible")

          common-view(v-else-if="isCommonViewVisible")

          post-list#post_list_block

        //- RIGHT COLUMNT
        component(v-if="!isMobile", :is="rightComponent")

        //- CONTENT
        nuxt

    chat

</template>
<script>
import { mapState } from 'vuex'
import blockchain from '@/api/blockchain'
import TopLine from '~/components/layout/top-line'
import PostList from '~/components/blog/post-list'
import PostMap from '~/components/blog/post-map'
import BlogDesk from '~/components/blog/blog-desk'
import CommonView from '~/components/layout/common-view'
import GroupView from '~/components/layout/group-view'
import UserView from '~/components/layout/user-view'
import Chat from '~/components/other/chat'

export default {
  computed: {
    ...mapState({
      isMobile: state => state.isMobile,
      isAuth: state => state.user.auth.isAuth,
      isLoading: state => state.blog.posts.post_list.isLoading,
      isLoadingAllowed: state => state.blog.posts.post_list.isLoadingAllowed,
      isUserViewVisible: state => state.layout.isUserViewVisible,
      isGroupViewVisible: state => state.layout.isGroupViewVisible,
      isCommonViewVisible: state => state.layout.isCommonViewVisible,
      rightColumn: state => state.layout.rightColumn
    }),
    rightComponent () {
      if (this.rightColumn === 'desk') {
        return BlogDesk
      } else if (this.rightColumn === 'map') {
        return PostMap
      }
    }
  },
  async mounted () {
    await blockchain.init(this.$store)
    if (this.isAuth) {
      await blockchain.initBlockchains(this)
    }
    window.scroll({
      top: 2500,
      left: 0,
      behavior: 'smooth'
    })
  },
  created () {
    this.$i18n.locale = this.$store.state.locale
  },
  components: {
    TopLine,
    PostList,
    PostMap,
    BlogDesk,
    CommonView,
    GroupView,
    UserView,
    Chat
  }
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
    z-index 100000
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
