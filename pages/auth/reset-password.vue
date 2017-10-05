<template>
  <form class="tab">
    <label>{{ $t('password_reset') }}</label>
    <div class="inpt_w">
      <input type="password" placeholder="Golos.io private posting key" v-model="data.wif" class="inpt i-key"><label></label>
    </div>

    <div class="inpt_w">
      <input type="password" placeholder="Новый пароль" v-model="data.password" class="inpt i-key"><label></label>
    </div>

    <label v-if="data.username">Пароль обновлен! Ваш login: {{ data.username }}</label>

    <div class="submit-button" @click="reset">{{ $t('resset') }}</div>
  </form>
</template>


<script>
  import { User } from '@/api/services'
  import { showErrors } from '@/utils/show_errors'

  export default {
    data () {
      return {
        data: {
          username: null
        }
      }
    },
    methods: {
      reset () {
        User.resetPassword(this.data).then(res => {
          this.data.username = res.data
        }, err => {
          showErrors(err.response.data, this)
        })
      }
    }
  }
</script>
