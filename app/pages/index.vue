<template>
  <section class="l-main_container">
    <div class="l-padding--type1">

      <!-- 新規フォームの作成のボタン -->
      <div
        class="d-flex justify-end mb-6"
      >
        <v-btn
          color="primary"
          to="/forms/type"
        >
          <v-icon 
            left
          >
            mdi-plus-circle
          </v-icon>
          新規フォームの作成
        </v-btn>
      </div>

      <!-- フォーム一覧表示 -->
      <div>
        <v-card
          flat
          elevation="1"
          class="pa-8 pl-15 mb-5"
          v-for="(form, i) in formsInfo"
          :key="i"
        >
          <div class="d-flex align-center justify-space-between">

            <div class="">
              <div class="d-flex align-center">
                <p class="mb-0 text-h6">{{form.title}}</p>
                <!-- <v-btn icon>
                  <v-icon
                  >
                    mdi-pencil
                  </v-icon>
                </v-btn> -->
              </div>
              <p class="primary--text c-sm-fs mb-0">
                {{`/formmation.com/input/${form.id}`}}
              </p>
            </div>

            <div class="d-flex">

              <v-btn
                color="primary"
                to="/forms/customers"
                nuxt
                class="mr-3 shadow-none"
              >
                回答者管理
              </v-btn>
              <v-btn
                color="main"
                :to="`/forms/input/${form.id}`"
                nuxt
                class="mr-3 shadow-none"
              >
                フォーム編集
              </v-btn>
              <v-btn
                color="main"
                :to="`/forms/input/${form.id}`"
                nuxt
                class="mr-3 shadow-none"
              >
                自動化設定
              </v-btn>
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

                <v-list>
                  <v-btn block tile depressed large color="white" class="text-left">
                    <v-list-item-title>回答者管理</v-list-item-title>
                  </v-btn>
                  <v-btn block tile depressed large color="white" class="text-left">
                    <v-list-item-title>フォームの編集・設定変更</v-list-item-title>
                  </v-btn>
                  <v-btn block tile depressed large color="white" class="text-left">
                    <v-list-item-title>このフォームを非公開にする</v-list-item-title>
                  </v-btn>
                  <v-btn block tile depressed large color="white" class="text-left">
                    <v-list-item-title>複製</v-list-item-title>
                  </v-btn>
                  <v-btn block tile depressed large color="white" class="text-left" @click="deleteFormInfo(form.id)">
                    <v-list-item-title>削除</v-list-item-title>
                  </v-btn>
                </v-list>
              </v-menu>

            </div>

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
      formsInfo: res.data.res
    };
  },
  mounted() {
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
  }
}
</script>
