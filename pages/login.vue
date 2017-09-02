<template lang="pug">
  auth
</template>

<script>
  import { mapMutations } from 'vuex'
  import Auth from '@/components/auth/Auth'
  export default {
    head: {
      bodyAttrs: {
        class: 'overflowHidden'
      }
    },
    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL'
      })
    },
    mounted () {
      this.showModal()
    },
    components: {
      Auth
    }
  }
</script>
