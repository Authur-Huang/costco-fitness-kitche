# 🛒 Costco 雙人智慧增肌減脂健康廚房與冰箱系統
> **Costco Dual Fitness Kitchen & Fridge Management System**

本專案是一個專為雙人（男生健身控糖、女生健康減脂）設計的 **PWA 概念健康管理儀表板**。核心圍繞於 **「AI 食材備餐分析」**、**「Costco 冰箱庫存與智慧食譜」**、**「運動消耗估算與日誌」** 以及 **「減脂趨勢與每日熱量收支（赤字）看板」**。

---

## 🌐 線上部署資訊
*   **Vercel 部署網址**：[https://costco-fitness-kitche.vercel.app/](https://costco-fitness-kitche.vercel.app/)
*   **同步技術**：結合瀏覽器 `LocalStorage` 與 `Vercel KV` (Redis) 雲端資料庫，支援**雙人實時同步**（可複製共享連結至另一部手機開啟，實時共享資料）。
*   **隱私隔離 (Share Key)**：每對使用者擁有一組隨機產生的專屬同步金鑰（存於 `localStorage`，並附加在網址 `?key=` 參數）。雲端資料以 `fitness_data_<key>` 為 KV 鍵分開儲存，只有拿到共享連結的人才能讀寫同一份資料；寫入 API 強制驗證金鑰格式。首次升級時會自動從舊的共用資料 (`fitness_data`) 遷移一次。

---

## 📋 專案核心功能模組

### 1. 備餐與 AI 食材分析 (Tab 1)
*   **AI 圖片/文字解析**：使用者可上傳 Costco 買回來的食材照片、收據或輸入文字，AI (Gemini) 會自動分析配料及其卡路里、蛋白質、碳水與脂肪成分。
*   **動態數量與成分連動**：當使用者直接在分析結果中修改食材名稱或採買數量時，後方的卡路里與三大營養素會**依比例自動即時換算**。
*   **多向匯入流**：
    *   `📥 匯入至飲食日誌`：自動將成分加總後存入當日的飲食紀錄，並自動換算對應的餐別（早餐、午餐、晚餐、點心）。
    *   `🛒 匯入為庫存採買`：自動將分析出的食材成分與購買量寫入冰箱庫存管理。

### 2. 智慧食譜與庫存管理 (Tab 2)
*   **冰箱庫存編輯**：直觀呈現目前冰箱剩餘食材，支援直覺式 inline 點擊修改「剩餘數量」與「計量單位」（克 `g`、公斤 `kg`、毫升 `ml`、顆、粒、包、袋、盒、罐、瓶、根、支、把、片）。
*   **智慧跨單位換算與扣減**：
    *   當食譜配料單位與冰箱登記單位不同時，系統會自動在後台進行換算比例（例如：冰箱存有 `2 kg` 雞肉，食譜需要 `250 g`，系統會判定庫存充足並顯示 `✔️ 庫存足 (剩 2 kg)`）。
    *   當點選「標記已烹飪」時，系統會自動折算扣除（扣除 `0.25 kg`），將庫存更新為 `1.75 kg`。
    *   量詞單位（如 `顆` 與 `粒`）通用換算。
    *   若單位無法換算（例如冰箱記 `包`、食譜要 `g`），會顯示 `⚠️ 單位不符` 黃色警告，且烹飪時**不會**盲目扣減該食材。
*   **備餐份量切換**：可選擇「男生份量」、「女生份量」或「雙人份量」，食譜食材需求量、蛋白質與熱量會隨份量比例自動無縫縮放。

### 3. 雙人每日日誌 (Tab 3)
*   **運動日誌登錄**：記錄運動者、運動項目（重訓、跑步、壺鈴、HIIT等）、運動時間與公斤負重。
*   **運動熱量自動公式連動**：
    *   熱量消耗為唯讀不可手動修改，系統會自動依據「運動者體重」、「運動負重」與「運動項目 MET 係數」進行公式連動計算：
        $$\text{運動熱量} = \text{MET} \times (\text{體重} + \text{運動負重}) \times \frac{\text{運動時間 (分鐘)}}{60} \times \text{強度係數}$$
    *   其中「體重」會自動去對應讀取系統中最新的**個人體重**。
*   **歷史紀錄篩選**：分為飲食紀錄、運動紀錄與體重趨勢三表，支援刪除與一鍵管理。

### 4. 減脂歷史趨勢與每日收支看板 (Tab 4)
*   **每日熱量收支表 (Daily Net Calorie Balance)**：
    *   即時呈現今日的熱量赤字/盈餘：
        $$\text{今日淨收支} = \text{飲食攝取} - \text{運動消耗} - \text{基礎代謝率 (BMR)}$$
    *   其中 BMR 根據使用者設定的體重、身高、年齡自動帶入 Mifflin-St Jeor 公式。
    *   自動亮起**綠色 `✔️ -350 kcal (熱量赤字)`** 或 **紅色 `⚠️ +120 kcal (熱量盈餘)`** 指標卡片。
*   **快速體重/體脂登錄**：在趨勢卡下方提供快速補登今天體重與體脂的表單，點擊「💾 記錄」後，下方的 Chart.js 折線圖會**立刻重繪更新**，並同步更新側邊欄與 BMR 代謝。
*   **雙人變化趨勢圖**：利用 `Chart.js` 視覺化雙人體重 (kg) 與體脂率 (%) 的歷史波動，進度一目了然。

### 5. 個人設定 (Tab 5)
*   **雙人同步設定**：「複製雙人共享網址」按鈕位於此分頁，複製的連結內含專屬同步金鑰。
*   **每日固定/常規餐食範本**：可設定雙人或個人每天重複吃的餐點（如早餐大燕麥片碗），系統每天會自動在飲食日誌中生成；同時在歷史日誌表中提供「🔁 設為固定」一鍵轉存範本功能，且 AI 分析結果匯入時亦可勾選「🔁 同步設為範本」。

---

## 🛠️ 技術架構與檔案結構

本專案採無框架（Vanilla JS）高效架構開發，檔案極簡，利於任何 AI Agent 快速解析：

```
├── index.html                  # 主介面：包含響應式 CSS 格局、所有 Tab Pane 與 modal
├── style.css                   # 設計系統：深色科技感主題、Glassmorphism 磨砂玻璃、自適應佈局
├── app.js                      # 核心控制器：控制狀態 (fitnessDB)、Chart.js、雲端 REST API 同步、單位換算與公式
├── manifest.json               # PWA 設定描述檔：供手機瀏覽器辨識與定義 App 名稱、啟動參數與圖示
├── sw.js                       # PWA Service Worker：提供離線快取與背景異步更新加載策略
├── icon.jpg / apple-touch-icon.jpg # App 圖示：供手機桌面捷徑與蘋果 touch-icon 渲染
├── api/
│   ├── analyze.js              # Vercel Serverless Function：代理 Gemini 進行食材照片/文字營養分析
│   ├── load.js                 # Vercel Serverless Function：從 Vercel KV 讀取共享資料（GET /api/load?key=<shareKey>）
│   └── save.js                 # Vercel Serverless Function：寫入共享資料到 Vercel KV（POST /api/save?key=<shareKey>，金鑰必填）
└── current_fridge_meal_plan.md # 備餐菜單文件：存儲兩位減脂目標與客製化配料手冊
```

---

## 🗄️ 資料庫 Schema (LocalStorage / Vercel KV)

系統狀態儲存在全域物件 `fitnessDB` 中，其 JSON 格式如下：

```json
{
  "maleWeightHistory": [
    { "date": "2026-07-11", "weight": 85.0, "fat": 25.0 }
  ],
  "femaleWeightHistory": [
    { "date": "2026-07-11", "weight": 67.0, "fat": 31.7 }
  ],
  "foodLogs": [
    { "date": "2026-07-11", "who": "male", "meal": "lunch", "name": "AI匯入: 去骨雞腿肉+板豆腐", "cal": 650, "p": 48 }
  ],
  "workoutLogs": [
    { "date": "2026-07-11", "who": "male", "type": "重量訓練", "name": "深蹲", "duration": 45, "load": 60, "intensity": "moderate", "desc": "腳步穩定", "burnedCal": 315 }
  ],
  "costcoInventory": [
    { "name": "去骨雞腿肉", "remaining": 1750, "total": 1750, "unit": "g" },
    { "name": "新鮮雞蛋", "remaining": 28, "total": 28, "unit": "顆" }
  ],
  "recurringMeals": [
    { "id": "rec_12345", "who": "male", "meal": "早餐", "name": "經典大燕麥片碗", "cal": 350, "p": 15, "c": 45, "f": 8, "fiber": 6, "sodium": 110, "active": true }
  ],
  "settings": {
    "skippedRecurring": {
      "2026-07-14": ["rec_12345"]
    }
  }
}
```

> 💡 同步金鑰 (shareKey) 不存在 `fitnessDB` 內，而是存於瀏覽器 `localStorage`（鍵名 `costco_fitness_share_key`）並附加於網址 `?key=` 參數；雲端 KV 鍵名為 `fitness_data_<shareKey>`。

---

## ⚙️ 核心演算法公式說明

### 1. BMR (基礎代謝率) 計算 (Mifflin-St Jeor 公式)
*   **男生**：$$BMR = 10 \times \text{體重 (kg)} + 6.25 \times \text{身高 (cm)} - 5 \times \text{年齡 (歲)} + 5$$
*   **女生**：$$BMR = 10 \times \text{體重 (kg)} + 6.25 \times \text{身高 (cm)} - 5 \times \text{年齡 (歲)} - 161$$

### 2. 運動消耗熱量 (MET 公式)
$$\text{卡路里} = \text{MET} \times (\text{個人體重} + \text{運動額外負重}) \times \frac{\text{時間 (分鐘)}}{60} \times \text{強度係數}$$
*   **MET 基準值**：重量訓練 = 6.0，有氧跑步 = 8.0，壺鈴運動 = 9.8，徒手心肺 = 5.0。
*   **強度修正係數 (Factor)**：低強度 = 0.75，中強度 = 1.00，高強度 = 1.25。

### 3. 食物比例換算公式
當修改食材採買量或名稱時，將新數量比上原分析數量：
$$\text{新營養成分} = \text{原營養成分} \times \left( \frac{\text{新數量}}{\text{原數量}} \right)$$

---

## 💡 給其他 AI Agent 的開發接續指南
*   **開發紀錄（必讀/必寫）**：所有問題發現、修正流程與驗證結果都記錄在 [`CHANGELOG.md`](CHANGELOG.md)。**每次修改程式碼都必須在該文件新增對應紀錄**（問題 → 修法 → 驗證 → commit hash）。
*   **狀態更新**：任何時候修改了 `fitnessDB`，請務必依序呼叫 `saveSharedData()` 寫入雲端同步，並呼叫對應的渲染函數（如 `renderInventoryList()`、`updateRecipes()`、`calculateTargets()`、`drawCharts()` 等）來確保介面更新。
*   **安全性**：任何使用者輸入（食材名稱、備註等）要插入 `innerHTML` 前，必須先經過 `escapeHTML()` 跳脫，防止 XSS。
*   **側邊欄「目標」欄位**（目標體脂/目標體重）為使用者手動設定的目標值，程式**不得**用當日量測值覆寫它們。
*   **樣式維護**：本專案使用 `style.css` 定義的全域變數做主題配色。新增任何元素時，建議延用 CSS 中的 `--text-main` (主文字色), `--text-muted` (副文字色), 與磨砂玻璃卡片背景等樣式。
