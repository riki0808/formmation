<template>
  <section class="l-main_container">
    <div class="l-padding--type1">

      <!-- ユーザーを招待のボタン -->
      <div
        class="d-flex justify-end mb-6"
      >
        <v-btn
          color="primary"
          to="/users/new"
        >
          <v-icon 
            left
          >
            mdi-plus-circle
          </v-icon>
          ユーザーを招待
        </v-btn>
      </div>

      <!-- フォーム一覧表示 -->
      <div>

        <!-- データベースのユーザーを参照 -->
        <v-card
          flat
          elevation="1"
          class="pa-8"
        >
          <div class="d-flex align-center justify-space-between">

            
            <div class="d-flex align-center">

              <div class="mr-8">
                <!-- <img src="" alt=""> -->
                <div class="shape-test"></div>
              </div>

              <div>
                <!-- データベースのユーザー名参照 -->
                <p class="mb-0 text-h6">
                  佐藤立樹
                </p>
                <!-- データベースのメールアドレス参照 -->
                <p class="primary--text c-sm-fs mb-0">
                  riki_sato@cone-ntm.com
                </p>
              </div>
            </div>

            <div class="d-flex">
              <v-btn
                color="main"
                to="/users/edit"
                nuxt
                class="mr-3"
                width="100px"
              >
                編集
              </v-btn>
              <v-btn
                color="main"
                to="/"
                nuxt
                class="mr-3"
                width="100px"
              >
                削除
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
    name: 'Users',
    data() {
      return {
        emails: [
          "riki_sato@cone-ntm.com"
        ]
      }
    }
  }
</script>
