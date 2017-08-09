import { api_fetch_user } from '@/api/user'

export const actions = {
  fetch_user ({ commit }) {
    return api_fetch_user().then((response) => {
      commit('user/mutations/fill_user', response.data)
    }).catch((response) => {
      console.log('fetch_user failed', response)
    })
  }
}
