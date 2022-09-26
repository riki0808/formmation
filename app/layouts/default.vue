<template>
  <v-app style="background-color: #f4f4f8;">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="primary"
    >
      <v-list>
        <v-list-item
          to="/"
          class="justify-center"
        >
          <img src="~/static/img/logo.svg" alt="" width="200">
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="white--text"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="#ffffff" class="shadow-none">
      <v-app-bar-nav-icon color="#e2e2e2" @click.stop="drawer = !drawer" />

      <v-spacer></v-spacer>

      <v-menu
        bottom
        :offset-y="offset"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon color="#c8c8c8">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list style="width:200px;">
          <div class="py-4 px-6 grey--text">
            <!-- current_userの名前 -->
            <p class="mb-2 text-caption">佐藤立樹</p>
            <!-- current_userのメールアドレス -->
            <p class="mb-0 c-font-10">riki_sato@cone-ntm.com</p>
          </div>
          <v-list-item
            v-for="(item, i) in accountMenuList"
            :key="i"
            :to="item.to"
            nuxt
            class="pl-10 grey--text"
          >
            <v-list-item-title class="text-caption">{{ item.listItem }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- <v-btn icon>
        <v-icon color="#c8c8c8">mdi-account-circle</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      
      <Nuxt />
      
    </v-main>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: "フォーム管理",
          to: "/",
        },
        {
          title: "メンバー管理",
          to: "/users",
        },
      ],
      miniVariant: false,
      title: "formmation",
      color: "#ffffff",
      accountMenuList: [
        { 
          listItem: 'アカウント設定',
          to: "/users/edit"
         },
        { 
          listItem: '改善要望フォーム',
          to: "/"
         },
        { 
          listItem: 'ログアウト',
          to: "/"
         },
      ],
      offset: true,
    };
  },
};
</script>
