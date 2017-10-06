import { get_cookie } from '@/utils/cookies'

export default function ({ isHMR, app, store, route, params, error, redirect, isServer, req }) {
  // // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params

  const cookieLocale = isServer ? get_cookie('lang', req) : get_cookie('lang')

  const locale = params.lang || cookieLocale

  if (store.state.locales.indexOf(locale) === -1) {
    app.i18n.locale = 'ru'
    return redirect(route.fullPath.replace(/^/, `/ru`))
  }

  app.i18n.locale = locale
  store.commit('SET_LANG', locale)
  // return redirect(route.fullPath.replace(/^/, `/ru`))

  // If route is /ru/... -> redirect to /...
  // if (locale === 'ru' && route.fullPath.indexOf('/ru') === 0) {
  // return redirect(route.fullPath.replace(/^\/ru/, '/'))
  // }
}
