<template>
  <section class="l-main_container">
    <div class="c-main">
      <div class="c-textbox">
        <h1 class="c-title">ログイン</h1>
        <p class="c-desc">ログイン情報を入力してください</p>
      </div>
      <div class="c-input">
        <form action="">
          <dl class="c-input_item">
            <dt class="c-input_item-title">メールアドレス</dt>
            <dd class="c-input_item-form">
              <input type="text" v-model="email" />
            </dd>
          </dl>
          <dl class="c-input_item">
            <dt class="c-input_item-title">パスワード</dt>
            <dd class="c-input_item-form">
              <input type="password" name="" id="" v-model="password" />
            </dd>
          </dl>
          <input
            type="button"
            @click="onClickSubmit"
            value="ログイン"
            name=""
            id=""
            class="c-input-submit"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "InspirePage",
  layout: "login_default",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    onClickSubmit() {
      // alert("押されたよ")
      this.$fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          alert("成功");
          // console.log(userCredential);
          await this.$store.dispatch("initializeUser", userCredential.uid);
          this.$router.push("/");
        })
        .catch((err) => {
          alert("失敗");
          console.error(err.message);
        });
    },
  },
};
</script>
