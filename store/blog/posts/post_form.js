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
