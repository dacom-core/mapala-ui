<template lang="pug">
  div.group_avatar
    p
      | Имя группы
</template>

<script>
export default {
  mounted () {

  },

  data () {
    return {}
  },

  methods: {}
}
</script>

<style lang="stylus" scoped>
  .group_avatar {
    display: flex;
    justify-content: center;
    background-image: url(http://rostov-na-donu.igid.ru/img/upload/photos/www.ultrastar.ru.jpg);
    width: 100%;
    height: 150px;
    background-size: cover;
    background-position-y: -30px;
    border-radius: 10px 10px 0 0;
    margin: 0 auto;
    align-items: center;
  }

  .group_avatar p {
    font-size: 29px;
    font-weight: 600;
    color: white;
    text-shadow: 3px 2px 0 rgb(0, 0, 0);
  }
</style>
