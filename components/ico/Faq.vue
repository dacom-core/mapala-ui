
<template>
    <el-row type="flex" class="faq-bg" justify="center" :gutter="20">
        <el-col :xs="24" :sm="24" :md="18" :lg="18">
          <h2>{{ $t('ico') }}</h2>
            <el-collapse>
                <el-collapse-item v-for="question in questions" :key="question.id">
                    <template slot="title">
                        <span class="faq-header">{{question.title}}</span>
                    </template>
                    <div class="faq-body">{{question.body}}</div>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      questions: [
        {
          title: this.$t('mapala_tokens'),
          body: this.$t('mapala_tokens_desc')
        },
        {
          title: this.$t('how_shares'),
          body: this.$t('how_shares_desc')
        },
        {
          title: this.$t('how_sell'),
          body: this.$t('how_sell_desc')
        },
        {
          title: this.$t('what_is_ico'),
          body: this.$t('what_is_ico_desc')
        },
        {
          title: this.$t('ico_diff'),
          body: this.$t('ico_diff_desc')
        },
        {
          title: this.$t('how_to_ico'),
          body: this.$t('how_to_ico_diff')
        },
        {
          title: this.$t('how_long_ico'),
          body: this.$t('how_long_ico_diff')
        },
        {
          title: this.$t('where_store'),
          body: this.$t('where_store_diff')
        },
        {
          title: this.$t('why_crypto'),
          body: this.$t('why_crypto_diff')
        },
        {
          title: this.$t('how_many_ico'),
          body: this.$t('how_many_ico_diff')
        },
        {
          title: this.$t('recover_ico'),
          body: this.$t('recover_ico_diff')
        }
      ]
    }
  }
}
</script>

<style scoped>
.faq-bg h2 {
    text-align: center;
}
.el-collapse {
    border: 0;
}
.el-collapse-item__wrap {
    background-color: #ffffff
}
.faq-header {
    color: #00a3e5;
    font-size: 20px;
}
.el-collapse-item{
    margin-top: 25px;
    margin-bottom: 28px;
}
.faq-body {
    border-left: solid 2.2px #d1d1d1;
    padding-left: 14px;
}
</style>
