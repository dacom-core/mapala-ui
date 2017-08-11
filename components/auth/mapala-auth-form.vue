<template lang="pug">
  div(style="'width: 50%;'")
    h1
      | {{ $t('login') }}

    el-form(label-width="100px", :model="signIn")
      el-form-item(label="Account name")
        el-input(v-model="signIn.accName")

      el-form-item(label="Password")
        el-input(v-model="signIn.password")

    el-button(type="primary", @click="login")
      | {{ $t('login') }}

    h1
      | {{ $t('sign_up') }}

    div(v-if="regResult")
      p
        | Name: {{ regResult.name }}
      p
        | Memo key: {{ regResult.memo_key }}
      p
        | Owner key key: {{ regResult.owner_key }}
      p
        | Referrer: {{ regResult.referrer }}


    el-form(label-width="100px", :model="reg")
      el-form-item(label="Account name")
        el-input(v-model="reg.accName")

      el-form-item(label="Password")
        el-input(v-model="reg.password")

    el-button(type="primary", @click="signUp")
      | {{ $t('sign_up') }}

</template>

<script>
import dacom from '../../api/dacom'

export default {
  data () {
    return {
      signIn: {
        accName: '',
        password: ''
      },
      reg: {
        accName: '',
        password: ''
      },
      regResult: null
    }
  },
  methods: {
    login () {
      dacom.login(this.signIn.accName, this.signIn.password).then(() => {
        const authSig = dacom.getAuthSig(this)

        this.$axios.post('/auth/login/', { account: 'avral96', auth_sig: authSig }).then(res => {
          this.$notify({ title: 'Succsess', message: res.body, type: 'success' })
        }, err => {
          this.$notify({ title: 'Ошибка входа', message: err.body, type: 'warning' })
        })
      }, err => {
        this.$notify({ title: 'Ошибка входа', message: err, type: 'warning' })
      })
    },
    signUp () {
      dacom.signUp(this.reg.accName, this.reg.password).then(res => {
        this.$axios.post('/auth/sign_up/', res).then(res => {
          console.log(res)
          this.regResult = res.body.account
        })
      }, err => {
        this.$notify({ title: 'Ошибка регистрации', message: err, type: 'warning' })
      })
    }
  },
  created () {
    dacom.init().then(() => {
      console.log('DACom inited')
    })
  }
}
</script>
