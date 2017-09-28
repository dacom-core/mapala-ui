<template lang="pug">
  div.dash_wrapper
    create-post-button(v-if="isAuth")
    switch-blog-buttons
</template>

<script>
import CreatePostButton from '~/components/blog/__parts__/button-create-post'
import SwitchBlogButtons from '~/components/blog/__parts__/buttons-switch-blog'
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
    SwitchBlogButtons,
    CreatePostButton
  }
}
</script>

<style lang="stylus" scoped>
  .dash_wrapper
    position: fixed;
    padding: 15px 20px 10px;
    top: 42px;
    left: 22px;
    min-width: 473px;
    z-index: 2;
    border-radius: 0 0 10px 10px;
    -webkit-box-shadow: 0 5px 6px 0 rgba(0,0,0,.4);
    box-shadow: 0 5px 6px 0 rgba(0,0,0,.4);
    background-image: linear-gradient(180deg,#4b5e7a,#5d7394);
</style>
