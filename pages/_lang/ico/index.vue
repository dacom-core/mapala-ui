<template>
  <div>
    <h3 style="margin: 50px 25px 25px;" v-if="isMobile" v-html="$t('invest_blockchain')"></h3>
    <h1 class="margin: 50px 25px 25px;" v-else v-html="$t('invest_blockchain')"></h1>
    <ul class="travelchain_channels">
      <li class="telegram_channel">
        <a href="https://t.me/travelchainrus">Rus chat</a>
      </li>

      <li class="telegram_channel">
        <a href="https://t.me/travelchain">Eng chat</a>
      </li>
    </ul>
    <!--<chart :x="ico.xaxis" :y="ico.yaxis"></chart>-->
    <ico-stats :sections="sections"></ico-stats>
    <!--<el-row type="flex" class="auc-bg" justify="center" :gutter="20">-->
      <!--<el-col :xs="24" :sm="24" :md="18" :lg="18">-->
        <!--<el-card class="auc-card">-->
          <!--<auction  :mobile="isMobile" :btc="ico.weekly_btc" :gbg="ico.weekly_gbg" :usd="ico.total_usd" :tokens="ico.total_tokens"></auction>-->
        <!--</el-card>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <el-row class="ico-bottom" type="flex" justify="center" :gutter="20">
      <el-col :xs="12" :sm="12" :md="12" :lg="12">
        <nuxt-link :to="{ name: 'lang-ico-investors' }" class="pre-ico-link">
          <h4 class="ico-hist">{{ $t('history') }}<br>Pre-ICO</h4>
        </nuxt-link>
      </el-col>
      <!--<el-col :xs="12" :sm="12" :md="6" :lg="6">-->
        <!--<nuxt-link :to="{ name: 'lang-mapala' }">-->
          <!--<h4 class="ico-blog">{{ $t('blog') }}<br>Mapala</h4>-->
        <!--</nuxt-link>-->
      <!--</el-col>-->
    </el-row>
    <!--<faq></faq>-->
  </div>
</template>

<script>
  import Chart from '@/components/ico/Chart.vue'
  import IcoStats from '@/components/ico/IcoStats.vue'
  import Auction from '@/components/ico/Auction/Auction.vue'
  import Faq from '@/components/ico/Faq.vue'
  import { mapState } from 'vuex'

  export default {
    layout: 'full-width',
    props: ['ico'],
    components: {
      Chart,
      IcoStats,
      Auction,
      Faq
    },
    data () {
      return {

      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.isMobile
      }),

      sections: function () {
        var sections = [
          {
            title: this.$t('current_rate'),
            value: this.ico.current_rate + ' BTC/MPL'
          },
          {
            title: this.$t('investments'),
            value: this.ico.total_btc.toFixed(6) + ' BTC'
          },
          {
            title: this.$t('distributed_tokens'),
            value: this.ico.total_tokens.toFixed() + ' MPL'
          },
        ]

        return sections
      }
    }
  }
</script>

<style>
  .auc-card {
    padding-top: 54px;
    padding-bottom: 66px;
    box-shadow: 0 15px 58.5px 6.5px rgba(0, 0, 0, 0.06);
    text-align: center;
  }

  .pre-ico-link {
    display: grid;
    justify-content: center;
  }

  .link {
    text-decoration: none;
  }

  ul.travelchain_channels {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0 0 15px 0;
    font-size: 20px;
    color: lightcoral;
  }

  li.telegram_channel {
    flex-basis: 200px;
    padding: 12px 0;
    border: 1px solid;
    margin-right: 20px !important;
    border-radius: 5px;
    cursor: pointer;
  }

  ul.travelchain_channels > li {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0 0 15px 0;
    font-size: 20px;
    color: lightcoral;
    transition: hover 1s ease;
  }

  li.telegram_channel a {
    text-decoration: none;
    color: lightcoral;
  }
</style>
