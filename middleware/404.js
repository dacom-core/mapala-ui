import { User, Group } from '@/api/services'

export default function ({ app: { $axios }, store, route, params, error, redirect, hotReload }) {

  

  // if (typeof params.username !== 'undefined') {
  //   return User($axios).get(params.username).catch(() => redirect(store.getters.backPath))
  // } else if (typeof params.groupname !== 'undefined') {
  //   return Group($axios).get(params.groupname).catch(() => redirect(store.getters.backPath))
  // }
}
