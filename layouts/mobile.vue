<template>
  <no-ssr>
    <div class="dark">
      <div class="mobile-banner">Mobile website</div>

      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">Title</div>
        </v-ons-toolbar>

        <p style="text-align: center">
          <v-ons-button @click="$ons.notification.alert('Hello World!')">
            Mapala native mobile interface!
          </v-ons-button>
        </p>
      </v-ons-page>

      <nuxt/>
    </div>
  </no-ssr>
</template>

<script>
  import NoSSR from 'vue-no-ssr'

  export default {
    data () {
      return {}
    },
    components: {
      'no-ssr': NoSSR
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  .dark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background: black;
    color: white;
    padding: 10px;
    padding-top: 40px;
  }
  .dark a {
    color: white;
  }
  .mobile-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 10px;
    background: #333;
    font-family: sans-serif;
    font-size: 13px;
  }
</style>
