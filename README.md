# NYCU Video Controller

為國立陽明交通大學 e3p 教學平台專門設計的 Chrome 瀏覽器擴充功能。解決平台原生播放器缺乏鍵盤控制的問題，讓你用 YouTube 的習慣順暢觀看教學影片。

> **如果這個小工具為你省下了寶貴的看課時間，歡迎在右上角點擊 `Star` ⭐️**，這是我持續更新的動力 ~ \
> **有更好的點子？** 無論是遇到 Bug 或是希望支援其他學校的網站，歡迎直接前往 [Issues] 留言，或透過 Email 聯繫我。

## 功能特色 (Features)

本擴充功能直接對底層 HTML5 `<video>` 進行操作，並提供 OSD (On-Screen Display) 視覺回饋。支援以下快捷鍵：

* **`Space` (空白鍵)**：暫停 / 播放
* **`→` / `←` (左右方向鍵)**：快轉 / 倒退 10 秒
* **`↑` / `↓` (上下方向鍵)**：增加 / 減少音量 10%
* **`Shift` + `>` / `<`**：加快 / 放慢影片播放速度 (支援 0.5x 到 4x)
* **`F`**：切換全螢幕

## 安裝指南 (Installation)

本專案尚未上架 Chrome Web Store，請依照以下步驟以「開發人員模式」手動載入。

### 對於一般使用者
1. 點擊本頁面右上角的綠色按鈕 **`<> Code`**，選擇 **`Download ZIP`**。
2. 將下載的 ZIP 檔案解壓縮至電腦中任意位置（請記住該資料夾的位置）。
3. 打開 Chrome 瀏覽器，在網址列輸入 `chrome://extensions/` 並進入。
4. 打開右上角的 **「開發人員模式 (Developer mode)」**。
5. 點擊左上角的 **「載入未封裝項目 (Load unpacked)」**。
6. 選擇你剛剛解壓縮的資料夾，安裝即完成！重新整理 e3p 影片網頁即可使用。

### 對於開發者 (使用終端機 / CLI)
無論 Windows 還是 macOS 用戶，環境中裝有 `git`，請執行：
```bash
git clone [https://github.com/你的GitHub帳號/NYCU-Video-Controller.git](https://github.com/你的GitHub帳號/NYCU-Video-Controller.git)

```

接著按照上方步驟 3~6，將 clone 下來的資料夾載入 Chrome 即可。

## 進階設定：支援其他影音網站

為了避免與 YouTube 等大型平台的原生快捷鍵衝突，本擴充功能預設**僅在交大 e3p 網域下啟用**。

如果你發現某些網站（例如一般的影音網站）也採用類似的播放器架構且無法使用快捷鍵，你可以自行修改代碼讓它支援：

1. 打開資料夾中的 `manifest.json` 檔案。
2. 找到 `"matches"` 陣列。
3. 將目標網址加入陣列中，例如：
```json
"matches": [
  "*://e3p.nycu.edu.tw/*",
  "*://*[.example-video-site.com/](https://.example-video-site.com/)*"
]

```


4. 儲存檔案後，回到 Chrome 擴充功能頁面點擊該卡片右下角的「重新載入 (Reload)」即可生效。

## ⚠️ 常見問題與排除

**Q: 當影片畫面跳出「由於損壞問題或視頻使用了瀏覽器不支持的功能，視頻播放已中止」？**

A: 最可能的原因是「頻繁觸發時間跳轉」，瀏覽器會不斷向伺服器發送新的片段請求。若當下網路回應較慢，底層的影片解碼器收到破碎的資料流時就會觸發原生的保護機制而中斷播放。 \
**解決方式**：這不是系統錯誤，也不會影響你的帳號安全。只需**按下 `F5` 重新整理網頁**，讓影片重新初始化即可恢復正常。

## License

This project is licensed under the MIT License.

