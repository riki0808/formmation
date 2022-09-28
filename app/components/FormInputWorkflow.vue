<template>
  <div class="c-forms_main">

    <!-- メール用のサイドバー -->
    <div class="p-workflow-mail-side-bar c-bd-right" :class="{active: sideMailView}">
      <nav class="c-forms-select-item-edit-nav">
        <v-btn
          tile
          color="grey"
          text
          class="font-weight-black"
          @click="onClickOpenWorkflowMailDrawer"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          完了
        </v-btn>
      </nav>
      <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 150px);">
        <div class="mb-6">
          <p class="font-weight-bold text-body-2 mb-2">メールを送信</p>
        </div>
        <div class="text-caption mb-2">
          <p class="mb-2">Eメール名</p>
          <input type="text" class="c-form-group-item-inp inp--type2 type--1">
        </div>
        <div class="text-caption mb-2">
          <p class="mb-2">送信社名</p>
          <input type="text" class="c-form-group-item-inp inp--type2 type--1">
        </div>
        <div class="text-caption mb-2">
          <p class="mb-2">送信者アドレス</p>
          <input type="text" class="c-form-group-item-inp inp--type2 type--1">
        </div>
        <div class="text-caption mb-2">
          <p class="mb-2">件名</p>
          <input type="text" class="c-form-group-item-inp inp--type2 type--1">
        </div>
        <div class="text-caption mb-2">
          <p class="mb-2">本文</p>
          <textarea class="c-form-group-item-inp inp--type2 type--1" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="text-caption mb-5">
          <p class="mb-2">Eメールフッター</p>
          <textarea class="c-form-group-item-inp inp--type2 type--1" name="" id="" cols="30" rows="5"></textarea>
        </div>
        <div>
          <button class="p-workflow-mail-side-bar-submit" type="submit prymary">Eメールを保存</button>
        </div>

      </div>
    </div>

    <!-- ディレイ用のサイドバー -->
    <div class="p-workflow-delay-side-bar c-bd-right" :class="{active: sideDelayView}">
      <nav class="c-forms-select-item-edit-nav">
        <v-btn
          tile
          color="grey"
          text
          class="font-weight-black"
          @click="onClickOpenWorkflowDelayDrawer"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          完了
        </v-btn>
      </nav>
      <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 150px);">
        <div class="mb-6">
          <p class="font-weight-bold text-body-2 mb-2">次のアクションまで時間を遅延</p>
        </div>
        
        <div class="d-flex justify-space-between">
          <div style="width:49%;">
            <p class="mb-1 text-caption">日</p>
            <input type="number" class="c-form-group-item-inp inp--type3 type--1" min="0" max="31">
          </div>
          <div style="width:49%;">
            <p class="mb-1 text-caption">時間</p>
            <input type="number" class="c-form-group-item-inp inp--type3 type--1" min="0" max="24">
          </div>
        </div>

      </div>
    </div>

    <!-- フォーム編集の左サイドバー -->
    <div class="p-workflow_side-bar c-bd-right" :class="{nonActive: sideMainView}">
      <nav class="c-forms-select-item-edit-nav">
        <v-btn
          tile
          color="grey"
          text
          class="font-weight-black"
          @click="onClickOpenWorkflowDrawer"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          閉じる
        </v-btn>
      </nav>
      <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 112px);">
        <div class="mb-3">
          <p class="font-weight-bold text-body-2 mb-2">タイミング</p>
          <v-btn
            tile
            class="text-caption justify-start grey--text shadow-none main mb-3"
            style="width:100%;"
            @click="onClickOpenWorkflowDelayDrawer"
          >
            <v-icon left>
              mdi-history
            </v-icon>
            次のアクションまで時間を遅延
          </v-btn>
        </div>
        <div class="mb-3">
          <p class="font-weight-bold text-body-2 mb-2">メール</p>
          <v-btn
            tile
            class="text-caption justify-start grey--text shadow-none main mb-3"
            style="width:100%;"
            @click="onClickOpenWorkflowMailDrawer"
          >
            <v-icon left>
              mdi-email-fast
            </v-icon>
            メールを送信
          </v-btn>
        </div>
      </div>
    </div>

    <div class="p-workflow_container pt-13" :class="{nonActive: mainView}">

      <div class="d-flex justify-center">
        <v-card
          class="c-bd-all"
          width="300"
          evolution="24"
        >
          <v-card-title class="text-caption c-bd-bottom py-2 px-4 font-weight-bold grey--text">
            <v-icon left>mdi-power-standby</v-icon>
            トリガー
          </v-card-title>
          <v-card-text class="pa-4 c-font-10">
            訪問者がこの【お問い合わせ】フォームを送信したとき
          </v-card-text>
        </v-card>
      </div>

      <div class="d-flex justify-center">
        <div class="c-workflow-vertical-line">
          <v-btn icon large class="c-workflow-vertical-line-plus-icon" @click="onClickOpenWorkflowDrawer">
            <v-icon color="primary">mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        mainView: false,
        sideMainView: false,
        sideMailView: false,
        sideDelayView: false,
        wrokflowItems: [],
      }
    },
    methods: {
      onClickOpenWorkflowDrawer() {
        this.mainView = !this.mainView
        this.sideMainView = !this.sideMainView
      },
      onClickOpenWorkflowMailDrawer() {
        this.sideMainView = !this.sideMainView
        this.sideMailView = !this.sideMailView
      },
      onClickOpenWorkflowDelayDrawer() {
        this.sideMainView = !this.sideMainView
        this.sideDelayView = !this.sideDelayView
      }
    },
  }
</script>
