export const state = () => ({
  bc_username: '',
  avatar: ''
})

export const mutations = {
  SET_PAGE_AUTHOR_BC_USERNAME (state, payload) {
    state.bc_username = payload
  },
  SET_PAGE_AUTHOR_AVATAR (state, payload) {
    state.avatar = payload
  }
}
