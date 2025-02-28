# 20240612_vuetify
## 番茄鐘
* 建立vuetify專案
* 刪調不要的檔案內容 (00:05:11)
* 安裝eslint (00:11:34)
* App.vue (00:17:17)
    * 基本 layout
        * 導覽列
    * keep-alive (04:15:00左右)
* 資料夾pages >settings.vue (00:37:04)
    * v-table (00:50:08)
    * 引用 store - settings.js (01:00:55)
    * v-radio (01:07:33)
    * definePage (01:21:45)
* 資料夾stores > settings.js (00:54:47)
    * 將鈴聲的設定儲存，切換頁面也可以保留
* 資料夾pages > list.vue (01:35:20)
    * 引用 store - list.js (01:42:23)
    * 刻版面 (01:43:18)
        * v-text-field (01:44:41)
            * 驗證
    * 新增東西至store - onInputSubmit() (02:17:09)
    * 呼叫元件裡面的東西 (02:24:00)
    * 列出清單裡面的東西 (02:35:42)
    * 按鈕對應的操作 (02:56:52)
    * 編輯時，v-text-field的綁定 (03:04:29)
* 資料夾stores > list.js (01:37:50)
    * 用於儲存清單，切換頁面也可以保留
    * actions
        * addItem：新增 (02:12:05)
        * editItem：切換至編輯狀態 (02:1:47)
        * delItem：刪除
        * cancelEditItem：取消編輯
        * confirmEditItem：送出編輯
    * 休息時間 - break (04:47:05)
* 首頁 - pages > index.vue (03:21:53)
    * 流程講解 (03:29:00)
    * .env.development、.env.production
    * 引入store (03:45:14)
    * 倒數相關function
        * 開始與完成計時 - startTimer()、finishTimer() (03:51:21)
            * 流程講解 (04:11:59)
    * 目前事項 - currentText (04:40:26)
    * 剩餘時間 - currentTime (04:30:50)
    * 暫停 - pauseTimer (04:38:50)
    * 防止使用者誤觸按鈕 - :disabled (04:28:48)
* 課程總結 (04:53:37)