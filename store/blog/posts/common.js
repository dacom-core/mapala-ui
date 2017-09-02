export const mutations = {
  RESET_PAGE (state) { // Reset page variable to 1
    state.postList.page = 1
  },
  NO_MORE_POSTS (state) {
    state.thereAreNoPosts = true
  }
}
