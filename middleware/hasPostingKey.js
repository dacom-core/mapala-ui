import bc from '@/api/blockchain'

export default function ({ isClient, store, redirect }) {

  if (isClient && bc.getPostingKey(undefined, store.state.user.personal.username)) {
    // window.history.back()
    redirect()
  }
}
