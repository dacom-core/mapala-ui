<template lang="pug">
  div.post_block(v-loading.body="!post.body")
    nuxt-link(v-if="next_post" class="prev_post", :to="next_post")
    nuxt-link(v-if="prev_post" class="next_post", :to="prev_post")

    div.top_block
      div.t_col
        div.img_wrap
          nuxt-link(:to=" '/' + post.author.username")
            img.user_av(:src="post.author.avatar")

        div.name_block
          nuxt-link(:to=" '/' + post.author.username" class="name")
            | {{ post.author.bc_username }}
          div.date
            | {{ post.created_at || post.updated_at | formatDate }}

        div.location(v-if="post.position_text")
          | {{ post.position_text }}

      div.t_col
        nuxt-link.edit(
          v-if="post.author.username == userName",
          :to="makePath('edit', post.author.username, post.permlink)"
          )
          | {{ $t('edit') }}

        div.close(@click="closeModal")

    div.main_image(v-if="post.miniature")
      img(:src="post.miniature")

    div.content
      h1.c_header
        | {{ post.title }}
      vue-markdown(:source="postBody" class="c_text")

    div.bottom_block
      div.icons
        div.icon.comment
          | {{ post.comments_count }}
          | {{ pluralizeNoun(post.comments_count, 'комментарий', 'комментария', 'комментариев') }}

        a.icon.repost(@click="share(post)")
          | {{ $t('share') }}

      el-button-group.support_block(:class="{ isDisabled: !isAuth }")
        el-button(v-if="isAuth", @click="vote(post)")
          img(style="height: 12px" src="~assets/like.png")
        el-button(v-else :plain="true", :disabled="true", icon="check")
        el-button(type="primary" class="support")
          | {{ post.payout | toRub }} ₽
</template>

<script>
import VueMarkdown from 'vue-markdown'
import shareVK from '@/utils/share_vk'
import pluralizer from '@/utils/pluralizer'
import linkMaker from '@/utils/router_link_maker'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      isAuth: state => state.user.auth.isAuth,
      userName: state => state.user.personal.userName,
      post: state => state.blog.posts.postSingle
    }),

    postBody () {
      const body = this.post.body ? this.post.body.replace(
        /(https?:\S*?\.(?:png|jpe?g|gif)(?:\?[^"']+?)?(?=<|\s))/igm,
        '<img src="$1"></img>'
      ) : ''
      return body
    },

    prev_post () {
      return this.post.next_page ? this.makePath(
        'post-view',
        this.post.next_page.author__username,
        this.post.next_page.permlink
      ) : false
    },
    next_post () {
      return this.post.prev_page ? this.makePath(
        'post-view',
        this.post.prev_page.author__username,
        this.post.prev_page.permlink
      ) : false
    }
  },
  methods: {
    ...mapMutations({
      hideModal: 'modal/HIDE_MODAL'
    }),

    ...mapActions({
      addComment: 'posts/add_comment'
    }),
    share (post) {
      shareVK(post)
    },
    pluralizeNoun (count, nounFormOne, nounFormTwo, nounFormThree) {
      return pluralizer(count, nounFormOne, nounFormTwo, nounFormThree)
    },
    makePath (action, username, permalink = '') {
      return linkMaker(action, username, permalink)
    },
    closeModal () {
//      this.$router.push(this.route.from.fullPath)
    }
  },

  beforeRouteEnter: (to, from, next) => {
    console.log(to)
    next()
  },

  components: {
    VueMarkdown
  }
}
</script>


<style lang="stylus">
  .ql-video {
    width: 100%;
    height: 400px;
  }
  .user_av {
    border-radius: 50%;
  }
  .prev_post {
    width: 70px;
    height: 70px;
    position: fixed;
    top: 48%;
    left: calc((100% - 866px)/2 - 130px);
    z-index: 102;
    background: url('~/assets/icon-prev.svg') no-repeat;
    cursor: pointer;
  }

  .next_post {
    background: url('~/assets/icon-prev.svg') no-repeat;
    transform: rotateZ(180deg);
    width: 70px;
    height: 70px;
    position: fixed;
    cursor: pointer;
    z-index: 102;
    top: 48%;
    right: calc((100% - 866px)/2 - 130px);
  }

  .post_block .close{
    background: url('~/assets/icon-close-black.svg') no-repeat center center;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .post_block .edit {
    font: 700 14px/36px 'PT Sans';
    box-sizing: border-box;
    padding: 0 16px;
    cursor: pointer;
    user-select: none;
    margin-right: 30px;
    margin-left: 20px;
    width: 123px;
    height: 40px;
    border-radius: 23px;
    border: solid 2px #000000;
    font-family: PTSans;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    color: #000000;
    text-decoration: none;
  }

  .post_block {
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px rgba(72, 84, 101, 0.2);
    max-width: 866px;
    width: 100%;
    margin: 0 auto 80px;
    position: relative;
  }

  .post_block .c_header {
    font: 700 40px 'PT Sans';
    letter-spacing: -0.8px;
    color: #20252d;
    margin: 0 30px 20px;
  }

  .post_block .c_text {
    font: 21px/1.52 'PT Sans';
    letter-spacing: -1px;
    color: #141823;
    margin: 0 30px 40px;
  }

  .post_block .top_block {
    display: flex;
    margin: 40px 30px 35px;
    justify-content: space-between;
  }

  .post_block .t_col {
    display: flex;
  }

  .post_block .top_block .img_wrap {
    border-radius: 50%;
    margin-right: 8px;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .post_block img {
    display: block;
  }

  .post_block .name_block {
    margin-right: 8px;
    margin-top: 1px;
  }

  .post_block .name {
    font: 700 16px/20px 'PT Sans';
    letter-spacing: -0.5px;
    color: #6d9ee1;
    text-decoration: none;
  }

  .post_block .date {
    font-size: 12px;
    letter-spacing: -0.5px;
    color: rgba(72, 84, 101, 0.7);
    line-height: 16px;
  }

  .post_block .top_block .location {
    margin-top: 4px;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.5px;
    color: #7e8793;
    padding-left: 12px;
    position: relative;
    background: url('~/assets/icon-location-small.svg') no-repeat left 3px;
  }

  .post_block .bottom_block {
    display: flex;
    align-items: center;
    padding: 0 30px;
    margin-bottom: 30px;
  }

  .post_block .icons {
    display: flex;
    align-items: center;
  }

  .post_block .icon {
    display: block;
    cursor: pointer;
    font: 14px/34px 'PT Sans';
    letter-spacing: -0.5px;
    color: rgba(72, 84, 101, 0.7);
    padding-left: 23px;
    text-decoration: none;
  }

  .post_block .icon.comment {
    background: url('~/assets/icon-comment.svg') no-repeat left center;
    margin-right: 18px;
  }

  .post_block .icon.repost {
    background: url('~/assets/icon-repost.svg') no-repeat left center;
    margin-right: 18px;
  }

  .post_block .support {
    font: 14px/34px 'PT Sans';
    letter-spacing: -0.5px;
    color: rgba(255, 255, 255, 0.7);
    padding: 0 12px 0 12px;
    border-radius: 3px;
    text-decoration: none;
    background: #6d9ee1;
    margin-right: 35px;
    cursor: pointer;
  }

  .support_block button {
    height: 31px;
  }

  .post_block .is-disabled {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
  }

  .post_block .support span {
    color: #ffffff;
  }

  .post_block .main_image {
    overflow: hidden;
    margin: 0 -1px 25px;
  }

  .post_block .main_image img {
    width: 100%;
  }

  .post_block .content {
    overflow: hidden;
  }

  .post_block .c_text img {
    max-height: 492px;
    max-width: 100%;
    text-align: center;
    margin: 24px auto;
    width: auto;
  }
</style>
