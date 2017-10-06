import Vue from 'vue'

export default ({ store }) => {
  const actionToRoute = {
    install (Vue) {
      Vue.prototype.$action = function (action, identifier, permalink = '') {
        let link

        if (action === 'post-view') {
          link = `/${store.state.locale}/${identifier}/post/${permalink}/`
        } else if (action === 'edit') {
          link = `/${store.state.locale}/${identifier}/post/${permalink}/edit/`
        } else if (action === 'create') {
          link = `/${store.state.locale}/${identifier}/post/create/`
        } else if (action === 'create-post-group') {
          link = `/${store.state.locale}/group/${identifier}/create/`
        }

        return link
      }
    }
  }

  Vue.use(actionToRoute)
}
