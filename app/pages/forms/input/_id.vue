<template>
  <section style="overflow: hidden;position: fixed;width: 100%;">

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
        <form-input-edit></form-input-edit>
      </v-tab-item><!-- 以上【入力画面】のUI -->
      
      <!-- 以下【完了画面】のUI -->
      <v-tab-item transition="fade-transition">
        <form-input-thanks></form-input-thanks>
      </v-tab-item><!-- 以上【完了画面】のUI -->

      <!-- 以下【自動化】のUI -->
      <v-tab-item transition="fade-transition">
        <form-input-workflow></form-input-workflow>
      </v-tab-item><!-- 以上【自動化】のUI -->

      <!-- 以下【その他設定】のUI -->
      <v-tab-item transition="fade-transition">
        <form-input-setting></form-input-setting>
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
    }
  },
  methods:{

  }
}
</script>

