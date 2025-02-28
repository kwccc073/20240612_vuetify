<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">鈴聲設定</h1>
      </v-col>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th>名稱</th>
              <th>試聽</th>
              <th>選擇</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alarm in alarms" :key="alarm.id">
              <td>
                <!-- 名稱 -->
                {{ alarm.name }}
              </td>
              <td>
                <!-- 試聽 -->
                <audio :src="alarm.file" controls></audio>
              </td>
              <td>
                <!-- 選擇 -->
                <!-- v-model=> 選擇的值；:value => 該選項代表的值 -->
                <v-radio-group v-model="selectedAlarm">
                  <v-radio :value="alarm.id"></v-radio>
                </v-radio-group>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

definePage({
  meta: {
    title: '番茄鐘 | 設定'
  }
})

const settings = useSettingsStore()
// 解構（不用寫settings.xxxx）會失去響應姓，要用storeToRefs()維持響應性
const { alarms, selectedAlarm } = storeToRefs(settings)
</script>

<style scoped lang="scss">
// :deep() => 深層的選擇，表示選到元件裡面的元件樣式
// 去除v-radio預設的空間
:deep(.v-input__details) {
  display: none;
}
</style>
