import blockchains from '../blockchain'
import store from 'store'
import { User } from '../services'
import { showErrors } from '@/utils/show_errors'
import axios from 'axios'
import Vue from 'vue'
import { HTTP } from '@/api'

const JWT_AUTH_URL = '/api/auth/login/'
const JWT_REFRESH_URL = '/api/auth/refresh/'

export default {
  // TODO Выпилить всю логику с блокчейнами в отдельный модуль
  isAuth: false,
  balance: '0 GOLOS',

  user: {
    username: ' ',
    locale: store.get('locale')
  },

  refreshJWT (token = '') {
    return axios.post(JWT_REFRESH_URL, { token: token || Vue.cookie.get('jwt') })
  },

  update (axiosInstance) {
    return User(axiosInstance).update({ username: this.user.username }, this.user)
  },

  async login (context, creds, redirect) {
    const { data } = await Vue.axios.post(JWT_AUTH_URL, creds)

    Vue.cookie.set('jwt', data.token)

    context.$store.commit('user/auth/SET_JWT_TOKEN', data.token)

    context.$store.commit('user/personal/FILL_USER', data.user)

    context.$store.commit('user/auth/SET_AUTH_TO', true)

    blockchains.initBlockchains(context)

    if (redirect) { context.$router.push(redirect) }
  },

  existngSignUp (creds, redirect) {
    return User.existngSignUp(creds)
  },

  async signUp (context, creds, redirect) {
    try {
      context.loading = true
      store.clearAll()

      const { data } = await User.signUp(creds)

      Vue.cookie.set('jwt', data.token)

      context.$store.commit('user/auth/SET_JWT_TOKEN', data.token)

      context.$store.commit('user/personal/FILL_USER', data.user)

      context.$store.commit('user/auth/SET_AUTH_TO', true)

      store.set(`golos_${data.user.username}_posting_key`, data.posting_key)

      blockchains.initBlockchains(context)

      context.$alert(
        data.posting_key,
        'Сохраните ваш приватный постинг ключ от golos.io', {
          confirmButtonText: 'Я сохранил ключ',
          callback: () => {
            if (redirect) { context.$router.push(redirect) }
          }
        }
      )
    } catch (error) {
      context.loading = false
      showErrors(error.response.data, context)
    }
  },

  logout (context) {
    this.isAuth = false
    this.user = {}

    store.remove('jwt')
  },

  checkAuth () {
    this.isAuth = !store.get('jwt')

    // Обновим токен и запросим юзера при старте приложения
    // Токен обновляется при каждом запуске приложения
    if (this.isAuth) {
      this.refreshJWT().then(res => {
        store.set('jwt', res.body.token)

        this.user = res.body.user
        blockchains.initBlockchains()
      }, res => {
        // Если токен просрочен или не правильный
        console.log('Auth error: ', res.body)
        this.logout()
      })
    }
  },

  getAuthToken () {
    let token = store.get('jwt')
    return !!token ? 'JWT ' + token : null
  }
}
