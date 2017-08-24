<script>
export default {
  async fetch ({ store: { dispatch, commit } }) {
    const { data: { results } } = await dispatch('blog/posts/fetch_posts')
    commit('blog/posts/SET_POST_LIST', results)
  }
}
</script>
