# ✈️ 霓虹航港 · Neon Harbor

> 一個以 React + Tailwind CSS 打造的互動式 2D 俯視飛行管制模擬系統

![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)

---

## 🌟 專案簡介

**霓虹航港 (Neon Harbor)** 是一個高品質的 2D 航管模擬動畫組件，以「未來霓虹航空港」為主題，結合真實的物理引擎與電影級視覺效果。

四架配備完整導航燈的 SVG 飛行器，在嚴格遵守「靠右行駛 (RHT)」法規的航道上優雅滑行，並在十字路口前依紅綠燈信號煞車、等待、再出發。整個場景隨著日夜循環切換氛圍，從白晝的清澈到夜晚的深邃霓虹，呈現出令人驚豔的視覺層次。

---

## 🎬 功能特色

| 功能 | 說明 |
|------|------|
| 🛩️ **四機精簡系統** | 四架 SVG 飛行器，每條航道一架，永不擁擠 |
| 🟢🔴 **TCAS 物理引擎** | 模擬真實煞車曲線，無彈射、無跳變，絲滑滑行 |
| 🚦 **靠右行駛 (RHT)** | 嚴格單向航流，A/B/C/D 四條專屬分向航道 |
| 🌙 **日夜循環** | 30 秒一個週期，晝間→黃昏→夜間→清晨自動切換 |
| ✈️ **機翼導航燈** | 左翼紅色脈衝閃爍警示，右翼綠色穩定燈 |
| 📊 **航班資料標籤** | 每架飛機即時顯示航班ID、高度、空速 |
| 🏙️ **航港地景** | 科技管線、停機坪、中央航站總署、衛星調度樞紐 |
| 🌐 **雷達掃描環** | 底層緩慢旋轉的雷達掃描波，強化動態感 |
| 🌫️ **雲層特效** | 半透明浮動雲層，夜晚自動調暗 |

---

## 🚀 快速開始

```bash
# 1. Clone 專案
git clone https://github.com/WayneLY-Chen/neon-harbor.git
cd neon-harbor

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev
```

打開瀏覽器至 `http://localhost:5173` 即可看到霓虹航港！

---

## 🛠️ 技術棧

```
React 19        → 核心 UI 框架
Tailwind CSS 4  → 原子化 CSS 樣式系統
Vite 8          → 極速開發與打包工具
Lucide React    → 精緻圖示庫
```

---

## 📁 專案結構

```
neon-harbor/
├── src/
│   ├── components/
│   │   ├── ATCManagement.jsx   # 主場景與 UI 佈局
│   │   ├── AirportScene.jsx    # 地景、跑道、航站、管線
│   │   ├── Plane.jsx           # SVG 飛行器與航班標籤
│   │   ├── ControlTower.jsx    # 中央信號燈與雷達掃描
│   │   └── CloudLayer.jsx      # 浮動雲層特效
│   ├── hooks/
│   │   ├── usePlanePhysics.js  # TCAS 物理引擎（煞車、位移、重置）
│   │   └── useTrafficControl.js # 信號燈週期與日夜循環控制器
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── index.html
```

---

## ⚙️ 物理引擎說明

**TCAS 2.2 抗彈射系統**是本專案的核心技術：

- **二次方衰減煞車曲線**：飛機不會瞬間煞停，而是以 `dist²` 的平滑曲線逐漸減速。
- **無座標跳變**：完全移除 CSS `transition` 對 transform 的控制，改由 `requestAnimationFrame` 驅動，確保無視覺跳變。
- **邊界淡出**：飛機進入 **200px 緩衝區**後透明度降為 0，循環重置後再淡入，取代「被拉走」的視覺錯覺。
- **150px 安全間距**：A/B 與 C/D 航道中心點分別鎖定於 `y=350` 與 `y=500`（以及 `x=350/500`），確保機翼永不擦撞。

---

## 🎨 視覺設計原則

- **底色**：極深的森林暗綠 `#051005`，搭配極黑 `#020802` 背景，與名字「霓虹」形成張力對比。
- **跑道**：海軍藍 `#0f172a`，黃色 10% 透明度虛線中分。
- **霓虹飛機**：SVG 模型具備金屬漸層機身、發光機翼、尾跡噴流。
- **地面裝飾**：科技管線、靜態停泊飛機、幽靈文字噴漆，全部使用極低透明度避免干擾動態元素。

---

## 📄 授權

MIT License © 2026 [Wayne Chen](https://github.com/WayneLY-Chen)
