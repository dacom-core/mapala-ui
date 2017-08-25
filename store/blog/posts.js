import { Post } from '@/api/services'

export const state = () => ({
  postList: {
    data: [],
    author: null,
    page: 1,
    has_not_pages: false,
    loading: false,
    range: {
      gte: null,
      lte: null
    },
    tags: null
  },
  postSingle: {
    author: {},
    body: '',
    comments: [],
    comments_count: '',
    created_at: '',
    id: '',
    meta: {},
    next_page: null,
    payout: '',
    permlink: '',
    position: null,
    position_text: '',
    prev_page: null,
    title: ''
  }
})

export const actions = {
  fetch_posts () {
    return Post.query() // Retrieving all posts
  },
  fetch_comments () {
    return Post.commentsTree()
  },

  add_comment () {
    // this.new_comment.post = this.post.id

    // Comment.save(this.new_comment).then(res => {
    //   this.post.comments.push(res.body)
    // })
  }
}

export const mutations = {
  SET_POST_LIST (state, payload) {
    state.postList.data = payload
  },
  SET_POST_SINGLE (state, payload) {
    state.postSingle = payload
  }
}
