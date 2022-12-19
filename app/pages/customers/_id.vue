<template>
  <section>

    <div class="c-bd-top px-8 d-flex align-center" style="height:40px; background-color:#fff;">

      <v-spacer></v-spacer>

      <div class="d-flex">
        <v-btn
          rounded
          color="white"
          class="shadow-none text-caption font-weight-bold grey--text"
        >
          <v-icon left>mdi-filter</v-icon>
          フィルター
        </v-btn>
        <v-btn
          rounded
          color="white"
          class="shadow-none text-caption font-weight-bold grey--text"
        >
          <v-icon left>mdi-sort</v-icon>
          並び替え
        </v-btn>
        <v-btn
          rounded
          color="white"
          class="shadow-none text-caption font-weight-bold grey--text"
        >
          <v-icon left>mdi-magnify</v-icon>
          検索
        </v-btn>
      </div>

    </div>

    <div>
      <div
        class="main overflow-auto"
        style="height:calc(100vh - 104px)"
      >
      </div>
    </div>

  </section>
</template>
<script>
export default {
  async asyncData(ctx) {
    if(ctx.params.id) {
      const res = await ctx.$functions.httpsCallable('getForm') ({
        teamId: ctx.store.state.user.teamId
      })
      
      return {
        inputForms: res.data.res
      }
    }
  },
  mounted() {
    const formItems = this.inputForms.formItems
    for(let item of formItems) {
      if (item.type == 'name') {
        this.InputFormTitles.push(item.seiTitle, item.meiTitle)
      } else {
        this.InputFormTitles.push(item.title)
      }
    }
    console.log('新しく配列できた？？',this.InputFormTitles)
  },
  data(){
    return{
      
      InputFormTitles: [],
    }
  },
  methods:{
  }
}
</script>
