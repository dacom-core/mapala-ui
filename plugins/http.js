import axios from 'axios'
import Vue from 'vue'

export default ({ store }) => {
  store.commit('SET_API_SERVER_ADDRESS', process.env.API_SERVER || 'https://dev.mapala.net/')
  
  const config = {
    baseURL: store.state.API_SERVER,
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
      request.headers['Authorization'] = 'JWT ' + store.state.user.auth.token
    }
    request.headers['Locale'] = store.state.locale

    return request
  })
}
