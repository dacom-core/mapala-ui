<template lang="pug">
  div
    header.main_header

      div.top_left_block
        nuxt-link(
          class="main_logo",
          :class="{ main_logoMobile: isMobile }",
          :to="'/' + locale",
          )
          img(src="~assets/MapalaLogo.png")
          span
            | MAPALA

        div.change_lang
          input(type="radio" value="ru" id="rus" v-model="locale")
          label(for="rus", @click="changeLang('ru')")
            | rus/golos
          input(type="radio" value="en" id="eng" v-model="locale")
          label(for="eng", @click="changeLang('en')")
            | eng/steem


      div.top-right-block

        a.el-button.mapala-fest-link(href="https://fest.mapala.net")
          span
            | MapalaFest


        poster

        div.username_wrapper(v-if="isAuth")
          nuxt-link(
            v-if="isAuth",
            :to="'/'+userName"
            )
            div.user
              span(class="user_name" v-text="userName")
              img(v-if="userAvatar" class="user_logo", :src="userAvatar")
              img(v-else class="no_avatar" src="~assets/icon-profile-w.svg")

        div.divider

        nuxt-link(v-if="!isAuth", :to="'/login'", class="login")
          | {{ $t('log_in') }}

        div.right_button(v-else, v-on-click-outside="closeMenu")

          div(@click="menuOpen", class="open_menu")
            | {{ $t('menu') }}

          div(
            v-if="isAuth",
            :class="{active : isMenuOpened, user_menuMobile: isMobile }"
            class="user_menu"
            )

            nuxt-link(:to="'/wallet'", class="wal")
              i.purce
              span.txt_i
                | {{ $t('Wallet') }}
              span(class="amount", v-text="userBalance")

            div.divd
            div.mn

              nuxt-link(
              :to="'/settings'"
              class="m_item"
              )
                | {{ $t('setting') }}

              nuxt-link(class="m_item", :to="'/ico/'")
                | ICO

              a(href="#" v-if="isAuth" class="m_item", @click="userLogout")
                | {{ $t('log_out') }}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Poster from '~/components/layout/__parts__/poster'

export default {
  data () {
    return {
      isMenuOpened: false
    }
  },

  computed: mapState({
    isAuth: state => state.user.auth.isAuth,
    userName: state => state.user.personal.userName,
    userAvatar: state => state.user.personal.avatar,
    userBalance: state => state.user.wallet.balance,
    isMobile: state => state.isMobile,
    locale: state => state.locale
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
    },

    changeLang (locale) {
      // TODO
    }
  },
  components: {
    Poster
  }
}
</script>

<style scoped>
  .main_header{
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    height: 42px;
    background-image: linear-gradient(180deg,#5d7394,#4b5e7a);
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
  }

  .top_left_block {
    display: flex;
    flex-wrap: wrap;
  }
  .main_logo{
    display: flex;
    height: 42px;
    margin-left: 0;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    margin-right: 20px;
  }
  .main_logoMobile {
    margin-left: 0!important;
  }
  .main_logo img{
    height: 34px;
    margin-right: 6px;
  }

  .main_header .user{
    right: 0;
    top: 0;
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0;
    line-height: 42px;
  }
  .main_header a {
    color: #fff;
    text-decoration: none;
  }

  .main_header .user_name{
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }
  .main_header .user_logo{
    margin-left: 12px;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    overflow: hidden;
  }

  .main_header .no_avatar{
    margin-left: 12px;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .main_header .user_logo img{
    display: block;
    width: 100%;
  }

  .main_header .open_menu{
    color: #88ade0;
    font: 700 14px PT Sans;
    display: flex;
    align-items: center;
    width: 70px;
    padding-left: 0;
    height: 100%;
    position: relative;
    line-height: 42px;
    right: 0;
    top: 0;
    box-sizing: border-box;
    background: url(../../assets/icon-menu.svg) no-repeat 53px center;
    cursor: pointer;
    transition: color .2s ease;
  }

  .main_header .open_menu:hover{
    color: #fff;
  }

  .main_header .open_menuMobile{
    width: 69px;
  }

  .main_header .login{
    color: #88ade0;
    font: 700 14px PT Sans;
    display: block;
    align-items: center;
    width: 70px;
    padding-left: 7px;
    height: 102%;
    line-height: 42px;
    box-sizing: border-box;
    background: url(../../assets/icon-login.svg) no-repeat 53px center;
    cursor: pointer;
    transition: color .2s ease;
    text-decoration: none;
    margin-left: 10px;
  }

  .main_header .login:hover{
    color: #fff;
  }


  .main_header .divider{
    width: 1px;
    background: #4d5169;
    height: 42px;
    box-shadow: 0 -2px 7px 0 #2a2c3e;
  }

  .right_button {
    padding-left: 20px;
  }

  .user_menu.active{
    display: flex;
  }

  .user_menu{
    background: #5d7394;
    width: 350px;
    display: none;
    padding: 35px 0 16px;
    position: absolute;
    right: 30px;
    top: 50px;
    border-radius: 6px;
    color: #fff;
  }

  .user_menuMobile{
    right: 5px!important;
    width: 300px!important;
  }

  .user_menu:before{
    content: '';
    position: absolute;
    top: -8px;
    right: 35px;
    width: 0px;
    height: 0px;
    border-top: 18px solid #5d7394;
    border-left: 18px solid transparent;
    transform: rotateZ(-45deg);
    z-index: 100;
  }

  .user_menu .wal{
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid #526683;
    padding-top: 27px;
    text-decoration: none;
    color: #ffffff;
  }

  .user_menu .mn{
    padding-left: 20px;
  }

  .user_menu .m_item{
    text-decoration: none;
    display: block;
    opacity: 0.87;
    color: #fff;
    margin-bottom: 23px;
    font: 700 16px 'PT Sans';
    padding: 2px 12px;
    transition: opacity 200ms ease;
  }

  .user_menu .m_item:hover{
    opacity: 1;
  }

  .user_menu .m_item:last-of-type{
    margin-bottom: 8px;
  }

  .user_menu .purce{
    width: 45px;
    height: 38px;
    display: block;
    background: url(../../assets/icon-purce.svg) no-repeat;
    margin-bottom: 10px;
  }

  .user_menu .txt_i{
    font: 700 16px 'PT Sans';
    opacity: 0.87;
    width: 100%;
    text-align: center;
    margin-bottom: 18px;
  }

  .user_menu .amount{
    font: 700 24px 'PT Sans';
    text-align: center;
  }

  .change_lang{
    margin: 0;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }

  .change_lang .lab{
    font: 700 18px/58px 'PT Sans';
    color: white;
  }

  .change_lang [type="radio"]{
    display: none;
  }

  .change_lang label{
    font: 700 14px/58px PT Sans;
    letter-spacing: .3px;
    color: #fff;
    opacity: 0.5;
    padding-left: 35px;
    margin-left: 0;
    cursor: pointer;
    position: relative;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 15px;
  }

  .change_lang label:before{
    width: 25px;
    height: 25px;
    position: absolute;
    display: block;
    content: "";
    background-color: #eaeaea;
    background-repeat: no-repeat;
    border-radius: 50%;
    left: 0;
  }

  .top-right-block {
    display: flex;
  }
  .top-right-block .username_wrapper {
    padding: 0 20px;
  }
  .change_lang [type="radio"]:checked + label{
    opacity: 1;
  }
  .change_lang [type="radio"]:checked + label:before{
    background-image: url(../../assets/icon-checked-blue.svg);
  }


@media screen and (max-width: 600px) {
  .username_wrapper {
    display: none;
  }

  .top_left_block {
    flex: 1;
  }

  .top-right-block {
    justify-content: space-between;
  }

}


@media screen and (max-width: 767px) {
  .change_lang {
    display: none;
  }

  .top_left_block {
    flex: 0.5;
  }

  .top-right-block {
    flex: 1;
    justify-content: space-around;
  }
}

.mapala-fest-link {
  display: flex;
  align-items: center;
  background: transparent !important;
  border: none !important;
  font-size: 12px !important;
}

.mapala-fest-link span {
  color: #fff;
  font-style: oblique;
}

@media screen and (max-width: 500px) {
  .mapala-fest-link {
    display: none;
  }
}

</style>
