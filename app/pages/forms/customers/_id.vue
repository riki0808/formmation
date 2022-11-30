<template>
  <section>

    <div class="c-bd-top px-8 d-flex align-center" style="height:40px; background-color:#fff;">

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

    </div>

    <div>
      <div
        class="main overflow-auto"
        style="height:calc(100vh - 104px)"
      >
        <table>
          <template v-for="(tr, rowIndex) in rows">
            <tr :key="rowIndex">

              <template v-for="(cell, cellIndex) in tr.cells">
                <th
                  :key="cellIndex" 
                  v-if="cell.type == 'TH'"
                  class="c-customers-list-item c-customers-list-head"
                  :class="{'is-active': isActive(rowIndex, cellIndex)}"
                  @click="clickCell($event)"
                >
                  <input
                    disabled
                    class="c-customers-list-input"
                    type="text"
                  >
                </th>

                <td
                  :key="cellIndex" 
                  v-else-if="cell.type == 'TD'"
                  class="c-customers-list-item c-customers-list-body"
                  :class="{'is-active': isActive(rowIndex, cellIndex)}"
                  @click="clickCell($event)"
                  
                >
                  <input
                    class="c-customers-list-input"
                    type="text"
                    @keyup.enter="onKeypressEnter"
                  >
                </td>
              </template>

            </tr>
          </template>
        </table>
      </div>
    </div>

  </section>
</template>
<script>
export default {
  data(){
    return{
      currentCell:{},
      rows: [
        {
          cells: [
            {type: "TH"},
            {type: "TH"},
            {type: "TH"},
          ]
        },
        {
          cells: [
            {type: "TD"},
            {type: "TD"},
            {type: "TD"},
          ]
        },
        {
          cells: [
            {type: "TD"},
            {type: "TD"},
            {type: "TD"},
          ]
        },
      ]
    }
  },
  methods:{
    clickCell(event){
      const input = event.target
      const cell = event.target.parentNode
      const tr = event.target.parentNode.parentNode

      if( this.currentCell.currentRowIndex == tr.rowIndex && this.currentCell.currentCellIndex == cell.cellIndex ){
        this.currentCell = {}
      }else{
        this.currentCell = {
          currentRowIndex: tr.rowIndex,
          currentCellIndex: cell.cellIndex
        }
        input.disabled = true;

      }
    },
    isActive(rowIndex, cellIndex){
      return this.currentCell.currentRowIndex == rowIndex && this.currentCell.currentCellIndex == cellIndex
    },
    onKeypressEnter() {
      input.disabled = false;
      console.log('aa')
    }
  }
}
</script>
<style lang="scss" scoped>
table{
  th,td{
    border: thin solid rgba(0, 0, 0, 0.12);
  }
  th, td{
    //選択状態
    &.is-active{
      border: 1px double #0098f7;
    }
  }
}
</style>
