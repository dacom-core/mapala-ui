<template lang="pug">
  div
    keep-alive
      top-line
    div.gw
      div.wrapper
        //- LEFT COLUMNT
        div.tape(v-bind:class="{ tapeMobile: isMobile }")

          user-view(v-if="isUserPage")

          group-view(v-else-if="isGroupPage")

          common-view(v-else-if="isCommonPage")

          post-list#post_list_block(
            v-infinite-scroll="loadNextPosts",
            infinite-scroll-disabled="isLoadingDisabled",
            :infinite-scroll-distance="500"
            )

        //- RIGHT COLUMNT
        post-map

        //- CONTENT
        modal-window
          nuxt

</template>
<script>
import { mapState, mapActions } from 'vuex'
import blockchain from '@/api/blockchain'
import TopLine from '~/components/layout/top-line'
import ModalWindow from '~/components/modal/modal-window'
import PostList from '~/components/blog/post-list'
import PostMap from '~/components/blog/post-map'
import CommonView from '~/components/layout/common-view'
import GroupView from '~/components/layout/group-view'
import UserView from '~/components/layout/user-view'

export default {
  components: {
    TopLine,
    ModalWindow,
    PostList,
    PostMap,
    CommonView,
    GroupView,
    UserView
  },

  computed: {
    ...mapState({
      isMobile: state => state.isMobile,
      isAuth: state => state.user.auth.isAuth,
      isLoading: state => state.blog.posts.isLoading,
      isLoadingAllowed: state => state.blog.posts.isLoadingAllowed,
    }),
    isLoadingDisabled () { // Check on has loading of next posts to be disabled
      return this.isLoading || !this.isLoadingAllowed
      // The first check: Is loading posts already in progress
      // The second check: Are there more posts to load
    },
    distanceToLoad () {
      if (typeof window !== 'undefined') {
        //  const lastPostInList = document.getElementById('post_list_block')
        //  TODO compute distance to load next posts
      }
    },
    isGroupPage () {
      return !!this.$route.params.groupname // is it a group's page
    },
    isCommonPage () {
      return this.$route.name === 'index' // is it main page
    },
    isUserPage () {
      return !!this.$route.params.username // is it a user's page
    }
  },

  mounted () {
    blockchain.init(this.$store)
  },

  methods: {
    ...mapActions({
      loadNextPosts: 'blog/posts/fetch_next_posts'
    })
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
