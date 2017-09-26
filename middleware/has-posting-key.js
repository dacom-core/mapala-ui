import bc from '@/api/blockchain'
import { Notification } from 'element-ui'

export default function ({ isClient, store, redirect, app: { i18n } }) {
  if (isClient && !bc.getPostingKey(undefined, store.state.user.personal.username)) {
    Notification.warning({ message: i18n.t('add_key') })
    return redirect(store.getters.backPath)
  }
}
