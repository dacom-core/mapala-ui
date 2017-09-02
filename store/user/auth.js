import { User } from '@/api/services'

export const state = () => ({
  isAuth: false,
  token: ''
})

export const mutations = {
  SET_AUTH_TO (state, payload) {
    state.isAuth = payload
  },
  LOGOUT (state) {
    state.isAuth = false
  }
}

export const actions = {
  async fetch_user ({ commit }) {
    const { data } = await User.current()
    commit('user/personal/FILL_USER', data, { root: true })
    commit('SET_AUTH_TO', true)
  }
}
