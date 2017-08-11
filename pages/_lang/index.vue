<template lang="pug">
  div
    two-columns-layout
      template(slot="leftScreen")

        create-post-button(v-if="isAuth")

        el-row(
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
          tag="mu",
          :handler="nextPosts",
          :should-handle="!loading"
        )
          | &nbsp;

      template(slot="rightScreen")
        post-map

</template>

<script>
import { mapState } from 'vuex'
import TwoColumnsLayout from '~/components/layout/mapala-two-column-layout'
import CreatePostButton from '~/components/blog/__parts__/mapala-create-post-button'
import PostList from '~/components/blog/mapala-post-list'
import PostMap from '~/components/blog/mapala-post-map'
import MapalaModal from '~/components/modal/mapala-modal-window'

export default {
  async fetch ({ store: { dispatch, commit } }) {
    const { data: { results }  } = await dispatch('blog/post-list/fetch_posts')
    commit('blog/post-list/SET_POSTS', results)
  },

  data () {
    return {
      rightView: null,
      loading: false
    }
  },
  computed: {
    ...mapState({
      isAuth: state => state.user.auth.isAuth,
      userName: state => state.user.personal.userName,
      isMobile: state => state.isMobile
    })
  },

  methods: {
    // Заглушки
    nextPosts () {
    }
  },

  components: {
    TwoColumnsLayout,
    CreatePostButton,
    PostList,
    PostMap,
    MapalaModal
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


