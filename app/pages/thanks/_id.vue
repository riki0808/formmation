<template>

  <div class="white" style="height:100vh;">

    <div class="c-main-form-edit-contents-inner mb-15" :style="{width: innerWidth + '%'}">

      <div>

        <div class="p-form-input-title">
          <h2 class="text-center mb-5">{{ formHead.title }}</h2>
          <p class="text-center">
            {{ formHead.description }}
          </p>
        </div>

        <!-- コンテンツ(資料)の画面表示 -->
        <div v-if="thanksPDF" style="position:relative;">
          <div class="mb-4">{{thanksPDF}}</div>
        </div>

        <!-- 埋め込み(日程調整ツール推奨)の画面表示 -->
        <div v-if="html" style="position:relative;">
          <div class="c-form-group-item-overray">
            <div class="c-form-group-item-overray-sub">
              <div class="c-form-group-item-overray-icon">
                <v-btn class="mx-1" fab dark small color="#475a74">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="mb-4" v-html="html"></div>
        </div>

        <!-- 外部ページリンクの画面表示 -->
        <div v-if="thanksRedirect.url" class="text-center" style="position:relative;">
          <div class="c-form-group-item-overray">
            <div class="c-form-group-item-overray-sub">
              <div class="c-form-group-item-overray-icon">
                <v-btn class="mx-1" fab dark small color="#475a74">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <a class="pa-4 font-weight-bold" style="display:inline-block;" :href="thanksRedirect.url">{{thanksRedirect.label}}</a>
        </div>

      </div><!-- inner -->

    </div><!-- c-main-form-edit-contents-inner -->

  </div><!-- フォーム編集のメイン画面 -->
  
</template>

<script>
  export default {
    layout: "nothing_default",
    async asyncData(ctx) {
      if (ctx.params.id) {
        const res = await ctx.$functions.httpsCallable("getForm")({
          formId: ctx.params.id
        });
        console.log(res.data.res)
        return {
          completeFormId: res.data.res.completeFormId,
          completeForms: res.data.res.completeForm,
        }
      }
    },
    mounted() {
      if (this.completeForms) {
        this.innerWidth = this.completeForms.innerWidth
        // inportのデータ
        this.html = this.completeForms.html
        // contentsのデータ
        this.allowDownload = this.completeForms.allowDownload
        this.thanksPDF = this.completeForms.thanksPDF
        // linkのデータ
        this.thanksRedirect = this.completeForms.thanksRedirect
        // titleとdescのデータ
        this.formHead = this.completeForms.formHead
      }
    },
    data: () => ({
      formThanksItems: [
        {
          icon: "mdi-file-plus-outline",
          text: "コンテンツ(資料)",
          type: "contents"
        },
        {
          icon: "mdi-code-braces",
          text: "埋め込み(日程調整ツール推奨)",
          type: "inport"
        },
        {
          icon: "mdi-link-variant-plus",
          text: "外部ページへのリンク",
          type: "link"
        },
      ],
      selectItem: "",
      thanksView: false,
      editTitleView: false,

      // 全体横幅のデータ
      innerWidth: 50,
      // inportのデータ
      html: "",
      // contentsのデータ
      allowDownload: false,
      thanksPDF: "",
      // linkのデータ
      thanksRedirect: {
        url: "",
        label: "ホームページへ戻る"
      },
      // titleとdescのデータ
      formHead: {
        title: "お問い合わせいただきありがとございます",
        description: "お問い合わせいただきありがとうございました\nお送りした内容をご確認の上、担当者より折り返しご連絡させていただきます。"
      },
    }),
  }
</script>
