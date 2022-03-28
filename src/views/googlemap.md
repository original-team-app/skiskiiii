<template>
  <head>
    <title>Add Map</title>
  </head>
  <body>
    <h3>My Google Maps Demo</h3>
    <!--マップを表示するところ-->
    <div id="map" ref="map" v-on:click="pinSet" />
    <div>
      <button v-on:click="pinSet">未 ピンを立てる</button>
      <button v-on:click="pinSave">未 ピンの保存</button>
      <button v-on:click="memoField">未 吹き出しの表示</button>
    </div>
  </body>
</template>

<script>
export default {
  data: function () {
    return {
      latLngs: [{ lat: 35.6621, lng: 139.70378, clips: "", name: "" }],
    }
  },
  methods: {
    pinSets: function (event) {
      //これでマップ内をクリックした際にmethodsのpinSetsを発生させたい
      window.google.map.addListener(this.$refs.map, "click", this.pinSet)

      //緯度と経度の取得
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      //配列を増やす
      this.latLngs.push({ lat: lat, lng: lng })
      //新しくマーカーを書き直す
      for (let i = 0; i < this.latLngs.length; i++)
        new window.google.maps.Marker({
          position: this.latLngs[i],
          map: this.$refs.map,
        })
    },
    //  comment:function(){
    //    const content = new window.google.maps.InfoWindow({
    //
    //    })

    //messegeを書いて追加する
    //    const message = document.createElement("input");
    //  this.clips.push(message)
    // }
  },
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
        //for文で繰り返し、if文でlatLngsがない時は表示しないのがお気に入りで使えそう
        new window.google.maps.Marker({
          position: this.latLngs[0],
          map: map,
        })
      }
    }, 500)
  },
}
</script>

<style>
#map {
  /* 高さ400px、幅max */
  height: 400px;
  width: 100%;
}
</style>

    //情報を表示する部分
    info: function (latLng, marker, map) {
      const contents = document.getElementById("content")

      const infomation = new window.google.maps.InfoWindow({
        content: contents,
      })

      if (infomation.open) {
        return
      } else {
        infomation.open({
          anchor: marker,
          map: map,
          shouldFocus: false,
        })
      }
    },

//contents 用

'<div id="content">' +
'<div class="add-memo-field">' +
'<input class="add-memo-field__input" type="text" v-model="inputText" v-on:keydown.enter="onKeyDown"/>' +
'<button class="add-memo-field__button" v-on:click="addMemo">追加' +
'</button>' +
'<div class="memo-container">' +
'<div class="memo" v-for="item in items" v-bind:key="item">' +
'<div class="memo-field">{{ item }}</div>' +
'<button class="memo__delete" v-on:click="deleteMemo">削除' +
'</button>' +
'<p>楽天トラベル URLlast visited:2022/2/2</p>' +
'<a'href="https://travel.rakuten.co.jp/?s_kwcid=paidsearch&'gclid=CjwKCAjwrfCRBhAXEiwAnkmKmf-bOBlbyC5N_FuW07gZvGoiT2nJJ241bMgJR3n4zGEC_zdtPswhcRoCo0kQAvD_BwE&gclsrc=aw.ds" />' +
'</div>' +
'</div>' +
'</div>' +
'</div>'

//通常 ver
<div class="memo">
<div id="content">
<div class="add-memo-field">
<input
            class="add-memo-field__input"
            type="text"
            v-model="inputText"
            v-on:keydown.enter="onKeyDown"
          />
<button class="add-memo-field__button" v-on:click="addMemo">
追加
</button>
<div class="memo-container">
<div class="memo" v-for="item in items" v-bind:key="item">
<div class="memo-field">{{ item }}</div>
<button class="memo__delete" v-on:click="deleteMemo">削除</button>
<p>楽天トラベル URLlast visited:2022/2/2</p>
<a
                href="https://travel.rakuten.co.jp/?s_kwcid=paidsearch&gclid=CjwKCAjwrfCRBhAXEiwAnkmKmf-bOBlbyC5N_FuW07gZvGoiT2nJJ241bMgJR3n4zGEC_zdtPswhcRoCo0kQAvD_BwE&gclsrc=aw.ds"
              />
</div>
</div>
</div>
</div>
</div>
