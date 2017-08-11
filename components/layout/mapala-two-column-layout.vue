<template lang="pug">
  div
    div.wrapper
      div.tape(v-bind:class="{ tapeMobile: isMobile }")
        slot(name="leftScreen")

      slot(v-if="!isMobile" name="rightScreen")

      nuxt-child
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: mapState({
    isMobile: state => state.isMobile
  })
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
