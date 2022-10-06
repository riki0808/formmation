<template>
  <section class="l-main_container">
    <div class="c-main">
      <div class="c-textbox">
        <h1 class="c-title">新規メンバー追加</h1>
        <p class="c-desc">追加したいメンバーの情報を入力してください</p>
      </div>
      <div class="c-input">
        <form action="">
          <dl class="c-input_item">
            <dt class="c-input_item-title">メールアドレス</dt>
            <dd class="c-input_item-form">
              <input v-model="email" type="text" />
            </dd>
          </dl>

          <div class="d-flex justify-space-between">
            <dl class="c-input_item c-input_item-w">
              <dt class="c-input_item-title">お名前（姓）</dt>
              <dd class="c-input_item-form">
                <input type="text" name="" v-model="sei" id="" />
              </dd>
            </dl>

            <dl class="c-input_item c-input_item-w">
              <dt class="c-input_item-title">お名前（名）</dt>
              <dd class="c-input_item-form">
                <input type="text" v-model="mei" name="" id="" />
              </dd>
            </dl>
          </div>

          <input
            type="button"
            value="招待する"
            @click="submit"
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
  layout: "simple_default",
  data: () => ({
    email: "",
    sei: "",
    mei: "",
  }),
  methods: {
    async submit() {
      const res = await this.$functions.httpsCallable("addUser2Team")({
        teamId: this.$store.state.user.teamId,
        email: this.email,
        sei: this.sei,
        mei: this.mei,
        password: "qweqweqwe",
      });

      if (res.data.status == 200) {
        alert("成功");
        this.$router.push("/users");
      } else {
        alert("失敗");
      }
    },
  },
};
</script>
