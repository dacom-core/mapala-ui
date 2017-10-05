<template>
    <div :class="{aucstats: !mobile}">
        <h4 v-bind:class="{ bold: isBold }"><sup v-html="stat.icon"></sup>{{stat.value}}</h4>
        <p>{{stat.title}}</p>
    </div>
</template>

<script>
export default {
    props: ["stat", "isBold"],
    data () {
        return {
        }
    },
    computed: {
        mobile () {
          return this.$store.state.mobile.mobile()
        },
    }
}
</script>

<style >
    .aucstats h4 {
        color: #898989;
        font-size: 30px;
        margin-bottom: 23px;
    }
    .aucstats sup {
        color: #f47999;
        font-size: 20px;
        font-weight: bold;
        position: relative;
        top: -25px;
    }
    .aucstats p {
        color: #00a3e5;
        font-size: 16px;
    }
    .aucstats .bold {
        font-weight: bold;
        font-size: 38px;
        color: #0a0a0a;
        margin-top: 33px;
        margin-bottom: 20px;
    }
</style>