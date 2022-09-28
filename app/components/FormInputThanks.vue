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
                @click="onClickThanksItem(formThanksItem)"
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

    <!-- editドロワーメニュー -->
    <div class="c-forms-select-item-edit" :class="{active:thanksView}">
      <nav class="c-forms-select-item-edit-nav">
        <v-btn
          tile
          color="grey"
          text
          class="font-weight-black"
          @click="onClickOpenThanksDrawer"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          完了
        </v-btn>
      </nav>

      <div class="c-forms-select-item-edit-main" v-if="thanksItem.type == 'contents'">
        <div class="d-flex align-center mb-4">
          <span class="mr-6">回答者にダウンロードを許可する</span>
          <v-switch
            inset
          >
          </v-switch>
        </div>
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">コンテンツ</p>
          <input id="file" class="c-form-group-item-inp type--1 inp--type4" type="file" @change="onSelectContent" accept=".pdf">
          <p class="mt-2">※PDFのみとなっております</p>
        </div>
      </div>
      <div class="c-forms-select-item-edit-main" v-else-if="thanksItem.type == 'inport'">
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">埋め込み</p>
          <textarea class="c-form-group-item-inp inp--type1 type--1" name="" id="" cols="30" rows="10" v-model="html" placeholder="埋め込みコードを入力してください"></textarea>
        </div>
      </div>
      <div class="c-forms-select-item-edit-main" v-else-if="thanksItem.type == 'link'">
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">外部ページのリンク</p>
          <input v-model="thanksRedirect.url" class="c-form-group-item-inp inp--type3 type--1" type="text" placeholder="URLを入力">
          <input v-model="thanksRedirect.label" class="c-form-group-item-inp inp--type3 type--1" type="text">
        </div>
      </div>

    </div>

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
            </div>

            <div v-if="thanksPDF">
              <div class="mb-4">{{thanksPDF}}</div>
            </div>

            <div v-if="html">
              <div class="mb-4" v-html="html"></div>
            </div>

            <div v-if="thanksRedirect.url" class="text-center">
              <a class="pa-4" style="display:inline-block;" :href="thanksRedirect.url">{{thanksRedirect.label}}</a>
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
    html: "",
    formThanks: 0,
    formThanksTabs: ["項目","スタイル"],
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
    thanksItem: "",
    innerWidth: 50,
    thanksView: false,
    thanksPDF: "",
    thanksRedirect: {
      url: "",
      label: "ホームページへ戻る"
    },
  }),
  methods: {
    onClickThanksItem(item) {
      this.thanksView = !this.thanksView
      this.thanksItem = item
    },
    onClickOpenThanksDrawer() {
      this.thanksView = !this.thanksView
    },
    //ストレージにアップロードしてるんだぞっ
    async onSelectContent(e){
      console.log(e);
      const file = e.target.files[0]
      if (file) {
        this.thanksPDF = file
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
