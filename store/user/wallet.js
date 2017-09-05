export const state = () => ({
  golos: '0 GOLOS',
  gbg: '0'
})

export const mutations = {
  SET_GOLOS_BALANCE (state, payload) {
    state.golos = payload
  },
  SET_GBG_BALANCE (state, payload) {
    state.gbg = payload
  }
}

export const getters = {
}

