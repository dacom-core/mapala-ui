<template lang="pug">
  div.group_avatar
    img(:src="groupAvatar")
    p
      | {{ groupTitle }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },

  computed: {
    ...mapState({
      groupAvatar: state => state.group.avatar,
      groupTitle: state => state.group.title
    }),

    avatar () {
      return this.groupAvatar || 'https://cdns.klimg.com/merdeka.com/i/w/news/2017/01/24/804491/670x335/polisi-usut-sebab-kematian-3-mahasiswa-uii-usai-ikut-diksar-mapala.jpg'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .group_avatar {
    display: flex;
    justify-content: center;
    position: relative;
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
    z-index: 1;
  }

  .group_avatar img {
    z-index: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 5px 5px 0 0;
    top: 0;
    left: 0;
  }
</style>
