<template>
  <div class="white" style="height:100vh;">

    <div class="c-main-form-inner mb-15" :style="{width: width + '%'}">

      <!-- ↓↓お問い合わせのタイトルとディスクリプション↓↓ -->
      <div class="p-form-input-title">
        <h2 class="text-center mb-5">{{formHead.title}}</h2>
        <p class="text-center">{{formHead.description}}</p>
      </div>
      <!-- ↑↑お問い合わせのタイトルとディスクリプション↑↑ -->

      <div class="c-form-group" v-for="(editItem, i) in editItems" :key="i">

        <div class="c-form-group-item" v-if="editItem.type == 'lastName' || editItem.type == 'firstName'">
          
          <div class="d-flex justify-space-between">
            <div class="c-form-group-item-sub">
              <div class="c-form-group-item-label-flex">
                <p class="c-form-group-item-label">お名前(姓)</p>
                <span class="c-form-group-item-val required">必須</span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input type="text" class="c-form-group-item-inp inp--type1 type--1" placeholder="山田">
              </div>
            </div>
            <div class="c-form-group-item-sub">
              <div class="c-form-group-item-label-flex">
                <p class="c-form-group-item-label">お名前(名)</p>
                <span class="c-form-group-item-val required">必須</span>
              </div>
              <div class="c-form-group-item-inp-frame">
                <input type="text" class="c-form-group-item-inp inp--type1 type--1" placeholder="太郎">
              </div>
            </div>
          </div>
        </div>

        <div class="c-form-group-item" v-else-if="editItem.type == 'email'">
          
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
            :placeholder="editItem.placeholder">
          </div>
          <div
            class="mt-2"
            :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
          >
            {{editItem.description}}
          </div>
        </div>

        <div class="c-form-group-item" v-else-if="editItem.type == 'company'">
          
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
            >
          </div>
          <div
            class="mt-2"
            :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
          >
          {{editItem.description}}
          </div>
        </div>

        <div class="c-form-group-item" v-else-if="editItem.type == 'department'">
          
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'position'">
          
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'employees'">
          
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'tel'">
          
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
            :placeholder="editItem.placeholder">
          </div>
          <div
            class="mt-2"
            :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
          >
          </div>
        </div>

        <div class="c-form-group-item" v-else-if="editItem.type == 'gender'">
          
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
                <input type="radio" name="gender" value="男性">
                男性
              </label>
              <label
                class="c-form-group-item-inp type--2"
                :class="styleTemplate"
              >
                <input type="radio" name="gender" value="女性">
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'birthday'">
          
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
            :placeholder="editItem.placeholder">
          </div>
          <div
            class="mt-2"
            :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
          >
          {{editItem.description}}
          </div>
        </div>

        <div class="c-form-group-item" v-else-if="editItem.type == 'address'">
          
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
            :placeholder="editItem.placeholder">
          </div>
          <div
            class="mt-2"
            :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
          >
          {{editItem.description}}
          </div>
        </div>

        <div class="c-form-group-item" v-else-if="editItem.type == 'prefecture'">
          
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'job'">
          
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
                <input type="radio" name="job" :value="job">
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'industry'">
          
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'source'">
          
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
                <input type="checkbox" name="source" :value="source">
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'check'">
          
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
                <input type="checkbox" name="source" value="同意する">
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'text'">
          
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
            >
          </div>
          <div
            class="mt-2"
            :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
          >
          {{editItem.description}}
          </div>
        </div>

        <div class="c-form-group-item" v-else-if="editItem.type == 'textarea'">
          
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'number'">
          
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
            >
          </div>
          <div
            class="mt-2"
            :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
          >
          {{editItem.description}}
          </div>
        </div>

        <!-- <div class="c-form-group-item" v-else-if="editItem.type == 'number'">
          <div class="c-form-group-item-label-flex">
            <p
              class="c-form-group-item-label"
              :style="{color:textDesign.labelFontColor, fontSize:textDesign.labelFontSize + 'px'}"
            >
              {{editItem.title}}
            </p>
            <span class="c-form-group-item-val">{{editItem.required ? "必須" : "任意"}}</span>
          </div>
          <div class="c-form-group-item-inp-frame">
            <input
              class="c-form-group-item-inp type--1"
              :class="styleTemplate"
              type="number"
              :placeholder="editItem.placeholder"
            >
          </div>
        </div> -->

        <div class="c-form-group-item" v-else-if="editItem.type == 'choice'">
          
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
                <input type="radio" name="choice" >
                選択肢１
              </label>
              <label
                class="c-form-group-item-inp type--2"
                :class="styleTemplate"
              >
                <input type="radio" name="choice" >
                選択肢２
              </label>
              <label
                class="c-form-group-item-inp type--2"
                :class="styleTemplate"
              >
                <input type="radio" name="choice" >
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'day'">
          
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
            >
          </div>
          <div
            class="mt-2"
            :style="{color:textDesign.descriptionColor, fontSize:textDesign.descriptionSize + 'px'}"
          >
          {{editItem.description}}
          </div>
        </div>

        <div class="c-form-group-item" v-else-if="editItem.type == 'file'">
          
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

        <div class="c-form-group-item" v-else-if="editItem.type == 'intro-text'">
          <div>説明テキスト</div>
        </div>


      </div><!-- c-form-group -->

      <!-- ↓↓送信ボタンの部分↓↓ -->
      <div class="p-form-button mt-15">
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
      
    </div><!-- c-main-form-edit-contents-inner -->

  </div>
</template>

<script>
  export default {
    layout: "nothing_default",
    async asyncData(ctx) {

      if(ctx.params.id){
        const res = await ctx.$functions.httpsCallable("getForm")({
          formId: ctx.params.id,
        });
        return {
          formId: ctx.params.id,
          formTitle: res.data.res.title,
          inputFormId: res.data.res.inputFormId,
          inputForms: res.data.res.inputForm,
          completeFormId: res.data.res.completeFormId,
          completeForms: res.data.res.completeForm,
          workflowId: res.data.res.workflowId,
          workflows: res.data.res.workflow,
        };
      }else{
        return {
          formId:"",
          inputFormId: "",
          inputForms: "",
          completeFormId: "",
          completeForms: "",
          workflowId: "",
          workflows: "",
        }
      }

    },
    mounted() {
      if (this.formId) {
        this.formHead = this.inputForms.formHead
        this.styleTemplate = this.inputForms.styleTemplate
        this.submitButton = this.inputForms.submitButton
        this.textDesign = this.inputForms.textDesign
        this.width = this.inputForms.width
        this.editItems = this.inputForms.formItems
      } else {
        console.log("formsのid取れてないんちゃう？");
      }
    },  
    data: () => (
      {

        formEditItems: {
          favs: [
            {
              type: "lastName",
              icon: "mdi-human-male",
              text: "名前（姓）",
              placeholder: "山田"
            },
            {
              type: "firstName",
              icon: "mdi-human-male",
              text: "名前（名）",
              placeholder: "太郎"
            },
            {
              type: "email",
              icon: "mdi-email-outline",
              text: "メールアドレス",
              placeholder: "-----@formmation.com"
            },
            {
              type: "company",
              icon: "mdi-office-building",
              text: "会社名",
              placeholder: "株式会社◯◯◯◯"
            },
            {
              type: "department",
              icon: "mdi-dots-hexagon",
              text: "部署名",
              placeholder: ""
            },
            {
              type: "position",
              icon: "mdi-account-tie",
              text: "役職",
              placeholder: ""
            },
            {
              type: "employees",
              icon: "mdi-account-multiple",
              text: "従業員数",
              placeholder: ""
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
        },
        prefectures: ["選択してください","北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","宮崎県","鹿児島県","沖縄県"
        ],
        jobs: ["会社員","会社役員","公務員","自営業","主夫/主婦","アルバイト","学生"],
        industrys: ["選択してください","小売(店舗・通販を含む)","メーカー","医療・福祉・介護","建築・設計・塗装","コンサルティング","人材サービス","冠婚葬祭","飲食","運輸","教育・スクール","士業","システム開発","Web・アプリ制作","IT・通信","マスコミ・メディア","広告代理店","出版・印刷","公的機関","美容・エステ","スポーツ・レジャー・観光","金融・保険","不動産","農業・林業・漁業","電気・ガス・水道"],
        sources: ["テレビ","ラジオ","新聞","雑誌","Webメディア","企業HP","ネット広告","メルマガ","SNS・ブログ","交通広告・看板","知人・友人"],
        departments: ["情報システム部","マーケティング部","営業・販売部","経営企画部","広報・PR部","人事部","総務・法務部","経理・財務部"],
        positions: ["経営者","役員（取締）","部長・課長 / マネージャー","係長・主任 / エリアマネージャー","一般社員・職員 / スタッフ","契約・委託・派遣"],
        employees: ["1人","2〜10人","2〜10人","31〜50人","51〜100人","101〜300人","301〜500人","501〜1000人","1001人〜"],


        editItems:[],
        width: 50,
        styleTemplate: "inp--type2",
        submitButton: {
          buttonColor: "#3042cc",
          buttonFontColor: "#ffffff",
          buttonFontSize: 12,
          buttonText: '送信',
        },
        textDesign: {
          textFont: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif;',
          labelFontColor: "#606060",
          labelFontSize: 12,
          descriptionColor: "#606060",
          descriptionSize: 12
        },
        formHead: {
          title: "お問い合わせ",
          description: "お気軽にご相談ください"
        }


      }
    ),
  }
</script>
