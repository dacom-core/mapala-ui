export const state = () => ({
  modalWindow: {
    isShown: false,
    nameToRouteMatch: {
      'login': '/login',
      'signUp': '/sign-up',
      'resetPassword': '/reset',
      'userSettings': '/settings',
      'createNewPost': '/create-new-post',
      'userWallet': '/wallet'
    }
  }
})

export const actions = {
  showModal ({ commit, redirect }, name) {
    const componentPath = state.modalWindow.nameToRouteMatch[name]
    commit('SHOW_MODAL')
    redirect(componentPath)
  },
  hideModal ({ commit }) {
    commit('HIDE_MODAL')
  }
}

export const mutations = {
  SHOW_MODAL (state) {
    state.modalWindow.isShown = true
  },
  HIDE_MODAL (state) {
    state.modalWindow.isShown = false
  }
}

