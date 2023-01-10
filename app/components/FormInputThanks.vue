<template>
  <div class="c-forms_main d-flex">
    <!-- フォーム編集の左サイドバー -->
    <div class="c-forms_side-bar c-bd-right">

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

    <!-- タイトルとリード分用のドロワー -->
    <div class="c-forms-select-item-edit" :class="{active:editTitleThanksView}">
      <nav class="c-forms-select-item-edit-nav">
        <v-btn
          tile
          color="grey"
          text
          class="font-weight-black"
          @click="openEditTitleDrawer"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          完了
        </v-btn>
      </nav>
      <div class="c-forms-select-item-edit-main">
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">タイトル</p>
          <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="formThanksHead.title">
        </div>
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">補足説明</p>
          <textarea
            class="c-form-group-item-inp type--1 inp--type4"
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="formThanksHead.description"
          >
          </textarea>
        </div>
      </div>
    </div>

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

      <!-- コンテンツ(資料)のドロワー -->
      <div class="c-forms-select-item-edit-main" v-if="selectThanksItem.type == 'contents'">
        <div class="d-flex align-center mb-4">
          <span class="mr-6">回答者にダウンロードを許可する</span>
          <v-switch
            inset
            v-model="allowDownload"
            @click="allowDownload = !allowDownload"
          >
          </v-switch>
        </div>
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">コンテンツ</p>
          <input id="file" class="c-form-group-item-inp type--1 inp--type4" type="file" @change="onSelectContent" accept=".pdf">
          <p class="mt-2">※PDFのみとなっております</p>
        </div>
      </div>

      <!-- 埋め込み(日程調整ツール推奨)のドロワー -->
      <div class="c-forms-select-item-edit-main" v-else-if="selectThanksItem.type == 'inport'">
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">埋め込み</p>
          <textarea class="c-form-group-item-inp inp--type1 type--1" name="" id="" cols="30" rows="10" v-model="html" placeholder="埋め込みコードを入力してください"></textarea>
        </div>
      </div>

      <!-- 外部ページへのリンクのドロワー -->
      <div class="c-forms-select-item-edit-main" v-else-if="selectThanksItem.type == 'link'">
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">外部ページのリンク</p>
          <input v-model="thanksRedirect.url" class="c-form-group-item-inp inp--type3 type--1" type="text" placeholder="URLを入力">
          <input v-model="thanksRedirect.label" class="c-form-group-item-inp inp--type3 type--1" type="text">
        </div>
      </div>

    </div>

    <!-- フォーム編集のメイン画面 -->
    <div class="c-forms_container">
      <v-btn
        @click="submitSave"
      >
        保存ボタン
      </v-btn>

      <div class="white c-main-form-edit-contents overflow-auto" style="width:100%; height:100%;">

        <div class="c-main-form-edit-contents-inner mb-15" :style="{width: innerWidth + '%'}">

          <div>

            <div class="p-form-input-title" @click="openEditTitleDrawer">
              <div class="p-form-input-title-overray"></div>
              <h2 class="text-center mb-5">{{ formThanksHead.title }}</h2>
              <p class="text-center">
                {{ formThanksHead.description }}
              </p>
            </div>

            <!-- コンテンツ(資料)の画面表示 -->
            <div v-if="thanksPDF" style="position:relative;" @click="onClickThanksItem(formThanksItems[0])">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <!-- <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn> -->
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="mb-4">{{thanksPDF}}</div>
            </div>

            <!-- 埋め込み(日程調整ツール推奨)の画面表示 -->
            <div v-if="html" style="position:relative;" @click="onClickThanksItem(formThanksItems[1])">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <!-- <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn> -->
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="mb-4" v-html="html"></div>
            </div>

            <!-- 外部ページリンクの画面表示 -->
            <div v-if="thanksRedirect.url" class="text-center" style="position:relative;" @click="onClickThanksItem(formThanksItems[2])">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <!-- <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn> -->
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

      </div><!-- c-main-form-edit-contents -->

    </div><!-- フォーム編集のメイン画面 -->

  </div>

</template>


<script>
export default {
  props: ["completeForms", "formId", "completeFormId"],
  mounted() {
    // console.log(this.completeForms)
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
      this.formThanksHead = this.completeForms.formThanksHead
    }
  },
  data:()=>({
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
    selectThanksItem: "",
    thanksView: false,
    editTitleThanksView: false,

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
    formThanksHead: {
      title: "お問い合わせいただきありがとございます",
      description: "お問い合わせいただきありがとうございました\nお送りした内容をご確認の上、担当者より折り返しご連絡させていただきます。"
    },
  }),
  methods: {
    onClickThanksItem(item) {
      this.thanksView = !this.thanksView
      this.selectThanksItem = item
    },
    onClickOpenThanksDrawer() {
      this.thanksView = !this.thanksView
    },
    openEditTitleDrawer() {
      this.editTitleThanksView = !this.editTitleThanksView
    },
    //ストレージにアップロードしてるんだぞっ
    async onSelectContent(e){
      // console.log(e);
      const file = e.target.files[0]
      if (file) {
        this.thanksPDF = file
        const reader = new FileReader()
        reader.readAsDataURL(file)
        const storageRef = this.$fireStorage.ref().child("file.pdf")
        await storageRef.put(file)
        const url = await storageRef.getDownloadURL()
        // console.log(url)
      }
    },
    async submitSave() {
      const postData = {
        innerWidth: this.innerWidth,
        html: this.html,
        allowDownload: this.allowDownload,
        thanksPDF: this.thanksPDF, 
        thanksRedirect: {
          url: this.thanksRedirect.url,
          label: this.thanksRedirect.label,
        },
        formThanksHead: {
          title: this.formThanksHead.title,
          description: this.formThanksHead.description
        }
      }
      if (this.completeForms) {
        const res = await this.$functions.httpsCallable("updateCompleteForms")(
          {
            postData:postData,
            completeFormId: this.completeFormId
          }
        )
      } else {
        const res = await this.$functions.httpsCallable("addCompleteForms2Forms")(
          {
            postData:postData,
            completeFormId: this.completeFormId
          }
        )
      }
      // console.log(postData);
    }
  }
}
</script>
