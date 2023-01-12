<template>
  <div class="c-forms_main c-grey scrollable">

    <!-- 右側の設定項目部分だよん -->
    <div class="p-workflow-setting-drawer" :class="{active: settingEditView}">
      <v-list class="pa-0">
        <!-- ここはfor文で回してる -->
        <v-btn
          block
          tile
          depressed
          large
          color="white"
          v-for="(item, i) in settingItems"
          :key="i"
          @click="onClickSettingItem(item)"
        >
          <v-list-item-title class="d-flex align-center text-body-2 font-weight-black" style="color:#5e5f5f">
            <v-icon small class="mr-2">{{item.icon}}</v-icon>
            <span :class="{isNone: settingItemsTextView}">{{item.name}}</span>
          </v-list-item-title>
        </v-btn>
        <!-- ここだけダイアログを使いたかったからforから外して追記 -->
        <v-dialog width="700px">
          <template v-slot:activator="{attrs, on}">
            <v-btn
              depressed
              large
              color="white"
              v-bind="attrs"
              v-on="on"
              @click="settingItemsTextView = false, settingEditView = false"
            >
              <v-list-item-title class="d-flex align-center text-body-2 font-weight-black" style="color:#5e5f5f">
                <v-icon small class="mr-2">mdi-share-variant-outline</v-icon>
                <span :class="{isNone: settingItemsTextView}">共有・埋め込み</span>
              </v-list-item-title>
            </v-btn>
          </template>
          <v-card class="pa-15">
            <p class="text-center text-subtitle-1 font-weight-black mb-10" style="color:#33343c;">共有リンク・埋め込みコードのコピー</p>
            <div class="d-flex justify-space-between">

              <!-- 共有リンク -->
              <v-card
                width="49%"
                color="white"
                class="pa-7 text-center"
              >
                <p class="font-weight-black">共有リンク</p>
                <p class="text-caption">既存のテンプレートを選択して、<br>フォーム〜ワークフローを作成します。</p>
                <input class="c-form-group-item-inp type--1 inp--type2 mb-4" type="text" :value="`https://formwork.com/form/${formId}`" readonly>
                <v-btn block color="primary" class="text-caption font-weight-black">
                  <v-icon small class="mr-1">mdi-checkbox-multiple-blank</v-icon>
                  フォームリンクをコピー
                </v-btn>
              </v-card>

              <!-- 埋め込みコード -->
              <v-card
                width="49%"
                color="white"
                class="pa-7 text-center"
              >
                <p class="font-weight-black">埋め込みコード</p>
                <p class="text-caption">既存のテンプレートを選択して、<br>フォーム〜ワークフローを作成します。</p>
                <textarea class="c-form-group-item-inp type--1 inp--type2 mb-4" style="height:60px;" readonly>ちょっと待ってね後でやるからねあああああああああああああああああああああああ</textarea>
                <v-btn block color="primary" class="text-caption font-weight-black">
                  <v-icon small class="mr-1">mdi-checkbox-multiple-blank</v-icon>
                  フォームリンクをコピー
                </v-btn>
              </v-card>

            </div>
          </v-card>
        </v-dialog>
      </v-list>
    </div>

    <!-- 各種設定変更画面のマークアップ -->
    <div class="p-workflow-setting-edit overflow-auto" :class="{active: settingEditView}">

      <!-- 「フォーム設定」の設定画面 -->
      <div v-if="currentSettingItem.type == 'formSet'" class="pa-4">
        <div class="d-flex justify-space-between align-center mb-3">
          <v-btn
            tile
            color="grey"
            text
            class="font-weight-black pa-0"
            @click="settingEditView = false, settingItemsTextView = false"
          >
            <v-icon left>
              mdi-chevron-right
            </v-icon>
            閉じる
          </v-btn>
          <v-btn color="main" small class="font-weight-black" @click="onClickUpdateFormSetting">保存</v-btn>
        </div>
        <p class="text-body-2 font-weight-black mb-8">{{ currentSettingItem.name }}</p>
        <p class="text-caption font-weight-black">フォーム名</p>
        <input type="text" class="c-form-group-item-inp type--1 inp--type4 mb-5" v-model="formData.title">
        <p class="text-caption font-weight-black">詳細説明</p>
        <textarea class="c-form-group-item-inp type--1 inp--type4 mb-5" cols="30" rows="10" v-model="formData.description"></textarea>
        <p class="text-caption font-weight-black mb-0">公開ページ設定</p>
        <div class="d-flex align-center justify-space-between" style="height: 35px;">
          <span class="text-caption">ワークフローの表示</span>
          <v-switch inset v-model="formData.isShow"></v-switch>
        </div>
      </div>

      <!-- 「通知設定」の設定画面 -->
      <div v-else-if="currentSettingItem.type == 'remindSet'" class="pa-4">
        <div class="d-flex justify-space-between align-center mb-3">
          <v-btn
            tile
            color="grey"
            text
            class="font-weight-black pa-0"
            @click="settingEditView = false, settingItemsTextView = false"
          >
            <v-icon left>
              mdi-chevron-right
            </v-icon>
            閉じる
          </v-btn>
          <v-btn color="main" small class="font-weight-black">保存</v-btn>
        </div>
        <p class="text-body-2 font-weight-black mb-8">{{ currentSettingItem.name }}</p>
        <p class="text-caption font-weight-black mb-0">アクションの通知設定</p>
        <div class="d-flex align-center justify-space-between mb-3" style="height: 35px;">
          <span class="text-caption">すべてのアクション実行後に通知を受け取る</span>
          <v-switch inset v-model="allNotification" @change="onChangeWorkflowItemsNotification"></v-switch>
        </div>

        <v-card
          outlined
          class="pa-2 mb-3"
          v-for="(workflowItem, i) in workflowItems"
          :key="i"
        >
          <div class="d-flex align-center">
            <v-img :src="`${workflowItem.imgUrl}`" max-width="30px" max-height="30px" class="mr-2"></v-img>
            <span class="text-caption font-weight-black grey--text">{{workflowItem.name}}</span>
          </div>
          <div class="d-flex align-center justify-space-between" style="height: 35px;">
            <span class="c-sm-fs grey--text">このアクションが実行されたら通知を受け取る</span>
            <v-switch inset v-model="workflowItem.notification"></v-switch>
          </div>
        </v-card>

        <p class="text-caption font-weight-black">通知先設定</p>
        <p class="text-caption font-weight-black">メール</p>
        <input type="text" class="c-form-group-item-inp type--1 inp--type4 mb-5">
        <p class="text-caption font-weight-black">Slack</p>
        <select class="c-form-group-item-inp type--1 inp--type4 mb-2"></select>
        <p class="text-caption text-right">新しく連携する</p>
      </div>

    </div>

    

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
            完了
          </v-btn>
        </nav>
        <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 150px);">
          <div class="mb-6 d-flex justify-space-between align-center">
            <p class="font-weight-bold text-body-2 mb-0">メールを送信</p>
            <v-btn small @click="onClickCansell">キャンセル</v-btn>
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
          <div class="mb-6 d-flex justify-space-between align-center">
            <p class="font-weight-bold text-body-2 mb-0">次のアクションまで時間を遅延</p>
            <v-btn small @click="onClickCansell">キャンセル</v-btn>
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


    <!-- ========================================================== -->
    <!-- ↓↓↓この下にアクションカードをどんどん追加していく↓↓↓ -->
    <!-- ========================================================== -->

    <!-- アクション選択ドロワー -->
    <div class="p-workflow_side-bar c-bd-right" :class="{active: sideView}">
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

        <p class="font-weight-black mb-1">次のアクションを選択してください</p>
        <p class="text-body-2">選択後、詳細の設定ができるようになります</p>


        <!-- =========================================== -->
        <!-- ここにアクションカードをどんどん追加していく -->
        <!-- =========================================== -->


        <!-- メールの選択カード -->
        <v-card outlined class="pa-2 p-workflow-chose-card mb-4" @click="onClickMailCard()">
          <div class="d-flex align-center">
            <img src="/img/action_icons/mail.png" class="mr-2" width="30" height="30" alt="">
            <p class="font-weight-black mb-0">メールを送信</p>
          </div>
          <p class="text-caption ml-9 mb-0">詳細説明</p>
        </v-card>

        <!-- ディレイの選択カード -->
        <v-card outlined class="pa-2 p-workflow-chose-card mb-4" @click="onClickDelayCard">
          <div class="d-flex align-center">
            <img src="/img/action_icons/delay.png" class="mr-2" width="30" height="30" alt="">
            <p class="font-weight-black mb-0">次のアクションを遅延</p>
          </div>
          <p class="text-caption ml-9 mb-0">詳細説明</p>
        </v-card>

        <!-- アプリ連携の選択カード -->
        <v-card outlined class="pa-2 p-workflow-chose-card mb-4">
          <div class="d-flex align-center">
            <img src="/img/action_icons/app.png" class="mr-2" width="30" height="30" alt="">
            <p class="font-weight-black mb-0">アプリと連携</p>
          </div>
          <p class="text-caption ml-9 mb-0">詳細説明</p>
        </v-card>


      </div>
    </div>

    <!-- メイン画面部分 -->
    <div class="p-workflow_container pt-13">
      <div v-for="(workflowItem, i) in workflowItems" :key="i">


      <!-- ========================================================== -->
      <!-- アクションカード毎に追加していくところです！！！！！！！！ -->
      <!-- ========================================================== -->


        <!-- デフォルト用のカード -->
        <div class="d-flex justify-center" v-if="workflowItem.type == 'default'">
          <v-card
            class="c-bd-all"
            width="300"
            evolution="24"
          >
            <v-card-title class="text-caption c-bd-bottom pa-2 font-weight-bold grey--text">
              <v-img :src="`${workflowItem.imgUrl}`" max-width="30px" max-height="30px" class="mr-2"></v-img>
              {{workflowItem.name}}

              <v-spacer></v-spacer>

              <p v-if="inputForms == null" class="mb-0"></p>
              <v-btn v-else color="primary" small class="font-weight-black" @click="formareaEvent">編集</v-btn>

            </v-card-title>
            <v-card-text class="pa-4 c-font-10">
              <v-btn v-if="inputForms == null" width="100%" color="primary" class="font-weight-black" @click="formareaEvent">
                はじめにフォームを作成する
              </v-btn>
              <p v-else class="mb-0 text-caption font-weight-black">{{ workflowItem.title }}</p>
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
            <v-card-title class="text-caption c-bd-bottom pa-2 font-weight-bold grey--text">
              <v-img :src="`${workflowItem.imgUrl}`" max-width="30px" max-height="30px" class="mr-2"></v-img>
              {{workflowItem.name}}
            </v-card-title>
            <v-card-text class="pa-4 text-caption font-weight-black">
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
            <v-card-title class="text-caption c-bd-bottom pa-2 font-weight-bold grey--text">
              <v-img :src="`${workflowItem.imgUrl}`" max-width="30px" max-height="30px" class="mr-2"></v-img>
              {{workflowItem.name}}
            </v-card-title>
            <v-card-text class="pa-4 text-caption font-weight-black">
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
    props: ["formId","workflows","workflowId","inputForms","inputFormId", "formData"],
    data() {
      return {
        sideView: false,
        sideMailView: false,
        sideDelayView: false,
        currentIndex: 0,
        
        
        allNotification: false,
        settingItemsTextView: false,
        settingEditView: false,
        settingItems: [
          {
            name:"フォーム設定",
            icon:"mdi-cog-outline",
            type:"formSet",
          },
          {
            name:"通知設定",
            icon:"mdi-bell-outline",
            type:"remindSet",
          },
          {
            name:"公開ページ",
            icon:"mdi-arrow-top-right-bold-box-outline",
            type:"publish",
          },
          {
            name:"送信履歴",
            icon:"mdi-history",
            type:"sendHistory",
          }
        ],
        currentSettingItem: {
          name:"フォーム通知",
          icon:"mdi-cog-outline",
          type:"formSet",
        },

        
        workflowItems: [
          {
            type: "default",
            icon: "mdi-power-standby",
            name: "フォーム",
            title: "訪問者がこのフォームを送信したとき",
            imgUrl: "/img/action_icons/form.png",
            notification: false,
          },
        ],
      }
    },
    mounted() {
    },
    methods: {
      // ここは設定の時にしか使ってないよ！
      onClickSettingItem(item) {
        this.currentSettingItem = item
        if ( this.currentSettingItem.type == 'publish' || this.currentSettingItem.type == 'sendHistory' ) {
          this.settingItemsTextView = false
          this.settingEditView = false
          if (this.currentSettingItem.type == 'publish') {
            this.$router.push(`/form/${this.formId}`)
          } else if (this.currentSettingItem.type == 'sendHistory') {
            this.$router.push(`/customer/${this.formId}`)
          } 
        } else {
          this.settingItemsTextView = true
          this.settingEditView = true
        }
      },
      onChangeWorkflowItemsNotification() {
        for (const item of this.workflowItems) {
          if (this.allNotification == true) {
            item.notification = true;
          } else {
            item.notification = false;
          }
        }
      },


      drawerOff() {
        this.sideView = false
        this.sideMailView = false
        this.sideDelayView = false
      },
      openWorkflowDrawer(index) {
        this.sideView = true
        this.sideMailView = false
        this.sideDelayView = false
        this.currentIndex = index + 1
        this.workflowItems.splice(this.currentIndex,0,{
          type: "new",
          name: "新規作成",
          title: "左から次のアクションを設定してください",
          imgUrl: "/img/action_icons/new.png",
          notification: false,
        })
      },
      onClickMailCard() {
        this.workflowItems.splice(this.currentIndex,1,{
          type: "mail",
          name: "メールを送信",
          title: "新規作成",
          sender: "",
          senderAddress: "",
          subject: "",
          body: "",
          footer: "",
          imgUrl: "/img/action_icons/mail.png",
          notification: false,
        })
        this.sideView = false
        this.sideDelayView = false
        this.sideMailView = true
      },
      onClickDelayCard() {
        this.workflowItems.splice(this.currentIndex,1,{
          type: "delay",
          name: "次のタイミングまで時間を遅延",
          day: 0,
          hour: 0,
          imgUrl: "/img/action_icons/delay.png",
          notification: false,
        })
        this.sideView = false
        this.sideMailView = false
        this.sideDelayView = true
      },
      onClickCansell() {
        this.workflowItems.splice(this.currentIndex,1,{
          type: "new",
          name:"新規作成",
          title:"アクションの選択",
          imgUrl: "/img/action_icons/new.png",
          notification: false,
        })
        this.sideMailView = false
        this.sideDelayView = false
        this.sideView = true
      },
      editMail(index) {
        if(this.workflowItems[index].type == 'new') {
          this.sideView = true
          this.currentIndex = index
        } else {
          this.sideMailView = true
          this.sideDelayView = false
          this.sideView = false
          this.currentIndex = index
        }
      },
      editDelay(index) {
        if(this.workflowItems[index].type == 'new') {
          this.sideView = true
          this.currentIndex = index
        } else {
          this.sideMailView = false
          this.sideDelayView = true
          this.sideView = false
          this.currentIndex = index
        }
      },
      deleteCard(index) {
        this.currentIndex = index
        this.workflowItems.splice(this.currentIndex, 1)
        this.sideView = false
        this.sideMailView = false
        this.sideDelayView = false
      },
      formareaEvent() {
        this.$nuxt.$emit('formareaEvent')
      },


      async onClickUpdateFormSetting() {
        const res = await this.$functions.httpsCallable("updateFormOption")(
          {
            formId: this.formId,
            formData: this.formData
          }
        )
      }

    },
  }
</script>
