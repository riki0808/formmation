<template>
  <div class="c-forms_main c-grey scrollable">

    <v-navigation-drawer v-model="drawer" absolute width="400">

      <nav class="c-forms-select-item-edit-nav">
        <v-btn tile color="grey" text class="font-weight-black" @click="closeDrawer">
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          完了
        </v-btn>
      </nav>
      <div class="px-8 py-10" v-if="(charts[currentIndex].type == 0)">
        <v-select
          :items="actions"
          v-model="charts[currentIndex].action"
          label="実行アクションを選択してください"
          dense
          outlined
        ></v-select>
        <v-form v-model="valid">
          <div v-if="(charts[currentIndex].action == 'delay')">
            <v-text-field
              v-model="charts[currentIndex].title"
              :rules="detailRules"
              label="アクション名"
              required
            ></v-text-field>
            <v-text-field
              v-model="charts[currentIndex].day"
              :rules="delayRules"
              type="number"
              label="日"
              required
            ></v-text-field>
            <v-text-field
              v-model="charts[currentIndex].hour"
              :rules="delayRules"
              type="number"
              label="時間"
              required
            ></v-text-field>
          </div>
          <div v-else-if="charts[currentIndex].action == 'mail'">
            <v-text-field
              v-model="charts[currentIndex].title"
              :rules="detailRules"
              label="アクション名"
              required
            ></v-text-field>
            <v-text-field
              v-model="charts[currentIndex].mailName"
              :rules="detailRules"
              label="メール名"
              required
            ></v-text-field>
            <v-text-field
              v-model="charts[currentIndex].sender"
              :rules="detailRules"
              label="送信者名"
              required
            ></v-text-field>
            <v-text-field
              v-model="charts[currentIndex].senderAddress"
              :rules="mailRules"
              label="送信者アドレス"
              required
            ></v-text-field>
            <v-text-field
              v-model="charts[currentIndex].subject"
              :rules="detailRules"
              label="件名"
              required
            ></v-text-field>
            <v-text-field
              v-model="charts[currentIndex].body"
              :rules="detailRules"
              label="本文"
              required
            ></v-text-field>
            <v-text-field
              v-model="charts[currentIndex].footer"
              :rules="detailRules"
              label="署名"
              required
            ></v-text-field>
          </div>

        </v-form>
      </div>
      <div class="px-8 py-10" v-if="(charts[currentIndex].type == 1)">
        <p class="font-weight-bold text-body-2">好きな条件を指定してください</p>
        <div class="d-flex">
          <span class="mt-2 mr-3">①</span>
          <v-select
            :items="targetContentNames"
            v-model="charts[currentIndex].targetContentName"
            label="項目を選んでください"
            dense
            outlined
          ></v-select>
        </div>
        <div class="d-flex">
          <span class="mt-2 mr-3">②</span>
          <v-select
            :items="compareTypes"
            v-model="charts[currentIndex].compareType"
            label="条件選択"
            dense
            outlined
          ></v-select>
        </div>
        <div class="d-flex">
          <span class="mt-2 mr-3">③</span>
          <v-text-field
            v-model="charts[currentIndex].checkValue"
            label="任意のテキスト入力"
            class="pt-0"
          ></v-text-field>
        </div>
        <!-- <v-card class="pa-4">
          <p class="mb-1 text-caption">条件イメージ</p>
          <p class="text-center mb-1">①  =  ③</p>
          <p class="text-center mb-0">①  ≠  ③</p>
        </v-card> -->
      </div>

    </v-navigation-drawer>

    <div class="d-flex flex-column align-center py-16 scrollable p-workflow_container">
      <v-btn
      class="d-flex justify-start"
      @click="submitsave"
      >
        保存ボタン
      </v-btn>
      <component
        v-if="charts.length"
        :is="getComponent"
        :charts="charts"
        :index="charts[0].index"
        />
    </div>

  </div>
</template>

<script>
  export default {
    props: ["formId","workflows","workflowId","inputForms"],
    // async asyncData(ctx) {
    //   if(ctx.params.id) {
    //     const res = await ctx.$function.httpsCallable("getInputFormItem")({

    //     })
    //   }
    // },
    created() {

      // inputFormsのtitleだけの配列を作成
      const inputForms = this.inputForms.formItems
      for(let inputForm of inputForms) {
        this.targetContentNames.push(
          inputForm.title
        )
      }

      console.log('いけてる？',this.targetContentNames)


      if (this.workflows) {
        this.charts = this.workflows.actions
      }
      this.$nuxt.$on('openDrawer', index => {
        this.drawer = true
        this.currentIndex = index
      })
      if (!this.charts.length) {
        this.charts.push({
          index: 0,
          title: "お問合せ完了後",
          type: 0,
          action: '',
          // ディレイのパート
          day: '',
          hour: '',
          // メールパート
          mailName: '',
          sender: '',
          senderAddress: '',
          subject: '',
          body: '',
          footer: '',
          next: null,
          notNext: null,
          targetContentName: '',
          checkValue: '',
          compareType: ''
        })
      }
      console.log('index',this.currentIndex)
    },
    data() {
      return {
        drawer: false,
        // 実行アクションの数
        actions: ["delay","mail"],
        compareTypes:[
          {value:1, text:'一致ならば'},
          {value:2, text:'不一致ならば'}
        ],
        targetContentNames: [],
        valid: false,
        currentIndex: 0,

        delayRules: [
          v => !!v || '数字を入力してください',
        ],
        detailRules: [
          v => !!v || '入力してください',
        ],
        mailRules: [
          v => !!v || 'メールアドレスを入力してください',
          v => /.+@.+/.test(v) || 'メールアドレスが必須です',
        ],
        charts: []
      }
    },
    computed: {
      getComponent() {
        if(this.charts.length) {
          return this.charts[0].type === 0 ? "single" : "multi"
        }
        return "single"
      },
    },
    methods: {
      closeDrawer() {
        this.drawer = false;
      },
      async submitsave() {
        const actions = this.charts

        // console.log(actions)

        if (this.workflows) {
          const res = await this.$functions.httpsCallable("updateWorkflows")(
            {
              postData:{
                actions:actions
              },
              workflowId: this.workflowId
            }
          )
        } else {
          const res = await this.$functions.httpsCallable("addWorkflows2Forms")(
            {
              postData:{
                actions:actions
              },
              workflowId: this.workflowId
            }
          )
        }
      }

    },
  }
</script>
