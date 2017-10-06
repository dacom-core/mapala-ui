import { get_cookie } from '@/utils/cookies'

export default function ({ isHMR, app, store, route, params, error, redirect, isServer, req }) {
  // // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const cookieLocale = isServer ? get_cookie('locale', req) : get_cookie('locale')

  const locale = params.lang || cookieLocale || 'ru'

  if (store.state.locales.indexOf(locale) === -1) {
    app.i18n.locale = 'ru'
    return redirect(route.fullPath.replace(/^/, `/ru`))
  }

  app.i18n.locale = locale
  store.commit('SET_LANG', locale)

  if (typeof params.lang === 'undefined') {
    return redirect(route.fullPath.replace(/^/, locale))
  }
}
