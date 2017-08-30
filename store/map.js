import { Marker } from '@/api/services'

export const state = () => ({
  filters: '', // Filters for markers (user/group/etc)
  markers: [],
  boundingBox: '',
  isReady: false
})

export const actions = {
  async fetch_markers ({ commit, state }) {
    const { data: { results } } = await Marker.query({ bbox: state.boundingBox, ...state.filters })
    commit('SET_MARKERS', results)
  }
}

export const mutations = {
  SET_FILTERS (state, payload) {
    state.filters = payload
  },
  SET_MARKERS (state, payload) {
    state.markers = payload
  },
  SET_BOUNDING_BOX (state, payload) {
    state.boundingBox = payload
  },
  SET_MAP_STATE (state, payload) {
    state.isReady = payload
  }
}
