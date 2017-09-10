<template>
    <div v-if="ico" :class="{aucWrapper: !mobile}">
        <auction :mobile="mobile" :btc="ico.weekly_btc" :gbg="ico.weekly_gbg" :usd="ico.total_usd" :tokens="ico.total_tokens"></auction>
        <ico-stats :sections="sections"></ico-stats>
        <auction-info :mobile="mobile" :btcAddress="ico.btc_wallet"></auction-info>
        <h1>{{ $t('auction') }}</h1>
        <invest-table :table-data="ico.data_provider.allModels"></invest-table>
    </div>
</template>

<script>
    import Chart from '../../components/ico/Chart.vue'
    import IcoStats from '../../components/ico/IcoStats.vue'
    import Auction from '../../components/ico/Auction/Auction.vue'
    import AuctionInfo from '../../components/ico/Auction/AuctionInfo.vue'
    import Faq from '../../components/ico/Faq.vue'
    import InvestTable from '../../components/ico/Investors/InvestTable.vue'

    export default {
        components: {
            Chart,
            IcoStats,
            Auction,
            Faq,
            InvestTable,
            AuctionInfo
        },
        data () {
            return {

            }
        },
        computed: {
            ico: function () {
              return this.$parent.ico
            },
            mobile () {
              return this.$store.state.mobile.mobile()
            },
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
    .aucWrapper {
        /*text-align: center;*/
        padding-top: 60px;
    }
</style>
