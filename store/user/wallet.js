export const state = () => ({
  balance: '0 GOLOS'
})

export const mutations = {
  FILL_BALANCE (state, { balance }) {
    state.balance = balance
  }
}

export const getters = {
}

