<template>
    <ol class="howTo-list">
      <slot
      name="item"
      v-for="item in items"
      :text="item">
  </slot>
</ol>
</template>

<script>
    export default {
        name: 'howTo',
        props: ['items'],
        data () {
            return {
            }
        }
    }
</script>

<style>
    .howTo-list li {
        margin-bottom: 20px;
    }
</style>
