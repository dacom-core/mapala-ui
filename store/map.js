export const state = () => ({
  filters: ''
})

export const actions = {
  computeFilters ({ commit, rootState: { user } }, page) {

    let filters

    switch (page) {
      case 'index':
        filters = ''
        break
      case 'group':
        filters = { group: 'rnd' }
        break
      case 'user':
        filters = { author__username: user.auth.isAuth }
        break
    }

    console.log(filters)

    commit('SET_FILTERS', filters)
  }
}

export const mutations = {
  SET_FILTERS (state, payload) {
    state.filters = payload
  }
}
