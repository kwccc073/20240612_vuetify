<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">代辦事項</h1>
      </v-col>
      <v-col cols="12">
        <!-- variant="outlined" => 樣式
             clearable => 叉叉按鈕，按下去可以把打的字刪掉
             append-icon => 整個欄位後面加上icon
             @事件
                * @keydown.enter => 鍵盤按下enter
                * @click:append => 點擊後面的icon
            :rules => 驗證方式
        -->
        <v-text-field
          variant="outlined"
          label="新增事項"
          clearable
          append-icon="mdi-plus"
          @keydown.enter="onInputSubmit"
          @click:append="onInputSubmit"
          v-model="newItem"
          :rules="[rules.required, rules.length]"
          ref="newItemTextField"
        ></v-text-field>
        <v-table>
          <thead>
            <tr>
              <th>名稱</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="item.id">
              <td>
                <!-- 名稱------------------------------------------------------ -->
                <span v-show="!item.edit">{{ item.name }}</span>
                <!-- autofocus => 當這個東西出現時，會自動focus在上面 -->
                <v-text-field
                  v-show="item.edit"
                  v-model="item.model"
                  :rules="[rules.required, rules.length]"
                  autofocus
                  @keydown.enter="onEditInputSubmit(item.id, i)"
                  ref="editItemTextField"
                ></v-text-field>
              </td>
              <td>
                <!-- 操作按鈕-------------------------------------------------- -->
                <!-- 非編輯中----------------- -->
                <template v-if="!item.edit">
                  <v-btn icon="mdi-pencil" @click="editItem(item.id)"></v-btn>
                  <v-btn icon="mdi-delete" @click="delItem(item.id)"></v-btn>
                </template>
                <!-- 編輯中------------------- -->
                <template v-else>
                  <v-btn icon="mdi-check" @click="onEditInputSubmit(item.id, i)"></v-btn>
                  <v-btn icon="mdi-undo" @click="cancelEditItem(item.id)"></v-btn>
                </template>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useListStore } from '@/stores/list'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '番茄鐘 | 清單'
  }
})

// 固定寫法
const list = useListStore()

// 解構store裡的東西
const { addItem, editItem, delItem, cancelEditItem, confirmEditItem } = list // 這些是funtion，本來就沒有響應性，不需要storeToRefs
const { items } = storeToRefs(list) // 解構list.items，並使用storeToRefs()維持響應性

const newItem = ref('')
const newItemTextField = ref(null) // 用來抓元素
const editItemTextField = ref([]) // 用來抓元素，因為這個元素在v-for裡面，所以預設值要用[]

// 驗證方式-----------------------------------
// value => 表示使用者輸入的值
// return true => 表示驗證通過
// return false 或 "文字" => 表示驗證失敗，文字會被當作驗證失敗的訊息
const rules = {
  required: (value) => {
    return Boolean(value) || '欄位必填'
  },
  length: (value) => {
    return value.length >= 3 || '必須三個字以上'
  }
}

// 新增事項至store------------------------------
const onInputSubmit = async () => {
  const validate = await newItemTextField.value.validate() // validate()是指元件內的function
  console.log(validate) // 把驗證失敗的訊息變成陣列，若驗證成功則陣列會是空的
  if (validate.length > 0) return // validate.length > 0 表示有失敗的訊息
  addItem(newItem.value) // addItem()是來自store的actions
  newItemTextField.value.reset() // 重設輸入欄位
}

// 送出編輯（經驗證）-------------------------------------
const onEditInputSubmit = async (id, i) => {
  // i是指第幾個v-text-field
  const validate = await editItemTextField.value[i].validate()
  if (validate.length > 0) return
  confirmEditItem(id)
}
</script>
