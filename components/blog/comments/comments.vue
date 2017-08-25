<template lang="pug">
  div.comments_block
    div(v-if="page.comments_count > page.comments.length" @click="fetchComments" class="show_previous")
      | {{ $t('show_comments') }}

    div(v-for="comment in page.comments" class="comment")
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

      div.reply(v-if="auth.isAuth", @click="reply(comment)")
        | {{ $t('reply') }}

    div.write_comment(v-if="auth.isAuth")
      div.ca_w
        img.user_av(:src="auth.user.avatar")

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
  import {Comment} from '../../services/index'
  import auth from '../../auth/index'
  import bc from '../../blockchains/index'
  import VueMarkdown from 'vue-markdown'

  export default {
    props: ['page'],

    data() {
      return {
        auth: auth,
        isEdit: false,
        new_comment: {
          body: '',
          author: '',
          parentAuthor: '',
          parentPermlink: '',
        }
      }
    },
    methods: {
      // TODO доделать после релиза
      /**
       * Scroll page to selected comment
       * @param  {string} comment Comment id
       */
      toComment(comment) {
        console.log(comment)
        if (this.page.comments_count > this.page.comments.length) {
          this.fetchComments()
        }
        this.$scrollTo(comment, 500, { easing: 'linear' })
      },
      cancelReply() {
        let str = this.new_comment.parent_author + ', '
        this.$refs.text.innerHTML = this.$refs.text.innerHTML.replace(new RegExp(str,'g'),"")

        if(this.$refs.text.innerText.length == 0){
          this.isEdit = false
        }

        this.new_comment = {
          body: '',
          author: '',
          parentAuthor: '',
          parentPermlink: '',
        }

      },
      reply(comment) {
        this.new_comment.parentAuthor = comment.author.bc_username
        this.new_comment.parentPermlink = comment.permlink
        // console.log(this.new_comment)
        this.startComment()
      },
      addComment() {
        // FIXME Зарефакторить эту дичь. После релиза - обязательно, в натуре дичь полнейшая
        if (!bc.current.key_valid) {
          this.endEdit()
          return this.$notify({message: this.$t('add_key_err', {bc: bc.current.name}), type: 'warning'})
        }

        this.new_comment.body = this.$refs.text.innerText
        let new_comment = Object.assign({}, this.new_comment)
        this.endEdit()

        let err = ''

        if (!new_comment.body.length) err = this.$t('empty_comment')

        if (err) return this.$notify({ message: err, type: 'warning'})

        if (!new_comment.parentPermlink) {
          new_comment.parentAuthor = this.page.author.bc_username
          new_comment.parentPermlink = this.page.permlink
          new_comment.permlink = 're-' + bc.current.blockchain_username + this.page.permlink + '-' + Number(new Date())
        } else {
          new_comment.permlink = 're-' + bc.current.blockchain_username + this.new_comment.parentPermlink + '-' + Number(new Date())
        }

        //  Ставим заглушку пока ждем ответ блокчейна
        new_comment.isGag = true

        new_comment.author = {}
        new_comment.author.bc_username = auth.user.username
        new_comment.author.avatar = auth.user.avatar

        this.page.comments.push(new_comment)

        bc.createComment(this, new_comment).then(res => {
          // Убираем заглушку
          this.clearGag()

          this.page.comments.push(res.body)
          this.cancelReply()
        }, err => {
          this.$notify({ message: err, type: 'warning'})
          this.clearGag()
        })
      },

      clearGag() {
        this.page.comments = this.page.comments.filter(i => i.isGag != true)
      },

      fetchComments() {
        Comment.get({'page': this.page.id}).then(res => {
          this.page.comments = res.body
        })
      },
      changeText(value) {
        this.$emit('input', value)
      },
      stopEdit(){
        if(this.$refs.text.innerText.length == 0)
          this.endEdit()
      },
      startComment(){
        this.isEdit = true
        this.$refs.text.focus()
      },
      endEdit() {
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
    components: {
      VueMarkdown
    }
  }
</script>

<style lang="scss">
  .comments_block{
    background-color: #fafafa;
    padding: 20px 10px 26px;
  }

  .comments_block .show_previous{
    display: block;
    width: 100%;
    text-decoration: none;
    text-align: center;
    font: 700 14px/40px 'PT Sans';
    letter-spacing: -0.3px;
    color: #5d7394;
    border-radius: 6px;
    background-color: #e3e8ef;
    margin-bottom: 20px;
    cursor: pointer;
    user-select: none;
  }
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

  .comments_block .rep_comments{
    border-left: solid 2px #e3e8ef;
    box-sizing: border-box;
    margin: 13px 0 0 66px;
    padding: 7px 0 0 10px;
  }

  .comments_block .rep_comments .comment:last-of-type{
    margin-bottom: 0;
  }

  .comments_block .rep_comments .user_av{
    width: 26px;
    height: 26px;
  }

  .comments_block p {
    margin-top: 0;
    margin-bottom: 0;
  }

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
</style>
