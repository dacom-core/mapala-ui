export const state = () => ({
  isShown: false
})

export const mutations = {
  SHOW_MODAL (state) {
    state.isShown = true
  },
  HIDE_MODAL (state) {
    state.isShown = false
  }
}

