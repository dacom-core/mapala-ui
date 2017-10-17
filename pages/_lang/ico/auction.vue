<template>
    <div v-if="ico" :class="{aucWrapper: !mobile}">
        <auction :mobile="mobile" :btc="ico.weekly_btc" :gbg="ico.weekly_gbg" :usd="ico.total_usd" :tokens="ico.total_tokens"></auction>
        <ico-stats :sections="sections"></ico-stats>
        <auction-info :mobile="mobile" :btcAddress="ico.btc_wallet"></auction-info>
        <h1>{{ $t('auction') }}</h1>
        <no-ssr>
            <invest-table :table-data="ico.data_provider.allModels"></invest-table>
        </no-ssr>
    </div>
</template>

<script>
    import Chart from '@/components/ico/Chart.vue'
    import IcoStats from '@/components/ico/IcoStats.vue'
    import Auction from '@/components/ico/Auction/Auction.vue'
    import AuctionInfo from '@/components/ico/Auction/AuctionInfo.vue'
    import Faq from '@/components/ico/Faq.vue'
    import InvestTable from '@/components/ico/Investors/InvestTable.vue'
    import axios from 'axios'

    export default {
        middleware: ['auth'],
        async asyncData ({ store }) {
        
            const { data: ico } = await axios.get(`${store.state.API_SERVER}api/v1/site/auction`, {
                params: {
                    user: store.state.user.personal.username
                }
            })
            return { ico: ico }
        }, 
        data () {
            return {
            }
        },
        computed: {
            mobile () {
              return this.$store.state.isMobile
            },
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
        },
        components: {
            Chart,
            IcoStats,
            Auction,
            Faq,
            InvestTable,
            AuctionInfo
        }
    }
</script>

<style>
    .aucWrapper {
        /*text-align: center;*/
        padding-top: 60px;
    }
</style>
