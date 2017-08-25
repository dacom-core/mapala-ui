export default function ({ app, store, route, params, error, redirect, hotReload }) {
  // Check if middleware called from hot-reloading, ignore
  if (hotReload) { return }

  if (route.fullPath.endsWith('svg')) {
    return
  }

  app.router.afterEach((to, from) => {
    store.commit('PUSH_TO_HISTORY_STACK', from.fullPath) // PUSH EVERY VISITED ROUTE TO STORE ARRAY

    if (store.state.modal.isShown) { // THEN CHECK IS A MODAL SHOWN, IF IS, THE PREVIOUS URL SHOULD BE THE BACK PATH FOR CLOSING MODAL.
      store.commit('SET_BACK_PATH', from.fullPath)
    }
  })
}
