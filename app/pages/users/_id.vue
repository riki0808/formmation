<template>
  <section>
    <h1>user.id毎に表示内容変えたい</h1>
    <p>id:{{this.$route.params.id}}</p>
  </section>
  
</template>
<script>
  export default {
    data() {
      return {
        message: 'user.id毎に表示したいよおお'
      }
    },
    validate({ params }) {
      return /^\d+$/.test(params.id)
    }
  }
</script>
