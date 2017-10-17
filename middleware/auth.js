export default function ({ store, redirect }) {
  if (!store.state.user.auth.isAuth) {
    return redirect(`/${store.state.locale}/auth/login/`)
  }
}
