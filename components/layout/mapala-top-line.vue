<template lang="pug">
  div
    header.main_header
      nuxt-link(
        class="main_logo",
        :class="{ main_logoMobile: isMobile }",
        :to="'/' + locale",
      )
        img(src="~assets/MapalaLogo.png")
        span
          | MAPALA

      nuxt-link(
        v-if="isAuth",
        :to="'/'+userName"
      )
        div.user
          span(class="user_name" v-text="userName")
          img(v-if="userAvatar" class="user_logo", :src="userAvatar")
          img(v-else class="no_avatar" src="~assets/icon-profile-w.svg")

      div.divider

      nuxt-link(v-if="!isAuth" class="login", :to="{ path: 'login' }", @click="")
        | Вход

      div(v-on-click-outside="closeMenu")

        div(v-if="isAuth", @click="menuOpen", class="open_menu")
          | Меню

        div(
          v-if="isAuth",
          :class="{active : isMenuOpened, user_menuMobile: isMobile }"
          class="user_menu"
        )

          nuxt-link(class="wal", :to="{name: 'userWallet', params: {modules: userName}}")
            i.purce
            span.txt_i
              | Кошелек
            span(class="amount", v-text="userBalance")


          div.divd
          div.mn
            nuxt-link(class="m_item", :to="{name: 'userSettings', params: {modules: userName}}")
              | Настройки

            nuxt-link(class="m_item", :to="'/ico/'")
              | ICO

            a(href="#" v-if="isAuth" class="m_item", @click="userLogout")
              | Logout
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    mounted () {

    },
    data () {
      return {
        isMenuOpened: false
      }
    },

    computed: mapState({
      isAuth: 'user/auth/isAuth',
      userName: 'user/personal/userName',
      userAvatar: 'user/personal/avatar',
      userBalance: 'user/wallet/balance',
      isMobile: 'isMobile',
      locale: 'locale'
    }),

    methods: {
      ...mapActions({
        userLogout: 'user/auth/logout'
      }),

      openMenu () {
        this.menu_opened = !this.menu_opened
      },

      closeMenu () {
        (this.isMenuOpened) ? this.isMenuOpened = false : false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main_header
    width 100%
    height 42px
    background-image linear-gradient(to bottom, #5d7394, #4b5e7a)
    position fixed
    z-index 100
    top 0
    left 0
    display flex
    align-items center
    .user
      right 100px
      top 0
      position absolute
      display flex
      align-items center
      height 100%
      padding 0 17px 0 0
    a
      color #fff
      text-decoration none
    .main_logo
      display block
      height 34px
      margin-left 30px
      img
        height 34px
      span
        padding-left 5px
        position absolute
        top 30%

    .user_name
      color #fff
      font-size 14px
      font-weight 700
    .user_logo
      margin-left 12px
      width 27px
      height 27px
      border-radius 50%
      overflow hidden
      img
        display block
        width 100%

    .no_avatar
      margin-left 12px
      width 27px
      height 27px
      border-radius 50%
      overflow hidden
      background-repeat no-repeat
      background-size contain

    .open_menu
      color #88ade0
      font 700 14px 'PT Sans'
      display flex
      align-items center
      width 99px
      padding-left 8px
      height 100%
      position absolute
      right 0
      top 0
      box-sizing border-box
      background url(../../assets/icon-menu.svg) no-repeat 53px center
      cursor pointer
      transition color 200ms ease

    .open_menuhover
      color #fff

    .open_menuMobile
      width 69px

    .login
      color #88ade0
      font 700 14px 'PT Sans'
      display flex
      align-items center
      width 99px
      padding-left 8px
      height 100%
      position absolute
      right 0
      top 0
      box-sizing border-box
      background url(../../assets/icon-login.svg) no-repeat 53px center
      cursor pointer
      transition color 200ms ease
      text-decoration none

    .loginhover
      color #fff

    .divider
      width 1px
      position absolute
      top 0
      right 100px
      background #4d5169
      height 100%
      box-shadow 0 -2px 7px 0px #2a2c3e

  .main_logoMobile
    margin-left 0!important

  .user_menu.active
    display flex

  .user_menu
    background #5d7394
    width 350px
    display none
    padding 35px 0 16px
    position absolute
    right 30px
    top 50px
    border-radius 6px
    color #fff
    .wal
      width 50%
      display flex
      align-items center
      flex-direction column
      border-right 1px solid #526683
      padding-top 27px
      text-decoration none
      color #ffffff
    .mn
      padding-left 20px
    .m_item
      text-decoration none
      display block
      opacity 0.87
      color #fff
      margin-bottom 23px
      font 700 16px 'PT Sans'
      padding 2px 12px
      transition opacity 200ms ease
    .m_itemhover
      opacity 1
    .m_itemlast-of-type
      margin-bottom 8px
    .purce
      width 45px
      height 38px
      display block
      background url(../../assets/icon-purce.svg) no-repeat
      margin-bottom 10px
    .txt_i
      font 700 16px 'PT Sans'
      opacity 0.87
      width 100%
      text-align center
      margin-bottom 18px
    .amount
      font 700 24px 'PT Sans'
      text-align center

  .user_menuMobile
    right 5px!important
    width 300px!important

  .user_menubefore
    content ''
    position absolute
    top -8px
    right 35px
    width 0px
    height 0px
    border-top 18px solid #5d7394
    border-left 18px solid transparent
    transform rotateZ(-45deg)
    z-index 100
</style>
