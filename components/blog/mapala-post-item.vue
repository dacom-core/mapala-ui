<template lang="pug">
  div.post(:id="'page_id_'+ page.id", :class="page.miniature ? 'w_i' : '' ")
    nuxt-link(:to="{name: 'page', params: {author: page.author.username, permlink: page.permlink} }" v-if="page.miniature")
      div.post_image
        img.post-image(:src="page.miniature" alt="" onerror="this.style.display='none'")

    div.short
      div.top_block
        div.img_wrap
          nuxt-link(:to="'/'+page.author.username")
            img.user_av(:src="page.author.avatar")
        div.name_block
          nuxt-link.name(:to=" '/'+ page.author.username")
            | Here should be post's user blockchain name (TODO)
          div.date
            | {{ page.created_at || page.updated_at | formatDate}}

        div.location(v-if="page.position_text")
          | {{ page.position_text }}

      nuxt-link(:to="{name: 'page', params: {author: page.author.username, permlink: page.permlink} }")
        h2.write_header
          | {{ page.title }}
        p.write_text
          | {{ page.body.replace(/<\/?[^>]+(>|$)/g, "")  }}

    div.bottom_block(:class="{ mobileBlock: isMobile }")
      div.icons
        nuxt-link(
          :to="{name: 'page', params: {author: page.author.username, permlink: page.permlink }}"
          class="icon comment"
          )
          | {{ page.comments_count }} {{ numeral(page.comments_count) }}

        a.icon.repost(@click="share(page)")
          | {{ $t('share') }}


      el-button-group.support_block(:loading="loading", :class="{ isDisabled: !auth.isAuth }")
        el-button(v-if="auth.isAuth", @click="vote(page)")
          img(style="height: 12px" src="assets/like.png")
        el-button(v-else :plain="true", :disabled="true" icon="check")
        el-button(type="primary" class="support")
          | {{ page.payout | toRub }} ₽
</template>

<script>
export default {
  props: ['page'],

  data() {
    return {
      loading: false,
      auth: auth
    }
  },
  computed: {
    isMobile () {
      return this.detectmob()
    }
  },
  methods: {
    share(page){
      vkShare(page)
    },
    numeral(num){
      return commentsNumeral(num)
    },
    vote (page) {
      if (!bc.current.key_valid) {
        // TODO Вынести проверку ключа в блокчейн модуль
        return this.$notify({message: `Необходимо добавить ключ ${bc.current.name} в настройках`, type: 'warning'})
      }

      this.loading = true

      bc.vote(page).then(res => {
        this.loading = false
        this.$notify({message: `Голос принят`, type: 'success'})
        Page.updatePost({author: page.author.bc_username, permlink: page.permlink}).then(res => {
          page.payout = res.body.payout
        })
      }, err => {
        this.loading = false
        this.$notify({title: 'Ошибка голосования', message: err, type: 'warning'})
      })
    }
  },
  components: {
    CommentsBlock
  }
}
</script>

<style scoped>
  .post_image {
    min-height: 100px;
  }
  .mobileBlock {
    display: block !important;
  }
</style>
