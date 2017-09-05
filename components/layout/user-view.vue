<template lang="pug">
  div
    user-profile-block(v-if="isUserProfileBlockVisible")
    create-post-button(v-if="isAuth")
</template>

<script>
  import CreatePostButton from '~/components/blog/__parts__/button-create-post'
  import UserProfileBlock from '~/components/user/user-profile'
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        isAuth: state => state.user.auth.isAuth,
        isUserProfileBlockVisible: state => state.isUserProfileBlockVisible
      })
    },
    components: {
      UserProfileBlock,
      CreatePostButton
    }
  }
</script>

<style lang="stylus" scoped>
</style>
