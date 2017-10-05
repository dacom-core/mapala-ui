<template>
  <form class="tab" action="" method="post" @submit.prevent="login">
    <div class="inpt_w">
      <input placeholder="Login" v-model="credentials.username" class="inpt i-user" required><label></label>
    </div>
    <div class="inpt_w">
      <input type="password" placeholder="Password" v-model="credentials.password" class="inpt i-pass" required><label></label>
    </div>
    <div v-for="error in Object.keys(errors)">
      <i class="el-icon-warning"></i> {{error}}: {{errors[error][0]}}
    </div>
    <button class="submit-button">{{ $t('log_in') }}</button>

    <router-link class="forgot" :to="{ name: 'resetPassword'} ">{{ $t('forgot_password') }}</router-link>
  </form>
</template>

<script>
  import auth from '@/api/auth'
  import { mapMutations } from 'vuex'

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
    methods: {
      ...mapMutations({
        hideModal: 'modal/HIDE_MODAL'
      }),
      async login () {
        await auth.login(this, this.credentials, '/')
        this.hideModal()
      }
    }
  }

</script>
<style>
</style>

