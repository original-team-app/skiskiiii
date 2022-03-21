<template>
  <div>
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <!-- メールアドレス -->
      <div class="form-group">
        <input type="email" placeholder="メールアドレス" v-model="email" />
      </div>
      <!-- パスワード -->
      <div class="form-group">
        <input type="password" placeholder="パスワード" v-model="password" />
      </div>
      <!-- 登録ボタン -->
      <button type="submit">サインイン</button>
      <!-- エラーメッセージ -->
      <div class="text-danger">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
const auth = getAuth()
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    }
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        //ログイン成功した場合はFirebase画面へ
        .then(() => this.$router.push("/firebase"))
        //失敗した場合はエラーメッセージを画面に出力
        .catch((e) => (this.error = e.message))
    },
  },
}
</script>
