import axios from 'axios'
import { get_cookie } from '@/utils/cookies'
import Vue from 'vue'
import { MAPALA_API_PROTOCOL, MAPALA_API_HOST, MAPALA_API_BASE_PATH } from '../api/config'

export default ({ req, isServer, isClient, store }) => {

  const host = `${MAPALA_API_PROTOCOL}://${MAPALA_API_HOST}/${MAPALA_API_BASE_PATH}`

  const config = {
    baseURL: host,
    withCredentials: true,
    headers: {}
  }

  const http = {
    install (Vue) {
      Vue.prototype.$axios = Vue.axios = axios.create(config)
    }
  }

  Vue.use(http)

  Vue.axios.interceptors.request.use((request) => {

    if (store.state.user.auth.token) {
      Object.assign(
        Vue.prototype.$axios.defaults.headers.common,
        Vue.prototype.$axios.defaults.headers.common,
        { 'Authorization': 'JWT ' + store.state.user.auth.token })
    }

    Object.assign(
      Vue.prototype.$axios.defaults.headers.common,
      Vue.prototype.$axios.defaults.headers.common,
      { 'Locale': store.state.locale })

    return request
  })
}
