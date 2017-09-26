<template lang="pug">
  el-button-group.support_block(:class="{ isDisabled: !isAuth }")
    el-button(v-if="isAuth", @click="vote(post)")
      img(style="height: 12px" src="~assets/like.png")
    el-button(v-else :plain="true", :disabled="true" icon="check")
    el-button(type="primary" class="support")
      | {{ post.payout | toRub }} ₽
</template>

<script>
  import bc from '@/api/blockchain'
  import { Post } from '@/api/services'

  export default {
    props: ['post'],

    data () {
      return {
        loading: false
      }
    },

    computed: {
      isAuth () {
        return this.$store.state.user.auth.isAuth
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
