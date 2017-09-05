<template lang="pug">
  div
    group-main-avatar
    create-group-post-button(v-if="isAuth")
</template>

<script>
  import { mapState } from 'vuex'
  import CreateGroupPostButton from '~/components/group/__parts__/button-add-post-to-group'
  import GroupMainAvatar from '~/components/group/group-poster-block'

  export default {
    computed: mapState({
      isAuth: state => state.user.auth.isAuth
    }),
    components: {
      CreateGroupPostButton,
      GroupMainAvatar
    }
  }
</script>

<style lang="stylus" scoped>
</style>
