<template lang="pug">
  modal-backdrop(@click.native.self="goBack")
    modal-box(max-width="658")
      modal-content
        div.profile
          div.head_img
            i.back(@click="goBack")

          div.user
            div.round_av(:class="{ edit_av : edit_av }")
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
                | {{ ' ' + blockchains.current.blockchain_username }}

            input(
              type="text",
              :placeholder="blockchains.current.name + ' private posting key'",
              @focus="showKey($event, blockchains.current)",
              @blur="hideKey($event, blockchains.current)"
              v-model="blockchains.current.wif",
              :class="blockchains.current.key_valid ? 'icon_good' : 'icon_edit'"
              )
            a.VuePassword__Toggle(role="button" @click="togglePassword")
              svg.VuePassword__Toggle__Icon(viewBox="0 0 32 32" v-if="isKeyHidden")
                path(d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z")
              
              svg.VuePassword__Toggle__Icon(viewBox="0 0 32 32" v-else)
                path(d="M29.561 0.439c-0.586-0.586-1.535-0.586-2.121 0l-6.318 6.318c-1.623-0.492-3.342-0.757-5.122-0.757-6.979 0-13.028 4.064-16 10 1.285 2.566 3.145 4.782 5.407 6.472l-4.968 4.968c-0.586 0.586-0.586 1.535 0 2.121 0.293 0.293 0.677 0.439 1.061 0.439s0.768-0.146 1.061-0.439l27-27c0.586-0.586 0.586-1.536 0-2.121zM13 10c1.32 0 2.44 0.853 2.841 2.037l-3.804 3.804c-1.184-0.401-2.037-1.521-2.037-2.841 0-1.657 1.343-3 3-3zM3.441 16c1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 1.715 0.54 3.304 1.459 4.607l-1.904 1.904c-1.639-1.151-3.038-2.621-4.114-4.323z")
                path(d="M24 13.813c0-0.849-0.133-1.667-0.378-2.434l-10.056 10.056c0.768 0.245 1.586 0.378 2.435 0.378 4.418 0 8-3.582 8-8z")
                path(d="M25.938 9.062l-2.168 2.168c0.040 0.025 0.079 0.049 0.118 0.074 1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303-1.208 0-2.403-0.149-3.561-0.439l-2.403 2.403c1.866 0.671 3.873 1.036 5.964 1.036 6.978 0 13.027-4.064 16-10-1.407-2.81-3.504-5.2-6.062-6.938z")
                
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
        edit_av: true,
        old_password: '',
        new_password: '',
        isKeyHidden: true
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
    async created () {
      this.showModal()
      const { data } = await Locomotive.get()
      this.locomotive = data
    },
    methods: {
      ...mapMutations({
        showModal: 'modal/SHOW_MODAL',
        hideModal: 'modal/HIDE_MODAL',
        setUserAvatar: 'user/personal/SET_USER_AVATAR'
      }),

      togglePassword () {
        this.isKeyHidden = !this.isKeyHidden
        // this.$refs.input.setAttribute('type', this.type)
        // this.$refs.input.focus()
      },


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

          const { data } = await User.setAvatar({ username: this.userName }, formData)
          this.setUserAvatar(data)
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
    background: url(../../assets/profile/icon-profile.svg) #fff no-repeat;
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
    background-image: url(../../assets/profile/icon-trash.svg);
    left: -80px;
  }

  .profile .ic.edit {
    background-image: url(../../assets/icon-edit.svg);
    right: -80px;
  }

  /* .profile .close_edit{
    width: 100%;
    height: 100%;
    display: none;
    background: url(../../assets/icon-close.svg) #485466 no-repeat center center;
    cursor: pointer;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    border-radius: 50%;
  } */

  /* .profile .edit_av .close_edit{
    display: block;
  } */

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
    background: url(../../assets/icon-blue-check.svg) no-repeat;
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
    background-image: url(../../assets/icon_edit.svg);
    background-position: 98% center;
  }

  .profile .icon_good{
    background-image: url(../../assets/icon_good.svg);
    background-position: 98% center;
  }

  .profile .back{
    width: 42px;
    height: 42px;
    display: block;
    position: absolute;
    z-index: 5;
    background: url(../../assets/icon-arrow-left.svg) no-repeat center center;
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
    background-image: url(../../assets/icon-close.svg) !important;
  }

  .profile .socials .soc_icon.fb{
    background-color: #3b5998;
    background-image: url(../../assets/icon-fb.svg);
  }

  .profile .socials .soc_icon.in{
    background-color: #55acee;
    background-image: url(../../assets/icon-tw.svg);

  }

  .profile .socials .soc_icon.tg{
    background-color: #62a5d7;
    background-image: url(../../assets/icon-tg.svg);
  }

  .profile .socials .soc_icon.gp{
    background-color: #dd4b39;
    background-image: url(../../assets/icon-gp.svg);
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
    background-image: url(../../assets/icon-plus.svg) !important;
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
    background-image: url(../../assets/icon-tw.svg);
    background-color: #64b2dd;
    background-size: 76%;
    border-top-left-radius: 2px;
  }

  .profile .soc_square .fb {
    background-image: url(../../assets/icon-fb.svg);
    background-color: #3b5998;
    background-size: 40%;
    border-top-right-radius: 2px;
  }

  .profile .soc_square .tg {
    background-image: url(../../assets/icon-tg.svg);
    background-color: #62a5d7;
    background-size: 78%;
    border-bottom-left-radius: 2px;
  }

  .profile .soc_square .gp {
    background-image: url(../../assets/icon-gp.svg);
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
  
  .VuePassword__Toggle {
    color: gray;
    display: inline-block;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .VuePassword__Toggle__Icon {
    cursor: pointer;
    fill: currentColor;
    height: 50%;
    width: 1.5em;
    margin-right: .5em;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    top: 50%;
    position: relative;
    margin-right: 45px;
  }
</style>
