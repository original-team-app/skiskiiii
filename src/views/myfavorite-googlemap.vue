<template>
  <head>
    <title>Add Map</title>
  </head>
  <body>
    <h3>My Google Maps Demo</h3>
    <h3>
      APIのアプリケーション制限がまだのため、Web上に挙げるときはつけること！！！
    </h3>
    <!--マップを表示するところ-->
    <div id="map" ref="map" />
  </body>
</template>

<script>
export default {
  data: function () {
    return {
      latLngs: [{ lat: 35.6621, lng: 139.70378 }],
    }
  },
  methods: {
    makeArray: function (latLng, map) {
      const newMarker = new window.google.maps.Marker({
        position: latLng,
        map: map,
      })

      let Lat = latLng.lat()
      let Lng = latLng.lng()
      let newLatlng = { lat: Lat, lng: Lng }
      this.latLngs.push(newLatlng)

      newMarker.setMap(map)
      newMarker.addListener("click", () => {
        //this.deleteButton(p.latLng, marker)
        newMarker.setMap(null)
        if (this.latLngs.includes(newLatlng)) {
          this.latLngs.splice(newLatlng, 1)
        }
      })
    },

    //情報を表示する部分
    /*info: function (latLng, marker, map) {
      const contents =
        "<div id = content>" +
        '<div class = "memo-container">' +
        '<div class = "memo-field">{{memo}}</div>' +
        '<p>楽天トラベルURL<a href = "https://travel.rakuten.co.jp/?s_kwcid=paidsearch&gclid=CjwKCAjwrfCRBhAXEiwAnkmKmf-bOBlbyC5N_FuW07gZvGoiT2nJJ241bMgJR3n4zGEC_zdtPswhcRoCo0kQAvD_BwE&gclsrc=aw.ds"</a>' +
        "last visited:2022/2/2</p>" +
        "</div>" +
        "</div>"

      const infomation = new window.google.maps.InfoWindow({
        content: contents,
      })

      infomation.open({
        anchor: marker,
        map: map,
        shouldFocus: false,
      })
    },*/
    //},

    //deleteButton: function (latLng, marker) {
    // marker.setMap(null)
    /*const map = new window.google.maps.Map(this.$refs.map, {
      center: this.latLngs[0],
      zoom: 11,
      mapType: "default",
    })
    if (this.latLngs.length < 1) {
      return
    } else {
      this.latLngs.pop()
      for (let i = 0; i < this.latLngs.length; i++) {
        new window.google.maps.Marker({
          position: this.latLngs[i],
          map: map,
        })
      }
    }*/
  },
  mounted: function () {
    if (!window.mapCompleted) {
      window.mapCompleted = true
      const script = document.createElement("script")
      script.src = script.async = true
      document.head.appendChild(script)
    }

    window.initMap = () => {
      window.mapCompleted = true
    }
    /*mountedの中一部抜粋*/
    //初期のマップ配置
    let timeCount = setInterval(() => {
      if (window.mapCompleted === true) {
        clearInterval(timeCount)
        const map = new window.google.maps.Map(this.$refs.map, {
          center: this.latLngs[0],
          zoom: 12,
          mapType: "default",
        })
        map.addListener("click", (e) => {
          this.makeArray(e.latLng, map)
        })
        //最初の配列をすべて表示するためのfor文
        //firebaseとの連結に
        for (let i = 0; i < this.latLngs.length; i++) {
          const marker = new window.google.maps.Marker({
            position: this.latLngs[i],
            map: map,
          })
          marker.setMap(map)
          marker.addListener("click", () => {
            //this.deleteButton(p.latLng, marker)
            marker.setMap(null)
            const firstlatLng = this.latLngs[i]
            if (this.latLngs.includes(firstlatLng)) {
              this.latLngs.splice(firstlatLng, 1)
            }
          })
        }
      }
    }, 500)
  },
}
</script>

<style>
#map {
  /* 高さ600px、幅max */
  height: 600px;
  width: 100%;
}
</style>
