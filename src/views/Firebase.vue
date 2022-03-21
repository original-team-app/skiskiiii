<template>
  <div>
    <h2>HOME</h2>
    <p>ログイン状態: {{ authState }}</p>
    <p>メール認証: {{ emailVerified }}</p>
    <button @click="signOut">サインアウト</button>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
const auth = getAuth()

export default {
  name: "Home",
  data() {
    return {
      authState: "",
      emailVerified: "",
    }
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
