<template lang="pug">
  modal-backdrop(@click.native.self="goBack")
    modal-box(maxWidth="480")
      modal-content
        div.wallet
          i.refresh
          div.in_wallet
            | In wallet {{ moment().format('DD.MM.YYYY') }}
          div.coins
            | {{ personalTokens }} Tokens

          div.currency
            | {{ golosBalance }}

          div.currency
            | {{ gbgBalance }}

          el-tabs(v-model="activeName")
            el-tab-pane(label="BTC" name="btc" v-if="wallet" class="is-active")
              h2
                span
                  | {{ $t('investments') }}:
                | {{wallet.personal_btc || 0}} BTC
            el-tab-pane(label="GBG" name="gbg")
              h2
                span
                  | {{ $t('investments') }}:
                | {{wallet.personal_gbg || 0}} Mpl
            el-tab-pane(:label="$t('tokens')" name="tokens")
              h2
                span
                  | {{ $t('investments') }}:
                | {{wallet.personal_tokens || 0 }} GBG
            el-tab-pane(:label="$t('bounty')" name="bounty")
              h2
                span
                  | {{ $t('investments') }}:
                | {{wallet.personal_bounty || 0}} Mpl
                          
            el-tab-pane(label="USD" name="usd")
              h2
                span
                  | {{ $t('investments') }}:
                | {{wallet.total_personal_usd}} Mpl
</template>

<script>
  import moment from 'moment'
  import bc from '@/api/blockchain'
  import api from '@/api/temporary'
  import ModalBackdrop from '@/components/modal/__parts__/_backdrop.vue'
  import ModalBox from '@/components/modal/__parts__/_modal-box.vue'
  import ModalContent from '@/components/modal/__parts__/_modal-content.vue'
  import { mapState, mapMutations } from 'vuex'

  export default {
    middleware: ['auth'],
    data () {
      return {
        moment: moment,
        error: false,
        personalTokens: 0,
        wallet: {},
        activeName: 'btc' 
      }
    },
    created () {
      this.showModal()

      const that = this
      api.ico.wallet(this.username, function(data) {
        that.wallet = data

        console.log(data)
      });
    },
    async mounted () {
      const { balance: golos, sbd_balance: gbg } = await bc.getUser(this.bc_username)

      this.$store.commit('user/wallet/SET_GOLOS_BALANCE', golos)
      this.$store.commit('user/wallet/SET_GBG_BALANCE', gbg)

      api.ico.wallet(this.username, function (data) {
        this.personalTokens = data.personal_tokens
      })
    },
    computed: {
      ...mapState({
        username: state => state.user.personal.username,
        bc_username: state => state.user.personal.bc_username,
        golosBalance: state => state.user.wallet.golos,
        gbgBalance: state => state.user.wallet.gbg
      })
    },

    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL'
      }),
      goBack () {
        this.$router.go(-1)
      }
    },
    components: {
      ModalBackdrop,
      ModalBox,
      ModalContent
    }
  }
</script>

<style>

  .el-tabs__content {
    text-align: center;
  }

  .wallet{
    margin: 0 auto;
    max-width: 480px;
    width: 100%;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px rgba(72, 84, 101, 0.2);
    position: relative;
  }

  .wallet .refresh{
    position: absolute;
    width: 30px;
    height: 30px;
    display: block;
    cursor: pointer;
    right: 35px;
    top: 35px;
    background: url(../../assets/icon-refresh.svg) no-repeat;
  }

  .wallet .in_wallet{
    font-size: 16px;
    letter-spacing: -0.5px;
    color: #545454;
    margin: 55px 0 5px 40px;
  }

  .wallet .coins{
    font-size: 40px;
    letter-spacing: -1.3px;
    line-height: 50px;
    margin: 0 0 5px 40px;
  }

  .wallet .currency{
    font-size: 20px;
    letter-spacing: -0.7px;
    margin-bottom: 50px;
    margin-left: 40px;
    position: relative;
    display: inline-block;
  }

  .wallet .down{
    position: absolute;
    background: url(../../assets/icon-arrow-down-circle.svg) no-repeat;
    width: 19px;
    height: 19px;
    cursor: pointer;
    right: -45px;
    top: 3px;
  }

  .wallet .info{
    font-size: 14px;
    letter-spacing: -0.5px;
    color: #6b6b6b;
    margin-left: 30px;
    margin-bottom: 45px;
  }

  .wallet hr{
    margin: 0 14px 19px;
    border: 0;
    border-bottom: solid 1px rgba(72, 84, 101, 0.2);
  }
</style>
