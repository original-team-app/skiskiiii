<template>
  <div>
    <p v-for="lodgeList in lodgeLists" :key="lodgeList.id">
      {{ lodgeList.name }}
    </p>
    <img
      src="../assets/icons8-スター.png"
      alt="お気に入り"
      class="favorite-icon"
      @click="saveFavorite"
      v-if="isFavorited"
    />
    <img
      src="../assets/icons8-スター塗りつぶし.png"
      alt="お気に入り"
      class="favorite-icon"
      @click="deleteFavorite"
      v-else
    />
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/firebase"
import { doc, setDoc, collection } from "firebase/firestore"
export default {
  data() {
    return {
      isFavorited: true,
      lodgeLists: [
        { id: "01", name: "星野リゾート", url: "https://hoshino" },
        // { id: "02", name: "アパホテル", url: "https://apa" },
      ],
    }
  },
  props: {
    list: {
      type: Object,
    },
  },
  methods: {
    saveFavorite() {
      onAuthStateChanged(auth, (user) => {
        //メール認証をしているかどうか
        if (user) {
          const uid = user.uid
          const ref = doc(collection(db, "users", uid, "favorite"))
          setDoc(ref, {
            id: ref.id,
            ...this.lodgeLists,
          })
          console.log("お気に入りに追加しました。")
          this.isFavorited = false
        } else {
          console.log("お気に入りを追加出来ません。")
        }
      })
    },
    // deleteFavorite() {
    //   onAuthStateChanged(auth, (user) => {
    //     //メール認証をしているかどうか
    //     if (user) {
    //       const uid = user.uid
    //       const favid = doc(db, "users", uid, "favorite")
    //       //   where("lodgeId", "==", this.doc().id)
    //       deleteDoc(favid)
    //       console.log("お気に入りを取り消しました。")
    //       this.isFavorited = true
    //     } else {
    //       console.log("お気に入りを取り消し出来ません。")
    //     }
    //   })
    // },
  },
}
</script>
