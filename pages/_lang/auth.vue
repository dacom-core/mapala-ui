<template lang="pug">
  modal-backdrop
    modal-box(maxWidth="393")
      header-box
        div.login-form
          div.two.tab_headers
            nuxt-link.tab_header(:to="$path('/auth/login')", :class="{ active: isLoginPage }")
              | {{ $t('log_in') }}

            nuxt-link.tab_header(:to="$path('/auth/sign-up')", :class="{ active: isSignUpPage }")
              | {{ $t('sign_in') }}

      modal-content
        div.tabs
          nuxt-child
</template>

<script>
  import { mapMutations } from 'vuex'
  import Auth from '@/components/auth/Auth'
  import ModalBackdrop from '@/components/modal/__parts__/_backdrop.vue'
  import ModalBox from '@/components/modal/__parts__/_modal-box.vue'
  import ModalContent from '@/components/modal/__parts__/_modal-content.vue'
  import HeaderBox from '@/components/modal/__parts__/_header-box.vue'

  export default {
    head: {
      bodyAttrs: {
        class: 'overflowHidden'
      }
    },
    fetch ({ store: { commit }, from }) {
      commit('SET_BACK_PATH', from || {})
    },
    computed: {
      isLoginPage () {
        return this.$route.name === 'auth-login'
      },
      isSignUpPage () {
        return this.$route.name === 'auth-sign-up'
      }
    },
    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL'
      })
    },
    mounted () {
      this.showModal()
    },
    components: {
      Auth,
      HeaderBox,
      ModalBackdrop,
      ModalBox,
      ModalContent
    }
  }
</script>

<style>

  .login-form {
    max-width: 393px;
    width: 100%;
    border-radius: 6px;
    background-color: #ffffff;
  }

  .tab_headers{
    display: flex;
  }

  .tab_headers.two .tab_header {
    width: 50%;
  }

  .tab_headers .tab_header {
    height: 65px;
    background-color: #edeef3;
    opacity: 0.74;
    font: 700 18px/65px 'PT Sans';
    letter-spacing: -0.3px;
    color: #929292;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
  }

  .tab_headers .tab_header.active {
    background: #ffffff;
    color: #000;
    opacity: 1;
  }

  .tabs .tab{
    padding: 31px 26px 16px;
  }

  .tabs .tab.active {
    display: block;
  }

  .login-form .inpt {
    border-radius: 6px;
    border: solid 1px rgba(72, 84, 101, 0.2);
    box-sizing: border-box;
    height: 37px;
    display: block;
    padding: 0 10px 0 40px;
    width: 100%;
    margin-bottom: 12px;
    position: relative;
    color: #000;
    font: 16px 'PT Sans';
    opacity: 0.87;
  }

  .login-form .inpt:focus {
    box-shadow: 0 0 2px 0 #6d9ee1;
    outline: 0;
    opacity: 1;
  }

  .inpt_w {
    position: relative;
  }


  .login-form .inpt + label:before {
    position: absolute;
    content: '';
    display: block;
    width: 40px;
    left: 0;
    top: 0;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .login-form .i-user + label:before {
    background-image: url('~assets/icon-user.svg');
  }

  .login-form .i-pass + label:before {
    background-image: url('~assets/icon-pass.svg');
  }

  .login-form .i-key + label:before {
    background-image: url('~assets/icon-key.svg');
  }

  .submit-button {
    border-radius: 6px;
    background-color: #6d9ee1;
    border: none;
    width: 100%;
    text-align: center;
    display: block;
    color: #ffffff;
    opacity: 0.87;
    font: 700 18px/52px 'PT Sans';
    margin-top: 13px;
    margin-bottom: 12px;
    cursor: pointer;
  }

  .login-form .forgot {
    color: #545555;
    opacity: 0.87;
    width: 100%;
    font: 16px 'PT Sans';
    display: block;
    cursor: pointer;
    padding: 15px 0;
    text-align: center;
    text-decoration: none;
  }

  .login-form .forgot:hover {
    opacity: 1;
  }

  .ivite {
    letter-spacing: -0.7px;
    font: 700 20px/60px 'PT Sans';
    padding: 0 41px;
    background-color: #fbfbfb;
    display: inline-block;
    margin: 0 0 86px 50px;
  }

  .acc {
    color: #6a6b6b;
    font: 16px 'PT Sans';
    display: inline-block;
    margin-bottom: 14px;
  }

  .acc .usrname {
    font-weight: 700;
    opacity: 0.87;
  }
  .button {
    opacity: 0.87;
    font: 700 16px/34px 'PT Sans';
    color: #ffffff;
    display: inline-block;
    padding: 0 24px;
    border-radius: 5px;
    background-color: #6d9ee1;
    margin-bottom: 24px;
    cursor: pointer;
    user-select: none;
  }
</style>
