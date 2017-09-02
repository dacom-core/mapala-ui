export const state = () => ({
  id: '',
  username: '',
  email: '',
  avatar: '',
  has_avatar: false,
  bc_username: '',
  locale: ''
})

export const mutations = {
  FILL_USER (state, userData) {
    state.id = userData.id
    state.username = userData.username
    state.email = userData.email
    state.avatar = userData.avatar
    state.has_avatar = userData.has_avatar
    state.bc_username = userData.bc_username
    state.locale = userData.locale
  },
  RESET_USER (state) {
    state.id = ''
    state.username = ''
    state.email = ''
    state.avatar = ''
    state.has_avatar = ''
    state.bc_username = ''
    state.locale = ''
  }
}

export const getters = {
}
