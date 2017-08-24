export default function ({ app, store, route, params, error, redirect, hotReload }) {
  // Check if middleware called from hot-reloading, ignore
  if (hotReload) { return }

  if (route.fullPath.endsWith('svg')) {
    return
  }

  app.router.afterEach((to, from) => {
    store.commit('PUSH_TO_HISTORY_STACK', from.fullPath)
  })
}
