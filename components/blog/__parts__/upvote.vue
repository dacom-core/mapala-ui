<template lang="pug">
  el-button-group.support_block(:class="{ isDisabled: !isAuth }")
    el-button(v-if="isAuth", @click="vote(post)")
      img(style="height: 12px" src="~assets/like.png")
    el-button(v-else :plain="true", :disabled="true" icon="check")
    el-button(type="primary" class="support" v-text="computePayout")
</template>

<script>
  import bc from '@/api/blockchain'
  import { Post } from '@/api/services'
  import { mapState } from 'vuex'

  export default {
    props: ['post'],

    data () {
      return {
        loading: false
      }
    },

    computed: {
      ...mapState({
        isAuth: state => state.user.auth.isAuth,
        locale: state => state.locale
      }),
      computePayout () {
        if (this.locale === 'ru') {
          return `${this.$options.filters.toRub(this.post.payout)} ₽`
        } else if (this.$store.state.locale === 'en') {
          return `${this.$options.filters.toDollar(this.post.payout)} $`
        }
      }
    },

    methods: {
      vote (post) {
        if (!bc.current.key_valid) {
          return this.$notify({
            message: this.$t('add_key_err', { bc: bc.current.name }), type: 'warning'
          })
        }

        this.loading = true

        bc.vote(post).then(res => {
          this.loading = false
          this.$notify({ message: this.$t('voted'), type: 'success' })
          Post.updatePost({ author: post.author.bc_username, permlink: post.permlink }).then(res => {
            post.payout = res.body.payout
          })
        }, err => {
          this.loading = false
          this.$notify({ title: this.$t('voting_error'), message: err, type: 'warning' })
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
