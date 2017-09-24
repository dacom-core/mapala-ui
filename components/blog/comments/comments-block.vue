<template lang="pug">
  div.comments_block

    comments-list(:post="post")

    write-comment-block(:post="post")

</template>

<script>
import WriteCommentBlock from './__parts__/block-write-comment'
import CommentsList from './comments-list'

export default {
  props: ['post'],

  components: {
    WriteCommentBlock,
    CommentsList
  }
}
</script>

<style lang="stylus">
  .comments_block
    background-color: #fafafa
    padding: 20px 10px 26px

  .comments_block .rep_comments
    border-left: solid 2px #e3e8ef
    box-sizing: border-box
    margin: 13px 0 0 66px
    padding: 7px 0 0 10px

  .comments_block .rep_comments .comment:last-of-type
    margin-bottom: 0

  .comments_block .rep_comments .user_av
    width: 26px
    height: 26px

  .comments_block p
    margin-top: 0
    margin-bottom: 0
</style>
