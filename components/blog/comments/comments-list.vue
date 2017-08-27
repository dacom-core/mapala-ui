<template lang="pug">
  div
    div.show_more_comments_button(v-if="hasPostMoreComments", @click="fetchAllComments()")
      | {{ $t('show_comments') }}

    comments-item(v-for="comment of comments", :comment="comment", :key="comment.id")


</template>

<script>
import { Comment } from '@/api/services'
import CommentsItem from './comments-list-item'
import _ from 'lodash'

export default {
  props: ['post'],

  data () {
    return {
      isShowMoreCommentsClicked: false,
      comments: _.cloneDeep(this.post.comments)
    }
  },

  computed: {
    hasPostMoreComments () {
      // return true if the quantity of all comments for this post is bigger than
      // the quantity of comments preloaded with post (By default 3 if there is)
      return this.post.comments_count > this.comments.length // TODO не может с null length посчитать.
    }
  },
  methods: {
    async fetchAllComments () {
      const { data } = await Comment.query({ 'page': this.post.id })
      this.comments = data
    }
  },

  components: {
    CommentsItem
  }
}
</script>

<style lang="stylus" scoped>
  .show_more_comments_button
    display: block
    width: 100%
    text-decoration: none
    text-align: center
    font: 700 14px/40px 'PT Sans'
    letter-spacing: -0.3px
    color: #5d7394
    border-radius: 6px
    background-color: #e3e8ef
    margin-bottom: 20px
    cursor: pointer
    user-select: none
</style>
