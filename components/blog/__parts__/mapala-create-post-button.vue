<template lang="pug">
  nuxt-link(
    :to="{ name: 'createNewPost', params: { user: userName } }",
    class="add_post"
    )
    div.av_wrap
      img.user_av(v-if="userAvatar", :src="userAvatar")
      img.user_av(v-else src="~assets/icon-profile-w.svg")
    div.write_post
      | {{ $t('add_post') }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },

  computed: mapState('user/state', {
    userName: state => state.userName,
    userAvatar: state => state.avatar
  })
}
</script>

<style lang="stylus" scoped>
  .tape
    .add_post
      width: 100%
      height: 60px
      border-radius: 6px
      background-color: #ffffff
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
      border: solid 1px rgba(72, 84, 101, 0.2)
      padding: 0 16px
      display: flex
      align-items: center
      box-sizing: border-box
      margin-bottom: 20px
      cursor: pointer
      text-decoration: none
      .av_wrap
        margin-right: 8px
        width: 40px
        height: 40px
        overflow: hidden
        border-radius: 50%


    .write_post
      font: 16px 'PT Sans'
      letter-spacing: -0.5px
      color: rgba(72, 84, 101, 0.7)
</style>
