<template>
  <head>
    <title>Add Map</title>
  </head>
  <body>
    <h3>My Google Maps Demo</h3>
    <!--マップを表示するところ-->
    <div id="map" ref="map" />
  </body>
</template>

<script>
/*最初はすべてのピンを表示。タッチした際に一つになるように調整*/
//import memo from "./components/memo.vue"
export default {
  //components: { memo },
  data: function () {
    return {
      latLngs: [
        { lat: 35.6621, lng: 139.70378, name: "渋谷" },
        { lat: 35.66, lng: 139.708, name: "" },
      ],
      //memoWindow: false,
    }
  },
  methods: {
    //pinをつける部分
    pinSet: function (latLng) {
      let Lat = latLng.lat()
      let Lng = latLng.lng()
      this.latLngs.splice(0, 1, { lat: Lat, lng: Lng, name: "" })

      let newMap = new window.google.maps.Map(this.$refs.map, {
        center: this.latLngs[0],
        zoom: 12,
        mapType: "default",
      })
      /*const newMarker = */ new window.google.maps.Marker({
        position: this.latLngs[0],
        map: newMap,
      })

      //二回目以降が付かなかったので、こちらで
      newMap.addListener("click", (e) => {
        this.pinSet(e.latLng)
      })

      /* //情報用クリック
      newMarker.addListener("click", (p) => {
        this.info(p.latLng, newMarker, newMap)
      })*/
    },

    /*//情報を表示する部分
    info: function (latLng, marker, map) {
      //htmlの中情報を打ち込む方法がわからない。propsならいけなくもない…？
      const contents =
        '<div id="content">' +
        '<div class="add-memo-field">' +
        '<input class="add-memo-field__input" type="text" v-model="inputText" v-on:keydown.enter="onKeyDown"/>' +
        '<button class="add-memo-field__button" v-on:click="addMemo">追加' +
        "</button>" +
        '<div class="memo-container">' +
        '<div class="memo" v-for="item in items" v-bind:key="item">' +
        '<div class="memo-field">{{ item }}</div>' +
        '<button class="memo__delete" v-on:click="deleteMemo">削除' +
        "</button>" +
        "<p>楽天トラベル URLlast visited:2022/2/2</p>" +
        '<a href="https://travel.rakuten.co.jp/?s_kwcid=paidsearch&gclid=CjwKCAjwrfCRBhAXEiwAnkmKmf-bOBlbyC5N_FuW07gZvGoiT2nJJ241bMgJR3n4zGEC_zdtPswhcRoCo0kQAvD_BwE&gclsrc=aw.ds" />' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"

      const infomation = new window.google.maps.InfoWindow({
        content: contents,
      })
      if (this.memoWindow === true) {
        infomation.close()
      } else {
        this.memoWindow = true
        //const contents = document.getElementById("content")

        infomation.open({
          anchor: marker,
          map: map,
          shouldFocus: false,
        })
        console.log(infomation)
      }
    },*/
  },

  /*メモ
        const clips = document.createElement("textarea")
        new window.google.Infowindow({
          content: `<div class="custom-info">
            <div class="custom-info-item name">
            店名表示
            </div>
            <div class="custom-info-item address">
            住所表示
            </div>
            <div>${clips}</div>`,
          position: this.latLngs[0],
          map: map,
        })*/
  mounted: function () {
    if (!window.mapCompleted) {
      window.mapCompleted = true
      const script = document.createElement("script")
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBveIZLjpsuQKkrPXnEmipIxZ8iZJpUiVo&callback=initMap&v=weekly"
      script.async = true
      document.head.appendChild(script)
    }

    window.initMap = () => {
      window.mapCompleted = true
    }
    //初期のマップ配置
    let timeCount = setInterval(() => {
      if (window.mapCompleted === true) {
        clearInterval(timeCount)
        const map = new window.google.maps.Map(this.$refs.map, {
          center: this.latLngs[0],
          zoom: 8,
          mapType: "default",
        })
        //最初の配列をすべて表示するためのfor文
        //firebaseとの連結に
        for (let i = 0; i < this.latLngs.length; i++) {
          /*const marker = */ new window.google.maps.Marker({
            position: this.latLngs[i],
            map: map,
            /*title: this.latLng[i][2],*/
          })

          /*marker.addListener("click", (p) => {
            this.info(p.latLng, marker, map)
          })*/
        }
        //マップクリック時にpinSet,info内の処理を行う
        map.addListener("click", (e) => {
          this.pinSet(e.latLng)
        })
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
