export const state = () => ({
  isShown: false,
  // nameToRouteMatch: {
  //   'login': '/login',
  //   'signUp': '/sign-up',
  //   'resetPassword': '/reset',
  //   'userSettings': '/settings',
  //   'createNewPost': '/create-new-post',
  //   'userWallet': '/wallet'
  // }
})

// export const actions = {
//   showModal ({ commit, state }, name) {
//     commit('SHOW_MODAL')
//     return state.modalWindow.nameToRouteMatch[name]
//   },
//   hideModal ({ commit }) {
//     commit('HIDE_MODAL')
//   }
// }

export const mutations = {
  SHOW_MODAL (state) {
    state.isShown = true
  },
  HIDE_MODAL (state) {
    state.isShown = false
  }
}

