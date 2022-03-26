<template>
  <h3>お気に入り</h3>
  <p v-for="favoriteList in favoriteLists" :key="favoriteList.id">
    {{ favoriteList.id }}
  </p>
  <div v-if="isLogin"></div>
  <div v-else>
    ログインまたはアカウントの作成をするとお気に入り登録ができます。
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"
export default {
  data() {
    return {
      favoriteLists: [],
      uid: null,
      isLogin: false,
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLogin = true
        const uid = user.uid
        getDocs(collection(db, "users", uid, "favorite")).then((snapshot) => {
          snapshot.forEach((doc) => {
            this.favoriteLists.push({
              ...doc.data(),
            })
          })
        })
      } else {
        this.isLogin = false
      }
    })
  },
}
</script>
