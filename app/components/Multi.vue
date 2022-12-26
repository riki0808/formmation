<template>
  <div class="d-flex flex-column align-center">
    <!-- 表示カード -->
    <v-card class="pa-3 d-flex justify-center" width="250" @click="openClick(charts[index].index)">
      <div class="text-ellipsis text-button font-weight-bold">
        {{charts[index].title}}
      </div>
    </v-card>
    <!-- 表示カード -->
    <div class="d-flex flex-column align-center">
      <div class="black-vr2" />
      <div class="hr-center"/>
      <div class="d-flex mt-n4 overflow-hidden">
        <div class="d-flex flex-column align-center card-wrapper">
          <!-- プラスボタン -->
          <v-dialog v-if="charts[index].next === null" width="320" v-model="isOpen1">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed fab width="32" height="32" v-bind="attrs" v-on="on" class="left-btn">
                <div class="white-bg"></div>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card class="pa-5">
              <div>
                <div>タイプを選択</div>
                <v-select
                  v-model="type1"
                  dense
                  outlined
                  hide-details
                  :items="types"
                  item-text="text"
                  item-value="value"
                />
              </div>
              <div class="d-flex align-center justify-center mt-8 w-100">
                <v-btn class="mr-6" color="error" @click="isOpen1=false">Cancel</v-btn>
                <v-btn color="primary" @click="createCardNext">Create</v-btn>
              </div>
            </v-card>
          </v-dialog>
          <!-- プラスボタン -->
          <!-- マイナスボタン -->
          <v-dialog v-else width="360" v-model="isDelete1">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed fab width="32" height="32" v-bind="attrs" v-on="on" class="left-btn">
                <div class="white-bg"></div>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>
            <v-card class="pa-5">
              <div>
                処理を選んでください<br>
                *分岐構造の場合、左側の処理はすべて削除されます
              </div>
              <div class="d-flex flex-column align-center mt-8 w-100">
                <v-btn class="w-100" color="warning" @click="deleteCard">この処理だけを取り除く</v-btn>
                <v-btn class="mt-3 w-100" color="error" @click="deleteAll">この処理以降のすべての処理を削除する</v-btn>
              </div>
            </v-card>
          </v-dialog>
          <!-- マイナスボタン -->
          <div class="black-vr" />
          <component v-if="charts[index].next !== null" :is="getComponent" :charts="charts" :index="findIndex"/>
        </div>
        <div class="d-flex flex-column align-center card-wrapper ml-5">
          <!-- プラスボタン -->
          <v-dialog v-if="charts[index].notNext === null" width="320" v-model="isOpen2">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed fab width="32" height="32" v-bind="attrs" v-on="on" class="right-btn">
                <div class="white-bg"></div>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card class="pa-5">
              <div>
                <div>タイプを選択</div>
                <v-select
                  v-model="type2"
                  dense
                  outlined
                  hide-details
                  :items="types"
                  item-text="text"
                  item-value="value"
                />
              </div>
              <div class="d-flex align-center justify-center mt-8 w-100">
                <v-btn class="mr-6" color="error" @click="isOpen2=false">Cancel</v-btn>
                <v-btn color="primary" @click="createCardNotNext">Create</v-btn>
              </div>
            </v-card>
          </v-dialog>
          <!-- プラスボタン -->
          <!-- マイナスボタン -->
          <v-dialog v-else width="360" v-model="isDelete2">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed fab width="32" height="32" v-bind="attrs" v-on="on" class="right-btn">
                <div class="white-bg"></div>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>
            <v-card class="pa-5">
              <div>
                処理を選んでください<br>
                *分岐構造の場合、左側の処理はすべて削除されます
              </div>
              <div class="d-flex flex-column align-center mt-8 w-100">
                <v-btn class="w-100" color="warning" @click="deleteCardNotNext">この処理だけを取り除く</v-btn>
                <v-btn class="mt-3 w-100" color="error" @click="deleteAllNotNext">この処理以降のすべての処理を削除する</v-btn>
              </div>
            </v-card>
          </v-dialog>
          <!-- マイナスボタン -->
          <div class="black-vr"/>
          <component
            v-if="charts[index].notNext !== null"
            :is="getComponentNotNext"
            :charts="charts"
            :index="findIndexNotNext"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    charts: {
      type: Array,
      default: []
    },
    index: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      types: [
        {value: 0, text: "処理"},
        {value: 1, text: "分岐"}
      ],
      type1: 0,
      type2: 0,
      isOpen1: false,
      isOpen2: false,
      isDelete1: false,
      isDelete2: false,
      currentIndex: 0,
    }
  },
  methods: {
    openClick(index) {
      this.$nuxt.$emit('openDrawer', index)
    },
    createCardNext() {
      // console.log("next");
      const latest = (this.charts[this.charts.length - 1]).index + 1
      this.charts.push({
        index: latest,
        title: `アクション名を決めてください`,
        type: this.type1,
        action: '',
        // ディレイのパート
        day: null,
        hour: null,
        // メールパート
        mailName: '',
        sender: '',
        senderAddress: '',
        subject: '',
        body: '',
        footer: '',
        next: null,
        notNext: null,
        targetContentName: '',
        checkValue: '',
        compareType: ''
      })

      this.$set(this.charts[this.index], 'next', latest)
      // console.log(this.charts)
      this.isOpen1 = false
    },
    createCardNotNext() {
      // console.log("notNext");
      const latest = (this.charts[this.charts.length - 1]).index + 1
      this.charts.push({
        index: latest,
        title: `アクション名を決めてください`,
        type: this.type2,
        action: '',
        // ディレイのパート
        day: null,
        hour: null,
        // メールパート
        mailName: '',
        sender: '',
        senderAddress: '',
        subject: '',
        body: '',
        footer: '',
        next: null,
        notNext: null,
        targetContentName: '',
        checkValue: '',
        compareType: ''
      })

      this.$set(this.charts[this.index], 'notNext', latest)
      // console.log(this.charts)
      this.isOpen2 = false
    },
    deleteCard() {
      const nextIndex = this.charts.findIndex(v=>v.index === this.charts[this.index].next)
      // console.log(nextIndex)
      const next = this.charts[nextIndex]
      // console.log('next', next)
      this.$set(this.charts[this.index], 'next', next.next)

      if(next.type===1){
        if(next.notNext) {
          const nextNextIndex = this.charts.findIndex(v=>v.index === next.notNext)
          this.deleteChildren(nextNextIndex)
        }
      }

      this.charts.splice(nextIndex, 1)
      this.$forceUpdate()
      this.isDelete = false

      // console.log("charts", this.charts)
    },
    deleteAll() {
      const nextIndex = this.charts.findIndex(v=>v.index === this.charts[this.index].next)
      this.deleteChildren(nextIndex)
      this.$set(this.charts[this.index], 'next', null)

      this.isDelete = false
    },
    deleteCardNotNext() {
      const nextIndex = this.charts.findIndex(v=>v.index === this.charts[this.index].notNext)
      // console.log(nextIndex)
      const next = this.charts[nextIndex]
      // console.log('next', next)
      this.$set(this.charts[this.index], 'notNext', next.next)

      if(next.type===1){
        if(next.notNext) {
          const nextNextIndex = this.charts.findIndex(v=>v.index === next.notNext)
          this.deleteChildren(nextNextIndex)
        }
      }

      this.charts.splice(nextIndex, 1)
      this.$forceUpdate()
      this.isDelete = false

      // console.log("charts", this.charts)
    },
    deleteAllNotNext() {
      const nextIndex = this.charts.findIndex(v=>v.index === this.charts[this.index].notNext)
      this.deleteChildren(nextIndex)
      this.$set(this.charts[this.index], 'notNext', null)

      this.isDelete = false
    },
    deleteChildren(index) {
      const chart = this.charts[index]
      if (chart.next) {
        const nextIndex = this.charts.findIndex(v=>v.index === chart.next)
        this.deleteChildren(nextIndex)
      }
      if (chart.notNext) {
        const notNextIndex = this.charts.findIndex(v=>v.index === chart.notNext)
        this.deleteChildren(notNextIndex)
      }
      this.charts.splice(index, 1)
    },
  },
  computed: {
    getComponent() {
      if(this.charts[this.index].next !== null) {
        // console.log(this.charts)
        const next = this.charts.find(v=>v.index === this.charts[this.index].next)
        if(next){
          // console.log(next)
          return next.type === 0 ? "single" : "multi"
        }
        return "single"
      }
      return "single"
    },
    getComponentNotNext() {
      if(this.charts[this.index].notNext !== null) {
        // console.log(this.charts)
        const notNext = this.charts.find(v=>v.index === this.charts[this.index].notNext)
        if(notNext){
          // console.log(next)
          return notNext.type === 1 ? "multi" : "single"
        }
        return "single"
      }
      return "single"
    },
    findIndex() {
      return this.charts.findIndex(v=>v.index === this.charts[this.index].next)
    },
    findIndexNotNext() {
      return this.charts.findIndex(v=>v.index === this.charts[this.index].notNext)
    }
  }
}
</script>
