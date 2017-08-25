import { User } from '@/api/services'

export const state = () => ({
  isAuth: false,
  token: ''
})

export const mutations = {
  SET_AUTH (state, payload) {
    state.isAuth = payload
  }
}

export const actions = {
  async fetch_user ({ commit }) {
    const { results } = await User.current()
    commit('user/personal/FILL_USER', results)
    commit('user/wallet/FILL_BALANCE', results)
    commit('user/auth/SET_AUTH', true)
  }
}
