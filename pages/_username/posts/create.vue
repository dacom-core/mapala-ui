<template lang="pug">
  mapala-modal
    p create post form
</template>

<script>
import MapalaModal from '~/components/modal/mapala-modal-window'
import AuthForm from '~/components/auth/mapala-auth-form'

export default {
  data () {
    return {}
  },
  components: {
    MapalaModal,
    AuthForm
  }
}
</script>

<style lang="stylus" scoped>
</style>
