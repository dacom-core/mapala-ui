<template>
    <div v-if="ico" class="icoInvest">
        <ico-stats :sections="sections"></ico-stats>
        <h1>{{ $t('investment_history') }}</h1>
        <invest-table :table-data="investors"></invest-table>
    </div>
</template>

<script>
    import Chart from '../../components/ico/Chart.vue'
    import IcoStats from '../../components/ico/IcoStats.vue'
    import Auction from '../../components/ico/Auction/Auction.vue'
    import Faq from '../../components/ico/Faq.vue'
    import InvestTable from '../../components/ico/Investors/InvestTable.vue'
    import api from '@/api/temporary'

    export default {
      components: {
        Chart,
        IcoStats,
        Auction,
        Faq,
        InvestTable
      },
      data () {
        return {
          investors: null
        }
      },
      computed: {
        ico: function () {
          return this.$parent.ico
        },
        sections: function () {
          var sections = [
            {
              title: this.$t('investments'),
              value: this.$parent.ico.total_btc.toFixed(6) + ' BTC'
            },
            {
              title: this.$t('distributed_tokens'),
              value: this.$parent.ico.total_tokens.toFixed() + ' MPL'
            },
          ]
          // console.log(this.ico.investors)
          return sections
        }
      },
      created () {
        // this.error = this.ico = null
        let that = this
        api.ico.investors(function(data) {
          // console.log(data)
          that.investors = data.data_provider.allModels
        });
      }
    }
</script>

<style scoped>
    h1 {
        margin-top: 130px;
    }
    .icoInvest {
        margin-top: -30px;
    }
</style>
