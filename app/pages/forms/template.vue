<template>
  <section class="l-main_container">
    <div class="c-main">
      <div class="text-left mt-3 mb-8">
        <v-btn
          tile
          color="primary"
          text
          class="font-weight-black"
          to="/"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          戻る
        </v-btn>
        <h1 class="text-h6 font-weight-black">テンプレート一覧</h1>
      </div>

      <div class="" style="width:100%;">

        <v-card
          v-for="(template, i) in templates"
          :key="i"
          flat
          elevation="1"
          class="py-6 px-8 mb-5"
          @click="onClickFormType(template.type)"
        >
          <div class="d-flex align-center justify-space-between mb-3">
            <div class="">
              <div class="d-flex align-center mb-1">
                <p class="mb-0 text-body-1 font-weight-black" style="color:#4a4a51;">{{template.title}}</p>
              </div>
              <p class="c-sm-fs mb-0">
                {{ template.description }}
              </p>
            </div>
          </div>

          <div class="d-flex justify-space-between align-end">
            <div>
              <v-icon>mdi-account-circle</v-icon>
              <v-icon>mdi-account-circle</v-icon>
            </div>
            <p class="mb-0 primary--text text-caption">このテンプレートで作成する</p>
          </div>

        </v-card>
      </div>

    </div>
  </section>
</template>
<script>
  export default {
    layout: "default",
    async asyncData(ctx) {
      const res = await ctx.$functions.httpsCallable("getTeamInfo")({
        teamId: ctx.store.state.user.teamId,
      });

      return {
        teamInfo: res.data.res,
      };
    },
    mounted() {
    },
    data() {
      return {
        templates: [
          {
            type: "contact",
            title: "【お問い合わせフォーム】受信した相手に自動返信とステップメールを送信",
            description: "お問い合わせフォームを作成し、フォームを送信した顧客のメールアドレス宛に自動返信とステップメールを送信します。",
          },
          {
            type: "mf",
            title: "MFで請求書を発行し、取引先にメール送信〜GoogleDriveに格納",
            description: "フォームに入力した金額と取引先をもとにMoneyForwardで請求書を作成し、取引先に送信。その請求書を指定のグーグルドライブに格納します。",
          },
        ]
      }
    },
    methods: {
      async onClickFormType(type) {
        const formId = Math.random().toString(32).substring(2)
        const postData = {
          teamId: this.teamInfo.id,
          title: "新規作成フォーム",
          inputFormId: Math.random().toString(32).substring(2),
          completeFormId: Math.random().toString(32).substring(2),
          workflowId: Math.random().toString(32).substring(2),
          description: "このフォームの詳細説明",
          isShow: false,
        }
        if (type == "contact") {
          const inputForms = {
            formItems: [
              {
                type: "name",
                title: "名前",
                seiTitle: "名前（姓）",
                seiPlaceholder: "山田",
                meiTitle: "名前（名）",
                meiPlaceholder: "太郎",
                description: "",
                required: true,
                imageUrl: "",
                value: "",
                role: 1,
              },
              {
                type: "company",
                title: "会社名",
                description: "",
                placeholder: "株式会社◯◯◯◯",
                required: false,
                imageUrl: "",
                value: "",
                role: 2,
              },
              {
                type: "department",
                title: "部署名",
                description: "",
                placeholder: "",
                required: false,
                imageUrl: "",
                value: "",
                role: 3,
              },
              {
                type: "position",
                title: "役職",
                description: "",
                placeholder: "",
                required: false,
                imageUrl: "",
                value: "",
                role: 3,
              },
              {
                type: "email",
                title: "メールアドレス",
                description: "",
                placeholder: "-----@formmation.com",
                required: false,
                imageUrl: "",
                value: "",
                role: 2,
              },
              {
                type: "tel",
                title: "電話番号",
                description: "",
                placeholder: "000-0000-0000",
                required: false,
                imageUrl: "",
                value: "",
                role: 2,
              },
              {
                type: "textarea",
                title: "お問い合わせ内容",
                description: "",
                placeholder: "テキストを入力してください",
                required: false,
                imageUrl: "",
                value: "",
                role: 2,
              },
            ],
            width: 50,
            styleTemplate: "inp--type2",
            submitButton: {
              buttonColor: "#3042cc",
              buttonFontColor: "#ffffff",
              buttonFontSize: 12,
              buttonText: '送信',
            },
            textDesign: {
              textFont: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif;',
              labelFontColor: "#606060",
              labelFontSize: 12,
              descriptionColor: "#606060",
              descriptionSize: 12
            },
            formHead: {
              title: "お問い合わせ",
              description: "お気軽にご相談ください"
            },
            workflowId: postData.workflowId
          }
          const res = await this.$functions.httpsCallable("addForms")(
          {
            formId:formId,
            postData:postData,
            inputForms:inputForms,
            inputFormId: postData.inputFormId
          }
        )
        } else if (type == "download") {
          const inputForms = {
            formItems: [
              {
                type: "name",
                title: "名前",
                seiTitle: "名前（姓）",
                seiPlaceholder: "山田",
                meiTitle: "名前（名）",
                meiPlaceholder: "太郎",
                description: "",
                required: true,
                imageUrl: "",
                value: "",
                role: 1,
              },
              {
                type: "company",
                title: "会社名",
                description: "",
                placeholder: "株式会社◯◯◯◯",
                required: false,
                imageUrl: "",
                value: "",
                role: 2,
              },
              {
                type: "department",
                title: "部署名",
                description: "",
                placeholder: "",
                required: false,
                imageUrl: "",
                value: "",
                role: 3,
              },
              {
                type: "position",
                title: "役職",
                description: "",
                placeholder: "",
                required: false,
                imageUrl: "",
                value: "",
                role: 3,
              },
              {
                type: "employees",
                title: "従業員数",
                description: "",
                placeholder: "",
                required: false,
                imageUrl: "",
                value: "",
                role: 3,
              },
              {
                type: "email",
                title: "メールアドレス",
                description: "",
                placeholder: "-----@formmation.com",
                required: false,
                imageUrl: "",
                value: "",
                role: 2,
              },
              {
                type: "tel",
                title: "電話番号",
                description: "",
                placeholder: "000-0000-0000",
                required: false,
                imageUrl: "",
                value: "",
                role: 2,
              },
              {
                type: "source",
                title: "認知経路",
                description: "",
                placeholder: "",
                required: false,
                imageUrl: "",
                value: "",
                role: 4,
              },
              {
                type: "textarea",
                title: "その他相談内容",
                description: "",
                placeholder: "テキストを入力してください",
                required: false,
                imageUrl: "",
                value: "",
                role: 2,
              },
            ],
            width: 50,
            styleTemplate: "inp--type2",
            submitButton: {
              buttonColor: "#3042cc",
              buttonFontColor: "#ffffff",
              buttonFontSize: 12,
              buttonText: '送信',
            },
            textDesign: {
              textFont: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif;',
              labelFontColor: "#606060",
              labelFontSize: 12,
              descriptionColor: "#606060",
              descriptionSize: 12
            },
            formHead: {
              title: "お問い合わせ",
              description: "お気軽にご相談ください"
            },
            workflowId: postData.workflowId
          }
          const res = await this.$functions.httpsCallable("addForms")(
          {
            formId:formId,
            postData:postData,
            inputForms:inputForms,
            inputFormId: postData.inputFormId
          }
        )
        } else {
          const res = await this.$functions.httpsCallable("addForms")(
            {
              formId:formId,
              postData:postData,
            }
          )
        }
        this.$router.push(`/forms/input/${formId}`);

      }
    }
  }
</script>
