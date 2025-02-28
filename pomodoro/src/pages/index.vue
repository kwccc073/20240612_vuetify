<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>目前事項 {{ currentText }}</h1>
        <h2>剩餘時間 {{ currentTime }}</h2>
      </v-col>
      <v-col cols="12">
        <!-- 播放------------------- -->
        <!-- 不能點：狀態為正在倒數中；目前事項是空的&&清單也是空的-->
        <v-btn
          icon="mdi-play"
          @click="startTimer"
          :disabled="status === STATUS.COUNTING || (currentItem.length === 0 && items.length === 0)"
        ></v-btn>
        <!-- 暫停------------------- -->
        <v-btn
          icon="mdi-pause"
          :disabled="status !== STATUS.COUNTING"
          @click="pauseTimer"
        ></v-btn>
        <!-- 跳過------------------- -->
        <v-btn
          icon="mdi-skip-next"
          :disabled="currentItem.length === 0"
          @click="finishTimer"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// 引入store
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

definePage({
  meta: {
    title: '番茄鐘'
  }
})

// 狀態碼（用於寫出現在是在哪個狀態(暫停、計時中、暫停)，便於閱讀）
const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2
}
// 預設狀態是STOP
const status = ref(STATUS.STOP)

const list = useListStore()
// 解構
const { currentItem, items, timeleft } = storeToRefs(list)
const { setCurrentItem, countdown, setFinishItem } = list

const settings = useSettingsStore()

let timer = 0
// 開始倒數----------------------------------------------------
const startTimer = () => {
  // if 現在是停止狀態且清單有東西 => 抓要倒數的項目（如果是暫停狀態的話就不用再抓要倒數的項目）
  if (status.value === STATUS.STOP && items.value.length > 0) {
    setCurrentItem()
  }

  // 狀態改為倒數中
  status.value = STATUS.COUNTING

  // 計時
  timer = setInterval(() => {
    countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

// 暫停------------------------------
const pauseTimer = () => {
  status.value = STATUS.PAUSE
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer) // 停止計時器
  status.value = STATUS.STOP // 狀態改為停止

  setFinishItem()

  // 如果清單還有東西，再執行startTimer()設定下一個項目
  if (items.value.length > 0) {
    startTimer()
  }
}

// 目前事項-----------------------------
const currentText = computed(() => {
  // 如果有東西正在倒數
  if (currentItem.value.length > 0) {
    return currentItem.value
    // 如果現在沒有東西在倒數，但清單裡面還有東西
  } else if (items.value.length > 0) {
    return '點擊開始'
    // 現在沒有東西在倒數、清單裡面也沒有東西
  } else {
    return '沒有事項'
  }
})

// 剩餘時間------------------------------
const currentTime = computed(() => {
  // 把總秒數轉為 分(m):秒(s)
  // .floor() => 無條件捨去
  // .toString() => 轉成文字 () （因為要補0）
  // .padStart(2, '0') => 用0補滿2個字
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>
