<template>
  <div class="blog-wrapper">
    <div class="cal-layout">
      <calendar></calendar>
      <tags-cloud></tags-cloud>
    </div>
  </div>
</template>

<script>
  import Calendar from '@/components/blog/__parts__/calendar.vue'
  import TagsCloud from '@/components/blog/__parts__/tags-cloud.vue'

  export default {
    data () {
      return {

      }
    },
    components: {
      Calendar,
      TagsCloud
    }
  }
</script>
<style scoped>
  .blog-wrapper {
    max-width: calc(100% - 574px);
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    height: calc(100vh - 72px - 20px);
    position: fixed;
    top: 72px;
    right: 30px;
    z-index: 10;
    overflow: hidden;
    background: url('~/assets/blog/map.jpg') no-repeat;
    background-size: 100%;
  }
  .cal-layout {
    margin: auto;
    text-align: center;
  }
</style>
