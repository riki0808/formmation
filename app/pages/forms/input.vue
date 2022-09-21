<template>
  <section>

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

        <div class="c-forms_main d-flex">

          <!-- フォーム編集の左サイドバー -->
          <div class="c-forms_side-bar c-bd-right">
            
            <v-tabs
              v-model="formEdit"
              fixed-tabs
              background-color="main"
              hide-slider
            >

              <v-tab
                v-for="(formEditTab, i) in formEditTabs"
                :key="i"
                active-class="form-edit-tab-active"
                class="c-bd-all grey--text font-weight-bold"
              >
                {{ formEditTab.name }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="formEdit">

              <!-- 以下【項目】のUI -->
              <v-tab-item transition="fade-transition">
                <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 160px);">

                  <!-- よく使う項目 -->
                  <div class="mb-5">
                    <p class="font-weight-bold text-body-2">よく使う項目</p>
                    <v-btn
                      v-for="(fav, n) in formEditItems[0].favs"
                      :key="n"
                      tile
                      class="text-caption justify-start grey--text shadow-none main mb-3"
                      style="width:100%;"
                    >
                      <v-icon left>
                        {{ fav.icon }}
                      </v-icon>
                      {{ fav.text }}
                    </v-btn>
                  </div>

                  <!-- 便利な項目 -->
                  <div class="mb-5">
                    <p class="font-weight-bold text-body-2">便利な項目</p>
                    <v-btn
                      v-for="(fav, n) in formEditItems[1].convs"
                      :key="n"
                      tile
                      class="text-caption justify-start grey--text shadow-none main mb-3"
                      style="width:100%;"
                    >
                      <v-icon left>
                        {{ fav.icon }}
                      </v-icon>
                      {{ fav.text }}
                    </v-btn>
                  </div>

                  <!-- ブロック -->
                  <div class="mb-5">
                    <p class="font-weight-bold text-body-2">ブロック</p>
                    <v-btn
                      v-for="(fav, n) in formEditItems[2].blocks"
                      :key="n"
                      tile
                      class="text-caption justify-start grey--text shadow-none main mb-3"
                      style="width:100%;"
                    >
                      <v-icon left>
                        {{ fav.icon }}
                      </v-icon>
                      {{ fav.text }}
                    </v-btn>
                  </div>

                </div>
              </v-tab-item>

              <!-- 以下【スタイル】のUI -->
              <v-tab-item transition="fade-transition">
                <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 160px);">

                  <!-- 「全体」部分 -->
                  <div class="mb-10">
                    <p class="font-weight-bold text-body-2">全体</p>
                    <div class="c-font-10">
                      <p style="margin-bottom:4px!important">幅</p>
                      <input class="px-2 py-1  c-bd-all mr-2 text-caption" type="number"><span>％</span>
                    </div>
                  </div>

                  <!-- 「デザイン」部分 -->
                  <div class="mb-10">
                    <p class="font-weight-bold text-body-2">デザイン</p>
                    <div class="c-font-10 d-flex flex-wrap justify-space-between">

                      <div style="width:48%;">
                        <p style="margin-bottom:4px!important">角・グレー</p>
                        <v-btn
                          class="c-form_edit_style_design-btn mb-2"
                          tile
                          plain
                          large
                        >
                          <div class="c-form_edit_style_design-btn-shape shape--type1"></div>
                        </v-btn>
                      </div>

                      <div style="width:48%;">
                        <p style="margin-bottom:4px!important">角・白</p>
                        <v-btn
                          class="c-form_edit_style_design-btn mb-2"
                          tile
                          plain
                          large
                        >
                          <div class="c-form_edit_style_design-btn-shape shape--type3"></div>
                        </v-btn>
                      </div>

                      <div style="width:48%;">
                        <p style="margin-bottom:4px!important">丸・グレー</p>
                        <v-btn
                          class="c-form_edit_style_design-btn mb-2"
                          tile
                          plain
                          large
                        >
                          <div class="c-form_edit_style_design-btn-shape shape--type2"></div>
                        </v-btn>
                      </div>

                      <div style="width:48%;">
                        <p style="margin-bottom:4px!important">丸・白</p>
                        <v-btn
                          class="c-form_edit_style_design-btn mb-2"
                          tile
                          plain
                          large
                        >
                          <div class="c-form_edit_style_design-btn-shape shape--type4"></div>
                        </v-btn>
                      </div>

                    </div>
                  </div>

                  <!-- 「ボタン」部分 -->
                  <div class="mb-10">
                    <p class="font-weight-bold text-body-2">ボタン</p>

                    <div class="c-font-10 mb-3">
                      <p style="margin-bottom:4px!important">ボタンの色</p>
                      <div class="d-flex justify-left align-center">
                        <span>#</span>
                        <input class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                        <input class="c-form_edit_style-color-picker" type="color">
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">

                      <div class="c-font-10">
                        <p style="margin-bottom:4px!important">テキストの色</p>
                        <div class="d-flex justify-left align-center">
                          <span>#</span>
                          <input class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                          <input class="c-form_edit_style-color-picker" type="color">
                        </div>
                      </div>

                      <div class="c-font-10">
                        <p style="margin-bottom:4px!important">サイズ</p>
                        <div class="d-flex justify-left align-center">
                          <input class="px-2 py-1 c-bd-all text-caption" type="number">
                        </div>
                      </div>

                    </div>

                  </div>

                  <!-- 「テキスト」部分 -->
                  <div class="mb-10">
                    <p class="font-weight-bold text-body-2">テキスト</p>
                    <div class="c-font-10 mb-5">
                      <p style="margin-bottom:4px!important">フォント</p>
                      <select class="w-100 c-bd-all text-caption px-2 py-1" name="" id="">
                        <option value="游ゴシック">游ゴシック</option>
                        <option value="游ゴシック">游ゴシック</option>
                        <option value="游ゴシック">游ゴシック</option>
                        <option value="游ゴシック">游ゴシック</option>
                        <option value="游ゴシック">游ゴシック</option>
                        <option value="游ゴシック">游ゴシック</option>
                        <option value="游ゴシック">游ゴシック</option>
                      </select>
                    </div>

                    <div class="d-flex justify-space-between align-center mb-3">

                      <div class="c-font-10">
                        <p style="margin-bottom:4px!important">ラベルの色</p>
                        <div class="d-flex justify-left align-center">
                          <span>#</span>
                          <input class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                          <input class="c-form_edit_style-color-picker" type="color">
                        </div>
                      </div>

                      <div class="c-font-10">
                        <p style="margin-bottom:4px!important">サイズ</p>
                        <div class="d-flex justify-left align-center">
                          <input class="px-2 py-1 c-bd-all text-caption" type="number">
                        </div>
                      </div>

                    </div>

                    <div class="d-flex justify-space-between align-center">

                      <div class="c-font-10">
                        <p style="margin-bottom:4px!important">補足説明の色</p>
                        <div class="d-flex justify-left align-center">
                          <span>#</span>
                          <input class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                          <input class="c-form_edit_style-color-picker" type="color">
                        </div>
                      </div>

                      <div class="c-font-10">
                        <p style="margin-bottom:4px!important">サイズ</p>
                        <div class="d-flex justify-left align-center">
                          <input class="px-2 py-1 c-bd-all text-caption" type="number">
                        </div>
                      </div>

                    </div>

                  </div><!-- 「テキスト」部分 -->

                </div>
              </v-tab-item>
              
            </v-tabs-items>

          </div>

          <!-- フォーム編集のメイン画面 -->
          <div class="c-forms_container">

            <div class="white c-main-form-edit-contents overflow-auto" style="width:100%; height:100%;">

              <div class="c-main-form-edit-contents-inner mb-15">

                <div>

                  <div>
                    <h2 class="text-center mb-5">お問い合わせ</h2>
                    <p class="text-center">お気軽にご相談ください</p>
                  </div>
  
                  <div class="c-form-group">
  
                    <div class="d-flex justify-space-between">
  
                      <div class="c-form-group-item-sub">
                        <div class="c-form-group-item-label-flex">
                          <p class="c-form-group-item-label">お名前(姓)</p>
                          <span class="c-form-group-item-val hissu">必須</span>
                        </div>
                        <div class="c-form-group-item-inp-frame">
                          <input type="text" class="c-form-group-item-inp inp--type1" placeholder="山田">
                        </div>
                      </div>
  
                      <div class="c-form-group-item-sub">
                        <div class="c-form-group-item-label-flex">
                          <p class="c-form-group-item-label">お名前(名)</p>
                          <span class="c-form-group-item-val hissu">必須</span>
                        </div>
                        <div class="c-form-group-item-inp-frame">
                          <input type="text" class="c-form-group-item-inp inp--type1" placeholder="太郎">
                        </div>
                      </div>
  
                    </div>
  
                  </div>
  
                  <div class="c-form-group">
  
                    <div class="c-form-group-item">
                      <div class="c-form-group-item-label-flex">
                        <p class="c-form-group-item-label">会社名</p>
                        <span class="c-form-group-item-val ninni">任意</span>
                      </div>
                      <div class="c-form-group-item-inp-frame">
                        <input type="text" class="c-form-group-item-inp inp--type2" placeholder="株式会社◯◯">
                      </div>
                    </div>
  
                  </div>

                </div><!-- inner -->

              </div><!-- c-main-form-edit-contents-inner -->

            </div><!-- c-main-form-edit-contents -->
            
          </div><!-- c-forms_container -->

        </div><!-- c-forms_main -->

      </v-tab-item><!-- 以上【入力画面】のUI -->
      
      <!-- 以下【完了画面】のUI -->
      <v-tab-item transition="fade-transition">

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
                {{formThanksTab.name}}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="formThanks">
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
              </v-tab-item>
              <v-tab-item transition="fade-transition">
                <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 160px);">
                  <!-- 「全体」部分 -->
                  <div class="mb-10">
                    <p class="font-weight-bold text-body-2">全体</p>
                    <div class="c-font-10">
                      <p style="margin-bottom:4px!important">幅</p>
                      <input class="px-2 py-1  c-bd-all mr-2 text-caption" type="number"><span>％</span>
                    </div>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </div>

          <div class="c-forms_container">
                        <div class="white c-main-form-edit-contents overflow-auto" style="width:100%; height:100%;">

              <div class="c-main-form-edit-contents-inner mb-15">

                <div>

                  <div>
                    <h2 class="text-center mb-5">お問い合わせいただきありがとうございます</h2>
                    <p class="text-center">
                      お問い合わせいただきありがとうございました。<br>お送りいただきました内容を確認の上、担当者より折り返しご連絡させていただきます。
                    </p>
                  </div>

                </div><!-- inner -->

              </div><!-- c-main-form-edit-contents-inner -->

            </div><!-- c-main-form-edit-contents -->
          </div>

        </div>

      </v-tab-item><!-- 以上【完了画面】のUI -->

      <!-- 以下【自動化】のUI -->
      <v-tab-item transition="fade-transition">

        <div class="c-forms_main d-flex">

          <!-- フォーム編集の左サイドバー -->
          <div class="c-forms_side-bar">
            3
          </div>

          <div class="c-forms_container">
            
          </div>

        </div>

      </v-tab-item><!-- 以上【自動化】のUI -->

      <!-- 以下【その他設定】のUI -->
      <v-tab-item transition="fade-transition">

        <div class="c-forms_main d-flex">

          <!-- フォーム編集の左サイドバー -->
          <div class="c-forms_side-bar">
            4
          </div>

          <div class="c-forms_container">
            
          </div>

        </div>

      </v-tab-item><!-- 以上【その他設定】のUI -->

    </v-tabs-items>

  </section>
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
      formEdit: 0,
      formEditTabs: [
        {
          name: "項目"
        },
        {
          name: "スタイル"
        },
      ],
      formEditItems: [
        {
          favs: [
            {
              icon: "mdi-human-male",
              text: "名前（姓名別）",
            },
            {
              icon: "mdi-email-outline",
              text: "メールアドレス",
            },
            {
              icon: "mdi-phone",
              text: "電話番号",
            },
            {
              icon: "mdi-human-male-male",
              text: "性別",
            },
            {
              icon: "mdi-calendar-month-outline",
              text: "生年月日",
            },
            {
              icon: "mdi-home-outline",
              text: "住所",
            },
            {
              icon: "mdi-map-marker-outline",
              text: "都道府県",
            },
            {
              icon: "mdi-card-account-details-outline",
              text: "ご職業",
            },
            {
              icon: "mdi-domain",
              text: "業種",
            },
            {
              icon: "mdi-web",
              text: "認知経路",
            },
            {
              icon: "mdi-checkbox-marked",
              text: "規約に同意する",
            },
          ],
        },
        {
          convs: [
            {
              icon: "mdi-form-textbox",
              text: "1行テキスト"
            },
            {
              icon: "mdi-form-textarea",
              text: "複数行テキスト"
            },
            {
              icon: "mdi-numeric",
              text: "数値"
            },
            {
              icon: "mdi-dns-outline",
              text: "尺度ボタン"
            },
            {
              icon: "mdi-form-select",
              text: "選択"
            },
            {
              icon: "mdi-image-size-select-actual",
              text: "画像選択"
            },
            {
              icon: "mdi-calendar-month-outline",
              text: "日付"
            },
            {
              icon: "mdi-file-upload-outline",
              text: "ファイルアップロード"
            },
          ],
        },
        {
          blocks: [
            {
              icon: "mdi-text",
              text: "説明テキスト"
            },
            {
              icon: "mdi-image-size-select-actual",
              text: "画像"
            },
            {
              icon: "mdi-code-braces",
              text: "メディア埋め込み"
            },
          ]
        }
      ],// formEditItems
      formThanks: 0,
      formThanksTabs: [
        {
          name: "項目"
        },
        {
          name: "スタイル"
        }
      ],
      formThanksItems: [
        {
          icon: "mdi-file-plus-outline",
          text: "コンテンツ(資料)",
        },
        {
          icon: "mdi-code-braces",
          text: "埋め込み(日程調整ツール推奨)",
        },
        {
          icon: "mdi-link-variant-plus",
          text: "外部ページへのリンク",
        },
      ]
    }
  }
}
</script>

