import { defineStore } from 'pinia'
// 引入環境變數
const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore('list', {
  state: () => ({
    items: [],
    id: 1, // 用於紀錄每個項目的id
    timeleft: time, // 紀錄目前還剩多少時間
    break: false, // 目前是否為休息時間
    finishedItems: [], // 已完成的項目
    currentItem: '' // 目前的項目
  }),
  actions: {
    // 新增------------------------
    addItem (value) {
      this.items.push({
        id: this.id++,
        name: value,
        edit: false, // 是否為編輯中
        model: value
      })
    },
    // 因為很多功能會用到.findIndex()，所以這邊乾脆直接寫成一個function
    // 這裡的id是指傳入的id，item.id是陣列的id
    findIndexById (id) {
      return this.items.findIndex(item => item.id === id)
    },
    // 切換至編輯狀態------------------------
    // id用於判斷要編輯哪個東西（如果希望有搜尋功能，不能用索引取代id***之前的課有教到***）
    editItem (id) {
      // this.findIndexById(id) => 呼叫actions裡的 findIndexById (id)
      const i = this.findIndexById(id) // 用id找出這個東西在陣列裡的索引是多少
      this.items[i].edit = true // 把編輯狀態改成true
    },
    // 刪除------------------------
    delItem (id) {
      const i = this.findIndexById(id)
      this.items.splice(i, 1)
    },
    // 取消編輯------------------------
    cancelEditItem (id) {
      const i = this.findIndexById(id)
      this.items[i].model = this.items[i].name
      this.items[i].edit = false
    },
    // 送出編輯------------------------
    confirmEditItem (id) {
      const i = this.findIndexById(id)
      this.items[i].name = this.items[i].model
      this.items[i].edit = false
    },
    // 設定目前要倒數的東西--------------
    setCurrentItem () {
      // 如果是休息中 => 現在項目為'休息一下'；非休息中 => 現在項目為 this.items.shift().name
      // .shift()用來移除陣列的第一個元素，並回傳該元素的值。
      this.currentItem = this.break ? '休息一下' : this.items.shift().name
    },
    // 倒數------------------------------
    countdown () {
      this.timeleft--
    },
    // 完成倒數--------------------------
    setFinishItem () {
      // 如果不是休息中的話
      if (!this.break) {
        // 把完成的東西放到陣列finishedItems
        this.finishedItems.push({
          id: this.id++,
          name: this.currentItem
        })
      }
      // 清空現在的項目
      this.currentItem = ''

      // 如果清單還有東西
      if (this.items.length > 0) {
        this.break = !this.break
      }
      // 如果是休息中 => 倒數的秒數為timeBreak ；非休息中 => 倒數的秒數為time
      this.timeleft = this.break ? timeBreak : time
    }
  }
})
