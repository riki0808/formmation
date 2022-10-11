<template>
  <div class="white" style="height:100vh;">

    <div class="c-main-form-edit-contents-inner mb-15" style="width:51%;">

      <div class="p-form-input-title">
        <h2 class="text-center mb-5">お問い合わせ</h2>
        <p class="text-center">送信してください</p>
      </div>

      <div class="c-form-group">

        <div class="c-form-group">

          <div class="d-flex justify-space-between">

            <div class="c-form-group-item-sub">
              <div class="c-form-group-item-label-flex">
                <p class="c-form-group-item-label">お名前(姓)</p>
                <span class="c-form-group-item-val required">必須</span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input type="text" class="c-form-group-item-inp inp--type2 type--1" placeholder="山田">
              </div>
            </div>

            <div class="c-form-group-item-sub">
              <div class="c-form-group-item-label-flex">
                <p class="c-form-group-item-label">お名前(名)</p>
                <span class="c-form-group-item-val required">必須</span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input type="text" class="c-form-group-item-inp inp--type2 type--1" placeholder="太郎">
              </div>
            </div>

          </div>

        </div>

        <div class="c-form-group-item">
          <div class="c-form-group-item-label-flex">
            <p
              class="c-form-group-item-label"
            >
              電話番号
            </p>
            <span
              class="c-form-group-item-val"
            >
              任意
            </span>
          </div>
          <div class="c-form-group-item-inp-frame">
            <input
            type="email"
            class="c-form-group-item-inp type--1 inp--type2">
          </div>
        </div>
        
      </div><!-- c-form-group -->

      <div>
        <button
          type="submit"
          class="w-100 d-flex justify-center py-2 font-weight-bold"
          style="background-color:blue;color:#fff;"
        >
          送信する
        </button>
      </div>
      
    </div><!-- c-main-form-edit-contents-inner -->

  </div>
</template>

<script>
  export default {
    layout: "nothing_default",
    data: () => ({}),
  }
</script>
