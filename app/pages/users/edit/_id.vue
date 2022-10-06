<template>
  <section class="l-main_container">
    <div class="c-main">
      <div class="c-textbox">
        <h1 class="c-title">アカウント編集</h1>
        <!-- <p class="c-desc">追加したいメンバーの情報を入力してください</p> -->
      </div>
      <div class="c-input">
        <form action="">
          <dl class="c-input_item">
            <dt class="c-input_item-title">メールアドレス</dt>
            <dd class="c-input_item-form">
              <input v-model="email" disabled type="text"/>
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
            value="更新する"
            @click="updateUser"
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
  data: () => ({
  }),
  async asyncData(ctx) {

    const res = await ctx.$functions.httpsCallable('getUser')({
      userId: ctx.params.id
    })

    console.log(res.data.res)

    return {
      id:ctx.params.id,
      ...res.data.res,
    };
  },
  methods: {
    async updateUser() {
      const res = await this.$functions.httpsCallable('updateUser')({
        userId: this.id,
        sei: this.sei,
        mei: this.mei
      });

      if (res.data.status == 200) {
        alert("成功");
      } else {
        alert("失敗");
      }
    }
  }
};
</script>
