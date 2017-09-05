export const state = () => ({
  bc_username: ''
})

export const mutations = {
  SET_PAGE_AUTHOR_BC_USERNAME (state, payload) {
    state.bc_username = payload
  }
}
