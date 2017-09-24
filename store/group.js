import { Group } from '~/api/services'

export const state = () => ({
  avatar: '',
  title: ''
})

export const mutations = {
  SET_AVATAR (state, payload) {
    state.avatar = payload
  },
  SET_TITLE (state, payload) {
    state.title = payload
  }
}

export const actions = {
  async fetch_group ({ commit }, groupname) {
    const { data } = await Group.get({ groupname })

    commit('SET_AVATAR', data.logo)
    commit('SET_TITLE', data.title)
  }
}

