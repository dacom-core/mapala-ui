<template lang="pug">
  div
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
        nuxt-link(:to="'/mapala'")
          el-button(:plain="true" size="large" type="info")
            | {{ $t('mapala_blogs') }}

    div(v-if="userName != $route.params.user && isMobile")
      el-row(type="flex" class="blog-nav" justify="space-between")
        el-col(:span="24")
          router-link(:to="{ name: 'index' }")
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

</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      userName: state => state.user.personal.userName,
      isMobile: state => state.isMobile
    })
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
  .blog-nav .nuxt-link-exact-active button {
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
