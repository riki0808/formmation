<template>
  <v-app style="background-color: #f4f4f8;">
    <div
      v-if="$store.state.loadingDialog"
      class="d-flex align-center justify-center"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #00000060;
        z-index: 1000;
      "
    >
      <v-progress-circular indeterminate color="#315fb5" size="64" width="8" />
    </div>

    <v-app-bar
      fixed 
      app 
      color="#ffffff" 
      style="box-shadow:none!important; border-bottom:1px solid #c8c8c8;"
    >
      <nuxt-link
        to="/"
      >
        <img src="~/static/img/logo-simple.svg" alt="" width="25">
      </nuxt-link>

    </v-app-bar>

    <v-main>
      
      <Nuxt />
      
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: "simpleDefaultLayout",
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
