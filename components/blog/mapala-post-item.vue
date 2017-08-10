<template lang="pug">
  div.post(:id="'page_id_'+ post.id", :class="post.miniature ? 'w_i' : '' ")
    nuxt-link(:to="{ name: 'post', params: { author: post.author.username, permlink: post.permlink } }" v-if="post.miniature")
      div.post_image
        img.post-image(:src="post.miniature" alt="" onerror="this.style.display='none'")

    div.short
      div.top_block
        div.img_wrap
          nuxt-link(:to="'/'+post.author.username")
            img.user_av(:src="post.author.avatar")
        div.name_block
          nuxt-link.name(:to=" '/'+ post.author.username")
            | Here should be post's user blockchain name (TODO)
          div.date
            | {{ post.created_at || post.updated_at | formatDate }}

        div.location(v-if="post.position_text")
          | {{ post.position_text }}

      nuxt-link(:to="{name: 'post', params: {author: post.author.username, permlink: post.permlink} }")
        h2.write_header
          | {{ post.title }}
        p.write_text
          | {{ post.body.replace(/<\/?[^>]+(>|$)/g, "")  }}

    div.bottom_block(:class="{ mobileBlock: isMobile }")
      div.icons
        nuxt-link(
          :to="{name: 'post', params: {author: post.author.username, permlink: post.permlink }}"
          class="icon comment"
          )
          | {{ post.comments_count }}
          | {{ pluralizeNoun(post.comments_count, 'комментарий', 'комментария', 'комментариев') }}

        a.icon.repost(@click="share(post)")
          | {{ $t('share') }}


      el-button-group.support_block(:loading="loading", :class="{ isDisabled: isAuth }")
        el-button(v-if="isAuth", @click="vote(post)")
          img(style="height: 12px" src="~assets/like.png")
        el-button(v-else :plain="true", :disabled="true" icon="check")
        el-button(type="primary" class="support")
          | {{ post.payout | toRub }} ₽
</template>

<script>
import { mapState } from 'vuex'
import shareVK from '@/utils/share_vk'
import pluralizer from '@/utils/pluralizer'

export default {
  props: ['post'],

  data () {
    return {
      loading: false
    }
  },
  computed: mapState({
    isMobile: state => state.isMobile,
    isAuth: state => state.user.auth.isAuth
  }),
  methods: {
    share (post) {
      shareVK(post)
    },
    pluralizeNoun (count, nounFormOne, nounFormTwo, nounFormThree) {
      return pluralizer(count, nounFormOne, nounFormTwo, nounFormThree)
    }
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
