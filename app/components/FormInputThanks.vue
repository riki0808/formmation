<template>
  <div class="c-forms_main d-flex">
    <!-- フォーム編集の左サイドバー -->
    <div class="c-forms_side-bar">

      <v-tabs
        v-model="formThanks"
        fixed-tabs
        hide-slider
        background-color="main"
      >
        <v-tab
          v-for="(formThanksTab, i) in formThanksTabs"
          :key="i"
          active-class="form-edit-tab-active"
          class="c-bd-all grey--text font-weight-bold"
        >
          {{formThanksTab}}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="formThanks">
        <!-- 以下「項目」のUI -->
        <v-tab-item transition="fade-transition">
          <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 160px);">
            <div class="mb-5">
              <v-btn
                v-for="(formThanksItem, i) in formThanksItems"
                :key="i"
                tile
                class="text-caption justify-start grey--text shadow-none main mb-3"
                style="width:100%;"
              >
                <v-icon left>
                  {{ formThanksItem.icon }}
                </v-icon>
                {{ formThanksItem.text }}
              </v-btn>
            </div>
          </div>
        </v-tab-item><!-- 以下「項目」のUI -->

        <!-- 以下「スタイル」のuI -->
        <v-tab-item transition="fade-transition">
          <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 160px);">
            <!-- 「全体」部分 -->
            <div class="mb-10">
              <p class="font-weight-bold text-body-2">全体</p>
              <div class="c-font-10">
                <p style="margin-bottom:4px!important">幅</p>
                <input v-model.number="innerWidth" class="px-2 py-1  c-bd-all mr-2 text-caption" type="number" min="1" max="100"><span>％</span>
              </div>
            </div>
          </div>
        </v-tab-item><!-- 以下「スタイル」のuI -->

      </v-tabs-items>
    </div><!-- フォーム編集の左サイドバー -->

    <!-- フォーム編集のメイン画面 -->
    <div class="c-forms_container">

      <div class="white c-main-form-edit-contents overflow-auto" style="width:100%; height:100%;">

        <div class="c-main-form-edit-contents-inner mb-15" :style="{width: innerWidth + '%'}">

          <div>

            <div>
              <h2 class="text-center mb-5">お問い合わせいただきありがとうございます</h2>
              <p class="text-center">
                お問い合わせいただきありがとうございました。<br>お送りいただきました内容を確認の上、担当者より折り返しご連絡させていただきます。
              </p>
              <input type="file" @change="onSelectContent" accept=".pdf">
              <div v-html="html"></div>
              <input type="text" v-model="html">
            </div>

          </div><!-- inner -->

        </div><!-- c-main-form-edit-contents-inner -->

      </div><!-- c-main-form-edit-contents -->

    </div><!-- フォーム編集のメイン画面 -->

  </div>

</template>


<script>
export default {
  data:()=>({
    html: "<h2>Hello</h2>",
    formThanks: 0,
    formThanksTabs: ["項目","スタイル"],
    formThanksItems: [
      {
        icon: "mdi-file-plus-outline",
        text: "コンテンツ(資料)",
        type:"contents"
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
    innerWidth: 50,
  }),
  methods: {
    //ストレージにアップロードしてるんだぞっ
    async onSelectContent(e){
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        const storageRef = this.$fireStorage.ref().child("file.png")
        await storageRef.put(file)
        const url = await storageRef.getDownloadURL()
        console.log(url)
      }
    }
  }
}
</script>
