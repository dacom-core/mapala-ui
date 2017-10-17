<template lang="pug">
    div
        nuxt-child.ico(:ico="ico")
</template>

<script>
import auth from '@/api/auth'
import { MAPALA_API_PROTOCOL, MAPALA_API_HOST, MAPALA_API_BASE_PATH } from '@/api/config'
import axios from 'axios'
const API_URL = `${MAPALA_API_PROTOCOL}://${MAPALA_API_HOST}/${MAPALA_API_BASE_PATH}api/v1/site`

export default {
    layout: 'full-width',
    async asyncData ({ store }) {
        
        const { data: ico } = await axios.get(`${API_URL}/ico`, {
//          params: {
//            user: store.state.user.personal.username 
//          }
        })
        console.log(ico)
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
    background: url('~assets/ico/history.png') no-repeat;
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