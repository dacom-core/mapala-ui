<template lang="pug">
  modal-backdrop
    modal-box(max-width="658")
      modal-content
        div.profile
          div.head_img
            i.back(@click="goBack")

          div.user
            div.round_av(v-on:click="switch_edit_avatar()", :class="{ edit_av : edit_av }")
              i.ic.delete(@click="removeAvatar")
              i.ic.edit(@click="$refs.avatarInput.click()")
                input(ref="avatarInput", @change="setAvatar" hidden type="file")
              i.close_edit
              div.av_wrap
                img(:src="userAvatar")

            div.name.verified
              | @{{ userName }}

          div.inpt_w
            label
              | {{ blockchains.current.name }}
              span.blue(v-if="blockchains.current.activated")
                | {{ blockchains.current.blockchain_username }}

            input(
              type="text",
              :placeholder="blockchains.current.name + ' private posting key'",
              @focus="showKey($event, blockchains.current)",
              @blur="hideKey($event, blockchains.current)"
              v-model="blockchains.current.wif",
              :class="blockchains.current.key_valid ? 'icon_good' : 'icon_edit'"
              )

          div.inpt_w(v-if="blockchains.current.key_valid")
            el-checkbox(v-model="locomotive", @change="loco_update()")
              | {{ $t('join_trail') }}


    <!--button.submit(@click="update()")-->
              <!--| {{ $t('update') }}-->
</template>

<script>
  import blockchains from '@/api/blockchain'
  import { User, Locomotive } from '@/api/services'
  import ModalBackdrop from '@/components/modal/__parts__/_backdrop.vue'
  import ModalBox from '@/components/modal/__parts__/_modal-box.vue'
  import ModalContent from '@/components/modal/__parts__/_modal-content.vue'
  import { mapMutations, mapState } from 'vuex'

  export default {
    middleware: ['auth'],
    data () {
      return {
        blockchains: blockchains,
        locomotive: false,
        error: false,
        edit_av: false,
        old_password: '',
        new_password: ''
      }
    },
    computed: mapState({
      userName: state => state.user.personal.username,
      userAvatar: state => state.user.personal.avatar
    }),
    components: {
      ModalBackdrop,
      ModalBox,
      ModalContent
    },
    async mounted () {
      this.showModal()
//      const { data } = await Locomotive.get()
//      this.locomotive = data
    },
    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL',
        hideModal: 'modal/HIDE_MODAL',
        setUserAvatar: 'user/personal/SET_USER_AVATAR'
      }),

      loco_update () {
        if (this.locomotive) {
          Locomotive.save({ wif: blockchains.current.wif }).then(res => {
            console.log(res.data)
          })
        } else {
          Locomotive.delete().then(res => console.log(res.data))
        }
      },

      goBack () {
        this.$router.go(-1)
      },

      showKey (e, bc) {
        e.target.type = 'text'
      },
      async hideKey (e, bc) {
        if (bc.wif && !this.keyInValid) {
          try {
            let res = await this.blockchains.setPostingKey(this, bc, this.userName)
          } catch (err) {
            bc.wif = ''

            this.$notify({ title: 'Key error', message: err.message, type: 'warning' })
          }
        }
      },
      close () {
        this.$router.go(-1)
      },
      switch_edit_avatar () {
        this.edit_av = !this.edit_av
      },
//      async update () {
//        try {
//          const { data } = await User.update({ username: this.userName }, { username: this.userName })
//
//          this.auth.user = data
//          this.$notify({ title: 'Ок', message: this.$t('settings_update'), type: 'success' })
//        } catch (e) {
//          this.error = e
//          this.$notify({ title: 'Warning', message: this.error, type: 'warning' })
//        }
//      },
      async removeAvatar () {
        try {
          this.edit_av = false
          const { data } = await User.removeAvatar({ username: this.userName }, {})
          this.setUserAvatar(data)
        } catch (e) {
          this.$notify({ title: 'Update avatar error', message: e, type: 'warning' })
        }
      },
      async setAvatar (e) {
        try {
          e.preventDefault()
          const formData = new FormData()
          formData.append('file', this.$refs.avatarInput.files[0])

          const { data } = await User.setAvatar(this.userName, formData)
          this.setUserAvatar(data)
          this.switch_edit_avatar()
          this.$message({ type: 'info', message: 'Avatar has been updated' })
        } catch (e) {
          this.error = e
          this.$message({ type: 'error', message: 'Something was wrong..' })
        }
      },

      deleteAvatar (e) {
        e.preventDefault()
      }
    }
  }
</script>

<style>
  .keyError input {
    color: red!important;
    border: solid 1px red!important;
  }
  .keyError .el-form-item__error {
    margin-bottom: 20px;
  }
  /*.profile{*/
    /*margin: 0 auto 30px;*/
    /*max-width: 658px;*/
    /*width: 100%;*/
    /*border-radius: 6px;*/
    /*background-color: #ffffff;*/
    /*box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);*/
    /*border: solid 1px rgba(72, 84, 101, 0.2);*/
    /*box-sizing: border-box;*/
  /*}*/

  .profile .head_img{
    background-color: #6d9ee1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 160px;
    position: relative;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .profile .user {
    position: relative;
    z-index: 5;
    margin: -60px auto 55px auto;
    text-align: center;
  }

  .profile .round_av {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    display: block;
    position: relative;
    border-radius: 50%;
  }


  .profile .round_av.edit_av .ic{
    display: block;
  }

  .profile .av_wrap{
    border-radius: 50%;
    background: url(../assets/profile/icon-profile.svg) #fff no-repeat;
    background-size: cover;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }

  .profile .round_av img {
    width: 100%;
    cursor: pointer;
  }

  .profile img {
    display: block;
  }

  .profile .ic {
    width: 60px;
    height: 60px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    position: absolute;
    background: #ffffff no-repeat center center;
    top: 30px;
    border-radius: 50%;
    display: none;
    cursor: pointer;
  }

  .profile .ic.delete {
    background-image: url(../assets/profile/icon-trash.svg);
    left: -80px;
  }

  .profile .ic.edit {
    background-image: url(../assets/icon-edit.svg);
    right: -80px;
  }

  .profile .close_edit{
    width: 100%;
    height: 100%;
    display: none;
    background: url(../assets/icon-close.svg) #485466 no-repeat center center;
    cursor: pointer;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    border-radius: 50%;
  }

  .profile .edit_av .close_edit{
    display: block;
  }

  .profile .user .name {
    font: 700 26px 'PT Sans';
    color: #485465;
    text-align: center;
    position: relative;
    display: inline-block;
  }

  .profile .user .name.verified:before {
    position: absolute;
    content: '';
    width: 21px;
    height: 21px;
    background: url(../assets/icon-blue-check.svg) no-repeat;
    top: -9px;
    right: -24px;
  }

  .profile .submit {
    border-radius: 6px;
    background-color: #6d9ee1;
    border: 0;
    margin: 36px auto 40px;
    opacity: 0.87;
    font: 700 16px/37px 'PT Sans';
    color: #fff;
    width: 290px;
    display: block;
  }
  .profile [type="submit"]:hover{
    opacity: 1;
  }

  .profile label{
    font: 700 18px 'PT Sans';
    letter-spacing: -0.6px;
    color: #333;
    display: block;
    margin-bottom: 12px;
  }

  .profile .inpt_w{
    position: relative;
    margin: 0 30px 0 50px;
  }

  .profile input[type="text"],
  .profile input[type="email"],
  .profile input[type="password"]{
    height: 38px;
    border-radius: 4px;
    border: solid 1px #efefef;
    box-sizing: border-box;
    display: block;
    margin-bottom: 22px;
    padding: 0 18px;
    outline: 0;
    font: 16px 'PT Sans';
    opacity: 0.87;
    color: #000;
    width: 100%;
    background-repeat: no-repeat;
  }

  .profile input[type="text"]:focus,
  .profile input[type="email"]:focus,
  .profile input[type="password"]:focus{
    box-shadow: 0 0 2px 0 #6d9ee1;
    border: solid 1px rgba(0, 105, 255, 0.2);
    opacity: 1;
  }

  .profile input[disabled]{
    background-color: #f6f6f6;
    border: solid 1px #efefef;
  }

  .profile .icon_edit{
    background-image: url(../assets/icon_edit.svg);
    background-position: 98% center;
  }

  .profile .icon_good{
    background-image: url(../assets/icon_good.svg);
    background-position: 98% center;
  }

  .profile .back{
    width: 42px;
    height: 42px;
    display: block;
    position: absolute;
    z-index: 5;
    background: url(../assets/icon-arrow-left.svg) no-repeat center center;
    top: 12px;
    left: 12px;
    cursor: pointer;
  }

  .profile .p_h{
    font: 700 18px 'PT Sans';
    letter-spacing: -0.6px;
    color: #000;
    margin: 0 0 30px 50px;
  }

  .profile .socials{
    width: 100%;
    height: 50px;
    margin-bottom: 60px;
    padding-left: 50px;
    display: flex;
  }

  .profile .socials .soc_icon{
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    background-position: center;
    background-repeat: no-repeat;
  }

  .profile .socials .soc_icon:hover{
    background-color: #E04F5F !important;
    background-image: url(../assets/icon-close.svg) !important;
  }

  .profile .socials .soc_icon.fb{
    background-color: #3b5998;
    background-image: url(../assets/icon-fb.svg);
  }

  .profile .socials .soc_icon.in{
    background-color: #55acee;
    background-image: url(../assets/icon-tw.svg);

  }

  .profile .socials .soc_icon.tg{
    background-color: #62a5d7;
    background-image: url(../assets/icon-tg.svg);
  }

  .profile .socials .soc_icon.gp{
    background-color: #dd4b39;
    background-image: url(../assets/icon-gp.svg);
  }

  .profile .socials .more{
    border-radius: 3px;
    border: solid 1px #ced7df;
    height: 50px;
    box-sizing: border-box;
    padding: 6px 16px 6px 6px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .profile .socials .more .soc_icon{
    width: 36px;
    height: 36px;
    margin-right: 12px;
    background-size: 24px;
  }

  .profile .socials .more .soc_icon:hover{
    background-image: url(../assets/icon-plus.svg) !important;
    background-color: #4fe0a7 !important;
  }

  .profile .socials .connect_m{
    font-size: 11px 'PT Sans';
    color: #59626a;
  }

  .profile .more .add{
    display: none;
  }

  .profile .more.active{
    padding-right: 4px;
  }

  .profile .more.active .add{
    display: flex;
  }

  .profile .more.active .connect_m{
    padding-right: 25px;
    margin-right: 17px;
    border-right: solid 1px #ced7df;
  }

  .profile .soc_square{
    display: flex;
    flex-wrap: wrap;
    width: 36px;
    height: 36px;
    margin-right: 5px;
  }

  .profile .soc_square .sq_soc{
    background-repeat: no-repeat;
    background-position: center;
    width: 18px;
    height: 18px;
    opacity: .8;
  }

  .profile .soc_square .tw {
    background-image: url(../assets/icon-tw.svg);
    background-color: #64b2dd;
    background-size: 76%;
    border-top-left-radius: 2px;
  }

  .profile .soc_square .fb {
    background-image: url(../assets/icon-fb.svg);
    background-color: #3b5998;
    background-size: 40%;
    border-top-right-radius: 2px;
  }

  .profile .soc_square .tg {
    background-image: url(../assets/icon-tg.svg);
    background-color: #62a5d7;
    background-size: 78%;
    border-bottom-left-radius: 2px;
  }

  .profile .soc_square .gp {
    background-image: url(../assets/icon-gp.svg);
    background-color: #dd4b39;
    background-size: 81%;
    border-bottom-right-radius: 2px;
  }

  .ivite {
    letter-spacing: -0.7px;
    font: 700 20px/60px 'PT Sans';
    padding: 0 41px;
    background-color: #fbfbfb;
    display: inline-block;
    margin: 0 0 86px 50px;
  }

</style>
