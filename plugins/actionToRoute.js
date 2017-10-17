import Vue from 'vue'

export default ({ store }) => {
  const actionToRoute = {
    install (Vue) {
      Vue.prototype.$action = function (action, identifier, permalink = '') {
        let link

        if (action === 'post-view') {
          link = `/${store.state.locale}/${identifier}/${permalink}/`
        } else if (action === 'edit') {
          link = `/${store.state.locale}/${identifier}/${permalink}/edit/`
        } else if (action === 'create') {
          link = `/${store.state.locale}/create-post/`
        } else if (action === 'create-post-group') {
          link = `/${store.state.locale}/group/${identifier}/create-post/`
        }

        return link
      }
    }
  }

  Vue.use(actionToRoute)
}
