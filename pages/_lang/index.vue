<template lang="pug">
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

      div(v-if="userName != $route.params.user && isMobile()")
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

      mugen-scroll(
        tag="mu",
        :handler="nextPosts",
        :should-handle="!loading"
      )
        | &nbsp;



</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TwoColumnsLayout from '~/components/layout/mapala-two-column-layout'
import CreatePostButton from '~/components/blog/__parts__/mapala-create-post-button'

export default {
  data () {
    return {
      rightView: null,
      // Заглушки
      loading: false
    }
  },
  computed: {
    ...mapState('user/state', {
      isAuth: state => state.isAuth,
      userName: state => state.userName
    })
  },

  methods: {
    ...mapGetters(['isMobile']),
    // Заглушки
    nextPosts () {
    }
  },

  components: {
    TwoColumnsLayout,
    CreatePostButton
  },

  mounted () {
    console.log(this.isMobile)
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


