<template>
  <section class="l-main_container">
    <div class="p-login">
      <div class="p-login_textbox">
        <h1 class="p-login_title">新規メンバー追加</h1>
        <p class="p-login_desc">追加したいメンバーの情報を入力してください</p>
      </div>
      <div class="p-login_input">
        <form action="">

          <dl class="p-login_input_item">
            <dt class="p-login_input_item-title">メールアドレス</dt>
            <dd class="p-login_input_item-form"><input type="text"></dd>
          </dl>

          <div class="d-flex justify-space-between">

            <dl class="p-login_input_item p-login_input_item-w">
              
              <dt class="p-login_input_item-title">お名前（姓）</dt>
              <dd class="p-login_input_item-form"><input type="password" name="" id=""></dd>
  
            </dl>
  
            <dl class="p-login_input_item p-login_input_item-w">
              
              <dt class="p-login_input_item-title">お名前（名）</dt>
              <dd class="p-login_input_item-form"><input type="password" name="" id=""></dd>
  
            </dl>

          </div>


          <input type="submit" value="招待する" name="" id="" class="p-login_input-submit">
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
