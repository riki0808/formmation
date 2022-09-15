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
            <dd class="c-input_item-form"><input type="text"></dd>
          </dl>

          <div class="d-flex justify-space-between">

            <dl class="c-input_item c-input_item-w">
              
              <dt class="c-input_item-title">お名前（姓）</dt>
              <dd class="c-input_item-form"><input type="password" name="" id=""></dd>
  
            </dl>
  
            <dl class="c-input_item c-input_item-w">
              
              <dt class="c-input_item-title">お名前（名）</dt>
              <dd class="c-input_item-form"><input type="password" name="" id=""></dd>
  
            </dl>

          </div>


          <input type="submit" value="招待する" name="" id="" class="c-input-submit">
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InspirePage'
}
</script>
