<template>
  <div>
    <h2>アカウントの作成</h2>
    <form @submit.prevent="registerUser">
      <!-- アカウント名
      <div class="form-group">
        <input
          type="displayName"
          placeholder="アカウント名"
          v-model="displayName"
        />
      </div> -->
      <!-- メールアドレス -->
      <div class="form-group">
        <input type="email" placeholder="メールアドレス" v-model="email" />
      </div>
      <!-- パスワード -->
      <div class="form-group">
        <input type="password" placeholder="パスワード" v-model="password" />
      </div>
      <!-- 登録ボタン -->
      <button type="submit">登録</button>
      <!-- エラーメッセージ -->
      <div class="text-danger">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { auth } from "@/firebase"
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    }
  },
  methods: {
    //emailとpasswordを引数にFirebaseのAuthenticationにユーザを登録
    registerUser() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        //成功した場合はsendEmail()が呼び出される
        .then(() => {
          this.sendEmail(this.email)
        })
        //失敗した場合はエラーメッセージを画面に出力
        .catch((e) => (this.error = e.message))
    },
    //認証リンクメールを送信する
    sendEmail() {
      const actionCodeSettings = {
        url: "http://" + location.host + "/Original",
      }
      auth.languageCode = "ja"
      sendEmailVerification(auth.currentUser, actionCodeSettings)
        .then(() => alert("認証メールを送りました!"))
        .catch((e) => console.log(e))
    },
  },
}
</script>
