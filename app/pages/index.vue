<template>
  <section class="l-main_container">
    <div class="l-padding--type1">

      <!-- 新規フォームの作成のボタン -->
      <div
        class="d-flex justify-end mb-6"
      >
        <v-btn
          color="primary"
          to="/forms/input"
        >
          <v-icon 
            left
          >
            mdi-plus-circle
          </v-icon>
          新規フォームの作成
        </v-btn>
      </div>

      <!-- フォーム一覧表示 -->
      <div>
        <v-card
          flat
          elevation="1"
          class="pa-8 pl-15"
        >
          <div class="d-flex align-center justify-space-between">

            <div class="">
              <div class="d-flex align-center">
                <p class="mb-0 text-h6">お問い合わせフォーム</p>
                <v-btn icon>
                  <v-icon
                  >
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </div>
              <p class="primary--text c-sm-fs">
                /formmation.com/rikisato
              </p>
            </div>

            <div class="d-flex">
              <v-btn
                color="primary"
                to="/forms/customers"
                nuxt
                class="mr-3"
              >
                回答者管理
              </v-btn>
              <v-btn
                color="main"
                to="/forms/input"
                nuxt
                class="mr-3"
              >
                フォーム編集
              </v-btn>
              <v-btn
                color="main"
                to="/forms/workflow"
                nuxt
                class="mr-3"
              >
                自動化設定
              </v-btn>
              <v-btn icon>
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </div>

          </div>
        </v-card>
      </div>


    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
