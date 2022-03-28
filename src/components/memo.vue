<template>
  <div id="content">
    <div class="add-memo-field">
      <input
        class="add-memo-field__input"
        type="text"
        v-model="inputText"
        v-on:keydown.enter="onKeyDown"
      />
      <button class="add-memo-field__button" v-on:click="addMemo">追加</button>
      <div class="memo-container">
        <div class="memo" v-for="item in items" v-bind:key="item">
          <div class="memo-field">{{ item }}</div>
          <button class="memo__delete" v-on:click="deleteMemo">削除</button>
          <p>楽天トラベルURLlast visited:2022/2/2</p>
          <a
            href="https://travel.rakuten.co.jp/?s_kwcid=paidsearch&gclid=CjwKCAjwrfCRBhAXEiwAnkmKmf-bOBlbyC5N_FuW07gZvGoiT2nJJ241bMgJR3n4zGEC_zdtPswhcRoCo0kQAvD_BwE&gclsrc=aw.ds"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      items: [],
      inputText: "",
    }
  },
  methods: {
    //メモアプリから引用
    addMemo: function () {
      //refで名前を付けた要素を参照
      var comment = this.inputText
      //コメントの中身が何もないときは何もしないでreturn
      if (!comment.length) {
        return
      }
      //itemsにpush(コメント表示はv-forにお任せ)
      else {
        this.items.push(comment)
        //コメントの中身を空に(****できてない)
        this.inputText = ""
      }
    },
    onKeyDown: function () {
      this.addMemo()
    },

    deleteMemo: function () {
      this.items.pop()
    },
  },
}
</script>
