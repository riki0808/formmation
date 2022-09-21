<template>
  <v-app style="background-color: #f4f4f8;">

    <v-app-bar
     fixed 
     app 
     color="#ffffff" 
     style="box-shadow:none!important; border-bottom:1px solid #c8c8c8;"
    >
      <nuxt-link
        to="/"
      >
        <img src="~/static/img/logo-simple.svg" alt="" width="35">
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

};
</script>
