<template>
<div class="map">
	<gmap-map
		:options="mapOptions"
		:center="{lat:10, lng:10}"
		:zoom="7"
		@idle="test"
    ref="mmm"
		map-type-id="terrain"
		style="width: 100%; height: 640px">

    <gmap-marker
      v-for="marker in markers"
      :key="marker.permlink"
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
        minZoom: 2,
        mapTypeControl: true
      },
      center: {lat:10, lng:10},
      icon: `http://${location.host}/static/icon-marker-3.png`,
		}
	},
	methods: {
    test() {
      var map = this.$refs.mmm.$mapObject
      let bounds = map.getBounds()

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

      this.center = {
        lat: Number(this.pages[r_mark].position.latitude),
        lng: Number(this.pages[r_mark].position.longitude)
      }
    },
    /**
     * World map strict bounds
     */
    checkBounds(){
      var allowedBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-63.5),
          new google.maps.LatLng(63.5)
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
	created() {
    console.log(123)
		//http.get('/configs/)
	}
}

</script>

<style>
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
</style>
