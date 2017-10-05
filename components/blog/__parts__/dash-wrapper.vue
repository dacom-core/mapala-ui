<template lang="pug">
  div.switch_blog_buttons__Wrapper
    slot
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .switch_blog_buttons__Wrapper {
    position: fixed;
    z-index: 2;
    width: 492px;
    background-color: #fafafa;
    padding: 0 10px 10px;
    left: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.3);
  }
</style>
