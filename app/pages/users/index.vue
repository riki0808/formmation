<template>
  <section class="l-main_container">
    <div class="l-padding--type1">
      <!-- ユーザーを招待のボタン -->
      <div class="d-flex justify-end mb-6">
        <v-btn color="primary" to="/users/new">
          <v-icon left> mdi-plus-circle </v-icon>
          ユーザーを招待
        </v-btn>
      </div>

      <!-- フォーム一覧表示 -->
      <div>
        <!-- データベースのユーザーを参照 -->
        <v-card
          flat
          elevation="1"
          class="pa-8 mb-4"
          v-for="(user, i) in teamInfo.users"
          :key="i"
        >
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <div class="mr-8">
                <!-- <img src="" alt=""> -->
                <div class="shape-test"></div>
              </div>

              <div>
                <!-- データベースのユーザー名参照 -->
                <p class="mb-0 text-h6">{{ user.sei }} {{ user.mei }}</p>
                <!-- データベースのメールアドレス参照 -->
                <p class="primary--text c-sm-fs mb-0">{{ user.email }}</p>
              </div>
            </div>

            <div class="d-flex">
              <v-btn
                color="main"
                :to="`/users/edit/${user.id}/`"
                nuxt
                class="mr-3"
                width="100px"
              >
                編集
              </v-btn>
              <v-btn
                v-if="user.id != $store.state.user.uid"
                color="main"
                class="mr-3"
                width="100px"
                @click="deleteUser(user.id)"
              >
                削除
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Users",
  async asyncData(ctx) {
    // console.log(ctx.store.state.user);
    const res = await ctx.$functions.httpsCallable("getTeamInfo")({
      teamId: ctx.store.state.user.teamId,
    });

    console.log(res.data.res);

    return {
      teamInfo: res.data.res,
    };

  },
  data() {
    return {
      emails: ["riki_sato@cone-ntm.com"],
    };
  },
  methods: {
    async updateTeamInfo() {
      const res = await this.$functions.httpsCallable("getTeamInfo")({
        teamId: this.$store.state.user.teamId,
      });
      this.teamInfo = res.data.res;
    },
    async deleteUser(uid) {
      if (confirm("本当に削除しますか？")) {
        const res = await this.$functions.httpsCallable("deleteUserFromTeam")({
          teamId: this.$store.state.user.teamId,
          userId: uid,
        });

        if (res.data.status == 200) {
          alert("成功");
          this.updateTeamInfo();
        } else {
          alert("失敗");
        }
      }
    },
  },
};
</script>
