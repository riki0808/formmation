<template>
  <div class="c-forms_main d-flex">

    <!-- フォーム編集の左サイドバー -->
    <div class="c-forms_side-bar c-bd-right">
      
      <v-tabs
        v-model="formEdit"
        fixed-tabs
        background-color="main"
        hide-slider
      >

        <v-tab
          v-for="(formEditTab, i) in formEditTabs"
          :key="i"
          active-class="form-edit-tab-active"
          class="c-bd-all grey--text font-weight-bold"
        >
          {{ formEditTab.name }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="formEdit">

        <!-- 以下【項目】のUI -->
        <v-tab-item transition="fade-transition">
          <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 160px);">

            <!-- よく使う項目 -->
            <div class="mb-5">
              <p class="font-weight-bold text-body-2">よく使う項目</p>
              <v-btn
                v-for="(fav, n) in formEditItems.favs"
                :key="n"
                @click="onClickFormItem(fav)"
                tile
                class="text-caption justify-start grey--text shadow-none main mb-3"
                style="width:100%;"
              >
                <v-icon left>
                  {{ fav.icon }}
                </v-icon>
                {{ fav.text }}
              </v-btn>
            </div>

            <!-- 便利な項目 -->
            <div class="mb-5">
              <p class="font-weight-bold text-body-2">便利な項目</p>
              <v-btn
                v-for="(conv, n) in formEditItems.convs"
                :key="n"
                @click="onClickFormItem(conv)"
                tile
                class="text-caption justify-start grey--text shadow-none main mb-3"
                style="width:100%;"
              >
                <v-icon left>
                  {{ conv.icon }}
                </v-icon>
                {{ conv.text }}
              </v-btn>
            </div>

            <!-- ブロック -->
            <div class="mb-5">
              <p class="font-weight-bold text-body-2">ブロック</p>
              <v-btn
                v-for="(block, n) in formEditItems.blocks"
                :key="n"
                @click="onClickFormItem(block)"
                tile
                class="text-caption justify-start grey--text shadow-none main mb-3"
                style="width:100%;"
              >
                <v-icon left>
                  {{ block.icon }}
                </v-icon>
                {{ block.text }}
              </v-btn>
            </div>

          </div>
        </v-tab-item>

        <!-- 以下【スタイル】のUI -->
        <v-tab-item transition="fade-transition">
          <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 160px);">

            <!-- 「全体」部分 -->
            <div class="mb-10">
              <p class="font-weight-bold text-body-2">全体</p>
              <div class="c-font-10">
                <p style="margin-bottom:4px!important">幅</p>
                <input v-model.number="innerWidth" class="px-2 py-1  c-bd-all mr-2 text-caption" type="number" min="1" max="100"><span>％</span>
              </div>
            </div><!-- 「全体」部分 -->

            <!-- 「デザイン」部分 -->
            <div class="mb-10">
              <p class="font-weight-bold text-body-2">デザイン</p>
              <div class="c-font-10 d-flex flex-wrap justify-space-between inline-radio">

                <div style="width:48%;">
                  <input type="radio" name="visits" value="inp--type1" v-model="inpType">
                  <label>角・グレー
                    <div class="c-form_edit_style_design-btn mb-2">
                      <div class="c-form_edit_style_design-btn-shape shape--type1"></div>
                    </div>
                  </label>
                </div>
                <div style="width:48%;">
                  <input type="radio" name="visits" value="inp--type3" v-model="inpType">
                  <label>角・白
                    <div class="c-form_edit_style_design-btn mb-2">
                      <div class="c-form_edit_style_design-btn-shape shape--type3"></div>
                    </div>
                  </label>
                </div>
                <div style="width:48%;">
                  <input type="radio" name="visits" value="inp--type2" v-model="inpType">
                  <label>丸・グレー
                    <div class="c-form_edit_style_design-btn mb-2">
                      <div class="c-form_edit_style_design-btn-shape shape--type2"></div>
                    </div>
                  </label>
                </div>
                <div style="width:48%;">
                  <input type="radio" name="visits" value="inp--type4" v-model="inpType">
                  <label>丸・白
                    <div class="c-form_edit_style_design-btn mb-2">
                      <div class="c-form_edit_style_design-btn-shape shape--type4"></div>
                    </div>
                  </label>
                </div>

              </div>
            </div><!-- 「デザイン」部分 -->

            <!-- 「ボタン」部分 -->
            <div class="mb-10">
              <p class="font-weight-bold text-body-2">ボタン</p>

              <div class="c-font-10 mb-3">
                <p style="margin-bottom:4px!important">ボタンの色</p>
                <div class="d-flex justify-left align-center">
                  <span>#</span>
                  <input v-model="submitButton.bgColor" class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                  <input v-model="submitButton.bgColor" class="c-form_edit_style-color-picker" type="color">
                </div>
              </div>

              <div class="d-flex justify-space-between align-center">

                <div class="c-font-10">
                  <p style="margin-bottom:4px!important">テキストの色</p>
                  <div class="d-flex justify-left align-center">
                    <span>#</span>
                    <input v-model="submitButton.textColor" class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                    <input v-model="submitButton.textColor" class="c-form_edit_style-color-picker" type="color">
                  </div>
                </div>

                <div class="c-font-10">
                  <p style="margin-bottom:4px!important">サイズ</p>
                  <div class="d-flex justify-left align-center">
                    <input v-model="submitButton.textSize" class="px-2 py-1 c-bd-all text-caption" type="number">
                  </div>
                </div>

              </div>

            </div><!-- 「ボタン」部分 -->

            <!-- 「テキスト」部分 -->
            <div class="mb-10">
              <p class="font-weight-bold text-body-2">テキスト</p>
              <div class="c-font-10 mb-5">
                <p style="margin-bottom:4px!important">フォント</p>
                <select class="c-form-group-item-inp inp--type3 type--1" name="" id="">
                  <option value='"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif;'>游ゴシック</option>
                  <option value="游ゴシック">游ゴシック</option>
                  <option value="游ゴシック">游ゴシック</option>
                  <option value="游ゴシック">游ゴシック</option>
                  <option value="游ゴシック">游ゴシック</option>
                  <option value="游ゴシック">游ゴシック</option>
                  <option value="游ゴシック">游ゴシック</option>
                </select>
              </div>

              <div class="d-flex justify-space-between align-center mb-3">

                <div class="c-font-10">
                  <p style="margin-bottom:4px!important">ラベルの色</p>
                  <div class="d-flex justify-left align-center">
                    <span>#</span>
                    <input v-model="textDesign.labelColor" class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                    <input v-model="textDesign.labelColor" class="c-form_edit_style-color-picker" type="color">
                  </div>
                </div>

                <div class="c-font-10">
                  <p style="margin-bottom:4px!important">サイズ</p>
                  <div class="d-flex justify-left align-center">
                    <input v-model="textDesign.labelSize" class="px-2 py-1 c-bd-all text-caption" type="number">
                  </div>
                </div>

              </div>

              <div class="d-flex justify-space-between align-center">

                <div class="c-font-10">
                  <p style="margin-bottom:4px!important">補足説明の色</p>
                  <div class="d-flex justify-left align-center">
                    <span>#</span>
                    <input v-model="textDesign.suppleColor" class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                    <input v-model="textDesign.suppleColor" class="c-form_edit_style-color-picker" type="color">
                  </div>
                </div>

                <div class="c-font-10">
                  <p style="margin-bottom:4px!important">サイズ</p>
                  <div class="d-flex justify-left align-center">
                    <input v-model="textDesign.suppleSize" class="px-2 py-1 c-bd-all text-caption" type="number">
                  </div>
                </div>

              </div>

            </div><!-- 「テキスト」部分 -->

          </div>
        </v-tab-item>
        
      </v-tabs-items>
      
    </div>

    <!-- タイトルとリード分用のドロワー -->
    <div class="c-forms-select-item-edit" :class="{active:editTitleView}">
      <nav class="c-forms-select-item-edit-nav">
        <v-btn
          tile
          color="grey"
          text
          class="font-weight-black"
          @click="openEditTitleDrawer"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          完了
        </v-btn>
      </nav>
      <div class="c-forms-select-item-edit-main">
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">タイトル</p>
          <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="formHead.title">
        </div>
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">補足説明</p>
          <textarea
            class="c-form-group-item-inp type--1 inp--type4"
            :class="inpType"
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="formHead.lead"
          >
          </textarea>
        </div>
      </div>
    </div>
    
    <!-- editドロワーメニュー -->
    <div class="c-forms-select-item-edit" :class="{active:editView}">
      <nav class="c-forms-select-item-edit-nav">
        <v-btn
          tile
          color="grey"
          text
          class="font-weight-black"
          @click="onClickOpenEditDrawer"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          完了
        </v-btn>
      </nav>
      <div class="c-forms-select-item-edit-main">

        <div class="d-flex align-center mb-4" v-if="selectItem">
          <span class="mr-6">この項目を必須にする</span>
          <v-switch
            inset
            v-model="selectItem.required"
          >
          </v-switch>
        </div>
        
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">タイトル</p>
          <div v-if="selectItem">
            <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.text">
          </div>
        </div>
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">補足説明</p>
          <div v-if="selectItem">
            <textarea
              class="c-form-group-item-inp type--1 inp--type4"
              :class="inpType"
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="selectItem.suppleText"
            >
            </textarea>
          </div>
        </div>
        <div class="c-forms-select-item-edit-main-item">
          <p class="mb-1">プレースホルダー</p>
          <div v-if="selectItem">
            <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.placeholder">
          </div>
        </div>
        
      </div>
    </div>

    <!-- フォーム編集のメイン画面 -->
    <div class="c-forms_container">

      <div class="white c-main-form-edit-contents overflow-auto" style="width:100%; height:100%;">

        <div class="c-main-form-edit-contents-inner mb-15" :style="{width: innerWidth + '%'}">

          <div class="p-form-input-title" @click="openEditTitleDrawer">
            <div class="p-form-input-title-overray"></div>
            <h2 class="text-center mb-5">{{formHead.title}}</h2>
            <p class="text-center">{{formHead.lead}}</p>
          </div>

          <div class="c-form-group" v-for="(editItem, i) in editItems" :key="i">

            <div class="c-form-group-item" v-if="editItem.type == 'email'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input
                type="email"
                class="c-form-group-item-inp type--1"
                :class="inpType"
                :placeholder="editItem.placeholder">
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
                {{editItem.suppleText}}
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'tel'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input
                type="tel"
                class="c-form-group-item-inp type--1"
                :class="inpType"
                :placeholder="editItem.placeholder">
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'gender'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <div class="c-form-group-item-inp-wrap">
                  <label
                    class="c-form-group-item-inp type--2"
                    :class="inpType"
                  >
                    <input type="radio" name="gender" value="男性">
                    男性
                  </label>
                  <label
                    class="c-form-group-item-inp type--2"
                    :class="inpType"
                  >
                    <input type="radio" name="gender" value="女性">
                    女性
                  </label>
                </div>
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'birthday'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input
                type="date"
                class="c-form-group-item-inp type--1"
                :class="inpType"
                :placeholder="editItem.placeholder">
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'address'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input
                type="text"
                class="c-form-group-item-inp type--1"
                :class="inpType"
                :placeholder="editItem.placeholder">
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'prefecture'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <select
                class="c-form-group-item-inp type--1"
                :class="inpType"
                name=""
                id=""
                >
                  <option 
                    v-for="(prefecture, i) in prefectures" 
                    :key="i"
                    :value="prefecture"
                  >
                    {{prefecture}}
                  </option>
                </select>
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'job'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <div class="c-form-group-item-inp-wrap">
                  <label
                    v-for="(job, i) in jobs"
                    :key="i"
                    class="c-form-group-item-inp type--2"
                    :class="inpType"
                  >
                    <input type="radio" name="job" :value="job">
                    {{job}}
                  </label>
                </div>
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'industry'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <select
                class="c-form-group-item-inp type--1"
                :class="inpType"
                name=""
                id=""
                >
                  <option 
                    v-for="(industry, i) in industrys" 
                    :key="i"
                    :value="industry"
                  >
                    {{industry}}
                  </option>
                </select>
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'source'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <div class="c-form-group-item-inp-wrap">
                  <label
                    v-for="(source, i) in sources"
                    :key="i"
                    class="c-form-group-item-inp type--2"
                    :class="inpType"
                  >
                    <input type="checkbox" name="source" :value="source">
                    {{source}}
                  </label>
                </div>
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'check'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div></div><!-- ←規約説明を記入するスペース -->
              <div class="c-form-group-item-inp-frame">
                <div class="c-form-group-item-inp-wrap">
                  <label
                    class="c-form-group-item-inp type--1"
                    :class="inpType"
                  >
                    <input type="checkbox" name="source" value="同意する">
                    同意する
                  </label>
                </div>
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'text'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div></div><!-- ←規約説明を記入するスペース -->
              <div class="c-form-group-item-inp-frame">
                <input
                  class="c-form-group-item-inp type--1"
                  :class="inpType"
                  type="text"
                  name="source"
                  :placeholder="editItem.placeholder"
                >
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'textarea'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div></div><!-- ←規約説明を記入するスペース -->
              <div class="c-form-group-item-inp-frame">
                <textarea
                  class="c-form-group-item-inp type--1"
                  :class="inpType"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  :placeholder="editItem.placeholder"
                >
                </textarea>
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'number'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div></div><!-- ←規約説明を記入するスペース -->
              <div class="c-form-group-item-inp-frame">
                <input
                  class="c-form-group-item-inp type--1"
                  :class="inpType"
                  type="number"
                  :placeholder="editItem.placeholder"
                >
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <!-- <div class="c-form-group-item" v-else-if="editItem.type == 'number'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span class="c-form-group-item-val">{{editItem.required ? "必須" : "任意"}}</span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input
                  class="c-form-group-item-inp type--1"
                  :class="inpType"
                  type="number"
                  :placeholder="editItem.placeholder"
                >
              </div>
            </div> -->

            <div class="c-form-group-item" v-else-if="editItem.type == 'choice'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div></div><!-- ←規約説明を記入するスペース -->
              <div class="c-form-group-item-inp-frame">
                <div class="c-form-group-item-inp-wrap">
                  <label
                    class="c-form-group-item-inp type--2"
                    :class="inpType"
                  >
                    <input type="radio" name="choice" >
                    選択肢１
                  </label>
                  <label
                    class="c-form-group-item-inp type--2"
                    :class="inpType"
                  >
                    <input type="radio" name="choice" >
                    選択肢２
                  </label>
                  <label
                    class="c-form-group-item-inp type--2"
                    :class="inpType"
                  >
                    <input type="radio" name="choice" >
                    選択肢３
                  </label>
                </div>
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'day'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div></div><!-- ←規約説明を記入するスペース -->
              <div class="c-form-group-item-inp-frame">
                <input
                  class="c-form-group-item-inp type--1"
                  :class="inpType"
                  type="date"
                >
              </div>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'file'" @click="onSelectEditFormItem(editItem)">
              <div class="c-form-group-item-overray">
                <div class="c-form-group-item-overray-sub">
                  <div class="c-form-group-item-overray-icon">
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" fab dark small color="#475a74">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="c-form-group-item-label-flex">
                <p
                  class="c-form-group-item-label"
                  :style="{color:textDesign.labelColor, fontSize:textDesign.labelSize + 'px'}"
                >
                  {{editItem.text}}
                </p>
                <span
                  class="c-form-group-item-val"
                  :class="{required:editItem.required}"
                >
                  {{editItem.required ? "必須" : "任意"}}
                </span>
              </div>
              <div></div><!-- ←規約説明を記入するスペース -->
              <div class="c-form-group-item-inp-frame">
                <input
                  class="c-form-group-item-inp type--1"
                  :class="inpType"
                  type="file"
                >
              </div>
              <p class="c-form-group-item-label mt-2">ファイルサイズは50MB以下</p>
              <div
                class="mt-2"
                :style="{color:textDesign.suppleColor, fontSize:textDesign.suppleSize + 'px'}"
              >
              </div>
            </div>

            <div class="c-form-group-item" v-else-if="editItem.type == 'intro-text'" @click="onSelectEditFormItem(editItem)">
              <div>説明テキスト</div>
            </div>

            
          </div><!-- c-form-group -->

          <div>
            <button
              type="submit"
              class="w-100 d-flex justify-center py-2 font-weight-bold"
              :style="{
                background: submitButton.bgColor,
                color: submitButton.textColor,
                fontSize: submitButton.textSize + 'px'
              }"
            >
              {{submitButton.text}}
            </button>
          </div>
          
        </div><!-- c-main-form-edit-contents-inner -->

      </div><!-- c-main-form-edit-contents -->
      
    </div><!-- c-forms_container -->

  </div><!-- c-forms_main -->
</template>
<script>
  export default {
    data() {
      return {
        formEdit: 0,
        formEditTabs: [
          {
            name: "項目"
          },
          {
            name: "スタイル"
          },
        ],
        formEditItems: {
          favs: [
            {
              type: "name",
              icon: "mdi-human-male",
              text: "名前（姓名別）",
              placeholder: "山田 太郎"
            },
            {
              type: "email",
              icon: "mdi-email-outline",
              text: "メールアドレス",
              placeholder: "-----@formmation.com"
            },
            {
              type: "tel",
              icon: "mdi-phone",
              text: "電話番号",
              placeholder: "000-0000-0000"
            },
            {
              type: "gender",
              icon: "mdi-human-male-male",
              text: "性別",
              placeholder: "男性"
            },
            {
              type: "birthday",
              icon: "mdi-calendar-month-outline",
              text: "生年月日",
              placeholder: "19◯◯/01/01"
            },
            {
              type: "address",
              icon: "mdi-home-outline",
              text: "住所",
              placeholder: "◯◯県◯◯市◯◯町1-1"
            },
            {
              type: "prefecture",
              icon: "mdi-map-marker-outline",
              text: "都道府県",
              placeholder: "大阪府"
            },
            {
              type: "job",
              icon: "mdi-card-account-details-outline",
              text: "ご職業",
              placeholder: "営業"
            },
            {
              type: "industry",
              icon: "mdi-domain",
              text: "業種",
              placeholder: "商社"
            },
            {
              type: "source",
              icon: "mdi-web",
              text: "認知経路",
              placeholder: "広告"
            },
            {
              type: "check",
              icon: "mdi-checkbox-marked",
              text: "規約に同意する",
              placeholder: "✔️"
            },
          ],
          convs: [
            {
              type: "text",
              icon: "mdi-form-textbox",
              text: "1行テキスト",
              placeholder: "テキスト入力してください"
            },
            {
              type: "textarea",
              icon: "mdi-form-textarea",
              text: "複数行テキスト",
              placeholder: "テキスト入力してください"
            },
            {
              type: "number",
              icon: "mdi-numeric",
              text: "数値",
              placeholder: "0"
            },
            {
              type: "button",
              icon: "mdi-dns-outline",
              text: "尺度ボタン",
              placeholder: "✔️"
            },
            {
              type: "choice",
              icon: "mdi-form-select",
              text: "選択",
              placeholder: "✔️"
            },
            {
              type: "day",
              icon: "mdi-calendar-month-outline",
              text: "日付",
              placeholder: "✔️"
            },
            {
              type: "file",
              icon: "mdi-file-upload-outline",
              text: "ファイルアップロード",
              placeholder: "✔️"
            },
          ],
          blocks: [
            {
              type: "intro-text",
              icon: "mdi-text",
              text: "説明テキスト",
              placeholder: "説明文を入力してください"
            },
            {
              type: "img",
              icon: "mdi-image-size-select-actual",
              text: "画像",
              placeholder: "画像を選んでください"
            },
            {
              type: "media",
              icon: "mdi-code-braces",
              text: "メディア埋め込み",
              placeholder: "メディア埋め込み"
            },
          ]
        },// formEditItems
        editItems:[],
        selectItem: null,
        prefectures: ["選択してください","北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","宮崎県","鹿児島県","沖縄県"
        ],
        jobs: ["会社員","会社役員","公務員","自営業","主夫/主婦","アルバイト","学生"],
        industrys: ["選択してください","小売(店舗・通販を含む)","メーカー","医療・福祉・介護","建築・設計・塗装","コンサルティング","人材サービス","冠婚葬祭","飲食","運輸","教育・スクール","士業","システム開発","Web・アプリ制作","IT・通信","マスコミ・メディア","広告代理店","出版・印刷","公的機関","美容・エステ","スポーツ・レジャー・観光","金融・保険","不動産","農業・林業・漁業","電気・ガス・水道"],
        sources: ["テレビ","ラジオ","新聞","雑誌","Webメディア","企業HP","ネット広告","メルマガ","SNS・ブログ","交通広告・看板","知人・友人"],
        editView: false,
        editTitleView: false,
        innerWidth: 50,
        inpType: "inp--type2",
        submitButton: {
          bgColor: "#3042cc",
          textColor: "#ffffff",
          textSize: 12,
          text: '送信',
        },
        textDesign: {
          fontFamily: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif;',
          labelColor: "#606060",
          labelSize: 12,
          suppleColor: "#606060",
          suppleSize: 12
        },
        formHead: {
          title: "お問い合わせ",
          lead: "お気軽にご相談ください"
        }
      }//return
    },//data()
    methods: {
      onClickFormItem(cardItem){
        this.editItems.push({
          type: cardItem.type,
          text: cardItem.text,
          required: false,
          placeholder: cardItem.placeholder,
          suppleText: '',
        })
      },
      onSelectEditFormItem(item) {
        this.editView = !this.editView
        this.selectItem = item
      },
      onClickOpenEditDrawer() {
        this.editView = !this.editView
      },
      openEditTitleDrawer() {
        this.editTitleView = !this.editTitleView
      },
    }
  }//export default
</script>
