<template lang="pug">
    div
        nuxt-child.ico(:ico="ico")
</template>

<script>
import auth from '@/api/auth'
import axios from 'axios'

export default {
    layout: 'full-width',
    async asyncData ({ store }) {
        const { data: ico } = await axios.get(`${store.state.API_SERVER}api/v1/site/ico`)

        return { ico: ico }
    },
    data () {
        return {
            title: 'ICO',
            error: null
        }
    },
    computed: {
        isMobile () {
            return this.$store.state.isMobile
        },
        userName () {
            return this.$store.state.user.personal.username
        }
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
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 5px;
}

.ico-bottom a {
    text-decoration: none;
}

.ico-bottom h4.ico-hist:before {
  content: '';
  background: url('~assets/ico/history.png') no-repeat;
  background-size: cover;
  background-position: center center;
  height: 127px;
  min-width: 110px;
  display: inline-block;
}


.ico-blog {
    background: url('~assets/ico/blog.png') no-repeat;
}

h1,
h3 {
    font-weight: normal;
    text-align: center;
}
</style>
