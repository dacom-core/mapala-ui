export const state = () => ({
  isUserViewVisible: false,
  isGroupViewVisible: false,
  isCommonViewVisible: false,
  rightColumn: null
})

export const actions = {
}

export const mutations = {
  SET_USER_BLOCK_VISIBLE (state) {
    state.isUserViewVisible = true
    state.isGroupViewVisible = false
    state.isCommonViewVisible = false
  },

  SET_GROUP_BLOCK_VISIBLE (state) {
    state.isUserViewVisible = false
    state.isGroupViewVisible = true
    state.isCommonViewVisible = false
  },

  SET_COMMON_BLOCK_VISIBLE (state) {
    state.isUserViewVisible = false
    state.isGroupViewVisible = false
    state.isCommonViewVisible = true
  },

  SET_RIGHT_COLUMN (state, payload) {
    state.rightColumn = payload
  }
}
