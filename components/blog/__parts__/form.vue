<template lang="pug">
  div.gw(v-loading.fullscreen.lock="image_loading", @close="close")
    div.new_post.pop_back
      div.write
        div.close(@click="close")
        div.top_block
          div.img_wrap
            img.user_av(:src="auth.user.avatar")

          div.name_block
            div.name
              | @{{ auth.user.username }}

        span.form-group__message(v-if="!$v.postForm.title.required && $v.postForm.title.$dirty")
          | {{ $t('field_is_required') }}

        span.form-group__message(v-if="!$v.postForm.title.minLength")
          | {{ $t('title_must_have_at_least') }} 2 {{ $t('letters') }}.

        div.title_heading__Wrapper
          input.write_header.blank(
          :placeholder="$t('titile_placeholder')"
          v-model="postForm.title",
          @input="$v.postForm.title.$touch()",
          :disabled="isEditForm"
          )

        div.search_location
          gmap-autocomplete(
          class="search_field",
          :value="postForm.position_text",
          @place_changed="setPlace"
          )

          <!-- Image loader -->
          input(ref="inputImage", @change="uploadImage", hidden, type="file")


        span.form-group__message(v-if="!$v.postForm.body.required && $v.postForm.body.$dirty")
          | {{ $t('field_is_required') }}

        quill-editor.write_text(
        id="write_text",
        v-model="postForm.body",
        ref="myQuillEditor",
        :options="editorOption",
        @paste="onPaste($event, current, 0)",
        @input="$v.postForm.body.$touch()"
        )

        div.bottom_block
          div.icons
            i.icon.location
            i.icon.image(@click="imageUploadHandler")


          el-button.public_btn(type="primary", :loading="isFormSaving", @click="submit")
            | {{ $t('publish') }}

</template>

<script>
  import { Post, Image } from '@/api/services'
  import { quillEditor } from 'vue-quill-editor'
  import { mapState, mapMutations } from 'vuex'
  import { required, minLength } from 'vuelidate/lib/validators'

  export default {
    props: ['isEditForm'],
    data () {
      return {
        editorOption: {
          theme: 'snow',
          placeholder: this.$t('article_title'),
          bounds: '#write_text',
          modules: {
            toolbar: {
              container: [['bold', 'italic'], [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], [{ 'align': [] }],
                [{ 'script': 'sub' }, { 'script': 'super' }], ['link'], ['video'],
                ['image'], ['blockquote'], ['clean']],
              handlers: {
                image: this.imageHandler
              }
            },
            clipboard: {
              matchVisual: false
            }
          }
        },
        image_loading: false,

        dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
        inputVisible: false,
        newTagInputValue: ''
      }
    },
    computed: {
      ...mapState({
        isFormSaving: state => state.blog.posts.postForm.isFormSaving,
        postForm: state => state.blog.posts.postForm.form,
        modal: state => state.modal
      }),

      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    validations: {
      postForm: {
        title: {
          required,
          minLength: minLength(2)
        },
        body: {
          required
        }
      }
    },
    methods: {
      ...mapMutations([
        'setPostSavingStateTo',
        'hideModal',
        'redirectBackPath',
        'SET_LOCATION_NAME',
        'SET_LOCATION_LNG',
        'SET_LOCATION_LAT'
      ]),

      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleAddingNewTag () {
        const newTagInputValue = this.newTagInputValue
        if (newTagInputValue) {
          this.postForm.meta.tags.push(newTagInputValue)
        }
        this.inputVisible = false
        this.newTagInputValue = ''
      },

      onPaste (e) {
        if (e.defaultPrevented || !this.quill.isEnabled()) {
          return
        }
        const range = this.quill.getSelection()
        let delta = new Delta().retain(range.index)
        this.container.focus()
        setTimeout(() => {
          this.quill.selection.update(Quill.sources.SILENT)
          delta = delta.concat(this.convert()).delete(range.length)
          this.quill.updateContents(delta, Quill.sources.USER)
          this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)
          this.quill.selection.scrollIntoView()
        }, 1)
      },
      imageHandler () {
        const range = this.editor.getSelection()
        const value = prompt('What is the image URL')
        this.editor.insertEmbed(range.index, 'image', value, Quill.sources.USER)
      },
      close () {
        this.hideModal()
        this.$router.push(this.modal.redirectBackPath)
      },
      imageUploadHandler () {
        this.$refs.inputImage.click()
      },
      uploadImage (e) {
        this.image_loading = true
        e.preventDefault()

        const formData = new FormData()
        formData.append('file', this.$refs.inputImage.files[0])

        Image.upload(formData).then(res => {
          const imgUrl = res.body

          const range = this.editor.getSelection(true)
          this.editor.insertEmbed(range.index + 1, 'image', imgUrl, 'user')
          this.editor.insertEmbed(range.index + 2, 'block', 'asdf', 'user')
          this.editor.setSelection(range.index + 3, 'silent')

          this.postForm.meta.image.push(imgUrl)
          this.image_loading = false
        }, err => {
          this.$notify({ message: err.body, type: 'warning' })
          this.image_loading = false
        })
      },
      submit () {
        if (this.isFormValid()) {
          if (this.isEditForm) {
            this.$emit('updatePost')
          } else {
            this.$emit('createPost')
          }
        } else {
          this.showErrors()
        }
      },
      showErrors () {
        this.$v.postForm.$touch()
      },
      isFormValid () {
        if (!this.postForm.meta.location.name) {
          this.$notify({ message: 'Location field is required', type: 'warning' })
          return false
        }

        return !this.$v.postForm.$invalid
      },
      setPlace (place) {
        this.SET_LOCATION_NAME(place.formatted_address)
        this.SET_LOCATION_LAT(place.geometry.location.lat())
        this.SET_LOCATION_LNG(place.geometry.location.lng())
      }
    },
    created () {
      if (this.isEditForm) {
        Post.query({ permlink: this.$route.params.author + '*@*' + this.$route.params.permlink }).then(res => {
          this.postForm.title = res.body.title
          this.postForm.body = res.body.body
          this.postForm.position_text = res.body.position_text
          this.postForm.meta.location.name = res.body.position_text
          this.postForm.meta.location.lat = res.body.position.latitude
          this.postForm.meta.location.lng = res.body.position.longitude
        })
      }
    },
    components: {
      quillEditor
    }
  }

</script>

<style>
  .gw{
    margin-top: 84px;
  }

  .write .close {
    position: absolute;
    background: url(../../../assets/icon-close-black.svg) no-repeat center center;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .write{
    margin: 0 auto 20px;
    max-width: 866px;
    width: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px rgba(72, 84, 101, 0.2);
    padding: 20px 18px 18px;
    box-sizing: border-box;
    position: relative;
  }

  .write .top_block{
    display: flex;
    margin-bottom: 10px;
  }

  .write .img_wrap{
    border-radius: 50%;
    margin-right: 8px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: #ddd;
  }

  .write .img_wrap img{
    display: block;
  }

  .write .name_block{
    margin-right: 8px;
    margin-top: 4px;
  }

  .write .name{
    font: 700 16px/20px 'PT Sans';
    letter-spacing: -0.5px;
    color: #6d9ee1;
  }

  .write .date{
    font-size: 12px;
    letter-spacing: -0.5px;
    color: rgba(72, 84, 101, 0.7);
    line-height: 16px;
  }

  .write .top_block .location{
    margin-top: 4px;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.5px;
    color: #7e8793;
    padding-left: 12px;
    position: relative;
    background: url(../../../assets/icon-location-small.svg) no-repeat left 3px;
  }

  .write .write_header{
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #20262d;
    outline: 0;
    border: 0;
    width: 95%;
    margin: 5px 5px 5px 15px;
  }

  .write .write_header.blank::before {
    color: rgba(72, 84, 101, 0.4);
    content: attr(data-placeholder);
    pointer-events: none;
    position: absolute;
  }

  .write .write_text{
    margin: 0 0 32px;
    font-size: 18px;
    letter-spacing: -0.3px;
    color: #20262d;
    outline: 0;
  }

  .write .write_text .ql-container{
    font: 18px 'PT Sans';
  }

  .write .write_text .ql-editor{
    padding: 0;
  }

  .write .write_text .ql-blank:before{
    font-style: normal;
    color: rgba(72, 84, 101, 0.4);
  }

  .write .bottom_block{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .write .icons{
    display: flex;
    align-items: center;
  }

  .write .icon{
    display: block;
    cursor: pointer;
  }

  .write .icon.location{
    background: url(../../../assets/icon-location.svg) no-repeat;
    width: 15px;
    height: 22px;
    margin-right: 50px;
  }

  .write .icon.image{
    background: url(../../../assets/icon-image.svg) no-repeat;
    width: 22px;
    height: 18px;
  }

  .write .public_btn{
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 38px;
    padding: 0 12px;
    color: #ffffff;
    border: 0;
    border-radius: 8px;
    background-color: #6d9ee1;
    cursor: pointer;
  }

  .write .wimg{
    width: 100px;
    height: 100px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 15px;
  }

  .write .wimg img{
    display: block;
  }

  .write .added_img{
    display: flex;
    margin-bottom: 20px;
  }

  .write .added_img .img_list{
    display: flex;
  }

  .write .added_img .add{
    width: 100px;
    height: 100px;
    background: url(../../../assets/icon-plus-gray.svg) no-repeat center center;
    box-sizing: border-box;
    border: 1px dashed #7e8793;
    border-radius: 4px;
    cursor: pointer;
  }

  .search_location{
    margin: 0 auto 20px;
    max-width: 866px;
    width: 100%;
    background: #fff;
    border-radius: 6px;
    /*box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);*/
    border: solid 1px rgba(72, 84, 101, 0.2);
    /*box-sizing: border-box;*/
    /*padding-bottom: 8px;*/
    /*position: relative;*/
  }

  .search_location [type="text"]{
    background:  url(../../../assets/icon-search.svg) no-repeat 17px 12px;
    border: 0;
    outline: 0;
    line-height: 41px;
    padding-left: 44px;
    font-size: 14px;
    letter-spacing: -0.4px;
    color: #000;
    width: 100%;
    box-sizing: border-box;
    /*margin-bottom: 8px;*/
  }

  .search_location .item{
    cursor: pointer;
    padding: 3px 0 0  44px;
    height: 40px;
  }

  .search_location .item:hover{
    background-color: rgba(72, 84, 101, 0.1);
  }

  .search_location .name{
    font-size: 14px;
    letter-spacing: -0.4px;
    color: #000;
    line-height: 17px;
    margin-bottom: 3px;
  }

  .search_location .location{
    font-size: 12px;
    color: rgba(72, 84, 101, 0.4);
  }
  .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border: none!important;
  }
  .ql-container.ql-snow{
    min-height: 20vh;
    max-height: 60vh;
    overflow-y: scroll;
  }
  .ql-clipboard {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  span.form-group__message {
    font-size: .75rem;
    line-height: 1;
    margin-top: -1.6875rem;
    margin-bottom: .9375rem;
    color: #F57F8B;
    text-align: right;
  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 24px;
    line-height: 22px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .title_heading__Wrapper {
    margin: 0 0 13px;
    max-width: 866px;
    border: solid 1px rgba(72, 84, 101, 0.2);
    border-radius: 6px;
  }

  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    margin: 15px;
  }

  .ql-toolbar.ql-snow {
    border-bottom: solid 1px rgba(72, 84, 101, 0.2) !important;
  }

  div#write_text {
    border-radius: 6px;
    border: solid 1px rgba(72, 84, 101, 0.2);
  }
</style>
