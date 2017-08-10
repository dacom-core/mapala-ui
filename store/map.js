import { googleMapStyles } from '~/plugins/vue-google-maps'

export const state = () => ({
  markers: [],
  infoWindow: {
    options: {
      maxWidth: 250,
      pixelOffset: {
        width: 0,
        height: -35
      }
    },
    position: {
      lat: 0.0,
      lng: 0.0
    },
    opened: false,
    content: ''
  },
  mapOptions: {
    styles: googleMapStyles,
    minZoom: 4,
    mapTypeControl: true,
    zoomControlOptions: {
      position: null
    },
    streetViewControlOptions: {
      position: null
    }
  },
  center: { lat: 50.0542, lng: 20.0051 },
  icon: '~assets/static/icon-marker-3.png'
})

export const actions = {

}

export const mutations = {

}

export const getters = {
  getMapObject (state) {
    return state
  }
}

