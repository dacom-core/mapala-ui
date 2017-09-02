<template lang="pug">
  post-form(:isEditForm="false", @createPost="createPost")
</template>

<script>
import PostForm from '@/components/blog/__parts__/form'
import bc from '@/api/blockchain'
import { mapMutations, mapState } from 'vuex'

export default {
  computed: mapState(['blog/posts/form/postForm']),

  methods: {
    ...mapMutations(['resetPostForm', 'setPostSavingStateTo', 'addPost']),

    async createPost () {
      try {
        this.setPostSavingStateTo(true)
        const { body } = await bc.createPost(this, this.postForm)

        this.setPostSavingStateTo(false)
        this.addPost(body)

        this.$parent.closeModal()
        this.resetPostForm()

        this.$notify({ message: this.$t('published'), type: 'success' })
      } catch (error) {
        this.setPostSavingStateTo(false)
        this.$notify({ message: error, type: 'warning' })
      }
    }
  },
  components: {
    PostForm
  }
}
</script>
