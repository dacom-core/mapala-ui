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
      <el-button class="submit-button" :loading="loading" @click="signUp">{{ $t('sign_in') }}</el-button>
    </div>
  </form>
</template>

<script>
  import auth from '@/api/auth'
  import bc from '@/api/blockchain'
  import { User } from '@/api/services'

  export default {
    data () {
      return {
        bc: bc,
        loading: false,
        username: '',
        password: '',
        bc_username: '',
        wif: '',
        errors: [],
        golosAlreadyReg: this.$store.state.locale === 'ru' ? null : true
      }
    },
    methods: {
      signUp () {
        const creds = {
          username: this.username,
          password: this.password
        }

        if (this.golosAlreadyReg === true) {
          creds.wif = this.wif
          auth.existngSignUp(this, creds, { name: 'index' })
        } else {
          creds.bc_username = this.bc_username
          auth.signUp(this, creds, { name: 'index' })
        }
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

        User.get({ username: this.username }).then(res => {
          this.config.userExists = true
        })
      }
    },
    watch: {
      'username' () {
        // this.checkLogin()
      }
    }
  }
</script>

<style>
  .el-message-box {
    width: 520px;
  }
</style>
