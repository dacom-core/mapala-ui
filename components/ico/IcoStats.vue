<template>
    <div>
        <div v-if="mobile">
            <el-row v-for="section in sections" :key="section.id" type="flex" class="stat-bg" justify="center" :gutter="10">
                <el-col :span="18">
                    <h3>{{ section.value }}</h3>
                    <h4>{{ section.title }}</h4>
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <el-row type="flex" class="stat-bg" justify="center" :gutter="10">
                <el-col v-for="section in sections" :span="7"  :key="section.id">
                    <h3>{{ section.value }}</h3>
                    <h4>{{ section.title }}</h4>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['sections'],
    data () {
      return {

      }
    },
    computed: {
      mobile () {
        return this.$store.state.mobile.mobile()
      }
    }
  }
</script>

<style scoped>
    .stat-bg {
        min-height: 184px;
        background-color: #f5f3f3;
        padding-top: 56px;
        padding-bottom: 46px;
        text-align: center;
        /*margin-top: -25px;*/
        margin-bottom: 0;
    }
    h3, h4 {
        font-weight: normal;
    }
    h3 {
        font-size: 30px;
        color: #5c7293;
        margin-bottom: 14px;
        margin-top: 0;
    }
    h4 {
        font-size: 24px;
        color: #f47999;
        margin-bottom: 0;
    }
</style>
