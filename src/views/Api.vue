<template>
  <div class="api">
    <h1>This is an API page</h1>
    <div id="dog-image"></div>
  </div>

  <!-- じゃらんのサンプルコードを使用 -->
  <!-- <form name="frmSearch">
    <table>
      <tr class="inputRow">
        <th>緯度：</th>
        <td>
          <input
            type="text"
            name="y_rad"
            class="num"
            size="5"
            maxlength="2"
            value="35"
          />度
          <input
            type="text"
            name="y_min"
            class="num"
            size="5"
            maxlength="2"
            value="40"
          />分
          <input
            type="text"
            name="y_sec"
            class="num"
            size="10"
            maxlength="6"
            value="52.9"
          />秒
        </td>
      </tr>
      <tr class="inputRow">
        <th>経度：</th>
        <td>
          <input
            type="text"
            name="x_rad"
            class="num"
            size="5"
            maxlength="3"
            value="139"
          />度
          <input
            type="text"
            name="x_min"
            class="num"
            size="5"
            maxlength="2"
            value="45"
          />分
          <input
            type="text"
            name="x_sec"
            class="num"
            size="10"
            maxlength="6"
            value="58.0"
          />秒
        </td>
      </tr>
      <tr class="inputRow">
        <th>範囲：</th>
        <td>
          <input
            type="text"
            name="range"
            class="num"
            size="8"
            maxlength="4"
            value="1.0"
          />km
        </td>
      </tr>
      <tr class="buttonRow">
        <td colspan="2">
          <input type="button" value="検索" onclick="search" />
          1ー－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－onclick時の処理を作る
          <input
            type="button"
            value="Google Mapで位置を確認"
            onclick="javascript: linkMap();"
          />
        </td>
      </tr>
    </table>
  </form> -->
  <!-- 2ー－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－検索ボタンクリック後の結果表示 -->
  <!-- 緯度と経度
    <div>緯度：{{ latitude }}</div>
    <div>経度：{{ longitude }}</div>
    -->
  <!-- 検索するポイントを確認するため、入力した情報をGoogleMapsで確認するボタンの
  処理を作成します。【GoogleMaps送信フォーム サンプルコード】 -->
  <!-- <form
    name="frmLinkMap"
    action="http://maps.google.co.jp/maps"
    method="GET"
    target="_blank"
  >
    <input type="hidden" name="z" value="17" />
    <input type="hidden" name="q" value="" />
  </form> -->
</template>

<script>
// fetch(
//   "https://booking-com.p.rapidapi.com/v1/hotels/nearby-cities?latitude=65.9667&longitude=-18.5333&locale=en-gb",
//   {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "5c5ec09babmsh049dd1cd74a0327p19d6d5jsn723f4dc89fa1",
//       "x-rapidapi-host": "booking-com.p.rapidapi.com",
//     },
//   }
// ).then((response) => {
//   console.log(response)
// })

//Search hotels by coordinates
//Get available hotels by coordinates latitude and longitude
// fetch(
//   "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?checkin_date=2022-08-05&order_by=popularity&units=metric&longitude=-18.5333&adults_number=2&latitude=65.9667&room_number=1&locale=en-gb&filter_by_currency=AED&checkout_date=2022-08-06&children_number=2&children_ages=5%2C0&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true",
//   {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "5c5ec09babmsh049dd1cd74a0327p19d6d5jsn723f4dc89fa1",
//       "x-rapidapi-host": "booking-com.p.rapidapi.com",
//     },
//   }
// )
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

// fetch(
//   "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&datumType=1&latitude=35.6065914&longitude=139.7513225&applicationId=1064072543465509183"
// ) //１ー－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－latitude,longitudeのデータを更新するには（変数に変換）
//   .then((response) => {
//     console.log(response)
//     return response.json()
//   })
//   .then((data) => {
//     console.log(data) //データの表示
//   })
//   .catch((err) => {
//     console.error(err)
//   })

fetch(
  "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?checkin_date=2022-08-05&order_by=popularity&units=metric&longitude=135&adults_number=2&latitude=35&room_number=1&locale=en-gb&filter_by_currency=AED&checkout_date=2022-08-06&children_number=2&children_ages=5%2C0&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true",
  {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5c5ec09babmsh049dd1cd74a0327p19d6d5jsn723f4dc89fa1",
      "x-rapidapi-host": "booking-com.p.rapidapi.com",
    },
  }
)
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.error(err)
  })

// .catch((err) => {
//   // console.error(err)
// })
//検索ボタンクリック後の処理
// export default {
//   methods{
//     this.search: function() {
//       this.count += 1
//     }
// }

// const imageElement = document.getElementById("dog-image")

// じゃらんAPIの取得
// fetch("http://jws.jalan.net/APIAdvance/HotelSearch/V1/")
//   .then((res) => {
//     return res.json()
//   })
//   .then((json) => {
//     imageElement.src = json.message
//     console.log(json)
//   })

// export default {}
// // GoogleMaps実行 サンプルコード
// function linkMap() {
//   var y_rad = parseFloat(document.frmSearch.y_rad.value)
//   var y_min = parseFloat(document.frmSearch.y_min.value)
//   var y_sec = parseFloat(document.frmSearch.y_sec.value)
//   var y = y_rad + y_min / 60 + y_sec / 3600
//   var x_rad = parseFloat(document.frmSearch.x_rad.value)
//   var x_min = parseFloat(document.frmSearch.x_min.value)
//   var x_sec = parseFloat(document.frmSearch.x_sec.value)
//   var x = x_rad + x_min / 60 + x_sec / 3600

//   document.frmLinkMap.q.value = "" + y + "," + x
//   document.frmLinkMap.submit()
// }
// //日本測地系→世界測地系に変換
// // 座標オブジェクト
// function Point(_x, _y) {
//   Point.prototype.x = _x
//   Point.prototype.y = _y
// }

// // 日本測地系（度）から世界測地系（度）に変換
// // ＜参考資料＞
// // http://groups.google.com/group/Google-Maps-API-Japan/browse_thread/thread/d0ce529ce20edc4d/285aac6e0d3497a1
// function ChangeLocationJapanToGlobal(jx, jy) {
//   var wy = jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017
//   var wx = jx - jy * 0.000046038 - jx * 0.000083043 + 0.01004

//   return new Point(wx, wy)
// }

// // 世界測地系（度）から日本測地系（度）に変換
// function ChangeLocationGlobalToJapan(wx, wy) {
//   var jy = wy * 1.000106961 - wx * 0.000017467 - 0.004602017
//   var jx = wx * 1.000083049 + wy * 0.000046047 - 0.010041046

//   return new Point(jx, jy)
// }

// // 値を取得
// var y_rad = parseFloat(document.frmSearch.y_rad.value)
// var y_min = parseFloat(document.frmSearch.y_min.value)
// var y_sec = parseFloat(document.frmSearch.y_sec.value)
// var y = y_rad + y_min / 60 + y_sec / 3600
// var x_rad = parseFloat(document.frmSearch.x_rad.value)
// var x_min = parseFloat(document.frmSearch.x_min.value)
// var x_sec = parseFloat(document.frmSearch.x_sec.value)
// var x = x_rad + x_min / 60 + x_sec / 3600
// var range = parseFloat(document.frmSearch.range.value)

// // 日本測地系に変換する
// var jPoint = ChangeLocationGlobalToJapan(x, y)
// var jx_ms = parseInt(jPoint.x * 3600 * 1000)
// var jy_ms = parseInt(jPoint.y * 3600 * 1000)
//
</script>
