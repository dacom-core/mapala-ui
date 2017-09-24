<template lang="pug">
  div.comment
    div.user_av
      nuxt-link(:to="'/'+comment.author.username")
        img(:src="comment.author.avatar")

    div.comment_body(:id="comment.id")
      div.name_bl
        nuxt-link.user_page(:to="'/'+comment.author.username")
          | {{ comment.author.bc_username }}

        span.pr(v-show="comment.parent_author")
          | {{ $t('replied') }} {{ comment.parent_author }}

        div.date
          | {{ comment.created_at | formatDate }}

      vue-markdown(:source="comment.body")

    div.reply(v-if="isAuth", @click="reply(comment)")
      | {{ $t('reply') }}
</template>

<script>
import { mapState } from 'vuex';
import VueMarkdown from 'vue-markdown'

export default {
  props: ['comment'],

  data () {
    return {}
  },

  computed: {
    ...mapState({
      isAuth: state => state.user.auth.isAuth
    })
  },

  methods: {
    reply (comment) {
      this.$emit('reply', comment)
    }
  },

  components: {
    VueMarkdown
  }
}
</script>

<style lang="stylus" scoped>
  .comments_block .comment{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .comments_block .comment .user_av{
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    display: inline-block;
    margin-right: 15px;
  }

  .comments_block .comment .user_av img{
    display: block;
    width: 100%;
  }

  .comments_block .comment .comment_body{
    width: calc(100% - 55px);
    font: 16px 'PT Sans';
    letter-spacing: -1px;
    color: #20262d;
    margin-bottom: 1px;
    word-break: break-word;
  }


  .comments_block .comment .comment_body iframe {
    max-width: 80%;
  }

  .comments_block .comment .comment_body img {
    max-width: 80%;
  }

  .comments_block .comment .user_page{
    text-decoration: none;
    color: #6d9ee1;
    font-weight: 700;
    margin-right: 3px;
  }

  .comments_block .comment .pr{
    font: 16px 'PT Sans';
    letter-spacing: -0.5px;
    color: #a2a2a2;
    cursor: pointer;
  }

  .comments_block .comment .reply{
    margin-left: 55px;
    font: 700 14px 'PT Sans';
    letter-spacing: -0.4px;
    color: #5d7394;
    cursor: pointer;
  }
</style>
