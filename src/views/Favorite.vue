<template>
  <div>
    <p>ログイン状態: {{ authState }}</p>
    <p>メール認証: {{ emailVerified }}</p>
    <button @click="signOut">サインアウト</button>
  </div>
  <br />
  <h3>宿泊施設</h3>
  <div>
    <!-- {{ list.name }}
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
    /> -->
    <List />
  </div>
  <!-- <p>
    {{ lodges.lodge0
    }}<button @click="selected0">
      {{ select0.text }}
    </button>
  </p>
  <p>
    {{ lodges.lodge1
    }}<button @click="favLodge = !favLodge">
      {{ favLodge ? "お気に入り解除" : "お気に入り登録" }}
    </button>
  </p> -->
</template>

<script>
import List from "@/components/List.vue"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/firebase"
import { doc, setDoc, collection } from "firebase/firestore"

export default {
  data() {
    return {
      authState: "",
      emailVerified: "",
      uid: null,
      // isFavorited: true,
      // lists: [
      //   { id: "01", name: "星野リゾート", url: "https://hoshino" },
      //   { id: "02", name: "アパホテル", url: "https://apa" },
      // ],
    }
  },
  components: {
    List,
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
    // selected0() {
    //   console.log(this.select0.text)
    //   this.selected = !this.selected
    //   this.select0.text ? "選択" : "解除"
    // },
    saveFavorite() {
      onAuthStateChanged(auth, (user) => {
        //メール認証をしているかどうか
        if (user) {
          const uid = user.uid
          const ref = doc(collection(db, "users", uid, "favorite"))
          setDoc(ref, {
            name: this.lists.name,
          })
          console.log("お気に入りに追加しました。")
          this.isFavorited = false
        } else {
          console.log("お気に入りを追加出来ません。")
        }
      })
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
