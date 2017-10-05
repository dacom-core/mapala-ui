<template>
  <div class="component">
    <div class="cn-week">
      <ul class="cn-days animated fadeIn">
        <li v-for="day in days">
          <a v-bind:class="{ activeDay: day == selected.day }" @click="selectDay(day)" href="javascript:void(0)">{{day}}</a>
        </li>
      </ul>
    </div>
    <div class="cn-wrapper opened-nav" id="cn-wrapper">
      <ul>
        <li v-for="month in months">
          <a v-bind:class="{ activeMonth: month == selected.month }" @click="selectMonth(month)" href="javascript:void(0)">
            <span>{{month}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  const formatTo = "YYYY-MM-DD[T]HH:mm:ss[Z]"

  export default {
    data() {
      return {
        current: {
          month: moment().startOf("month").format('MMMM'),
          day: moment().date()
        },
        selected: {
          month: null,
          day: null
        },
        months: moment.months()
      }
    },
    computed: {
      days () {
        const month = this.monthNumber(this.selected.month)
        return moment('2017-' + month).daysInMonth()
      }
    },
    methods: {
      selectMonth (month) {
        this.selected.month = month
        this.selected.day = null
        const mon = this.monthNumber(this.selected.month)
        const range = {
          gte: moment('2017-' + mon).format(formatTo),
          lte: moment('2017-' + mon).add(1, 'M').format(formatTo)
        }
        this.$store.dispatch('blog/posts/post_list/setRange', range)
      },
      selectDay (day) {
        this.selected.day = day
        let mon = this.monthNumber(this.selected.month)
        var range = {
          gte: moment('2017-' + mon + '-' + day).format(formatTo),
          lte: moment('2017-' + mon + '-' + day).add(1, 'd').format(formatTo),
        }
        this.$store.dispatch('blog/posts/post_list/setRange', range)
      },
      /**
       * Get month number from name
       * @param  {string} month  name of sselected month
       * @return {int}           number of selected month
       */
      monthNumber(month) {
        let mon = moment().month(month).format("M")
        if (mon.length == 1) {mon = '0' + mon}
        return mon
      }
    },
    created () {
      this.selected.month = this.current.month
      this.selected.day = this.current.day
    }
  }
</script>
<style scoped>
  * {
    position: relative;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
  }


  .component {
    position: relative;
    margin-bottom: 3em;
    height: 15em;
    /*background: rgba(0,0,0,0.05);*/
    font-family: 'Lato', Arial, sans-serif;
  }

  .component > h2 {
    position: absolute;
    overflow: hidden;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    font-weight: 300;
    font-style: italic;
    font-size: 12em;
    opacity: 0.1;
    cursor: default;
  }

  .cn-week{
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 11;
    margin-top: -4.45em;
    margin-left: -4.85em;
    padding-top: 0em;
    width: 10.5em;
    height: 10.5em;
    border: none;
    border-radius: 50%;
    background: none;
    background-color: #fff;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
    -webkit-backface-visibility: hidden;
  }

  .cn-days {
    padding: 10px 0;
    margin: 0;
    text-align: left;
  }

  .cn-days li {
    list-style-type: none;
    display: inline-block;
    width: 13.6%;
    text-align: center;
    padding-bottom: 10px;
  }

  .cn-days a {
    color: #777;
    text-decoration: none;
    font-size:18px;
  }

  .cn-days .activeDay,
  .cn-days a:hover,
  .cn-days a:active,
  .cn-days a:focus {
    color: #00a3e5;
  }

  .cn-wrapper {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 10;
    margin-top: -13em;
    margin-left: -13.5em;
    width: 27em;
    height: 27em;
    border-radius: 50%;
    background: transparent;
    opacity: 0;
    -webkit-transition: all .3s ease 0.3s;
    -moz-transition: all .3s ease 0.3s;
    transition: all .3s ease 0.3s;
    -webkit-transform: scale(0.1);
    -ms-transform: scale(0.1);
    -moz-transform: scale(0.1);
    transform: scale(0.1);
    pointer-events: none;
    overflow: hidden;
  }

  /*cover to prevent extra space of anchors from being clickable*/
  .cn-wrapper:after{
    content:".";
    display:block;
    font-size:2em;
    width:6.2em;
    height:6.2em;
    position: absolute;
    left: 50%;
    margin-left: -3.1em;
    top:50%;
    margin-top: -3.1em;
    border-radius: 50%;
    z-index:10;
    color: transparent;
  }

  .opened-nav {
    border-radius: 50%;
    opacity: 1;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    transition: all .3s ease;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    pointer-events: auto;
  }

  .cn-wrapper li {
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    margin-top: -1.3em;
    margin-left: -10em;
    width: 10em;
    height: 10em;
    font-size: 1.5em;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    transition: all .3s ease;
    -webkit-transform: rotate(76deg) skew(60deg);
    -moz-transform: rotate(76deg) skew(60deg);
    -ms-transform: rotate(76deg) skew(60deg);
    transform: rotate(76deg) skew(60deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
    pointer-events: none;
  }

  .cn-wrapper li a {
    position: absolute;
    right: -7.25em;
    bottom: -7.25em;
    display: block;
    width: 14.5em;
    height: 14.5em;
    border-radius: 50%;
    background: #a4cffb;
    background: -webkit-radial-gradient(transparent 45%, #a4cffb 45%);
    background: -moz-radial-gradient(transparent 45%, #a4cffb 45%);
    background: radial-gradient(transparent 45%, #a4cffb 45%);
    /*background: #a4cffb;*/
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 1.2em;
    line-height: 2;
    -webkit-transform: skew(-60deg) rotate(-75deg) scale(1);
    -moz-transform: skew(-60deg) rotate(-75deg) scale(1);
    -ms-transform: skew(-60deg) rotate(-75deg) scale(1);
    transform: skew(-60deg) rotate(-75deg) scale(1);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    pointer-events: auto;
  }

  .cn-wrapper li a span {
    position: relative;
    top: 1.8em;
    display: block;
    font-size: .5em;
    font-weight: 700;
    text-transform: uppercase;
  }

  .cn-wrapper li .activeMonth,
  .cn-wrapper li a:hover,
  .cn-wrapper li a:active,
  .cn-wrapper li a:focus {
    background: -webkit-radial-gradient(transparent 45%, #6bacef 45%);
    background: -moz-radial-gradient(transparent 45%, #6bacef 45%);
    background: radial-gradient(transparent 45%, #6bacef 45%);
  }
  .cn-wrapper li a:focus {
    position: fixed; /* fix the displacement bug in webkit browsers when using tab key */
  }

  .opened-nav li {
    -webkit-transition: all .3s ease .3s;
    -moz-transition: all .3s ease .3s;
    transition: all .3s ease .3s;
  }

  .opened-nav li:first-child {
    -webkit-transform: rotate(-20deg) skew(60deg);
    -moz-transform: rotate(-20deg) skew(60deg);
    -ms-transform: rotate(-20deg) skew(60deg);
    transform: rotate(-20deg) skew(60deg);
  }

  .opened-nav li:nth-child(2) {
    -webkit-transform: rotate(10deg) skew(60deg);
    -moz-transform: rotate(10deg) skew(60deg);
    -ms-transform: rotate(10deg) skew(60deg);
    transform: rotate(10deg) skew(60deg);
  }

  .opened-nav  li:nth-child(3) {
    -webkit-transform: rotate(40deg) skew(60deg);
    -moz-transform: rotate(40deg) skew(60deg);
    -ms-transform: rotate(40deg) skew(60deg);
    transform: rotate(40deg) skew(60deg);
  }

  .opened-nav li:nth-child(4) {
    -webkit-transform: rotate(70deg) skew(60deg);
    -moz-transform: rotate(70deg) skew(60deg);
    -ms-transform: rotate(70deg) skew(60deg);
    transform: rotate(70deg) skew(60deg);
  }

  .opened-nav li:nth-child(5) {
    -webkit-transform: rotate(100deg) skew(60deg);
    -moz-transform: rotate(100deg) skew(60deg);
    -ms-transform: rotate(100deg) skew(60deg);
    transform: rotate(100deg) skew(60deg);
  }

  .opened-nav li:nth-child(6) {
    -webkit-transform: rotate(130deg) skew(60deg);
    -moz-transform: rotate(130deg) skew(60deg);
    -ms-transform: rotate(130deg) skew(60deg);
    transform: rotate(130deg) skew(60deg);
  }

  .opened-nav li:nth-child(7) {
    -webkit-transform: rotate(160deg) skew(60deg);
    -moz-transform: rotate(160deg) skew(60deg);
    -ms-transform: rotate(160deg) skew(60deg);
    transform: rotate(160deg) skew(60deg);
  }

  .opened-nav li:nth-child(8) {
    -webkit-transform: rotate(190deg) skew(60deg);
    -moz-transform: rotate(190deg) skew(60deg);
    -ms-transform: rotate(190deg) skew(60deg);
    transform: rotate(190deg) skew(60deg);
  }

  .opened-nav li:nth-child(9) {
    -webkit-transform: rotate(220deg) skew(60deg);
    -moz-transform: rotate(220deg) skew(60deg);
    -ms-transform: rotate(220deg) skew(60deg);
    transform: rotate(220deg) skew(60deg);
  }

  .opened-nav li:nth-child(10) {
    -webkit-transform: rotate(250deg) skew(60deg);
    -moz-transform: rotate(250deg) skew(60deg);
    -ms-transform: rotate(250deg) skew(60deg);
    transform: rotate(250deg) skew(60deg);
  }

  .opened-nav li:nth-child(11) {
    -webkit-transform: rotate(280deg) skew(60deg);
    -moz-transform: rotate(280deg) skew(60deg);
    -ms-transform: rotate(280deg) skew(60deg);
    transform: rotate(280deg) skew(60deg);
  }

  .opened-nav li:nth-child(12) {
    -webkit-transform: rotate(310deg) skew(60deg);
    -moz-transform: rotate(310deg) skew(60deg);
    -ms-transform: rotate(310deg) skew(60deg);
    transform: rotate(310deg) skew(60deg);
  }

  .no-csstransforms .cn-wrapper {
    overflow: hidden;
    margin: 10em auto;
    padding: .5em;
    text-align: center;
  }

  .no-csstransforms .cn-wrapper ul {
    display: inline-block;
  }

  .no-csstransforms .cn-wrapper li {
    float: left;
    width: 5em;
    height: 5em;
    background-color: #fff;
    text-align: center;
    font-size: 1em;
    line-height: 5em;
  }

  .no-csstransforms .cn-wrapper li a {
    display: block;
    width: 100%;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }

  /*.activeMonth,
  .no-csstransforms .cn-wrapper li a:hover,
  .no-csstransforms .cn-wrapper li a:active,
  .no-csstransforms .cn-wrapper li a:focus {
      background-color: #f8f8f8;
  }*/

  .no-csstransforms .cn-wrapper li.active a{
    background-color: #6F325C;
    color: #fff;
  }

  .no-csstransforms .cn-button {
    display: none;
  }

  @media only screen and (max-width: 620px) {
    .no-csstransforms li {
      width: 4em;
      height: 4em;
      line-height: 4em;
    }
  }

  @media only screen and (max-width: 500px) {
    .no-ccstransforms .cn-wrapper {
      padding: .5em;
    }

    .no-csstransforms .cn-wrapper li {
      width: 4em;
      height: 4em;
      font-size: .9em;
      line-height: 4em;
    }
  }

  @media only screen and (max-width: 480px) {
    .cn-wrapper {
      font-size: .68em;
    }

    .cn-button {
      font-size: 1em;
    }
  }

  @media only screen and (max-width:420px) {
    .no-csstransforms .cn-wrapper li {
      width: 100%;
      height: 3em;
      line-height: 3em;
    }
  }
</style>
