import { Post } from '@/api/posts'
// import { Comment } from '@/api/posts'

export const state = () => ({
  posts: {
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
  SET_POSTS (state, payload) {
    state.posts.data = payload
  }
}

