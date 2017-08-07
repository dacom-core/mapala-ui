<template lang="pug">
  div
    div.wrapper
      div.tape(v-bind:class="{ tapeMobile: isMobile }")
        user-profile(v-if="user && user != 'mapala'", :has-not-pages="has_not_pages")

        nuxt-link(
          :to="{ name: 'createNewPost', params: { user: userName } }",
          v-if="isAuth &&(userName == $route.params.user || $route.name == 'index')" class="add_post"
          )
          div.av_wrap
            img.user_av(:src="userAvatar")
          div.write_post
            | {{ $t('add') }}

        el-row(
          v-if="userName != $route.params.user && !isMobile"
          type="flex"
          class="blog-nav"
          justify="space-between"
          )
          el-col(:span="11")
            nuxt-link(:to="{name: 'index'}")
              el-button(:plain="true" size="large" type="info")
                | {{ $t('travel_blogs') }}

          el-col(:span="11")
            router-link(:to="'/mapala'")
              el-button(:plain="true" size="large" type="info")
                | {{ $t('mapala_blogs') }}

        div(v-if="userName != $route.params.user && isMobile")
          el-row(type="flex" class="blog-nav" justify="space-between")
            el-col(:span="24")
              router-link(:to="{name: 'index'}")
                el-button(:plain="true" size="large" type="info")
                  | {{ $t('travel_blogs') }}

          el-row(
            v-if="userName != $route.params.user"
            type="flex"
            class="blog-nav"
            justify="space-between"
            )
            el-col(:span="24")
              nuxt-link(:to="'/mapala'")
                el-button(:plain="true" size="large" type="info")
                  | {{ $t('mapala_blogs') }}

        post-list

        mugen-scroll(
          v-if="!has_not_pages"
          tag="mu",
          :handler="nextPosts",
          :should-handle="!loading"
          )
          | &nbsp;
      component(v-if="!isMobile" v-bind:is="rightView")
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      rightView: null
    }
  },
  computed: {
    ...mapState({
      isAuth: 'user/auth/isAuth',
      userName: 'user/personal/userName',
      userAvatar: 'user/personal/avatar',
      userBalance: 'user/wallet/balance',
      isMobile: 'isMobile'
    }),
  },

  methods: {
  },
  created () {
    //  let user = this.$route.params.user
    //  this.authorPosts(user)
  },
  components: {
  }
}
</script>

<style lang="stylus">
  .hideScroll {
    overflow-y: hidden;
  }
  .blog-nav {
    margin-bottom: 25px;
    text-align: center;
  }
  .blog-nav button {
    width: 100%;
  }
  .blog-nav .router-link-exact-active button {
    border-color: #50bfff;
    color: #50bfff;
  }
  .el-notification__content {
    text-align: left;
  }
  .tapeMobile {
    margin-left: 0!important;
  }
</style>
