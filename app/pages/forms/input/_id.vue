<template>
  <v-app style="background-color: #f4f4f8;">
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
        <input class="c-input_border p-form_nav-input-text" type="text" style="width:300px;" v-model="title">
        <v-icon left @click="updateFormTitle">
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
    <v-main>



      <section style="overflow: hidden;position: fixed;width: 100%;">

        <div class="white">
          <div class="l-tab-container">
            <v-tabs
              v-model="formSelect"
              fixed-tabs
              background-color="white"
              class="grey--text"
            >
              <v-tab
                v-for="(formTypeTab, i) in formTypeTabs"
                :key="i"
                class="font-weight-bold"
              >
                {{ formTypeTab.name }}
              </v-tab>
            </v-tabs>
          </div>
        </div>

        <v-tabs-items v-model="formSelect" class="c-bd-top">

          <!-- 以下【入力画面】のUI -->
          <v-tab-item transition="fade-transition">
            <form-input-edit :inputForms="inputForms" :formId="formId" :inputFormId="inputFormId"></form-input-edit>
          </v-tab-item><!-- 以上【入力画面】のUI -->
          
          <!-- 以下【完了画面】のUI -->
          <v-tab-item transition="fade-transition">
            <form-input-thanks :completeForms="completeForms" :formId="formId" :completeFormId="completeFormId"></form-input-thanks>
          </v-tab-item><!-- 以上【完了画面】のUI -->

          <!-- 以下【自動化】のUI -->
          <v-tab-item transition="fade-transition">
            <form-input-workflow :formId="formId" :workflows="workflows" :workflowId="workflowId"></form-input-workflow>
          </v-tab-item><!-- 以上【自動化】のUI -->

          <!-- 以下【その他設定】のUI -->
          <v-tab-item transition="fade-transition">
            <form-input-setting></form-input-setting>
          </v-tab-item><!-- 以上【その他設定】のUI -->

        </v-tabs-items>

      </section>



    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "form_default",
  data() {
    return {
      formSelect: 0,
      formTypeTabs: [
        {
          name: "入力画面"
        },
        {
          name: "完了画面"
        },
        {
          name: "自動化"
        },
        {
          name: "その他設定"
        },
      ],
      title: ""
    }
  },
  async asyncData(ctx) {

    if(ctx.params.id){
      const res = await ctx.$functions.httpsCallable("getForm")({
        formId: ctx.params.id,
      });
      console.log(res.data.res)
      return {
        formId: ctx.params.id,
        formTitle: res.data.res.title,
        inputFormId: res.data.res.inputFormId,
        inputForms: res.data.res.inputForm,
        completeFormId: res.data.res.completeFormId,
        completeForms: res.data.res.completeForm,
        workflowId: res.data.res.workflowId,
        workflows: res.data.res.workflow,
      };
    }else{
      return {
        formId:"",
        inputFormId: "",
        inputForms: "",
        completeFormId: "",
        completeForms: "",
        workflowId: "",
        workflows: "",
      }
    }
  },
  mounted() {
    this.title = this.formTitle
  },
  methods:{
    async updateFormTitle() {
      const res = await this.$functions.httpsCallable("updateFormTitle")(
        {
          formId: this.formId,
          title: this.title
        }
      )
    }
  }
}
</script>

