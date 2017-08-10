import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value) => {
  moment.locale('ru')
  if (value) {
    const stringifiedValue = value.toString()
    return moment(stringifiedValue).fromNow()
  }
})

Vue.filter('toRub', (value) => {
  const price = 2.37
  const sum = value * price
  return sum.toFixed(2)
})
