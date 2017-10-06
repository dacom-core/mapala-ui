
import Vue from 'vue'

export default ({ store }) => {
  const pathMaker = {
    install (Vue) {
      Vue.prototype.$path = function (url) {
        return `/${store.state.locale}${url}`
      }
    }
  }

  Vue.use(pathMaker)
}
