<template lang="pug">
  div(v-if="isAuth", :class="{ comment_storing: isStoring }", class="write_comment_wrapper")
    div.write_comment
      div.ca_w
        img.user_av(:src="userAvatar")

      div.write_w
        div.txt(
          @blur="stopEdit",
          @keyup.enter="addComment",
          contenteditable="true",
          ref="text"
        )
        div.placeholder(v-show="!isEdit", @click="startComment")
          | {{ $t('add_comment') }}

    div.comment_for(v-if="new_comment.parentPermlink")
      | {{ $t('comment_for') }} {{ new_comment.parentAuthor}}

      span.cancel(v-show="new_comment.parent_author", @click="cancelReply")
        | X
</template>

<script>
import { mapState } from 'vuex'
import bc from '@/api/blockchain'

export default {
  props: ['post', 'repliedComment'],
  data () {
    return {
      isEdit: false,
      new_comment: {
        body: '',
        author: '',
        parentAuthor: '',
        parentPermlink: ''
      },
      isStoring: false
    }
  },

  computed: {
    ...mapState({
      isAuth: state => state.user.auth.isAuth,
      userAvatar: state => state.user.personal.avatar
    })
  },

  methods: {
    cancelReply () {
      const str = this.new_comment.parent_author + ', '
      this.$refs.text.innerHTML = this.$refs.text.innerHTML.replace(new RegExp(str, 'g'), '')

      if (this.$refs.text.innerText.length === 0) {
        this.isEdit = false
      }

      this.new_comment = {
        body: '',
        author: '',
        parentAuthor: '',
        parentPermlink: ''
      }
    },
    reply (comment) {
      this.new_comment.parentAuthor = comment.author.bc_username
      this.new_comment.parentPermlink = comment.permlink
      this.startComment()
    },
    addComment () {
      // FIXME Зарефакторить эту дичь. После релиза - обязательно, в натуре дичь полнейшая
      // FIXME да я вижу, метод как штат олабама -_-
      if (!bc.current.key_valid) {
        this.endEdit()
        return this.$notify({message: this.$t('add_key_err', {bc: bc.current.name}), type: 'warning'})
      }

      this.new_comment.body = this.$refs.text.innerText

      const new_comment = Object.assign({}, this.new_comment)
      this.endEdit()

      let err = ''

      if (!new_comment.body.length) { err = this.$t('empty_comment') }

      if (err) { return this.$notify({ message: err, type: 'warning' }) }

      if (!new_comment.parentPermlink) {
        new_comment.parentAuthor = this.post.author.bc_username
        new_comment.parentPermlink = this.post.permlink
        new_comment.permlink = 're-' + bc.current.blockchain_username + this.post.permlink + '-' + Number(new Date())
      } else {
        new_comment.permlink = 're-' + bc.current.blockchain_username + this.new_comment.parentPermlink + '-' + Number(new Date())
      }
      new_comment.author = {}
      new_comment.author.bc_username = this.$store.state.user.personal.bc_username || 'username'
      new_comment.author.avatar = this.$store.state.user.personal.avatar

      this.isStoring = true

      bc.createComment(this, new_comment).then(res => {
        if (this.$route.name === 'username-post-slug') {
          this.$store.commit('blog/posts/post_single/PUSH_NEW_COMMENT', res.data)
        } else {
          this.$store.commit('blog/posts/post_list/PUSH_NEW_COMMENT', {
            id: this.post.id, comment: res.data
          })
        }
        this.cancelReply()
        this.isStoring = false
        this.$notify({ message: this.$t('comments_added'), type: 'success' })
      }, err => {
        this.isStoring = false
        console.log(err)
        this.$notify({ message: err, type: 'warning' })
      })
    },

    clearGag () {
      this.post.comments = this.post.comments.filter(i => i.isGag != true)
    },

    changeText (value) {
      this.$emit('input', value)
    },
    stopEdit() {
      if(this.$refs.text.innerText.length == 0)
        this.endEdit()
    },
    startComment () {
      this.isEdit = true
      console.log('block-write-comment.vue/startComment() 135')
      console.log(this.$refs)
      this.$refs.text.focus()
    },
    endEdit () {
      this.$refs.text.innerText = ''
      this.$refs.text.blur()
      this.isEdit = false

      this.new_comment = {
        body: '',
        author: '',
        parentAuthor: '',
        parentPermlink: '',
      }
    }
  },

  watch: {
    repliedComment () {
      if (this.repliedComment !== undefined) {
        this.reply(this.repliedComment)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .comment_for{
    font: 16px 'PT Sans';
    letter-spacing: -0.5px;
    color: #a2a2a2;
    text-align: right;
    margin-top: 10px;
  }

  .comment_for .cancel{
    cursor: pointer;
    width: 20px;
    display: inline-block;
    text-align: center;
  }

  .write_comment{
    border-radius: 6px;
    background-color: #ffffff;
    min-height: 52px;
    position: relative;
    padding-top: 1px;
    display: flex;
  }

  .write_comment .write_w{
    min-height: 52px;
    max-width: calc(100% - 52px);
    width: 100%;
    position: relative;
  }

  .write_comment .placeholder{
    font: 14px/52px 'PT Sans';
    letter-spacing: -0.4px;
    color: rgba(72, 84, 101, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    cursor: text;
  }

  .write_comment .txt{
    font: 14px 'PT Sans';
    letter-spacing: -0.4px;
    color: #000;
    min-height: 52px;
    padding: 17px 15px 17px 0;
    box-sizing: border-box;
    outline: 0;
    width: 100%;
    word-wrap: break-word;
  }

  .write_comment .ca_w{
    width: 32px;
    height: 32px;
    margin: 10px;
    overflow: hidden;
    border-radius: 50%;
  }

  .write_comment_wrapper {
    transition: all 1s;
    -webkit-transition: all 1s;
  }

  .comment_storing {
    background: rgba(0,0,0,0.1);
    opacity: 0.4;
  }
</style>
