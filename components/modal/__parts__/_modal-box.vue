<template lang="pug">
  div.modal_wrapper(:style="{ 'max-width': maxWidth + 'px' }")
    slot
</template>

<script>
export default {
  props: {
    maxWidth: {
      default: '866'
    }
  },

  data () {
    return {}
  }
}

</script>


<style lang="stylus">
  .modal_wrapper
    border-radius: 6px
    background-color: #ffffff
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
    border: solid 1px rgba(72, 84, 101, 0.2)
    width: 100%
    margin: 0 auto 80px
    position: relative
</style>
