export const state = () => ({
  isShown: false
})

export const mutations = {
  SHOW_MODAL (state) {
    state.isShown = true
  },
  HIDE_MODAL (state) {
    state.isShown = false
  },
  SET_MODAL_CONTENT (state, componentName) {
    state.content = componentName
  }
}

