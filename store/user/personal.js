export const state = () => ({
  userName: '',
  avatar: '',
  firstName: '',
  lastName: ''
})

export const mutations = {
  FILL_USER (state, userData) {
    state = userData
  }
}

export const getters = {
}
