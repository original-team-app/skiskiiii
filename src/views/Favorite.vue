<template>
  <div>
    <p>ログイン状態: {{ authState }}</p>
    <p>メール認証: {{ emailVerified }}</p>
    <button @click="signOut">サインアウト</button>
  </div>
  <br />
  <button @click="pochi(index)">ポチ</button>
  <h3>宿泊施設</h3>
  <div>
    <div
      class="lodge_list"
      v-for="(list, index) in hotelList"
      v-bind:key="index"
    >
      <img class="lodge_photo" :src="list.photo" />
      <div>
        <div class="lodge_name">{{ list.name }}</div>
        <div class="lodge_kana">{{ list.kana }}</div>
        <div class="lodge_address">{{ list.address }}</div>
        <div class="lodge_phone">TEL : {{ list.phone }}</div>
        <div class="lodge_url">詳細 : {{ list.url }}</div>
      </div>
      <button class="favorite-icon" @click="saveFavorite(index)">
        {{ list.buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
// import List from "@/components/List.vue"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/firebase"
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore"

export default {
  data() {
    return {
      authState: "",
      emailVerified: "",
      uid: null,
      hotelList: [],
    }
  },
  components: {
    // List,
  },
  props: {
    image: String,
  },
  methods: {
    signOut() {
      signOut(auth)
        //ログアウト成功した場合はログイン画面へ
        .then(() => {
          this.$router.push("/login")
        })
        //失敗した場合はエラーメッセージを画面に出力
        .catch((e) => (this.error = e.message))
    },
    isFavorite(index) {
      // ブックマークリスト内にbook idがあればtrue それ以外はfalse
      return this.hotelList[index]
    },
    saveFavorite: async function (index) {
      if (this.hotelList[index].buttonText === "追加") {
        const res = await fetch(
          "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&datumType=1&latitude=35.6065914&longitude=139.7513225&applicationId=1064072543465509183"
        )
        const value = await res.json()
        const hotelName = value.hotels[index].hotel[0].hotelBasicInfo.hotelName
        const hotelKana =
          value.hotels[index].hotel[0].hotelBasicInfo.hotelKanaName
        const hotelUrl =
          value.hotels[index].hotel[0].hotelBasicInfo.hotelInformationUrl
        const hotelAddres1 =
          value.hotels[index].hotel[0].hotelBasicInfo.address1
        const hotelAddres2 =
          value.hotels[index].hotel[0].hotelBasicInfo.address2
        const hotelPhone =
          value.hotels[index].hotel[0].hotelBasicInfo.telephoneNo
        const hotelPhoto =
          value.hotels[index].hotel[0].hotelBasicInfo.hotelImageUrl
        onAuthStateChanged(auth, (user) => {
          //メール認証をしているかどうか
          if (user) {
            const uid = user.uid
            const ref = doc(
              collection(db, "users", uid, "favorite"),
              hotelPhone
            )
            setDoc(ref, {
              name: hotelName,
              kana: hotelKana,
              url: hotelUrl,
              address: hotelAddres1 + hotelAddres2,
              phone: hotelPhone,
              photo: hotelPhoto,
              id: ref.id,
            })
            console.log("お気に入りに追加しました。")
            this.hotelList[index].buttonText = "済み"
          } else {
            console.log("お気に入りを追加出来ません。")
          }
        })
      } else {
        const res = await fetch(
          "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&datumType=1&latitude=35.6065914&longitude=139.7513225&applicationId=1064072543465509183"
        )
        const value = await res.json()
        onAuthStateChanged(auth, (user) => {
          //メール認証をしているかどうか
          if (user) {
            const uid = user.uid
            const favid =
              value.hotels[index].hotel[0].hotelBasicInfo.telephoneNo
            const ref = doc(collection(db, "users", uid, "favorite"), favid)
            deleteDoc(ref)
            console.log("お気に入りを取り消しました。")
            this.hotelList[index].buttonText = "追加"
          } else {
            console.log("お気に入りを取り消し出来ません。")
          }
        })
      }
    },
    pochi: async function () {
      const res = await fetch(
        "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&datumType=1&latitude=35.6065914&longitude=139.7513225&applicationId=1064072543465509183"
      )
      const value = await res.json()
      for (let i = 0; i < value.hotels.length; i++) {
        const hotelName = value.hotels[i].hotel[0].hotelBasicInfo.hotelName
        const hotelKana = value.hotels[i].hotel[0].hotelBasicInfo.hotelKanaName
        const hotelUrl =
          value.hotels[i].hotel[0].hotelBasicInfo.hotelInformationUrl
        const hotelAddres1 = value.hotels[i].hotel[0].hotelBasicInfo.address1
        const hotelAddres2 = value.hotels[i].hotel[0].hotelBasicInfo.address2
        const hotelPhone = value.hotels[i].hotel[0].hotelBasicInfo.telephoneNo
        const hotelPhoto = value.hotels[i].hotel[0].hotelBasicInfo.hotelImageUrl
        const buttonText = "追加"
        if (
          !(hotelName, hotelUrl, hotelAddres1, hotelAddres2, hotelPhone).length
        ) {
          return
        } else {
          this.hotelList.push({
            name: hotelName,
            kana: hotelKana,
            url: hotelUrl,
            address: hotelAddres1 + hotelAddres2,
            phone: hotelPhone,
            photo: hotelPhoto,
            buttonText: buttonText,
          })
        }
      }
      // return this.favList.some((value) => value.id === this.favList.phone)
      // onAuthStateChanged(auth, (user) => {
      //   //メール認証をしているかどうか
      //   if (user) {
      //     // const favid = value.hotels[index].hotel[0].hotelBasicInfo.telephoneNo

      //     const uid = user.uid
      //     const ref = collection(db, "users", uid, "favorite")
      //     getDocs(ref).then((snapshot) => {
      //       snapshot.forEach((doc) => {
      //         console.log(doc.id)
      //         // if (favid.some(doc.id)) {
      //         //   this.hotelList[index].buttonText = "済み"
      //         // }
      //         if (this.hotelList[index].buttonText === "追加") {
      //         }
      //       })
      //     })
      //   } else {
      //     return
      //   }
      // })
    },
  },
  mounted() {
    //現在ログインしているユーザの情報を取得
    onAuthStateChanged(auth, (user) => {
      //メール認証をしているかどうか
      if (user) {
        this.authState = "ログイン"
        this.emailVerified = user.emailVerified ? "済" : "未"
      } else {
        this.authState = "ログアウト"
        this.emailVerified = "-"
      }
    })
  },
}
</script>

<style>
.lodge_list {
  display: flex;
  margin: 5px 50px;
  border-width: 1px;
  border-color: rgb(150, 150, 150);
  border-style: solid;
  position: relative;
}
.lodge_contents {
  display: flex;
}
.lodge_photo {
  width: 160px;
  height: 120px;
  margin: 10px 10px 10px 10px;
}
.lodge_name {
  text-align: left;
  font-size: 17px;
  font-weight: bolder;
  margin-top: 10px;
  margin-left: 10px;
}
.lodge_kana {
  text-align: left;
  font-size: 10px;
  margin-left: 10px;
}
.lodge_address {
  text-align: left;
  font-size: 15px;
  margin-left: 10px;
}
.lodge_phone {
  text-align: left;
  font-size: 15px;
  margin-left: 10px;
}
.lodge_url {
  text-align: left;
  font-size: 15px;
  margin-left: 10px;
  margin-bottom: 10px;
}
.favorite-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
