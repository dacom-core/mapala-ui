<template lang="pug">

  form(class="tab", action="", method="post", @submit.prevent="login")
    div.inpt_w
      input.inpt.i-user(placeholder="Login", v-model="credentials.username", required)
      label

    div.inpt_w
      input(
        type="password",
        placeholder="Password",
        v-model="credentials.password",
        class="inpt i-pass"
        required
        )
      label

    div(v-for="error in Object.keys(errors)")
      i.el-icon-warning
        | {{error}}: {{errors[error][0]}}

    button.submit-button
      | {{ $t('log_in') }}

    router-link.forgot(:to="{ name: 'lang-auth-reset-password' }")
      | {{ $t('forgot_password') }}
</template>

<script>
  import auth from '@/api/auth'
  import { mapMutations, mapGetters } from 'vuex'
  import { showErrors } from '@/utils/show_errors'

  export default {
    name: 'login',
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        },
        errors: []
      }
    },
    computed: {
      ...mapGetters(['backPath'])
    },
    methods: {
      ...mapMutations({
        hideModal: 'modal/HIDE_MODAL'
      }),
      async login () {
        try {
          await auth.login(this, this.credentials, this.backPath)
          this.hideModal()
        } catch (e) {
          showErrors(e.response.data, this)
        }
      }
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

  .inpt {
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

  .inpt:focus {
    box-shadow: 0 0 2px 0 #6d9ee1;
    outline: 0;
    opacity: 1;
  }

  .inpt_w {
    position: relative;
  }


  .inpt + label:before {
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

  .i-user + label:before {
    background-image: url('~assets/icon-user.svg');
  }

  .i-pass + label:before {
    background-image: url('~assets/icon-pass.svg');
  }

  .i-key + label:before {
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

  .forgot {
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

  .forgot:hover {
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
