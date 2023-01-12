<template>
  <section class="l-main_container">
    <div class="l-padding--type1">

      <!-- 新規フォームの作成のボタン -->
      <v-dialog width="700px">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex justify-end mb-6">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>mdi-plus-circle</v-icon>
              新規フォームの作成
            </v-btn>
          </div>
        </template>
        <v-card class="pa-15">
          <p class="text-center text-subtitle-1 font-weight-black mb-15" style="color:#33343c;">どのように作成しますか？</p>
          <div class="d-flex justify-space-between">

            <!-- 新しく作成する -->
            <v-card
              width="49%"
              color="white"
              class="pa-8 text-center"
              @click="onClickNewType"
            >
              <v-icon x-large color="primary" class="mb-8">mdi-pencil</v-icon>
              <p class="text-body-1 font-weight-black">はじめから作成する</p>
              <p class="mb-0 text-caption">
                ご自身で1からフォーム<br>〜ワークフローを作成します。
              </p>
            </v-card>

            <!-- テンプレートから選ぶ -->
            <v-card
              width="49%"
              color="white"
              class="pa-7 text-center"
              nuxt
              to="/forms/template"
            >
              <v-icon x-large color="primary" class="mb-8">mdi-bookmark</v-icon>
              <p class="text-body-1 font-weight-black">テンプレートから作成する</p>
              <p class="mb-0 text-caption">
                既存のテンプレートを選択して、<br>フォーム〜ワークフローを作成します。
              </p>
            </v-card>

          </div>
        </v-card>
      </v-dialog>

      <!-- フォーム一覧表示 -->
      <div>
        <v-card
          flat
          elevation="1"
          class="py-6 px-8 mb-5"
          v-for="(form, i) in formsInfo"
          :key="i"
        >
          <div class="d-flex align-center justify-space-between mb-3">

            <div class="">
              <div class="d-flex align-center mb-1">
                <p class="mb-0 text-body-1 font-weight-black" style="color:#4a4a51;">{{form.title}}</p>
              </div>
              <p class="c-sm-fs mb-0">
                お問い合わせフォームを作成し、フォームを送信した顧客のメールアドレス宛に自動返信とステップメールを送信します。
              </p>
            </div>

            <v-menu
              left
              :offset-y="offset"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>

              <v-list width="240px" class="pa-0">
                <v-btn block tile depressed large color="white" class="text-left">
                  <v-list-item-title class="d-flex align-center text-caption font-weight-black">
                    <v-icon small class="mr-2">mdi-vector-square-edit</v-icon>
                    ワークフローの編集
                  </v-list-item-title>
                </v-btn>
                <v-btn block tile depressed large color="white" class="text-left">
                  <v-list-item-title class="d-flex align-center text-caption font-weight-black">
                    <v-icon small class="mr-2">mdi-history</v-icon>
                    送信履歴
                  </v-list-item-title>
                </v-btn>
                <v-btn block tile depressed large color="white" class="text-left">
                  <v-list-item-title class="d-flex align-center text-caption font-weight-black">
                    <v-icon small class="mr-2">mdi-arrow-top-right-bold-box-outline</v-icon>
                    公開ページを開く
                  </v-list-item-title>
                </v-btn>
                <v-btn block tile depressed large color="white" class="text-left">
                  <v-list-item-title class="d-flex align-center text-caption font-weight-black">
                    <v-icon small class="mr-2">mdi-share-variant-outline</v-icon>
                    共有・埋め込み
                  </v-list-item-title>
                </v-btn>
                <v-btn block tile depressed large color="white" class="text-left">
                  <v-list-item-title class="d-flex align-center text-caption font-weight-black">
                    <v-icon small class="mr-2">mdi-content-copy</v-icon>
                    複製
                  </v-list-item-title>
                </v-btn>
                <v-btn block tile depressed large color="white" class="text-left" @click="deleteFormInfo(form.id)">
                  <v-list-item-title class="d-flex align-center text-caption font-weight-black">
                    <v-icon small class="mr-2">mdi-trash-can-outline</v-icon>
                    削除
                  </v-list-item-title>
                </v-btn>
              </v-list>
            </v-menu>

          </div>
          <div class="d-flex align-center">
            <div class="d-flex align-center mr-4">
              <v-icon>mdi-account-circle</v-icon>
              <v-icon>mdi-account-circle</v-icon>
            </div>
            <nuxt-link
              :to="`/form/${form.id}`"
              class="c-sm-fs"
            >
              {{`formwork.com/form/${form.id}`}}<v-icon color="primary" small class="ml-4">mdi-animation</v-icon>
            </nuxt-link>
          </div>
        </v-card>
      </div>


    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData(ctx) {
    const res = await ctx.$functions.httpsCallable("getFormInfo")({
      teamId: ctx.store.state.user.teamId,
    });

    return {
      teamId: ctx.store.state.user.teamId,
      formsInfo: res.data.res
    };
  },
  created() {

  },
  mounted() {
    console.log(this.teamId)
    console.log(this.formsInfo)
  },
  data() {
    return {
      formItemList: [
        {
          formItem: "回答者管理",
          to: "/forms/customers"
        },
        {
          formItem: "フォームの編集・設定変更",
          to: "/forms/input"
        },
        {
          formItem: "このフォームを非公開にする",
          to: "/"
        },
        {
          formItem: "複製",
          to: "/"
        },
        {
          formItem: "削除",
          to: "/"
        }
      ],
      offset: true,
    }
  },
  methods: {
    async deleteFormInfo(id) {
      if (confirm("本当に削除しますか？")) {
        const res = await this.$functions.httpsCallable("deleteForm") ({
          formId: id
        });
        if (res.data.status == 200) {
          alert("成功！")
          this.$router.go({path: this.$router.currentRoute.path, force: true})
        } else {
          alert("失敗！")
        }
      }
    },
    async onClickNewType() {
      const formId = Math.random().toString(32).substring(2)
      const postData = {
        teamId: this.teamId,
        title: "新規作成フォーム",
        inputFormId: Math.random().toString(32).substring(2),
        completeFormId: Math.random().toString(32).substring(2),
        workflowId: Math.random().toString(32).substring(2),
        description: "このフォームの詳細説明",
        isShow: false,
      }
      const res = await this.$functions.httpsCallable("addForms")(
        {
          formId:formId,
          postData:postData,
        }
      )
      this.$router.push(`/forms/input/${formId}`);
    }
  }
}
</script>
