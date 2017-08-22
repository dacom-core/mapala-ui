import { Post } from '@/api/posts'

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
    navigate: {
      next: {},
      prev: {}
    },
    new_comment: {},
    post: {
      author: {},
      comments: []
    },
    auth: '',
    comments: [],
    mark_view: '',
    error: false,
    loading: false,
    meta: [
      { property: 'og:title', content: 'title' },
      { property: 'og:site_name', content: 'Title' },
      { property: 'og:description', content: 'Title' },
      { property: 'og:image', content: 'Title' }
    ]
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

  SET_POST_SIGNLE (state, payload) {
    state.postSingle = payload
  }
}
