export const state = () => ({
  form: {
    title: '',
    body: '',
    meta: {
      image: [],
      location: {
        name: '',
        lat: '',
        lng: ''
      },
      group: 'rnd',
      tags: []
    }
  },
  isFormSaving: false
})

export const mutations = {
  SET_LOCATION_NAME (state, payload) {
    state.form.meta.location.name = payload
  },
  SET_LOCATION_LAT (state, payload) {
    state.form.meta.location.lat = payload
  },
  SET_LOCATION_LNG (state, payload) {
    state.form.meta.location.lng = payload
  },
  UPDATE_TITLE (state, payload) {
    state.form.title = payload
  },
}
