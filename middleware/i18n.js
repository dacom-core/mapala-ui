export default function ({ isHMR, app, store, route, params, error, redirect }) {
  // // If middleware is called from hot module replacement, ignore it
  // if (isHMR) return
  // // Get locale from params
  // const locale = params.lang || 'ru'
  // // if (store.state.locales.indexOf(locale) === -1) {
  // //   return error({ message: 'This page could not be found.', statusCode: 404 })
  // // }
  // // Set locale
  //
  // // 1. Кнопка должна менять локаль в сторе.
  // // 2.
  //
  // store.commit('SET_LANG', locale)
  // app.i18n.locale = store.state.locale
  // // If route is /ru/... -> redirect to /...
  // if (locale === 'ru' && route.fullPath.indexOf('/ru') === 0) {
  //   return redirect(route.fullPath.replace(/^\/ru/, '/'))
  // }
}
