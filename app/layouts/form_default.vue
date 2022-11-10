<template>
  <!-- <v-app style="background-color: #f4f4f8;">

    <v-app-bar
      fixed 
      app 
      color="#ffffff" 
      style="box-shadow:none!important; border-bottom:1px solid #c8c8c8;"
    >
      
      <v-btn
        tile
        color="primary"
        text
        to="/"
        class="font-weight-black"
      >
        <v-icon left>
          mdi-chevron-left
        </v-icon>
        戻る
      </v-btn>

      <v-spacer></v-spacer>

      <div>
        <input class="c-input_border p-form_nav-input-text" type="text" style="width:300px;" value="お問い合わせフォーム">
        <v-icon left>
          mdi-pencil
        </v-icon>
      </div>

      <v-spacer></v-spacer>

      <div>
        <v-btn
          color="primary"
          class="font-weight-bold"
        >
          公開・更新
        </v-btn>
      </div>

    </v-app-bar>

    <v-main> -->
      
      <Nuxt />
      
    <!-- </v-main>

  </v-app> -->
</template>

<script>
export default {
  name: "FormDefaultLayout",
  middleware({ app, redirect }) {
    app.$fireAuth.onAuthStateChanged((user) => {
      if (user) {
        //認証済の処理
      } else {
        //未認証時の処理
        // if(route.path !== '/'){     //リダイレクト先のページでは判定しないようにしないと無限にリダイレクトされる
        //開発中は一旦リダイレクトしないようにしておく
        redirect("/login");
        // }
      }
    });
  },
};
</script>
