<template>
  <section>

    <div class="c-bd-top px-8 d-flex align-center" style="height:40px; background-color:#fff;">

      <v-tabs
        height="30"
        hide-slider
        v-model="customerListTab"
      >
        <v-tab
          class="text-caption grey--text font-weight-bold"
          active-class="customers-list-tab-active"
        >
          <v-icon left>mdi-developer-board</v-icon>
          ボードビュー
        </v-tab>
        <v-tab
          class="text-caption grey--text font-weight-bold"
          active-class="customers-list-tab-active"  
        >
          <v-icon left>mdi-format-list-bulleted-square</v-icon>
          リストビュー
        </v-tab>
      </v-tabs>

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

    <v-tabs-items v-model="customerListTab">
      <!-- ボードビューのUI -->
      <v-tab-item
        transition="fade-transition"
        class="main pt-10"
        style="height:calc(100vh - 104px);"
      >
        <div class="d-flex">

          <!-- カラム全体 -->
          <div class="c-customers-board-col">
            <!-- カラムの上部分 -->
            <div class="d-flex align-center mb-4">
              <v-chip
                class="font-weight-bold primary"
              >
                新着
              </v-chip>
              <v-spacer></v-spacer>
              <v-btn icon class="">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div><!-- カラムの上部分 -->
            <!-- カラムの下部分 -->
            <div>
  
              <v-card
                class="shadow-none c-bd-all mb-4"
              >
                <div class="pa-4 c-bd-bottom">
                  <p class="c-font-10 mb-3">2022/09/04</p><!-- 日付 -->
                  <p class="c-font-10 font-weight-bold mb-1">株式会社Formmation</p><!-- 会社名 -->
                  <p class="text-caption font-weight-bold mb-0">山田 太郎</p><!-- クライアント名 -->
                </div>
                <v-card-actions class="px-4 align-center" style="height:40px;">
                  <v-avatar color="indigo" size="20">
                    <span class="white--text c-text-10">CJ</span>
                  </v-avatar>
                  <p class="c-font-10 mb-0 ml-2">佐藤立樹</p>
  
                  <v-spacer></v-spacer>
  
                  <v-btn
                    @click="show = !show"
                    class="shadow-none white text-caption px-0"
                  >
                    タスク
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                      I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
  
              <v-card
                class="shadow-none c-bd-all mb-4"
              >
                <div class="pa-4 c-bd-bottom">
                  <p class="c-font-10 mb-3">2022/09/04</p><!-- 日付 -->
                  <p class="c-font-10 font-weight-bold mb-1">株式会社Formmation</p><!-- 会社名 -->
                  <p class="text-caption font-weight-bold mb-0">山田 太郎</p><!-- クライアント名 -->
                </div>
                <v-card-actions class="px-4 align-center" style="height:40px;">
                  <v-avatar color="indigo" size="20">
                    <span class="white--text c-text-10">CJ</span>
                  </v-avatar>
                  <p class="c-font-10 mb-0 ml-2">佐藤立樹</p>
  
                  <v-spacer></v-spacer>
  
                  <v-btn
                    @click="show = !show"
                    class="shadow-none white text-caption px-0"
                  >
                    タスク
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                      I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
  
            </div><!-- カラムの下部分 -->
          </div><!-- カラム全体 -->

          <!-- カラム全体 -->
          <div class="c-customers-board-col">
            <!-- カラムの上部分 -->
            <div class="d-flex align-center mb-4">
              <v-chip
                class="font-weight-bold primary"
              >
                新着
              </v-chip>
              <v-spacer></v-spacer>
              <v-btn icon class="">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div><!-- カラムの上部分 -->
            <!-- カラムの下部分 -->
            <div>
  
              <v-card
                class="shadow-none c-bd-all mb-4"
              >
                <div class="pa-4 c-bd-bottom">
                  <p class="c-font-10 mb-3">2022/09/04</p><!-- 日付 -->
                  <p class="c-font-10 font-weight-bold mb-1">株式会社Formmation</p><!-- 会社名 -->
                  <p class="text-caption font-weight-bold mb-0">山田 太郎</p><!-- クライアント名 -->
                </div>
                <v-card-actions class="px-4 align-center" style="height:40px;">
                  <v-avatar color="indigo" size="20">
                    <span class="white--text c-text-10">CJ</span>
                  </v-avatar>
                  <p class="c-font-10 mb-0 ml-2">佐藤立樹</p>
  
                  <v-spacer></v-spacer>
  
                  <v-btn
                    @click="show = !show"
                    class="shadow-none white text-caption px-0"
                  >
                    タスク
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                      I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
  
              <v-card
                class="shadow-none c-bd-all mb-4"
              >
                <div class="pa-4 c-bd-bottom">
                  <p class="c-font-10 mb-3">2022/09/04</p><!-- 日付 -->
                  <p class="c-font-10 font-weight-bold mb-1">株式会社Formmation</p><!-- 会社名 -->
                  <p class="text-caption font-weight-bold mb-0">山田 太郎</p><!-- クライアント名 -->
                </div>
                <v-card-actions class="px-4 align-center" style="height:40px;">
                  <v-avatar color="indigo" size="20">
                    <span class="white--text c-text-10">CJ</span>
                  </v-avatar>
                  <p class="c-font-10 mb-0 ml-2">佐藤立樹</p>
  
                  <v-spacer></v-spacer>
  
                  <v-btn
                    @click="show = !show"
                    class="shadow-none white text-caption px-0"
                  >
                    タスク
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                      I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
  
            </div><!-- カラムの下部分 -->
          </div><!-- カラム全体 -->

        </div>
      </v-tab-item>

      <!-- リストビューのUI -->
      <v-tab-item
        transition="fade-transition"
        class="main overflow-auto pt-10"
        style="height:calc(100vh - 104px)"
      >
      
      </v-tab-item>
    </v-tabs-items>

  </section>
</template>
<script>
  export default {
    data() {
      return {
        customerListTab: 0,
        show: false,
      }
    }
  }
</script>
