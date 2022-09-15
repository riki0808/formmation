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
          :to="template.to"
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
    data() {
      return {
        templates: [
          {
            title: "新規作成",
            css: "white grey--text d-flex align-center justify-center font-weight-bold text-body-2",
            items: [
              "テンプレートを使わず作成"
            ],
            to: "/forms/input",
          },
          {
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
    }
  }
</script>
