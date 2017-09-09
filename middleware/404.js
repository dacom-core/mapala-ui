export default function ({ app, store, route, params, error, redirect, hotReload }) {
  // Check if middleware called from hot-reloading, ignore
  if (hotReload) { return }


  if (typeof params.username !== 'undefined') {
    if (typeof params.slug !== 'undefined') {

    }
  }

  if (typeof params.groupname !== 'undefined') {

  }
}
