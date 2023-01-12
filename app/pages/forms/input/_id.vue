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
      <div class="ml-5">
        <span class="p-form_nav-input-text">{{ formData.title }}</span>
        <!-- <input class="c-input_border p-form_nav-input-text" type="text" style="width:300px;" v-model="formData.title"> -->
        <!-- <v-icon left>
          mdi-pencil
        </v-icon> -->
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

      <section class="c-edit-formarea" :class="{active:formareaView}">

        <form-input-edit :inputForms="inputForms" :formId="formId" :inputFormId="inputFormId" :workflowId="workflowId" :completeForms="completeForms" :completeFormId="completeFormId"></form-input-edit>
      </section>

      <section style="overflow: hidden;position: fixed;width: 100%;">

        <div>
          <form-input-workflow :formId="formId" :workflows="workflows" :workflowId="workflowId" :inputForms="inputForms" :inputFormId="inputFormId" :formData="formData"></form-input-workflow>
        </div>

      </section>

    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "form_default",
  created() {
    this.$nuxt.$on('formareaEvent', () => {
      this.formareaView = !this.formareaView
    })
    this.$nuxt.$on('formareaView', () => {
      this.formareaView = !this.formareaView
    })
  },
  data() {
    return {
      title: "",
      formareaView: false,
    }
  },
  async asyncData(ctx) {

    if(ctx.params.id){
      const res = await ctx.$functions.httpsCallable("getForm")({
        formId: ctx.params.id,
      });
      return {
        formId: ctx.params.id,
        formData: res.data.res,
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
    console.log('formData', this.formData)
    // console.log('formId', this.formId)
    // console.log('formTitle', this.formTitle)
    // console.log('inputFormId', this.inputFormId)
    // console.log('inputForms', this.inputForms)
    // console.log('completeFormId', this.completeFormId)
    // console.log('completeForms', this.completeForms)
    // console.log('workflowId', this.workflowId)
    // console.log('workflows', this.workflows)
  },
  methods:{
  }
}
</script>

