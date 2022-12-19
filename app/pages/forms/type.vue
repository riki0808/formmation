<template>
  <section class="l-main_container">
    <div class="c-main">
      <div class="c-textbox">
        <h1 class="c-title">フォームのタイプの選択</h1>
        <p class="c-desc">ご希望の使い方からフォームを作成します</p>
      </div>
      <div class="d-flex justify-space-between" style="width:100%;">

        <v-card
          v-for="(template, i) in templates"
          :key="i"
          width="31%"
          @click="onClickFormType(template.type)"
        >
          <v-card-title
            v-text="template.title"
            :class="template.css"
          >
          </v-card-title>

          <ul
            class="d-flex flex-column p-form-type_ul-height pl-15 pt-9 text-caption"
          >
            <li
              v-for="(item, n) in template.items"
              :key="n"
            >
              {{item}}
            </li>
          </ul>

        </v-card>

      </div>
    </div>
  </section>
</template>
<script>
  export default {
    layout: "simple_default",
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
            type: "new",
            title: "新規作成",
            css: "white grey--text d-flex align-center justify-center font-weight-bold text-body-2",
            items: [
              "テンプレートを使わず作成"
            ],
            to: "/forms/input",
          },
          {
            type: "contact",
            title: "お問い合わせ",
            css: "primary white--text d-flex align-center justify-center font-weight-bold text-body-2",
            items: [
              "名前",
              "会社名",
              "部署名",
              "役職",
              "メールアドレス",
              "電話番号",
              "お問い合わせ内容",
            ],
            to: "/forms/input",
          },
          {
            type: "download",
            title: "資料ダウンロード",
            css: "primary white--text d-flex align-center justify-center font-weight-bold text-body-2",
            items: [
              "名前",
              "会社名",
              "部署名",
              "役職",
              "従業員数",
              "メールアドレス",
              "電話番号",
              "認知経路",
              "その他相談内容",
            ],
            to: "/forms/input",
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
