<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col class="chart-wrapper" :span="20">
            <highcharts :options="options"></highcharts>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    props: ['x', 'y'],
    data () {
      return {
        options: {
          chart: {
            type: 'line',
            plotBackgroundImage: '/static/world.png',
            height: 550,
            spacingBottom: 15,
            spacingTop: 10,
            style: {
              fontFamily: 'Roboto',
              textAlign: 'center'
            }
          },
          title: {
            text: null
          },
          xAxis: {
            categories: this.x,
            labels: {
              formatter: function () {
                var label = this.axis.defaultLabelFormatter.call(this);
                return label.substring(0,9);
              }
            }
          },
          yAxis: {
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            title: {
              text: null
            }
          },
          plotOptions: {
            series: {
              enableMouseTracking: true
            }
          },
          series: [{
            name: this.$t('average_rate'),
            showInLegend: false,
            data: this.y
          }]
        }
      }
    }
  }
</script>

<style>
.chart-wrapper {
    padding-top: 50px;
    padding-bottom: 80px;
}
.highcharts-plot-background {
    background: no-repeat bottom 30%;
}
tspan {
	text-align: center!important;
}
</style>
