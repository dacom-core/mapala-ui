<template lang="pug">
  div
    post-item(v-for="post in posts.data", :post="post", :key="post.id")
    div(v-loading.body="isLoading")
</template>


<script>
import PostItem from './post-list-item'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },

  computed: mapState('blog/posts/post_list', {
    posts: state => state.postList,
    isLoading: state => state.isLoading
  }),

  components: {
    PostItem
  }
}
</script>
<style>
  .wrapper{
    display: flex;
    width: 100%;
    position: relative;
    background-image: url('~assets/icon-marker-3.png');
    background: none;
  }

  .tape{
    max-width: 494px;
    width: 100%;
    margin-left: 30px;
  }

  .tape .post{
    width: 100%;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px rgba(72, 84, 101, 0.2);
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  .tape .add_post{
    width: 100%;
    height: 60px;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px rgba(72, 84, 101, 0.2);
    padding: 0 16px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 20px;
    cursor: pointer;
    text-decoration: none;
  }

  .tape .add_post .av_wrap{
    margin-right: 8px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }

  .tape .write_post{
    font: 16px 'PT Sans';
    letter-spacing: -0.5px;
    color: rgba(72, 84, 101, 0.7);
  }

  .tape .post .top_block{
    display: flex;
    padding: 12px 12px 10px;
  }

  .tape .post .img_wrap{
    border-radius: 50%;
    margin-right: 8px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: #ddd;
    flex-shrink: 0;
  }

  .tape .post .name_block{
    margin-right: 8px;
  }

  .tape .post .name{
    font: 700 16px/20px 'PT Sans';
    letter-spacing: -0.5px;
    color: #6d9ee1;
  }

  .tape .post .date{
    font-size: 12px;
    letter-spacing: -0.5px;
    color: rgba(72, 84, 101, 0.7);
    line-height: 16px;
  }


  .tape .post .top_block .location{
    margin-top: 4px;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.5px;
    color: #7e8793;
    padding-left: 12px;
    position: relative;
    background: url('~assets/icon-location-small.svg') no-repeat left 3px
  }

  .tape .post .write_header{
    margin: 0 12px 13px;
    font: 700 26px 'PT Sans';
    letter-spacing: -0.5px;
    color: #20262d;
  }

  .tape .post .write_text{
    margin: 0 12px 20px;
    font-size: 18px;
    letter-spacing: -0.3px;
    color: #20262d;
  }

  .tape .post .bottom_block{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 17px;
    margin-bottom: 10px;
  }

  .tape .post .icons{
    display: flex;
    align-items: center;
  }

  .tape .post .icon{
    display: block;
    cursor: pointer;
    font: 14px/34px 'PT Sans';
    letter-spacing: -0.5px;
    color: rgba(72, 84, 101, 0.7);
    padding-left: 23px;
    text-decoration: none;
  }

  .tape .post .icon.comment{
    background: url('~assets/icon-comment.svg') no-repeat left center;
    margin-right: 18px;
  }

  .tape .post .icon.repost{
    background: url('~assets/icon-repost.svg') no-repeat left center;
  }

  .tape .post .support{
    font: 14px/34px 'PT Sans';
    letter-spacing: -0.5px;
    color: rgba(255, 255, 255, 0.7);
    padding: 0 12px 0 12px;
    border-radius: 3px;
    text-decoration: none;
    /*background: url(../assets/icon-support.svg) #6d9ee1 no-repeat 12px center;*/
    background: #6d9ee1;
    cursor: pointer;
  }

  .isDisabled button,
  .isDisabled button:hover{
    color: #b3ebf8!important;
    cursor: not-allowed!important;
    background-image: none!important;
    background-color: #fff!important;
    border-color: #d1dbe5!important;
  }

  .tape .post .support span{
    color: #ffffff;
    /*padding-left: 10px;*/
    /*border-left: 1px solid #fff;*/
    /*margin-left: 14px;*/
  }

  .isDisabled span{
    color: #b3ebf8!important;
  }
  .tape .post.w_i .post_image{
    overflow: hidden;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .tape .post.w_i .post_image img{
    display: block;
    width: 100%;
  }

  .tape .short{
    word-wrap: break-word;
  }
  .tape .short a{
    text-decoration: none;
  }

  .tape .post.w_i .short{
    margin: -80px 12px 25px;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.33);
    position: relative;
    z-index: 1;
    padding-bottom: 10px;
  }

  .map{
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
  }
  .vue-map-container{
    width: 100%;
    height: 100%;
  }
</style>
