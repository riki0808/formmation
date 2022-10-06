<template>
  <v-container>
    <v-text-field v-model="apiName" outlined label="apiの名前"></v-text-field>
    <v-btn @click="onSubmit">クリックしてテスト</v-btn>

    <p v-if="res">
      {{ res }}
    </p>
  </v-container>
</template>

<script>
export default {
  layout: "login_default",
  data: () => ({
    apiName: "",
    res: null,
  }),
  methods: {
    async onSubmit() {
      this.res = await this.$functions.httpsCallable(this.apiName)({
        email: "sasano@valuup.jp",
        password: "qweqweqwe",
        sei: "ささの",
        mei: "りき",
        teamId: "bsGDgkwlqdwpKsNgiTG5",
        userId: "UtNiyGZ5pmhufAV1Vg95eiqWqKo2",
      });
    },
  },
};
</script>
