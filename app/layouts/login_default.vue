<template>
  <v-app style="background-color: #f4f4f8;">

    <v-app-bar
      fixed 
      app 
      color="#ffffff" 
      style="box-shadow:none!important; border-bottom:1px solid #c8c8c8;"
    >
      
      <img src="~/static/img/logo-primary.svg" alt="" width="200">

    </v-app-bar>

    <v-main>
      
      <Nuxt />
      
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: "loginDefaultLayout",

};
</script>
