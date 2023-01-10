<template>
  <div>
    <!-- ここに完了ボタンを入れる -->
    <div style="height:64px; background-color:#fff; border-bottom:1px solid #c3c3c3" class="d-flex align-center px-4">
      <v-btn
        tile
        color="primary"
        text
        class="font-weight-black"
        @click="submitSave()"
      >
        <v-icon left>
          mdi-chevron-left
        </v-icon>
        戻る
      </v-btn>
    </div>

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

          <!-- 以下【入力画面】のUI -->
          <v-tab-item transition="fade-transition">
            <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 100px);">

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

          <!-- 以下【完了画面】のUI -->
          <v-tab-item transition="fade-transition">
            <div class="px-8 py-5 overflow-auto" style="height:calc(100vh - 100px);">
              <div class="mb-5">
                <v-btn
                  v-for="(formThanksItem, i) in formThanksItems"
                  :key="i"
                  tile
                  class="text-caption justify-start grey--text shadow-none main mb-3"
                  style="width:100%;"
                  @click="onClickThanksItem(formThanksItem)"
                >
                  <v-icon left>
                    {{ formThanksItem.icon }}
                  </v-icon>
                  {{ formThanksItem.text }}
                </v-btn>
              </div>
            </div>
          </v-tab-item>
          
        </v-tabs-items>
        
      </div>

      <v-tabs-items v-model="formEdit" class="c-forms_container">
      
        <!-- 入力画面用のメインパート -->
        <v-tab-item transition="fade-transition">
          <!-- <v-btn @click="submitSave">保存ボタン</v-btn> -->
          <div class="white c-main-form-edit-contents overflow-auto" style="width:100%; height:100%;">
            <div class="c-main-form-edit-contents-inner mb-15">
              <!-- !!!!!!!この下部分をコンポーネント化させた方がいいかも？？!!!!!!!!!!! -->
              <!-- ↓↓お問い合わせのタイトルとディスクリプション↓↓ -->
              <div class="p-form-input-title" @click="editTitleView = true">
                <div class="p-form-input-title-overray"></div>
                <h2 class="text-center mb-5">{{formHead.title}}</h2>
                <p class="text-center mb-15">{{formHead.description}}</p>
              </div>
              <!-- ↑↑お問い合わせのタイトルとディスクリプション↑↑ -->

              <!-- ↓↓フォーム項目をどんどん表示していく所↓↓ -->
              <div class="c-form-group" v-for="(editItem, i) in editItems" :key="i">
    
                <div class="c-form-group-item" v-if="editItem.type == 'name'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-space-between">
                    <div class="c-form-group-item-sub">
                      <div class="c-form-group-item-label-flex">
                        <p
                          class="c-form-group-item-label"
                          :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                        >
                          {{editItem.seiTitle}}
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
                          :class="styleTemplate"
                          :placeholder="editItem.seiPlaceholder"
                          v-model="editItem.value"
                        >
                      </div>
                    </div>
                    <div class="c-form-group-item-sub">
                      <div class="c-form-group-item-label-flex">
                        <p
                          class="c-form-group-item-label"
                          :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                        >
                          {{editItem.meiTitle}}
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
                          :class="styleTemplate"
                          :placeholder="editItem.meiPlaceholder"
                          v-model="editItem.value"
                        >
                      </div>
                    </div>
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'email'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    :placeholder="editItem.placeholder"
                    v-model="editItem.value">
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                    {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'company'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                      :class="styleTemplate"
                      type="text"
                      name="source"
                      :placeholder="editItem.placeholder"
                      v-model="editItem.value"
                    >
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'department'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    v-model="editItem.value"
                    >
                      <option 
                        v-for="(department, i) in departments" 
                        :key="i"
                        :value="department"
                      >
                        {{department}}
                      </option>
                    </select>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'position'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    name=""
                    id=""
                    v-model="editItem.value"
                    >
                      <option 
                        v-for="(position, i) in positions" 
                        :key="i"
                        :value="position"
                      >
                        {{position}}
                      </option>
                    </select>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'employees'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    name=""
                    id=""
                    v-model="editItem.value"
                    >
                      <option 
                        v-for="(employee, i) in employees" 
                        :key="i"
                        :value="employee"
                      >
                        {{employee}}
                      </option>
                    </select>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'tel'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    :placeholder="editItem.placeholder"
                    v-model="editItem.value">
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'gender'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                        :class="styleTemplate"
                      >
                        <input type="radio" name="gender" value="男性" v-model="editItem.value">
                        男性
                      </label>
                      <label
                        class="c-form-group-item-inp type--2"
                        :class="styleTemplate"
                      >
                        <input type="radio" name="gender" value="女性" v-model="editItem.value">
                        女性
                      </label>
                    </div>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'birthday'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    :placeholder="editItem.placeholder"
                    v-model="editItem.value">
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'address'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    :placeholder="editItem.placeholder"
                    v-model="editItem.value">
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'prefecture'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    name=""
                    id=""
                    v-model="editItem.value"
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
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'job'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                        :class="styleTemplate"
                      >
                        <input type="radio" name="job" :value="job" v-model="editItem.value">
                        {{job}}
                      </label>
                    </div>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'industry'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                    :class="styleTemplate"
                    name=""
                    id=""
                    v-model="editItem.value"
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
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'source'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                        :class="styleTemplate"
                      >
                        <input type="checkbox" name="source" :value="source" v-model="editItem.value">
                        {{source}}
                      </label>
                    </div>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'check'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                        :class="styleTemplate"
                      >
                        <input type="checkbox" name="source" value="同意する" v-model="editItem.value">
                        同意する
                      </label>
                    </div>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'text'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                      :class="styleTemplate"
                      type="text"
                      name="source"
                      :placeholder="editItem.placeholder"
                      v-model="editItem.value"
                    >
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'textarea'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                      :class="styleTemplate"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      :placeholder="editItem.placeholder"
                      v-model="editItem.value"
                    >
                    </textarea>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'number'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                      :class="styleTemplate"
                      type="number"
                      :placeholder="editItem.placeholder"
                      v-model="editItem.value"
                    >
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'choice'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                        :class="styleTemplate"
                      >
                        <input type="radio" name="choice" v-model="editItem.value">
                        選択肢１
                      </label>
                      <label
                        class="c-form-group-item-inp type--2"
                        :class="styleTemplate"
                      >
                        <input type="radio" name="choice" v-model="editItem.value">
                        選択肢２
                      </label>
                      <label
                        class="c-form-group-item-inp type--2"
                        :class="styleTemplate"
                      >
                        <input type="radio" name="choice" v-model="editItem.value">
                        選択肢３
                      </label>
                    </div>
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <div class="c-form-group-item" v-else-if="editItem.type == 'day'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                      :class="styleTemplate"
                      type="date"
                      v-model="editItem.value"
                    >
                  </div>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <!-- こいつv-modelどうしたらええにゃろ -->
                <div class="c-form-group-item" v-else-if="editItem.type == 'file'" @click="onSelectEditFormItem(editItem)">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemUpSell(i)">
                          <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="editItemDownSell(i)">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="#475a74" @click="deleteEditItem(i)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="c-form-group-item-label-flex">
        <!-- フォーム編集のメイン画面 -->
                    <p
                      class="c-form-group-item-label"
                      :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
                    >
                      {{editItem.title}}
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
                      :class="styleTemplate"
                      type="file"
                    >
                  </div>
                  <p class="c-form-group-item-label mt-2">ファイルサイズは50MB以下</p>
                  <div
                    class="mt-2"
                    :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
                  >
                  {{editItem.description}}
                  </div>
                </div>
    
                <!-- まだv-modelでvalue入れてない -->
                <div class="c-form-group-item" v-else-if="editItem.type == 'intro-text'" @click="onSelectEditFormItem(editItem)">
                  <div>説明テキスト</div>
                </div>
    
                
              </div>
              <!-- ↑↑フォーム項目をどんどん表示していく所↑↑ -->

              <!-- ↓↓送信ボタンの部分↓↓ -->
              <div class="p-form-button" @click="buttonEditView = true">
                <div class="c-form-group-item-overray"></div>
                <button
                  type="submit"
                  class="w-100 d-flex justify-center py-2 font-weight-bold"
                  :style="{
                    background: submitButton.buttonColor,
                    color: submitButton.buttonFontColor,
                    fontSize: submitButton.buttonFontSize + 'px'
                  }"
                >
                  {{submitButton.buttonText}}
                </button>
              </div>
              <!-- ↑↑送信ボタンの部分↑↑ -->
            </div>
          </div>
        </v-tab-item>

        <!-- 完了画面用のメインパート -->
        <v-tab-item transition="fade-transition">
          <!-- <v-btn @click="submitThanksSave">保存ボタン</v-btn> -->
          <div class="white c-main-form-edit-contents overflow-auto" style="width:100%; height:100%;">
            <div class="c-main-form-edit-contents-inner mb-15">
              <div>
                <div class="p-form-input-title" @click="editTitleThanksView = true">
                  <div class="p-form-input-title-overray"></div>
                  <h2 class="text-center mb-5">{{ formThanksHead.title }}</h2>
                  <p class="text-center">
                    {{ formThanksHead.description }}
                  </p>
                </div>
                <!-- コンテンツ(資料)の画面表示 -->
                <div v-if="pdf" style="position:relative;" @click="onClickThanksItem(formThanksItems[0])">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4">{{pdf}}</div>
                </div>
                <!-- 埋め込み(日程調整ツール推奨)の画面表示 -->
                <div v-if="html" style="position:relative;" @click="onClickThanksItem(formThanksItems[1])">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4" v-html="html"></div>
                </div>
                <!-- 外部ページリンクの画面表示 -->
                <div v-if="thanksRedirect.url" class="text-center" style="position:relative;" @click="onClickThanksItem(formThanksItems[2])">
                  <div class="c-form-group-item-overray">
                    <div class="c-form-group-item-overray-sub">
                      <div class="c-form-group-item-overray-icon">
                        <v-btn class="mx-1" fab dark small color="#475a74">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <a class="pa-4 font-weight-bold" style="display:inline-block;" :href="thanksRedirect.url">{{thanksRedirect.label}}</a>
                </div>
              </div><!-- inner -->
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>

      <!-- !!!!!!!formInputEdit用のドロワーメニュー!!!!!!! -->

      <!-- タイトルとリード分用のドロワー -->
      <div class="c-forms-select-item-edit" :class="{active:editTitleView}">
        <nav class="c-forms-select-item-edit-nav">
          <v-btn
            tile
            color="grey"
            text
            class="font-weight-black"
            @click="editTitleView = false"
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
              :class="styleTemplate"
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="formHead.description"
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
            @click="editView = false"
          >
            <v-icon left>
              mdi-chevron-left
            </v-icon>
            完了
          </v-btn>
        </nav>
        <div class="c-forms-select-item-edit-main">

          <div v-if="selectItem">

            <div class="d-flex align-center mb-4">
              <span class="mr-6">この項目を必須にする</span>
              <v-switch inset v-model="selectItem.required"></v-switch>
            </div>
            
            <!-- selectItemのタイプによって表示を変更させる -->
            <!-- selectItem.typeがnameの時 -->
            <div v-if="selectItem.role == 1">
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">お名前(姓)タイトル</p>
                <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.seiTitle">
              </div>
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">お名前(姓)プレースホルダー</p>
                <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.seiPlaceholder">
              </div>
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">お名前(名)タイトル</p>
                <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.meiTitle">
              </div>
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">お名前(名)プレースホルダー</p>
                <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.meiPlaceholder">
              </div>
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">補足説明</p>
                <textarea
                  class="c-form-group-item-inp type--1 inp--type4"
                  v-model="selectItem.description"
                >
                </textarea>
              </div>
            </div>

            <!-- selectItemのinpuTypeがtextのとき -->
            <div v-else-if="selectItem.role == 2">
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">タイトル</p>
                <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.title">
              </div>
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">補足説明</p>
                <textarea
                  class="c-form-group-item-inp type--1 inp--type4"
                  v-model="selectItem.description"
                >
                </textarea>
              </div>
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">プレースホルダー</p>
                <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.placeholder">
              </div>
            </div>

            <!-- selectItemのinpTypeがselectの時 -->
            <div v-else-if="selectItem.role == 3">
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">タイトル</p>
                <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.title">
              </div>
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">補足説明</p>
                <textarea
                  class="c-form-group-item-inp type--1 inp--type4"
                  v-model="selectItem.description"
                >
                </textarea>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-1">選択肢</p>

                <!-- 部署の項目 -->
                <div v-if="selectItem.type == 'department'">
                  <div
                    class="c-select_item"
                    v-for="(department, i) in departments"
                    :key="i"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                    <input
                      class="text-caption c-select_item-inp"
                      type="text"
                      :value="department"
                    >
                    <v-btn icon class="c-select_item-trash">
                      <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
                
                <!-- 役職の項目 -->
                <div v-else-if="selectItem.type == 'position'">
                  <div
                    class="c-select_item"
                    v-for="(position, i) in positions"
                    :key="i"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                    <input
                      class="text-caption c-select_item-inp"
                      type="text"
                      :value="position"
                    >
                    <v-btn icon class="c-select_item-trash">
                      <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </div>

                <!-- 従業員数の項目 -->
                <div v-else-if="selectItem.type == 'employees'">
                  <div
                    class="c-select_item"
                    v-for="(employee, i) in employees"
                    :key="i"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                    <input
                      class="text-caption c-select_item-inp"
                      type="text"
                      :value="employee"
                    >
                    <v-btn icon class="c-select_item-trash">
                      <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
                
                <!-- 都道府県の項目 -->
                <div v-else-if="selectItem.type == 'prefecture'">
                  <div
                    class="c-select_item"
                    v-for="(prefecture, i) in prefectures"
                    :key="i"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                    <input
                      class="text-caption c-select_item-inp"
                      type="text"
                      :value="prefecture"
                    >
                    <v-btn icon class="c-select_item-trash">
                      <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </div>

                <!-- 業種の項目 -->
                <div v-else-if="selectItem.type == 'industry'">
                  <div
                    class="c-select_item"
                    v-for="(industry, i) in industrys"
                    :key="i"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                    <input
                      class="text-caption c-select_item-inp"
                      type="text"
                      :value="industry"
                    >
                    <v-btn icon class="c-select_item-trash">
                      <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </div>

              </div>
            </div>

            <!-- selectItemのinpTypeがcehckbox or radioの時 -->
            <div v-else-if="selectItem.role == 4">
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">タイトル</p>
                <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="selectItem.title">
              </div>
              <div class="c-forms-select-item-edit-main-item">
                <p class="mb-1">補足説明</p>
                <textarea
                  class="c-form-group-item-inp type--1 inp--type4"
                  v-model="selectItem.description"
                >
                </textarea>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-1">選択肢</p>

                <!-- 部署の項目 -->
                <div v-if="selectItem.type == 'gender'">
                  <div
                    class="c-select_item"
                    v-for="(department, i) in departments"
                    :key="i"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                    <input
                      class="text-caption c-select_item-inp"
                      type="text"
                      :value="department"
                    >
                    <v-btn icon class="c-select_item-trash">
                      <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </div>

              </div>
            </div>

          </div><!-- v-if -->
        </div><!-- c-forms-select-item-edit-main -->
      </div>
      
      <!-- Buttonドロワーメニュー -->
      <div class="c-forms-select-item-edit" :class="{active:buttonEditView}">
        <nav class="c-forms-select-item-edit-nav">
          <v-btn
            tile
            color="grey"
            text
            class="font-weight-black"
            @click="buttonEditView = false"
          >
            <v-icon left>
              mdi-chevron-left
            </v-icon>
            完了
          </v-btn>
        </nav>
        <div class="c-forms-select-item-edit-main">

          <div class="c-forms-select-item-edit-main-item">
            <p class="mb-1">ボタンテキスト</p>
            <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="submitButton.buttonText">
          </div>

          <!-- 「ボタン」部分 -->
          <div class="mb-10">

            <div class="c-font-10 mb-3">
              <p style="margin-bottom:4px!important">ボタンの色</p>
              <div class="d-flex justify-left align-center">
                <span>#</span>
                <input v-model="submitButton.buttonColor" class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                <input v-model="submitButton.buttonColor" class="c-form_edit_style-color-picker" type="color">
              </div>
            </div>

            <div class="d-flex justify-space-between align-center">

              <div class="c-font-10">
                <p style="margin-bottom:4px!important">テキストの色</p>
                <div class="d-flex justify-left align-center">
                  <span>#</span>
                  <input v-model="submitButton.buttonFontColor" class="px-2 py-1 c-bd-all mx-2 text-caption c-form_edit_style_color-inp" type="text">
                  <input v-model="submitButton.buttonFontColor" class="c-form_edit_style-color-picker" type="color">
                </div>
              </div>

              <div class="c-font-10">
                <p style="margin-bottom:4px!important">サイズ</p>
                <div class="d-flex justify-left align-center">
                  <input v-model="submitButton.buttonFontSize" class="px-2 py-1 c-bd-all text-caption" type="number">
                </div>
              </div>

            </div>

          </div><!-- 「ボタン」部分 -->
          
        </div>
      </div>

      <!-- !!!!!!!formInputEdit用のドロワーメニュー!!!!!!! -->

      <!-- !!!!!!!formInputThanks用のドロワーメニュー!!!!!!! -->

      <!-- タイトルとリード分用のドロワー -->
      <div class="c-forms-select-item-edit" :class="{active:editTitleThanksView}">
        <nav class="c-forms-select-item-edit-nav">
          <v-btn
            tile
            color="grey"
            text
            class="font-weight-black"
            @click="editTitleThanksView = false"
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
            <input class="c-form-group-item-inp type--1 inp--type4" type="text" v-model="formThanksHead.title">
          </div>
          <div class="c-forms-select-item-edit-main-item">
            <p class="mb-1">補足説明</p>
            <textarea
              class="c-form-group-item-inp type--1 inp--type4"
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="formThanksHead.description"
            >
            </textarea>
          </div>
        </div>
      </div>

      <!-- editドロワーメニュー -->
      <div class="c-forms-select-item-edit" :class="{active:thanksView}">
        <nav class="c-forms-select-item-edit-nav">
          <v-btn
            tile
            color="grey"
            text
            class="font-weight-black"
            @click="thanksView = false"
          >
            <v-icon left>
              mdi-chevron-left
            </v-icon>
            完了
          </v-btn>
        </nav>

        <!-- コンテンツ(資料)のドロワー -->
        <div class="c-forms-select-item-edit-main" v-if="selectThanksItem.type == 'contents'">
          <div class="c-forms-select-item-edit-main-item">
            <p class="mb-1">埋め込み</p>
            <textarea class="c-form-group-item-inp inp--type1 type--1" name="" id="" cols="30" rows="10" v-model="pdf" placeholder="埋め込みコードを入力してください"></textarea>
          </div>
        </div>

        <!-- 埋め込み(日程調整ツール推奨)のドロワー -->
        <div class="c-forms-select-item-edit-main" v-else-if="selectThanksItem.type == 'inport'">
          <div class="c-forms-select-item-edit-main-item">
            <p class="mb-1">埋め込み</p>
            <textarea class="c-form-group-item-inp inp--type1 type--1" name="" id="" cols="30" rows="10" v-model="html" placeholder="埋め込みコードを入力してください"></textarea>
          </div>
        </div>

        <!-- 外部ページへのリンクのドロワー -->
        <div class="c-forms-select-item-edit-main" v-else-if="selectThanksItem.type == 'link'">
          <div class="c-forms-select-item-edit-main-item">
            <p class="mb-1">外部ページのリンク</p>
            <input v-model="thanksRedirect.url" class="c-form-group-item-inp inp--type3 type--1" type="text" placeholder="URLを入力">
            <input v-model="thanksRedirect.label" class="c-form-group-item-inp inp--type3 type--1" type="text">
          </div>
        </div>

      </div>

      <!-- !!!!!!!formInputThanks用のドロワーメニュー!!!!!!! -->

    </div><!-- c-forms_main -->
  </div>
</template>
<script>
  export default {
    props: ["inputForms", "formId", "inputFormId", "workflowId", "completeForms", "completeFormId"],
    mounted(){
      if (this.inputForms) {
        this.formHead = this.inputForms.formHead
        this.styleTemplate = this.inputForms.styleTemplate
        this.submitButton = this.inputForms.submitButton
        this.textDesign = this.inputForms.textDesign
        this.width = this.inputForms.width
        this.editItems = this.inputForms.formItems
      } else {
        console.log("formsのid取れてないんちゃう？");
      }
      if (this.completeForms) {
        this.innerWidth = this.completeForms.innerWidth
        this.html = this.completeForms.html
        this.pdf = this.completeForms.pdf
        this.thanksRedirect = this.completeForms.thanksRedirect
        this.formThanksHead = this.completeForms.formThanksHead
      }
    },
    data() {
      return {
        formEdit: 0,
        formEditTabs: [
          {
            name: "入力画面"
          },
          {
            name: "完了画面"
          },
        ],
        // roleの役割まとめ
        // 1...name
        // 2...textType
        // 3...selectType
        // 4...checkboxType or radioType

        formEditItems: {
          favs: [
            {
              type: "name",
              icon: "mdi-human-male",
              text: "名前",
              seiText: "名前（姓）",
              seiPlaceholder: "山田",
              seiValue: "",
              meiText: "名前（名）",
              meiPlaceholder: "太郎",
              meiValue: "",
              role: 1,
            },
            {
              type: "email",
              icon: "mdi-email-outline",
              text: "メールアドレス",
              placeholder: "-----@formmation.com",
              value: "",
              role: 2,
            },
            {
              type: "company",
              icon: "mdi-office-building",
              text: "会社名",
              placeholder: "株式会社◯◯◯◯",
              value: "",
              role: 2,
            },
            {
              type: "department",
              icon: "mdi-dots-hexagon",
              text: "部署名",
              placeholder: "",
              value: "",
              role: 3,
            },
            {
              type: "position",
              icon: "mdi-account-tie",
              text: "役職",
              placeholder: "",
              value: "",
              role: 3,
            },
            {
              type: "employees",
              icon: "mdi-account-multiple",
              text: "従業員数",
              placeholder: "",
              value: "",
              role: 3,
            },
            {
              type: "tel",
              icon: "mdi-phone",
              text: "電話番号",
              placeholder: "000-0000-0000",
              value: "",
              role: 2,
            },
            {
              type: "gender",
              icon: "mdi-human-male-male",
              text: "性別",
              placeholder: "男性",
              value: "",
              role: 4,
            },
            {
              type: "birthday",
              icon: "mdi-calendar-month-outline",
              text: "生年月日",
              placeholder: "19◯◯/01/01",
              value: "",
              role: 2,
            },
            {
              type: "address",
              icon: "mdi-home-outline",
              text: "住所",
              placeholder: "◯◯県◯◯市◯◯町1-1",
              value: "",
              role: 2,
            },
            {
              type: "prefecture",
              icon: "mdi-map-marker-outline",
              text: "都道府県",
              placeholder: "東京都",
              value: "",
              role: 3,
            },
            {
              type: "job",
              icon: "mdi-card-account-details-outline",
              text: "ご職業",
              placeholder: "営業",
              value: "",
              role: 4,
            },
            {
              type: "industry",
              icon: "mdi-domain",
              text: "業種",
              placeholder: "商社",
              value: "",
              role: 3,
            },
            {
              type: "source",
              icon: "mdi-web",
              text: "認知経路",
              placeholder: "広告",
              value: "",
              role: 4,
            },
            {
              type: "check",
              icon: "mdi-checkbox-marked",
              text: "規約に同意する",
              placeholder: "✔️",
              value: "",
              role: 1,
            },
          ],
          convs: [
            {
              type: "text",
              icon: "mdi-form-textbox",
              text: "1行テキスト",
              placeholder: "テキスト入力してください",
              value: "",
              role: 2,
            },
            {
              type: "textarea",
              icon: "mdi-form-textarea",
              text: "複数行テキスト",
              placeholder: "テキスト入力してください",
              value: "",
              role: 2,
            },
            {
              type: "number",
              icon: "mdi-numeric",
              text: "数値",
              placeholder: "0",
              value: "",
              role: 4,
            },
            {
              type: "button",
              icon: "mdi-dns-outline",
              text: "尺度ボタン",
              placeholder: "✔️",
              value: "",
              role: 4,
            },
            {
              type: "choice",
              icon: "mdi-form-select",
              text: "選択",
              placeholder: "✔️",
              value: "",
              role: 4,
            },
            {
              type: "day",
              icon: "mdi-calendar-month-outline",
              text: "日付",
              placeholder: "✔️",
              value: "",
              role: 4,
            },
            {
              type: "file",
              icon: "mdi-file-upload-outline",
              text: "ファイルアップロード",
              placeholder: "✔️",
              value: "",
              role: 4,
            },
          ],
          blocks: [
            {
              type: "intro-text",
              icon: "mdi-text",
              text: "説明テキスト",
              placeholder: "説明文を入力してください",
              value: "",
              role: 2,
            },
            {
              type: "img",
              icon: "mdi-image-size-select-actual",
              text: "画像",
              placeholder: "画像を選んでください",
              value: "",
              role: 2,
            },
            {
              type: "media",
              icon: "mdi-code-braces",
              text: "メディア埋め込み",
              placeholder: "メディア埋め込み",
              value: "",
              role: 2,
            },
          ]
        },// formEditItems
        prefectures: ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","宮崎県","鹿児島県","沖縄県"
        ],
        jobs: ["会社員","会社役員","公務員","自営業","主夫/主婦","アルバイト","学生"],
        industrys: ["小売(店舗・通販を含む)","メーカー","医療・福祉・介護","建築・設計・塗装","コンサルティング","人材サービス","冠婚葬祭","飲食","運輸","教育・スクール","士業","システム開発","Web・アプリ制作","IT・通信","マスコミ・メディア","広告代理店","出版・印刷","公的機関","美容・エステ","スポーツ・レジャー・観光","金融・保険","不動産","農業・林業・漁業","電気・ガス・水道"],
        sources: ["テレビ","ラジオ","新聞","雑誌","Webメディア","企業HP","ネット広告","メルマガ","SNS・ブログ","交通広告・看板","知人・友人"],
        departments: ["情報システム部","マーケティング部","営業・販売部","経営企画部","広報・PR部","人事部","総務・法務部","経理・財務部"],
        positions: ["経営者","役員（取締）","部長・課長 / マネージャー","係長・主任 / エリアマネージャー","一般社員・職員 / スタッフ","契約・委託・派遣"],
        employees: ["1人","2〜10人","2〜10人","31〜50人","51〜100人","101〜300人","301〜500人","501〜1000人","1001人〜"],
        gender: [],

        // エディタードロワーの真偽値
        editView: false,
        editTitleView: false,
        buttonEditView: false,

        selectItem: null,
        // ここから保存したいデータ
        editItems:[],
        submitButton: {
          buttonColor: "#3042cc",
          buttonFontColor: "#ffffff",
          buttonFontSize: 12,
          buttonText: '送信',
        },
        formHead: {
          title: "お問い合わせ",
          description: "お気軽にご相談ください"
        },
        // データ保存としてはいらんかも
        styleTemplate: "inp--type2",
        width: 50,
        textDesign: {
          textFont: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif;',
          labelFontColor: "#606060",
          labelFontSize: 12,
          descriptionColor: "#606060",
          descriptionSize: 12
        },



        // thanksパートの始まり
        formThanksItems: [
          {
            icon: "mdi-file-plus-outline",
            text: "コンテンツ(資料)",
            type: "contents"
          },
          {
            icon: "mdi-code-braces",
            text: "埋め込み(日程調整ツール推奨)",
            type: "inport"
          },
          {
            icon: "mdi-link-variant-plus",
            text: "外部ページへのリンク",
            type: "link"
          },
        ],
        selectThanksItem: "",
        thanksView: false,
        editTitleThanksView: false,
        // 全体横幅のデータ
        innerWidth: 50,
        // inportのデータ
        html: "",
        // contentsのデータ
        pdf: "",
        // linkのデータ
        thanksRedirect: {
          url: "",
          label: "ホームページへ戻る"
        },
        // titleとdescのデータ
        formThanksHead: {
          title: "お問い合わせいただきありがとございます",
          description: "お問い合わせいただきありがとうございました\nお送りした内容をご確認の上、担当者より折り返しご連絡させていただきます。"
        },
      }//return
    },//data()
    methods: {
      // ここからeditパート
      onClickFormItem(cardItem){
        if (cardItem.type == 'name') {
          this.editItems.push({
            type: cardItem.type,
            title: cardItem.text,
            seiTitle: cardItem.seiText,
            seiPlaceholder: cardItem.seiPlaceholder,
            meiTitle: cardItem.meiText,
            meiPlaceholder: cardItem.meiPlaceholder,
            description: '',
            required: false,
            role: cardItem.role,
          })
        } else {
          this.editItems.push({
            type: cardItem.type,
            title: cardItem.text,
            description: '',
            required: false,
            placeholder: cardItem.placeholder,
            imgUrl:"",
            role: cardItem.role,
          })
        }
      },
      onSelectEditFormItem(item) {
        this.editView = true
        this.selectItem = item
      },
      deleteEditItem(i) {
        this.editItems.splice(i, 1)
        this.editView = false
      },
      editItemUpSell(i) {
        if(i == 0) return;
        const newList = this.editItems
        newList.splice(i - 1, 2, newList[i], newList[i - 1])
        this.editView = false
        this.editItems = newList
      },
      editItemDownSell(i) {
        if(i == this.editItems.length - 1) return;
        const newList = this.editItems
        newList.splice(i, 2, newList[i + 1], newList[i])
        this.editView = false
        this.editItems = newList
      },


      // ここからthanksパート
      onClickThanksItem(item) {
        this.thanksView = !this.thanksView
        this.selectThanksItem = item
      },


      // async submitSave() {
      //   const formItems = []
      //   for(const editItem of this.editItems){
      //     if (editItem.type == 'name') {
      //       formItems.push({
      //         type: editItem.type,
      //         title: editItem.title,
      //         seiTitle: editItem.seiTitle,
      //         seiPlaceholder: editItem.seiPlaceholder,
      //         meiTitle: editItem.meiTitle,
      //         meiPlaceholder: editItem.meiPlaceholder,
      //         description: editItem.description,
      //         required: editItem.required,
      //         value: editItem.value
      //       })
      //     } else {
      //       formItems.push({
      //         type: editItem.type,
      //         title: editItem.title,
      //         description: editItem.description,
      //         required: editItem.required,
      //         placeholder: editItem.placeholder,
      //         imageUrl: editItem.imgUrl,
      //         value: editItem.value
      //       })
      //     }
      //   }
      //   const postData = {
      //     formHead: {
      //       title: this.formHead.title,
      //       description: this.formHead.description,
      //     },
      //     width: this.width,
      //     styleTemplate: this.styleTemplate,
      //     submitButton: {
      //       buttonColor: this.submitButton.buttonColor,
      //       buttonFontColor: this.submitButton.buttonFontColor,
      //       buttonFontSize: this.submitButton.buttonFontSize,
      //       buttonText: this.submitButton.buttonText,
      //     },
      //     textDesign: {
      //       textFont: this.textDesign.textFont,
      //       labelFontColor: this.textDesign.labelFontColor,
      //       labelFontSize: this.textDesign.labelFontSize,
      //       descriptionColor: this.textDesign.descriptionColor,
      //       descriptionSize: this.textDesign.descriptionSize,
      //     },
      //     formItems: formItems,
      //   }
      //   if (this.inputForms) {
      //     const res = await this.$functions.httpsCallable("updateInputForms")(
      //       {
      //         inputFormId:this.inputFormId,
      //         postData:postData
      //       }
      //     )
      //   } else {
      //     const res = await this.$functions.httpsCallable("addInputForms2Forms")(
      //       {
      //         inputFormId:this.inputFormId,
      //         postData:postData
      //       }
      //     )
      //   }
      // },

      // async submitThanksSave() {
      //   const postData = {
      //     innerWidth: this.innerWidth,
      //     html: this.html,
      //     pdf: this.pdf, 
      //     thanksRedirect: {
      //       url: this.thanksRedirect.url,
      //       label: this.thanksRedirect.label,
      //     },
      //     formThanksHead: {
      //       title: this.formThanksHead.title,
      //       description: this.formThanksHead.description
      //     }
      //   }
      //   if (this.completeForms) {
      //     const res = await this.$functions.httpsCallable("updateCompleteForms")(
      //       {
      //         postData:postData,
      //         completeFormId: this.completeFormId
      //       }
      //     )
      //   } else {
      //     const res = await this.$functions.httpsCallable("addCompleteForms2Forms")(
      //       {
      //         postData:postData,
      //         completeFormId: this.completeFormId
      //       }
      //     )
      //   }
      // },



      async submitSave() {
        const formItems = []
        for(const editItem of this.editItems){
          if (editItem.type == 'name') {
            formItems.push({
              type: editItem.type,
              title: editItem.title,
              seiTitle: editItem.seiTitle,
              seiPlaceholder: editItem.seiPlaceholder,
              meiTitle: editItem.meiTitle,
              meiPlaceholder: editItem.meiPlaceholder,
              description: editItem.description,
              required: editItem.required,
              value: editItem.value
            })
          } else {
            formItems.push({
              type: editItem.type,
              title: editItem.title,
              description: editItem.description,
              required: editItem.required,
              placeholder: editItem.placeholder,
              imageUrl: editItem.imgUrl,
              value: editItem.value
            })
          }
        }
        const inputFormData = {
          formHead: {
            title: this.formHead.title,
            description: this.formHead.description,
          },
          width: this.width,
          styleTemplate: this.styleTemplate,
          submitButton: {
            buttonColor: this.submitButton.buttonColor,
            buttonFontColor: this.submitButton.buttonFontColor,
            buttonFontSize: this.submitButton.buttonFontSize,
            buttonText: this.submitButton.buttonText,
          },
          textDesign: {
            textFont: this.textDesign.textFont,
            labelFontColor: this.textDesign.labelFontColor,
            labelFontSize: this.textDesign.labelFontSize,
            descriptionColor: this.textDesign.descriptionColor,
            descriptionSize: this.textDesign.descriptionSize,
          },
          formItems: formItems,
        }
        const completeFormData = {
          innerWidth: this.innerWidth,
          html: this.html,
          pdf: this.pdf, 
          thanksRedirect: {
            url: this.thanksRedirect.url,
            label: this.thanksRedirect.label,
          },
          formThanksHead: {
            title: this.formThanksHead.title,
            description: this.formThanksHead.description
          }
        }
        if (this.inputForms && this.completeForms) {
          const res = await this.$functions.httpsCallable("updateFormData")(
            {
              inputFormId:this.inputFormId,
              completeFormId:this.completeFormId,
              inputFormData:inputFormData,
              completeFormData:completeFormData,
            }
          )
        } else {
          const res = await this.$functions.httpsCallable("addFormData")(
            {
              inputFormId:this.inputFormId,
              completeFormId:this.completeFormId,
              inputFormData:inputFormData,
              completeFormData:completeFormData,
            }
          )
        }
        this.$router.go({path: this.$router.currentRoute.path, force: true})
        await this.$nuxt.$emit('formareaView')
      }


    }
  }//export default
</script>
