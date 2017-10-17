<template>
    <div v-if="ico" class="icoInvest">
        <ico-stats :sections="sections"></ico-stats>
        <h1>{{ $t('investment_history') }}</h1>
        <no-ssr>
          <invest-table :table-data="investors"></invest-table>
        </no-ssr>
    </div>
</template>

<script>
    import Chart from '@/components/ico/Chart.vue'
    import IcoStats from '@/components/ico/IcoStats.vue'
    import Auction from '@/components/ico/Auction/Auction.vue'
    import Faq from '@/components/ico/Faq.vue'
    import InvestTable from '@/components/ico/Investors/InvestTable.vue'
    import api from '@/api/temporary'
    import { MAPALA_API_PROTOCOL, MAPALA_API_HOST, MAPALA_API_BASE_PATH } from '@/api/config'
    import axios from 'axios'

    const API_URL = `${MAPALA_API_PROTOCOL}://${MAPALA_API_HOST}/${MAPALA_API_BASE_PATH}api/v1/site`

    export default {
      components: {
        Chart,
        IcoStats,
        Auction,
        Faq,
        InvestTable
      },
      async asyncData ({ store }) {
        const [{ data: investors }, { data: ico }] = await Promise.all([
          axios.get(`${API_URL}/investors`),
          axios.get(`${API_URL}/ico`)
        ])

        return { 
          investors: investors.data_provider.allModels,
          ico: ico
         }
      }, 
      data () {
        return {
        }
      },
      computed: {
        sections: function () {
          var sections = [
            {
              title: this.$t('investments'),
              value: this.ico.total_btc.toFixed(6) + ' BTC'
            },
            {
              title: this.$t('distributed_tokens'),
              value: this.ico.total_tokens.toFixed() + ' MPL'
            }
          ]
          return sections
        }
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
