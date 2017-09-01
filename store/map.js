import { Marker } from '@/api/services'

export const state = () => ({
  markers: [],
  boundingBox: '',
  isReady: false
})

export const actions = {
  async fetch_markers ({ commit, state, rootState }) {
    const { data: { results } } = await Marker.query({ bbox: state.boundingBox, ...rootState.filters })
    commit('SET_MARKERS', results)
  }
}

export const mutations = {
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
