import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBUggg4I6FWB6sHijJGpXvBDdoZKqi1J7Y',
    libraries: 'places'
  }
})

Vue.component('google-map', VueGoogleMaps.Map)
Vue.component('google-marker', VueGoogleMaps.Marker)
Vue.component('google-cluster', VueGoogleMaps.Cluster)

export const googleMapStyles = [
  {
    'stylers': [
      {
        'hue': '#007fff'
      },
      {
        'saturation': 89
      }
    ]
  },
  {
    'featureType': 'water',
    'stylers': [
      {
        'color': '#ffffff'
      }
    ]
  },
  {
    'featureType': 'administrative.country',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  }
]
