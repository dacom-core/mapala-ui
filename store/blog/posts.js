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
