<template>
  <div>
    <h3 v-if="isMobile">{{ $t('invest_blockchain') }}</h3>
    <h1 v-else>{{ $t('invest_blockchain') }}</h1>
    <chart :x="ico.xaxis" :y="ico.yaxis"></chart>
    <ico-stats :sections="sections"></ico-stats>
    <el-row type="flex" class="auc-bg" justify="center" :gutter="20">
      <el-col :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="auc-card">
          <auction  :mobile="mobile" :btc="ico.weekly_btc" :gbg="ico.weekly_gbg" :usd="ico.total_usd" :tokens="ico.total_tokens"></auction>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="ico-bottom" type="flex" justify="center" :gutter="20">
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <router-link :to="{name: 'investors'}">
          <h4 class="ico-hist">{{ $t('history') }}<br>Pre-ICO</h4>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <router-link to="/mapala">
          <h4 class="ico-blog">{{ $t('blog') }}<br>Mapala</h4>
        </router-link>
      </el-col>
    </el-row>
    <faq></faq>
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
      ico: function () {
        return this.$parent.ico
      },

      ...mapState({
        isMobile: state => state.isMobile
      }),

      sections: function () {
        var sections = [
          {
            title: this.$t('current_rate'),
            value: this.$parent.ico.current_rate + ' BTC/MPL'
          },
          {
            title: this.$t('investments'),
            value: this.$parent.ico.total_btc.toFixed(6) + ' BTC'
          },
          {
            title: this.$t('distributed_tokens'),
            value: this.$parent.ico.total_tokens.toFixed() + ' MPL'
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
</style>
