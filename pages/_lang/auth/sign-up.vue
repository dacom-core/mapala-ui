<template>
  <form class="tab">
    <label v-if="golosAlreadyReg === null">У вас есть аккаунт в Golos.io?</label>
    <el-button-group v-if="golosAlreadyReg === null">
      <el-button @click="golosAlreadyReg = true" class="button small" type="primary">Да</el-button>
      <el-button @click="golosAlreadyReg = false" class="button small" type="primary">Нет</el-button>
    </el-button-group>

    <div v-else>
      <div class="inpt_w">
        <input type="text" :placeholder="$t('username')" v-model="username" class="inpt i-user"><label></label>
      </div>
      <!-- <div class="inpt_w">
        <input type="password" placeholder="Password" v-model="password" class="inpt i-pass"><label></label>
      </div> -->

       <div class="inpt_w">
        <vue-password v-model="password" :placeholder="$t('password')" classes="inpt i-pass"></vue-password>
        <label></label>
      </div>

      <div v-if="golosAlreadyReg">
        <div class="inpt_w">
          <input type="text" :placeholder="$t('posting_key')" v-model="wif" class="inpt i-key"><label></label>
        </div>
      </div>
      <div v-else>

        <div class="inpt_w">
          <input type="text" placeholder="Желаемый Golos.io username" v-model="bc_username" class="inpt i-user"><label></label>
        </div>

        <div class="inpt_w">
          <country-input @phoneNumberChanged="updatePhoneNumber"></country-input>
        </div>

        <div class="inpt_w" v-if="isSmsCodeInputVisible">
          <input v-model="pass_code" :placeholder="$t('sms_code')" type="text" class="inpt i-sms"><label></label>
        </div>

      </div>

      <invisible-recaptcha sitekey="6LegXTQUAAAAAM_qyGnITRF9FCCfNg0TThuBNZ89" :callback="success"
        class="submit-button" type="submit" id="do-something-btn" v-if="!isPhoneVerified && !golosAlreadyReg">
          {{ $t('verify_phone') }}
      </invisible-recaptcha>
    
      <!-- <vue-recaptcha ref="recaptcha" sitekey="6LfKfS8UAAAAAHEecRYjwgsL7p2SDXriEC5m0Otc" @verify="success"></vue-recaptcha> -->
      <el-button v-else class="submit-button" :disabled="!isSubmitAllowed" :loading="loading" @click="signUp" v-text="buttonText"></el-button>
    </div>
  </form>
</template>

<script>
  import auth from '@/api/auth'
  import bc from '@/api/blockchain'
  import { User, Verifier } from '@/api/services'
  import VuePassword from '@/components/auth/__parts__/password-input'
  // import VueRecaptcha from 'vue-recaptcha'
  import InvisibleRecaptcha from 'vue-invisible-recaptcha';
  import CountryInput from '@/components/auth/__parts__/country-input'
  import { showErrors } from '@/utils/show_errors'
  import blockchains from '@/api/blockchain'

  export default {
    data () {
      return {
        recaptcha: '',
        rawVal: '',
        isPhoneVerified: false,
        isPhoneValid: false,
        isSmsCodeInputVisible: false,
        bc: bc,
        loading: false,
        username: '',
        password: '',
        phone: '',
        pass_code: '',
        bc_username: '',
        wif: '',
        errors: [],
        golosAlreadyReg: this.$store.state.locale === 'ru' ? null : true
      }
    },
    computed: {
      buttonText () {
        return this.isPhoneVerified || this.golosAlreadyReg ? this.$t('sign_in') : this.$t('verify_phone')
      },
      isSubmitAllowed () {
        return this.golosAlreadyReg || (this.isPhoneValid)
      }
    },
    methods: {
      async signUp () {
        const creds = {
          username: this.username,
          password: this.password
        }

        if (this.golosAlreadyReg === true) {
          creds.wif = this.wif
          this.loading = true
          try {
            const { data } = await auth.existngSignUp(creds, {name: 'index'})
            this.loading = false
            store.clearAll()
            Vue.cookie.set('jwt', res.token)
            this.$store.commit('user/auth/SET_JWT_TOKEN',res.token)
            this.$store.commit('user/personal/FILL_USER', res.user)
            this.$store.commit('user/auth/SET_AUTH_TO', true)

            // Добавляем ключ для голоса
            store.set(`golos_${this.user.username}_posting_key`, creds.wif)
            blockchains.initBlockchains(this)

            if (redirect) { this.$router.push(redirect) }
          } catch (e) {
            this.loading = false
            showErrors(e.response.data, this)
          }
        } else if (!this.isPhoneVerified) {
          Verifier.phone({
            number: this.rawVal,
            g_recaptcha_response: this.recaptcha
          }).then(() => {
            this.isSmsCodeInputVisible = true
            this.isPhoneVerified = true
          }).catch(error => {
            showErrors(error.response.data, this)
          })
        } else if (this.isPhoneVerified) {
          auth.signUp(this, {
            username: this.username,
            bc_username: this.bc_username,
            password: this.password,
            g_recaptcha_response: this.recaptcha,
            number: this.rawVal,
            passcode: this.pass_code
          }, { name: 'index' })
          // .then(() => {
            // this.$notify({ message: this.$t('success_signup'), type: 'success' })
          // })
        }
        // this.$refs.recaptcha.reset()
      },

      updatePhoneNumber(phone) {
        this.rawVal = phone
      },

      success(res) {
       Verifier.phone({
            number: this.rawVal,
            g_recaptcha_response: res
          }).then(() => {
            this.isSmsCodeInputVisible = true
            this.isPhoneVerified = true
          }).catch(error => showErrors(error.response.data, this))
      },

      // TODO Сделать подсказки по доступности логина/блокчейн юзернейма
      checkLogin() {
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

        User.query({username: this.username}).then(res => {
          this.config.userExists = true
        })
      }
    },
    watch: {
      'rawVal' () {
        this.rawVal.indexOf('_') === -1 ? this.isPhoneValid = true : this.isPhoneValid = false
      },
      'username' (newVal, oldVal) {
        this.username = newVal.replace(/[^a-z-0-9]/ig, "")
      }
    },
    components: { "invisible-recaptcha": InvisibleRecaptcha, CountryInput, VuePassword }
  }
</script>

<style>
  .el-message-box {
    width: 520px;
  }
  .i-phone + label:before{
    background-image: url('~assets/icon-phone.svg');
    background-size: contain;
    width: 24px !important;
    margin-left: 8px;
  }

  .i-sms + label:before{
    background-image: url('~assets/icon-sms.svg');
    background-size: contain;
    width: 24px !important;
    margin-left: 8px;
  }

</style>
