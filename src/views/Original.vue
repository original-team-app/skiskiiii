<template>
  <head>
    <title>ちかやど</title>
  </head>
  <body>
    <div class="body-wrapper">
      <header>
        <div class="header-container">
          <div class="header-left">
            <h1>ちかやど</h1>
          </div>
          <div class="header-right">
            <ul class="memu-lists">
              <li class="memu-list">
                <a href="#top-wrapper-container" class="hober">ホーム</a>
              </li>
              <li class="memu-list">
                <a href="/register" class="hober">新規登録</a>
              </li>
              <li class="memu-list">
                <a href="/googlemap" class="hober">宿の検索</a>
              </li>
              <li class="memu-list">
                <a href="/myfavorite-googlemap" class="hober">お気に入り</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main>
        <div class="main-wrapper">
          <div class="top-wrapper">
            <div class="top-wrapper-container" id="top-wrapper-container">
              <h2>”ちかやど”って？</h2>
              <p>
                ちかやどは、自分の行きたい場所の近くの宿を教えてくれます！<br />
                行きたい場所の近くにピンを指してみてください。いろんな宿が出てくるはず！
              </p>
              <p>
                自分がいって良かったと思う場所はお気に入り保存！<br />
                みんなのお気に入りの宿もcheckしてみるといいかも。
              </p>
              <p>紹介したい宿があれば、せひ共有していってください♪</p>
            </div>
            <div class="main-wrapper">
              <div class="main-container">
                <!-- ここに入れていく -->
                <!-- ログイン機能から引用 -->
                <div class="login">
                  <h2>ログイン</h2>
                  <form @submit.prevent="login">
                    <!-- メールアドレス -->
                    <div class="form-group">
                      <input
                        type="email"
                        placeholder="メールアドレス"
                        v-model="email"
                      />
                    </div>
                    <!-- パスワード -->
                    <div class="form-group">
                      <input
                        type="password"
                        placeholder="パスワード"
                        v-model="password"
                      />
                    </div>
                    <!-- 登録ボタン -->
                    <button type="submit">サインイン</button>
                    <!-- エラーメッセージ -->
                    <div class="text-danger">{{ error }}</div>
                    <!-- ここだけ追記 -->
                    <div class="Register">
                      <a href="/register">新規登録</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div class="footer-wrapper">
          <div class="footer-container">
            <div class="footer-left">
              <p>ちかやど</p>
            </div>
            <div class="footer-right">
              <ul class="memu-lists">
                <li class="footer-memu-list">
                  <a href="#top-wrapper-container" class="hober">ホーム</a>
                </li>
                <li class="footer-memu-list">
                  <a href="/register" class="hober">新規登録</a>
                </li>
                <li class="footer-memu-list">
                  <a href="/googlemap" class="hober">宿の検索</a>
                </li>
                <li class="footer-memu-list">
                  <a href="/myfavorite-googlemap" class="hober">お気に入り</a>
                </li>
              </ul>
            </div>
            <div class="footer-bottom">
              <p>©GeekSalon WebExpert13 Skiskiiii</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </body>
</template>

<script>
// ログイン機能から引用
import { signInWithEmailAndPassword } from "firebase/auth"
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
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        //ログイン成功した場合はFavorite画面へ
        .then(() => this.$router.push("/googlemap"))
        //失敗した場合はエラーメッセージを画面に出力
        .catch((e) => (this.error = e.message))
    },
  },
}
</script>

<style>
/* 全体 */
body {
  margin: 0;
  padding: 0;
}
/* ヘッダー */
header {
  height: 90.88px;
  width: 100%;
  background-color: rgb(226, 160, 38);
  position: fixed;
  top: 0;
  left: 0;
}
.header-left {
  float: left;
}
.header-right {
  float: right;
}
.memu-lists {
  display: flex;
}
.memu-list {
  list-style: none;
  border-left: 1px solid black;
  padding: 15px 10px;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: none;
  color: rgba(80, 78, 78, 0.945);
}

/* ボディ */
main {
  height: 500px;
  width: 100%;
  margin: 50px;

  /* top: 0;
  left: 0; */
}

.login {
  height: 200px;
  padding: 10px;
  margin: 10px 400px;
  background-color: rgba(211, 207, 207, 0.425);
  border-radius: 30px;
}

/* ここからフッター */

footer {
  height: 60px;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
}
.footer-wrapper {
  height: 66px;
  position: relative;
  background-color: rgb(226, 160, 38);
}
.footer-left {
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 20px;
}
.footer-right {
  float: right;
}
.footer-memu-list {
  list-style: none;
  border-left: 1px solid black;
  padding: 5px 10px;
}
/* .footer-bottom {
  position: relative;
} */
.footer-bottom p {
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 150px;

  /* margin: 5px; */
}
</style>
