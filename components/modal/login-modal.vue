<template lang="pug">
  modal-backdrop(@click.native.self="goBack")
    modal-box
      header-box
        header-content
      modal-content
      modal-footer
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import ModalBackdrop from './__parts__/_backdrop.vue'
  import ModalBox from './__parts__/_modal-box.vue'
  import HeaderBox from './__parts__/_header-box.vue'
  import HeaderContent from './__parts__/_header-content.vue'
  import ModalContent from './__parts__/_modal-content.vue'
  import ModalFooter from './__parts__/_modal-footer.vue'

  export default {
    computed: {
      ...mapState({
        isVisible: state => state.modal.isShown
      }),

      ...mapGetters(['backPath'])
    },
    methods: {
      ...mapMutations({
        hideModal: 'modal/HIDE_MODAL',
        resetBackPath: 'RESET_BACK_PATH'
      }),
      goBack () {
        this.$router.go(-1)
      }
    },

    components: {
      ModalBackdrop,
      ModalBox,
      HeaderBox,
      HeaderContent,
      ModalContent,
      ModalFooter
    }
  }

</script>


<style lang="stylus">
  .modal_wrapper
    border-radius: 6px
    background-color: #ffffff
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
    border: solid 1px rgba(72, 84, 101, 0.2)
    max-width: 866px
    width: 100%
    margin: 0 auto 80px
    position: relative

  .close
    position: absolute
    right: 30px
    top: 25px
    background: url('~/assets/icon-close-black.svg') no-repeat center center
    width: 40px
    height: 40px;
    cursor: pointer
</style>
