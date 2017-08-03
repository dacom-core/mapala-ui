<template>
  <div class="map">
     <gmap-map
      :options="mapOptions"
      :center="center"
      :zoom="4"
      @idle="fetchMarkers"
      ref="mmm"
      map-type-id="terrain"
      @dragend="checkBounds"
      >

      <gmap-marker
        v-for="marker in markers"
        :key="marker.permlink + marker.author"
        :position="{lat: Number(marker.position.latitude), lng: Number(marker.position.longitude)}"
        :clickable="true"
        :draggable="false"
        :icon="icon"
        @mouseover="openInfoWindow(marker)"
        @mouseout="infoWindow.opened = false"
        @click="$router.push({name: 'page', params: { author: marker.author, permlink: marker.permlink }})">
      </gmap-marker>

      <gmap-info-window
        :options="infoWindow.options"
        :opened="infoWindow.opened"
        :content="infoWindow.content"
        :position="infoWindow.position"
        @closeclick="infoWindow.opened=false">
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
import {googleMapStyles} from '../main'
import {Marker} from '../services'

export default {
  data() {
    return {
      // map: this.$refs.mmm.$mapObject,
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
        content: '',
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
        },
      },
      center: {lat:50.0542, lng:20.0051},
      icon: `http://${location.host}/static/icon-marker-3.png`,
    }
  },
  created() {

  },
  computed: {
    pages () {
      return this.$store.state.posts.data
    },
    loading () {
      return this.$store.state.posts.loading
    }
  },
  methods: {
    fetchMarkers() {
      var map = this.$refs.mmm.$mapObject
      let bounds = map.getBounds()
      this.mapOptions.zoomControlOptions.position = google.maps.ControlPosition.TOP_RIGHT
      this.mapOptions.streetViewControlOptions.position = google.maps.ControlPosition.TOP_CENTER

      let bbox = [
        bounds.b.b,
        bounds.f.b,
        bounds.b.f,
        bounds.f.f
      ].join()

			Marker.get({bbox: bbox}).then(res => {
        this.markers = res.body.results
			})
    },
    openInfoWindow(marker) {
      this.infoWindow.opened = true

      this.infoWindow.content = `<h3>${marker.title}</h3><p>${marker.body}</p>`

      this.infoWindow.options.maxWidth = 180

      this.infoWindow.position = {
        lat: Number(marker.position.latitude),
        lng: Number(marker.position.longitude)
      }
    },
    setNewCenter(){
      function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
      }

      let r_mark = getRandomInt(0, this.pages.length - 1)

      // this.center = {
      //   lat: Number(this.pages[r_mark].position.latitude),
      //   lng: Number(this.pages[r_mark].position.longitude)
      // }
    },
    /**
     * World map strict bounds
     */
    checkBounds(){
      var allowedBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-81.5),
          new google.maps.LatLng(81.5)
      );

      var map = this.$refs.mmm.$mapObject

      var maxY = allowedBounds.getNorthEast().lat();
      var minY = allowedBounds.getSouthWest().lat();
      var x = map.getCenter().lng();
      var y = map.getCenter().lat();
      if ((y < maxY && y > 0) || (y > minY && y < 0)) {
          return;
      }

      if (y < minY) y = minY;
      if (y > maxY) y = maxY;

      map.setCenter(new google.maps.LatLng(y, x));
    }
  },
  // watch: {
  //   'pages'() {
  //     if (this.pages.length) {
  //       this.setNewCenter()
  //     }
  //   }
  // },
}

</script>
<style>
  /*.gmnoprint .gm-bundled-control .gm-bundled-control-on-bottom {
    bottom: none!important;
  }*/
  .gm-style-iw + div {
    display: none;
  }
  .gm-style-iw {
    width: 250px !important;
    top: 0 !important;
    left: 30px !important;
    /*padding-right: 0 !important;*/
    /*text-align: center !important;*/
  }
  
</style>
