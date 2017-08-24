<template lang="pug">
  mapala-modal
</template>

<script>
import { Post } from '@/api/posts'

export default {
  async asyncData ({ store, params }) {
    const { data } = await Post.get(params.username + '*@*' + params.slug)
    return { post: data }
  }
}
</script>
