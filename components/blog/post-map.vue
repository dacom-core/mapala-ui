<template lang="pug">
  div.map
    gmap-map(
      :options="mapOptions",
      :center="center",
      :zoom="4",
      @idle="fetchMarkers",
      ref="mmm",
      map-type-id="terrain",
      @dragend="checkBounds"
      )

      gmap-marker(
        v-for="marker in markers",
        :key="marker.permlink + marker.author",
        :position="{ lat: Number(marker.position.latitude), lng: Number(marker.position.longitude) }",
        :clickable="true",
        :draggable="false",
        :icon="icon",
        @mouseover="openInfoWindow(marker)",
        @mouseout="infoWindow.opened = false",
        @click="$router.push({ name: 'page', params: { author: marker.author, permlink: marker.permlink } })"
        )

      gmap-info-window(
        :options="infoWindow.options",
        :opened="infoWindow.opened",
        :content="infoWindow.content",
        :position="infoWindow.position",
        @closeclick="infoWindow.opened=false"
        )
</template>

<script>
  import { googleMapStyles } from '~/plugins/vue-google-maps'
  import { Marker } from '@/api/services'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        markers: [],
        infoWindow: {
          options: {
            maxWidth: 250,
            pixelOffset: {
              width: 0,
              height: -35
            }
          },
          position: {
            lat: 0.0,
            lng: 0.0
          },
          opened: false,
          content: ''
        },
        mapOptions: {
          styles: googleMapStyles,
          minZoom: 4,
          mapTypeControl: true,
          zoomControlOptions: {
            position: null
          },
          streetViewControlOptions: {
            position: null
          }
        },
        center: { lat: 50.0542, lng: 20.0051 },
        icon: '/icon-marker-3.png'
      }
    },
    computed: {
      ...mapState({ mapFilters: 'map/filters' }),

      pages () {
        return this.$store.state.posts.data
      },
      loading () {
        return this.$store.state.posts.loading
      }
    },
    methods: {
      async fetchMarkers () {
        const map = this.$refs.mmm.$mapObject
        const bounds = map.getBounds()
        this.mapOptions.zoomControlOptions.position = google.maps.ControlPosition.TOP_RIGHT
        this.mapOptions.streetViewControlOptions.position = google.maps.ControlPosition.TOP_CENTER

        const boundingBox = [
          bounds.b.b,
          bounds.f.b,
          bounds.b.f,
          bounds.f.f
        ].join()

        const mapFilters = this.mapFilters

        const { data: { results } } = await Marker.query({ bbox: boundingBox, ...mapFilters })
        this.markers = results
      },
      openInfoWindow (marker) {
        this.infoWindow.opened = true

        this.infoWindow.content = `<h3>${marker.title}</h3><p>${marker.body}</p>`

        this.infoWindow.options.maxWidth = 180

        this.infoWindow.position = {
          lat: Number(marker.position.latitude),
          lng: Number(marker.position.longitude)
        }
      },
      setNewCenter () {
        function getRandomInt(min, max) {
          min = Math.ceil(min)
          max = Math.floor(max)
          return Math.floor(Math.random() * (max - min)) + min
        }

        let r_mark = getRandomInt(0, this.pages.length - 1)
      },
      /**
       * World map strict bounds
       */
      checkBounds () {
        var allowedBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-81.5),
          new google.maps.LatLng(81.5)
        )

        var map = this.$refs.mmm.$mapObject

        var maxY = allowedBounds.getNorthEast().lat()
        var minY = allowedBounds.getSouthWest().lat()
        var x = map.getCenter().lng()
        var y = map.getCenter().lat()
        if ((y < maxY && y > 0) || (y > minY && y < 0)) {
          return
        }

        if (y < minY) y = minY;
        if (y > maxY) y = maxY;

        map.setCenter(new google.maps.LatLng(y, x))
      }
    }
  }

</script>
<style>
  .gm-style-iw + div {
    display: none;
  }
  .gm-style-iw {
    width: 250px !important;
    top: 0 !important;
    left: 30px !important;
  }
</style>
