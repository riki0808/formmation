<template>
  <section>

    <!-- <div class="c-bd-top px-8 d-flex align-center" style="height:40px; background-color:#fff;">

      <v-spacer></v-spacer>

      <div class="d-flex">
        <v-btn
          rounded
          color="white"
          class="shadow-none text-caption font-weight-bold grey--text"
        >
          <v-icon left>mdi-filter</v-icon>
          フィルター
        </v-btn>
        <v-btn
          rounded
          color="white"
          class="shadow-none text-caption font-weight-bold grey--text"
        >
          <v-icon left>mdi-sort</v-icon>
          並び替え
        </v-btn>
        <v-btn
          rounded
          color="white"
          class="shadow-none text-caption font-weight-bold grey--text"
        >
          <v-icon left>mdi-magnify</v-icon>
          検索
        </v-btn>
      </div>

    </div> -->

    <v-btn @click="openData">押してみてね</v-btn>

    <div>
      <div
        class="main overflow-auto"
        style="height:calc(100vh - 104px)"
      >
        <template>
          <v-card>
            <v-card-title>
              全体顧客データ
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="answersValue"
              :search="search"
            ></v-data-table>
          </v-card>
        </template>
      </div>
    </div>

  </section>
</template>
<script>
export default {
  async asyncData(ctx) {
    if(ctx.params.id) {
      const res = await ctx.$functions.httpsCallable('getAnswersInfo') ({
        teamId: ctx.params.id
      })
      return {
        answers: res.data.res
      }
    }
  },
  mounted() {
    const answers = this.answers
    const answersValue = []
    // console.log('answers',answers)
    for (const ans of answers) {
      answersValue.push({
        sei:ans.sei,
        mei:ans.mei,
        company:ans.company,
        email:ans.email,
        tel:ans.tel,
      })
    }
    this.answersValue = answersValue
    // console.log(this.answersValue)
  },
  data(){
    return{
      answersValue: [],
      search: '',
      headers: [
        {
          text: '全体顧客データ',
          align: 'start',
          sortable: false,
          value: 'sei',
        },
        { text: '名前(名)', value: 'sei' },
        { text: '名前(姓)', value: 'mei' },
        { text: '会社名', value: 'company' },
        { text: '電話番号', value: 'tel' },
        { text: 'メールアドレス', value: 'email' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  methods:{
    openData() {
      console.log(this.answersValue)
    }
  }
}
</script>
