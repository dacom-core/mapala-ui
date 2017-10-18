<template lang="pug">
  div
    user-profile-block
    create-post-button(v-if="isAuth && $route.params.username === authUserName")
    switch-blog-buttons
</template>

<script>
  import CreatePostButton from '~/components/blog/__parts__/button-create-post'
  import UserProfileBlock from '~/components/user/user-profile'
  import SwitchBlogButtons from '~/components/blog/__parts__/buttons-switch-blog'
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        isAuth: state => state.user.auth.isAuth,
        isVisible: state => state.isUserProfileBlockVisible,
        authUserName: state => state.user.personal.username
      }),
      isMapalaPage () {
        return this.$route.path === '/mapala'
      }
    },
    components: {
      UserProfileBlock,
      CreatePostButton,
      SwitchBlogButtons
    }
  }
</script>

<style lang="stylus" scoped>
</style>
