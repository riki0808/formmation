<template>
  <div class="c-forms_main c-grey scrollable">

    <!-- メール用のドロワー -->
    <div v-if="workflowItems[currentIndex]">
      <div class="p-workflow-mail-side-bar c-bd-right" :class="{active: sideMailView}">
        <!-- 完了ボタンがあるよ -->
        <nav class="c-forms-select-item-edit-nav">
          <v-btn
            tile
            color="grey"
            text
            class="font-weight-black"
            @click="drawerOff"
          >
            <v-icon left>
              mdi-chevron-left
            </v-icon>
            完了{{currentIndex}}
          </v-btn>
        </nav>
        <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 150px);">
          <div class="mb-6">
            <p class="font-weight-bold text-body-2 mb-2">メールを送信</p>
          </div>
          <div class="text-caption mb-2">
            <p class="mb-2">Eメール名</p>
            <input v-model="workflowItems[currentIndex].title" type="text" class="c-form-group-item-inp inp--type2 type--1">
          </div>
          <div class="text-caption mb-2">
            <p class="mb-2">送信社名</p>
            <input v-model="workflowItems[currentIndex].sender" type="text" class="c-form-group-item-inp inp--type2 type--1">
          </div>
          <div class="text-caption mb-2">
            <p class="mb-2">送信者アドレス</p>
            <input v-model="workflowItems[currentIndex].senderAddress" type="text" class="c-form-group-item-inp inp--type2 type--1">
          </div>
          <div class="text-caption mb-2">
            <p class="mb-2">件名</p>
            <input v-model="workflowItems[currentIndex].subject" type="text" class="c-form-group-item-inp inp--type2 type--1">
          </div>
          <div class="text-caption mb-2">
            <p class="mb-2">本文</p>
            <textarea v-model="workflowItems[currentIndex].body" class="c-form-group-item-inp inp--type2 type--1" name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div class="text-caption mb-5">
            <p class="mb-2">Eメールフッター</p>
            <textarea v-model="workflowItems[currentIndex].footer" class="c-form-group-item-inp inp--type2 type--1" name="" id="" cols="30" rows="5"></textarea>
          </div>
          <div>
            <button class="p-workflow-mail-side-bar-submit" type="submit prymary">Eメールを保存</button>
          </div>

        </div>

      </div>
    </div>

    <!-- ディレイ用のドロワー -->
    <div v-if="workflowItems[currentIndex]">
      <div class="p-workflow-delay-side-bar c-bd-right" :class="{active: sideDelayView}">
        <!-- 完了ボタンがあるよ -->
        <nav class="c-forms-select-item-edit-nav">
          <v-btn
            tile
            color="grey"
            text
            class="font-weight-black"
            @click="drawerOff"
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
              <input v-model="workflowItems[currentIndex].day" type="number" class="c-form-group-item-inp inp--type3 type--1" min="0" max="31">
            </div>
            <div style="width:49%;">
              <p class="mb-1 text-caption">時間</p>
              <input v-model="workflowItems[currentIndex].hour" type="number" class="c-form-group-item-inp inp--type3 type--1" min="0" max="24">
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- アクション選択ドロワー -->
    <div class="p-workflow_side-bar c-bd-right" :class="{nonActive: sideMainView}">
      <!-- 閉じるボタンがあるよ -->
      <nav class="c-forms-select-item-edit-nav">
        <v-btn
          tile
          color="grey"
          text
          class="font-weight-black"
          @click="drawerOff"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          閉じる
        </v-btn>
      </nav>
      <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 150px);">
        <!-- ディレイの選択カード -->
        <div class="mb-3">
          <p class="font-weight-bold text-body-2 mb-2">タイミング</p>
          <v-btn
            tile
            class="text-caption justify-start grey--text shadow-none main mb-3"
            style="width:100%;"
            @click="openDlayDrawer(); onClickDelayCard(currentIndex)"
          >
            <v-icon left>
              mdi-history
            </v-icon>
            次のアクションまで時間を遅延
          </v-btn>
        </div>
        <!-- メールの選択カード -->
        <div class="mb-3">
          <p class="font-weight-bold text-body-2 mb-2">メール</p>
          <v-btn
            tile
            class="text-caption justify-start grey--text shadow-none main mb-3"
            style="width:100%;"
            @click="openMailDrawer(); onClickMailCard()"
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
      <div v-for="(workflowItem, i) in workflowItems" :key="i">
        <!-- デフォルト用のカード -->
        <div class="d-flex justify-center" v-if="workflowItem.type == 'default'">
          <v-card
            class="c-bd-all"
            width="300"
            evolution="24"
          >
            <v-card-title class="text-caption c-bd-bottom py-2 px-4 font-weight-bold grey--text">
              <v-icon left>{{workflowItem.icon}}</v-icon>
              {{workflowItem.name}}

              <v-spacer></v-spacer>

              <p v-if="inputForms == null" class="mb-0"></p>
              <v-btn v-else color="primary" small class="font-weight-black" @click="formareaEvent">編集</v-btn>

            </v-card-title>
            <v-card-text class="pa-4 c-font-10">
              <v-btn v-if="inputForms == null" width="100%" color="primary" class="font-weight-black" @click="formareaEvent">
                はじめにフォームを作成する
              </v-btn>
              <p v-else class="mb-0">{{ workflowItem.title }}</p>
            </v-card-text>
          </v-card>
        </div>

        <!-- ディレイ用のカード -->
        <div class="d-flex justify-center" v-else-if="workflowItem.type == 'delay'">
          <v-card
            class="c-bd-all position-relative workflow-main-card"
            width="300"
            evolution="24"
            @click="editDelay(i)"
          >
            <v-btn class="mx-1 c-workflow-trash-btn" fab dark small color="#475a74" @click="deleteCard(i)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
            <v-card-title class="text-caption c-bd-bottom py-2 px-4 font-weight-bold grey--text">
              <v-icon left>{{workflowItem.icon}}</v-icon>
              {{workflowItem.name}}
            </v-card-title>
            <v-card-text class="pa-4 c-font-10">
              {{workflowItem.day}}日-{{workflowItem.hour}}時間後
            </v-card-text>
          </v-card>
        </div>

        <!-- メール用のカード -->
        <div class="d-flex justify-center" v-else>
          <v-card
            class="c-bd-all position-relative workflow-main-card"
            width="300"
            evolution="24"
            @click="editMail(i)"
          >
            <v-btn class="mx-1 c-workflow-trash-btn" fab dark small color="#475a74" @click="deleteCard(i)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
            <v-card-title class="text-caption c-bd-bottom py-2 px-4 font-weight-bold grey--text">
              <v-icon left>{{workflowItem.icon}}</v-icon>
              {{workflowItem.name}}
            </v-card-title>
            <v-card-text class="pa-4 c-font-10">
              {{workflowItem.title}}
            </v-card-text>
          </v-card>
        </div>

        <!-- 以下プラスボタン -->
        <div class="d-flex justify-center">
          <div class="c-workflow-vertical-line">
            <v-btn icon large class="c-workflow-vertical-line-plus-icon" @click="openWorkflowDrawer(i)">
              <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
          </div>
        </div>

      </div>

    </div>


  </div>
</template>

<script>
  export default {
    props: ["formId","workflows","workflowId","inputForms","inputFormId"],
    data() {
      return {
        mainView: false,
        sideMainView: false,
        sideMailView: false,
        sideDelayView: false,
        currentIndex: 0,
        workflowItems: [
          {
            type: "default",
            icon: "mdi-power-standby",
            name: "フォーム",
            title: "訪問者がこのフォームを送信したとき",
          },
        ],
      }
    },
    mounted() {
      console.log('inputForms', this.inputForms )
    },
    methods: {
      drawerOff() {
        this.sideMainView = false
        this.sideMailView = false
        this.sideDelayView = false
        this.mainView = false
      },
      openDlayDrawer() {
        this.sideMainView = false
        this.sideDelayView = true
      },
      openMailDrawer() {
        this.sideMainView = false
        this.sideMailView = true
      },
      openWorkflowDrawer(index) {
        this.mainView = true
        this.sideMainView = true
        this.sideMailView = false
        this.sideDelayView = false
        this.currentIndex = index + 1
        this.workflowItems.splice(this.currentIndex,0,{
          type: "new",
          icon: "mdi-plus-circle-outline",
          name: "新規作成",
          title: "アクションの選択"
        })
        // console.log(this.currentIndex)
      },
      onClickMailCard() {
        this.workflowItems.splice(this.currentIndex,1,{
          type: "mail",
          icon: "mdi-email-fast-outline",
          name: "メールを送信",
          title: "新規作成",
          sender: "",
          senderAddress: "",
          subject: "",
          body: "",
          footer: "",
        })
      },
      onClickDelayCard() {
        this.workflowItems.splice(this.currentIndex,1,{
          type: "delay",
          icon: "mdi-timer-sand-empty",
          name: "次のタイミングまで時間を遅延",
          day: 0,
          hour: 0,
        })
      },
      editMail(index) {
        if(this.workflowItems[index].type == 'new') {
          this.sideMainView = true
          this.currentIndex = index
          // console.log(this.currentIndex)
        } else {
          this.sideMailView = true
          this.mainView = true
          this.currentIndex = index
          // console.log(this.currentIndex)
        }
      },
      editDelay(index) {
        if(this.workflowItems[index].type == 'new') {
          this.sideMainView = true
          this.currentIndex = index
          // console.log(this.currentIndex)
        } else {
          this.sideDelayView = true
          this.mainView = true
          this.currentIndex = index
          // console.log(this.currentIndex)
        }
      },
      deleteCard(index) {
        this.currentIndex = index
        this.workflowItems.splice(this.currentIndex, 1)
        this.sideMainView = false
        this.mainView = false
      },
      formareaEvent() {
        this.$nuxt.$emit('formareaEvent')
      }

    },
  }
</script>
