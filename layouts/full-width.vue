<template lang="pug">
  nuxt.ico
</template>

<script>
  import api from '@/api/temporary'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        title: 'ICO',
        ico: null,
        error: null
      }
    },
    computed: {
      ...mapState({ userName: state => state.user.personal.username })
    },
    mounted () {
      this.error = this.ico = null
      const that = this
      api.ico.auction(this.userName, function (data) {
        that.ico = data
      })
    }
  }
</script>

<style>
  .ico {
    font-family: Roboto;
    overflow-x: hidden;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .auc-bg {
    padding-top: 80px;
    padding-bottom: 100px;
  }
  .ico-bottom {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 40px;
    font-size: 24px
  }
  .ico-bottom h4 {
    height: 127px;
    max-width: 200px;
    padding-left: 80px;
    padding-top: 40px;
    font-weight: normal;
  }
  .ico-bottom a {
    text-decoration: none;
  }
  .ico-hist {
    background: url('../assets/ico/history.png') no-repeat;
  }
  .ico-blog {
    background: url('../assets/ico/blog.png') no-repeat;
  }
  h1, h3 {
    font-weight: normal;
    text-align: center;
  }
</style>
