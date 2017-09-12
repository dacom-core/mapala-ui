<template>
  <form class="tab">
    <label v-if="golosAlreadyReg === null">У вас есть аккаунт в Golos.io?</label>
    <el-button-group v-if="golosAlreadyReg === null">
      <el-button @click="golosAlreadyReg = true" class="button small" type="primary">Да</el-button>
      <el-button @click="golosAlreadyReg = false" class="button small" type="primary">Нет</el-button>
    </el-button-group>

    <div v-else>
      <div class="inpt_w">
        <input placeholder="Login" v-model="username" class="inpt i-user"><label></label>
      </div>
      <div class="inpt_w">
        <input type="password" placeholder="Password" v-model="password" class="inpt i-pass"><label></label>
      </div>

      <div v-if="golosAlreadyReg">
        <div class="inpt_w">
          <input placeholder="private posting key" v-model="wif" class="inpt i-key"><label></label>
        </div>
      </div>
      <div v-else>
        <div class="inpt_w">
          <input placeholder="Желаемый Golos.io username" v-model="bc_username" class="inpt i-user"><label></label>
        </div>
      </div>

      <vue-recaptcha ref="recaptcha" sitekey="6LfKfS8UAAAAAHEecRYjwgsL7p2SDXriEC5m0Otc" @verify="success"></vue-recaptcha>

      <el-button class="submit-button" :loading="loading" @click="signUp">{{ $t('sign_in') }}</el-button>
    </div>
  </form>
</template>

<script>
  import Vue from 'vue'
  import auth from '@/api/auth'
  import bc from '@/api/blockchain'
  import { User } from '@/api/services'
  import VueRecaptcha from 'vue-recaptcha'

  export default {
    data () {
      return {
        bc: bc,
        recaptcha: '',
        loading: false,
        username: '',
        password: '',
        bc_username: '',
        wif: '',
        errors: [],
        golosAlreadyReg: Vue.config.lang === 'ru' ? null : true
      }
    },
    methods: {
      signUp () {
        const creds = {
          username: this.username,
          password: this.password,
          g_recaptcha_response: this.recaptcha
        }

        if (this.golosAlreadyReg === true) {
          creds.wif = this.wif
          auth.existngSignUp(this, creds, { name: 'index' })
        } else {
          creds.bc_username = this.bc_username
          auth.signUp(this, creds, { name: 'index' })
        }
        this.$refs.recaptcha.reset()
      },

      success(res) {
        this.recaptcha = res
      },

      // TODO Сделать подсказки по доступности логина/блокчейн юзернейма
      checkLogin () {
        this.config.userExists = false

        if (this.config.bcHasAcc === null) {
          this.config.bcUsername = ''
          this.config.bcExist = false
        }
        bc.getUser(this.username).then(res => {
          if (res) {
            this.config.bcExist = true
            this.config.bcUsername = res.name
          }
        })

        User(this.$axios).query({ username: this.username }).then(res => {
          this.config.userExists = true
        })
      }
    },
    watch: {
      'username' () {
        // this.checkLogin()
      }
    },
    components: { VueRecaptcha },

    mounted () {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.async = true
      s.defer = true
      s.src = 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';

      document.getElementsByTagName('head')[0].appendChild(s)
    }
  }
</script>

<style>
  .el-message-box {
    width: 520px;
  }
</style>
