// Recipe Data Definition
const recipes = {
  breakfast: {
    name: "高蛋白穀物莓果麥片豆奶碗",
    ingredients: [
      { name: "科克蘭燕麥片", male: 40, female: 40, unit: "g" },
      { name: "綜合穀物與堅果", male: 15, female: 15, unit: "g" },
      { name: "冷凍野生藍莓/莓果", male: 70, female: 50, unit: "g" },
      { name: "無糖有機豆奶", male: 250, female: 200, unit: "ml" },
      { name: "乳清蛋白粉", male: 1.5, female: 1, unit: "匙" }
    ],
    macros: {
      male: { cal: 500, p: 50, c: 50, f: 13 },
      female: { cal: 450, p: 38, c: 47, f: 12.5 }
    }
  },
  patty: {
    name: "豆腐洋蔥豬肉漢堡排",
    ingredients: [
      { name: "義美板豆腐 (壓乾捏碎)", male: 100, female: 75, unit: "g" },
      { name: "豬絞肉 (Costco)", male: 100, female: 75, unit: "g" },
      { name: "洋蔥 (切細丁)", male: 50, female: 37, unit: "g" },
      { name: "新鮮雞蛋 (打散)", male: 0.5, female: 0.37, unit: "顆" }
    ],
    macros: {
      male: { cal: 290, p: 24, c: 8, f: 18.5 },
      female: { cal: 220, p: 18, c: 6, f: 14 }
    }
  },
  chicken: {
    name: "去皮烤雞腿排佐雙色時蔬",
    ingredients: [
      { name: "去骨去皮雞腿肉 (Costco)", male: 250, female: 150, unit: "g" },
      { name: "冷凍花椰菜 (Costco)", male: 75, female: 50, unit: "g" },
      { name: "紅蘿蔔", male: 40, female: 25, unit: "g" },
      { name: "洋蔥", male: 40, female: 25, unit: "g" },
      { name: "初榨橄欖油", male: 0.5, female: 0.5, unit: "茶匙" }
    ],
    macros: {
      male: { cal: 430, p: 50, c: 8, f: 22 },
      female: { cal: 280, p: 30, c: 5, f: 15 }
    }
  },
  egg: {
    name: "高蛋白毛豆仁洋蔥炒蛋",
    ingredients: [
      { name: "冷凍毛豆仁 (Costco)", male: 75, female: 75, unit: "g" },
      { name: "新鮮雞蛋", male: 1.5, female: 1.5, unit: "顆" },
      { name: "洋蔥絲", male: 25, female: 25, unit: "g" },
      { name: "初榨橄欖油", male: 0.5, female: 0.5, unit: "茶匙" }
    ],
    macros: {
      male: { cal: 240, p: 20, c: 9, f: 13.5 },
      female: { cal: 240, p: 20, c: 9, f: 13.5 }
    }
  }
};

// Offline Lookup Database
const nutritionDB = {
  "雞腿肉": { cal: 116, p: 20, c: 0, f: 4, unit: "g" },
  "去骨雞腿肉": { cal: 116, p: 20, c: 0, f: 4, unit: "g" },
  "雞胸肉": { cal: 110, p: 23, c: 0, f: 1.5, unit: "g" },
  "雞里肌": { cal: 110, p: 23, c: 0, f: 1, unit: "g" },
  "里肌肉": { cal: 110, p: 23, c: 0, f: 1, unit: "g" },
  "豬五花": { cal: 368, p: 17, c: 0, f: 33, unit: "g" },
  "五花肉": { cal: 368, p: 17, c: 0, f: 33, unit: "g" },
  "豬絞肉": { cal: 230, p: 18, c: 0, f: 17, unit: "g" },
  "絞肉": { cal: 230, p: 18, c: 0, f: 17, unit: "g" },
  "牛肉": { cal: 200, p: 26, c: 0, f: 10, unit: "g" },
  "牛排": { cal: 200, p: 26, c: 0, f: 10, unit: "g" },
  "沙朗": { cal: 200, p: 26, c: 0, f: 10, unit: "g" },
  "鮭魚": { cal: 206, p: 22, c: 0, f: 12, unit: "g" },
  "鯛魚": { cal: 110, p: 20, c: 0, f: 2, unit: "g" },
  "蝦仁": { cal: 85, p: 20, c: 0, f: 1, unit: "g" },
  "蝦": { cal: 85, p: 20, c: 0, f: 1, unit: "g" },
  "豆腐": { cal: 80, p: 8, c: 2, f: 4.5, unit: "g" },
  "板豆腐": { cal: 80, p: 8, c: 2, f: 4.5, unit: "g" },
  "雞蛋": { cal: 75, p: 6.5, c: 0.5, f: 5, unit: "顆" },
  "蛋": { cal: 75, p: 6.5, c: 0.5, f: 5, unit: "顆" },
  "毛豆": { cal: 120, p: 11, c: 10, f: 5, unit: "g" },
  "毛豆仁": { cal: 120, p: 11, c: 10, f: 5, unit: "g" },
  "杏鮑菇": { cal: 35, p: 2.5, c: 6, f: 0.2, unit: "g" },
  "花椰菜": { cal: 34, p: 3, c: 7, f: 0.3, unit: "g" },
  "紅蘿蔔": { cal: 41, p: 1, c: 10, f: 0.2, unit: "g" },
  "洋蔥": { cal: 40, p: 1.1, c: 9.3, f: 0.1, unit: "g" },
  "高麗菜": { cal: 25, p: 1.3, c: 6, f: 0.1, unit: "g" },
  "生菜": { cal: 15, p: 1, c: 3, f: 0.1, unit: "g" },
  "沙拉": { cal: 15, p: 1, c: 3, f: 0.1, unit: "g" },
  "地瓜": { cal: 86, p: 1.6, c: 20, f: 0.1, unit: "g" },
  "番薯": { cal: 86, p: 1.6, c: 20, f: 0.1, unit: "g" },
  "白飯": { cal: 130, p: 2.7, c: 28, f: 0.3, unit: "g" },
  "米飯": { cal: 130, p: 2.7, c: 28, f: 0.3, unit: "g" },
  "飯": { cal: 130, p: 2.7, c: 28, f: 0.3, unit: "g" },
  "麥片": { cal: 380, p: 13, c: 67, f: 7, unit: "g" },
  "燕麥片": { cal: 380, p: 13, c: 67, f: 7, unit: "g" },
  "牛奶": { cal: 60, p: 3.2, c: 4.8, f: 3.2, unit: "ml" },
  "鮮乳": { cal: 60, p: 3.2, c: 4.8, f: 3.2, unit: "ml" },
  "希臘優格": { cal: 60, p: 9, c: 3.5, f: 1, unit: "g" },
  "優格": { cal: 60, p: 9, c: 3.5, f: 1, unit: "g" },
  "豆漿": { cal: 35, p: 3.5, c: 1.5, f: 2, unit: "ml" },
  "豆奶": { cal: 35, p: 3.5, c: 1.5, f: 2, unit: "ml" }
};

// Global App State
let currentMode = 'both';
let activeTab = 'photo';
let uploadedImageBase64 = null;
let parsedIngredientsList = [];

// Shared Database State
let fitnessDB = {
  maleWeightHistory: [],   // { date, weight, fat }
  femaleWeightHistory: [], // { date, weight, fat }
  foodLogs: [],            // { date, who, meal, name, cal, p }
  workoutLogs: []          // { date, who, name, desc }
};

// Chart instances
let weightChartInstance = null;
let fatChartInstance = null;

// DOM Elements
const maleWeightInput = document.getElementById('male-weight');
const maleHeightInput = document.getElementById('male-height');
const maleAgeInput = document.getElementById('male-age');
const maleTargetFatInput = document.getElementById('male-target-fat');
const maleTargetCalEl = document.getElementById('male-target-calories');
const maleTargetProtEl = document.getElementById('male-target-protein');

const femaleWeightInput = document.getElementById('female-weight');
const femaleHeightInput = document.getElementById('female-height');
const femaleAgeInput = document.getElementById('female-age');
const femaleTargetWeightInput = document.getElementById('female-target-weight');
const femaleTargetCalEl = document.getElementById('female-target-calories');
const femaleTargetProtEl = document.getElementById('female-target-protein');

const portionBtns = document.querySelectorAll('.portion-btn');
const syncStatusEl = document.getElementById('sync-status');
const copyShareLinkBtn = document.getElementById('copy-share-link-btn');

// Macro progress indicators
const maleCalRatio = document.getElementById('male-cal-ratio');
const maleCalFill = document.getElementById('male-cal-fill');
const malePRatio = document.getElementById('male-p-ratio');
const malePFill = document.getElementById('male-p-fill');
const maleCRatio = document.getElementById('male-c-ratio');
const maleCFill = document.getElementById('male-c-fill');

const femaleCalRatio = document.getElementById('female-cal-ratio');
const femaleCalFill = document.getElementById('female-cal-fill');
const femalePRatio = document.getElementById('female-p-ratio');
const femalePFill = document.getElementById('female-p-fill');
const femaleCRatio = document.getElementById('female-c-ratio');
const femaleCFill = document.getElementById('female-c-fill');

// AI Elements
const tabBtnPhoto = document.getElementById('tab-btn-photo');
const tabBtnText = document.getElementById('tab-btn-text');
const contentPhoto = document.getElementById('content-photo');
const contentText = document.getElementById('content-text');
const dropzone = document.getElementById('dropzone');
const fileUpload = document.getElementById('file-upload');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const removeImgBtn = document.getElementById('remove-img-btn');
const textInput = document.getElementById('text-input');
const analyzeTextBtn = document.getElementById('analyze-text-btn');
const analyzePhotoBtn = document.getElementById('analyze-photo-btn');
const aiLoading = document.getElementById('ai-loading');
const aiStatusText = document.getElementById('ai-status-text');
const resultPlaceholder = document.getElementById('result-placeholder');
const resultsContainer = document.getElementById('results-container');
const analysisTableBody = document.getElementById('analysis-table-body');
const totalAnalCal = document.getElementById('total-anal-cal');
const totalAnalP = document.getElementById('total-anal-p');
const totalAnalC = document.getElementById('total-anal-c');
const totalAnalF = document.getElementById('total-anal-f');
const importIngredientsBtn = document.getElementById('import-ingredients-btn');
const aiTargetWho = document.getElementById('ai-target-who');
const aiMealCategory = document.getElementById('ai-meal-category');
const aiLogDate = document.getElementById('ai-log-date');
const imageOverlayContainer = document.getElementById('image-overlay-container');

// Navigation Tabs
const navTabKitchen = document.getElementById('tab-nav-kitchen');
const navTabLog = document.getElementById('tab-nav-log');
const navTabCharts = document.getElementById('tab-nav-charts');
const paneKitchen = document.getElementById('pane-kitchen');
const paneLog = document.getElementById('pane-log');
const paneCharts = document.getElementById('pane-charts');

// Log Form elements
const logMaleDate = document.getElementById('log-male-date');
const logFemaleDate = document.getElementById('log-female-date');
const workoutLogDate = document.getElementById('workout-log-date');

const maleWeightLogForm = document.getElementById('male-weight-log-form');
const femaleWeightLogForm = document.getElementById('female-weight-log-form');
const workoutLogForm = document.getElementById('workout-log-form');

const logMaleW = document.getElementById('log-male-w');
const logMaleF = document.getElementById('log-male-f');
const logFemaleW = document.getElementById('log-female-w');
const logFemaleF = document.getElementById('log-female-f');

const workoutLogWho = document.getElementById('workout-log-who');
const workoutLogName = document.getElementById('workout-log-name');
const workoutLogDesc = document.getElementById('workout-log-desc');

// History logs tab buttons
const histTabFood = document.getElementById('hist-tab-food');
const histTabWorkout = document.getElementById('hist-tab-workout');
const histTabWeight = document.getElementById('hist-tab-weight');
let activeHistTab = 'food';

// Initialization
function init() {
  setDefaultDates();
  loadFromLocalStorage();
  calculateTargets();
  updateRecipes();
  setupEventListeners();
  setupAIEventListeners();
  setupNavigation();
  setupLogFormListeners();
  
  // Load cloud data from Vercel KV
  loadSharedData();
}

// Set default dates to today
function setDefaultDates() {
  const today = new Date().toISOString().split('T')[0];
  logMaleDate.value = today;
  logFemaleDate.value = today;
  workoutLogDate.value = today;
  aiLogDate.value = today;
}

// Setup Event Listeners
function setupEventListeners() {
  const inputs = [
    maleWeightInput, maleHeightInput, maleAgeInput, maleTargetFatInput,
    femaleWeightInput, femaleHeightInput, femaleAgeInput, femaleTargetWeightInput
  ];

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      calculateTargets();
      updateRecipes();
      saveToLocalStorage();
    });
  });

  portionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      portionBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentMode = e.target.getAttribute('data-mode');
      updateRecipes();
    });
  });

  copyShareLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert('已複製共享網址！您可以發送給您的伴侶，開啟後即可實時同步健身日誌。');
  });
}

// Setup AI Event Listeners
function setupAIEventListeners() {
  tabBtnPhoto.addEventListener('click', () => {
    tabBtnPhoto.classList.add('active');
    tabBtnText.classList.remove('active');
    contentPhoto.classList.add('active');
    contentText.classList.remove('active');
    analyzePhotoBtn.style.display = 'flex';
    activeTab = 'photo';
  });

  tabBtnText.addEventListener('click', () => {
    tabBtnText.classList.add('active');
    tabBtnPhoto.classList.remove('active');
    contentText.classList.add('active');
    contentPhoto.classList.remove('active');
    analyzePhotoBtn.style.display = 'none';
    activeTab = 'text';
  });

  dropzone.addEventListener('click', () => fileUpload.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  fileUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleImageFile(e.target.files[0]);
    }
  });

  removeImgBtn.addEventListener('click', () => {
    uploadedImageBase64 = null;
    imagePreview.src = '';
    imagePreviewContainer.style.display = 'none';
    dropzone.style.display = 'block';
    fileUpload.value = '';
  });

  analyzeTextBtn.addEventListener('click', analyzeText);
  analyzePhotoBtn.addEventListener('click', analyzePhoto);
  importIngredientsBtn.addEventListener('click', importIngredientsToLogs);
}

// Setup Navigation Pane Switching
function setupNavigation() {
  const tabs = [
    { nav: navTabKitchen, pane: paneKitchen },
    { nav: navTabLog, pane: paneLog },
    { nav: navTabCharts, pane: paneCharts }
  ];

  tabs.forEach(tab => {
    tab.nav.addEventListener('click', () => {
      tabs.forEach(t => {
        t.nav.classList.remove('active');
        t.pane.classList.remove('active');
      });
      tab.nav.classList.add('active');
      tab.pane.classList.add('active');
      
      if (tab.nav === navTabCharts) {
        drawCharts();
      }
    });
  });
}

// Setup Log Form Submissions
function setupLogFormListeners() {
  // Male Weight submission
  maleWeightLogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = logMaleDate.value;
    const maleW = parseFloat(logMaleW.value);
    const maleF = parseFloat(logMaleF.value);

    if (maleW) {
      const existing = fitnessDB.maleWeightHistory.find(h => h.date === date);
      if (existing) {
        existing.weight = maleW;
        if (maleF) existing.fat = maleF;
      } else {
        fitnessDB.maleWeightHistory.push({ date, weight: maleW, fat: maleF || null });
      }
      maleWeightInput.value = maleW; // Update sidebar
      if (maleF) maleTargetFatInput.value = maleF;
    }

    fitnessDB.maleWeightHistory.sort((a,b) => a.date.localeCompare(b.date));

    // Reset inputs
    logMaleW.value = '';
    logMaleF.value = '';

    calculateTargets();
    updateRecipes();
    saveToLocalStorage();
    saveSharedData();
    renderHistoryTable();
    alert('已成功儲存男生體重體脂資料！');
  });

  // Female Weight submission
  femaleWeightLogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = logFemaleDate.value;
    const femaleW = parseFloat(logFemaleW.value);
    const femaleF = parseFloat(logFemaleF.value);

    if (femaleW) {
      const existing = fitnessDB.femaleWeightHistory.find(h => h.date === date);
      if (existing) {
        existing.weight = femaleW;
        if (femaleF) existing.fat = femaleF;
      } else {
        fitnessDB.femaleWeightHistory.push({ date, weight: femaleW, fat: femaleF || null });
      }
      femaleWeightInput.value = femaleW; // Update sidebar
      if (femaleF) femaleTargetWeightInput.value = femaleW;
    }

    fitnessDB.femaleWeightHistory.sort((a,b) => a.date.localeCompare(b.date));

    // Reset inputs
    logFemaleW.value = '';
    logFemaleF.value = '';

    calculateTargets();
    updateRecipes();
    saveToLocalStorage();
    saveSharedData();
    renderHistoryTable();
    alert('已成功儲存女生體重體脂資料！');
  });

  // Workout log submission
  workoutLogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = workoutLogDate.value;
    const who = workoutLogWho.value;
    const name = workoutLogName.value.trim();
    const desc = workoutLogDesc.value.trim();

    fitnessDB.workoutLogs.push({ date, who, name, desc });
    fitnessDB.workoutLogs.sort((a,b) => b.date.localeCompare(a.date));

    // Reset
    workoutLogName.value = '';
    workoutLogDesc.value = '';

    saveSharedData();
    renderHistoryTable();
    alert('運動紀錄成功儲存！');
  });

  // History logs navigation
  histTabFood.addEventListener('click', () => setHistoryTabActive('food'));
  histTabWorkout.addEventListener('click', () => setHistoryTabActive('workout'));
  histTabWeight.addEventListener('click', () => setHistoryTabActive('weight'));
}

function setHistoryTabActive(tabName) {
  histTabFood.classList.remove('active');
  histTabWorkout.classList.remove('active');
  histTabWeight.classList.remove('active');

  if (tabName === 'food') histTabFood.classList.add('active');
  if (tabName === 'workout') histTabWorkout.classList.add('active');
  if (tabName === 'weight') histTabWeight.classList.add('active');

  activeHistTab = tabName;
  renderHistoryTable();
}

// Render the historical lists tables
function renderHistoryTable() {
  const head = document.getElementById('history-table-head');
  const body = document.getElementById('history-table-body');
  
  head.innerHTML = '';
  body.innerHTML = '';

  if (activeHistTab === 'food') {
    head.innerHTML = `
      <tr>
        <th>日期</th>
        <th>對象</th>
        <th>餐別</th>
        <th>食物名稱</th>
        <th>熱量 (kcal)</th>
        <th>蛋白質 (g)</th>
        <th>操作</th>
      </tr>
    `;
    
    if (fitnessDB.foodLogs.length === 0) {
      body.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">尚無飲食記錄。</td></tr>';
      return;
    }

    fitnessDB.foodLogs.forEach((item, index) => {
      const tr = document.createElement('tr');
      const whoLabel = item.who === 'both' ? '👫 雙人' : (item.who === 'male' ? '🙋‍♂️ 男生' : '🙋‍♀️ 女生');
      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${whoLabel}</td>
        <td>${item.meal}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.cal} kcal</td>
        <td>${item.p}g</td>
        <td><button class="remove-btn" style="position:static; padding:0.2rem 0.5rem;" onclick="deleteLogItem('food', ${index})">🗑️ 刪除</button></td>
      `;
      body.appendChild(tr);
    });

  } else if (activeHistTab === 'workout') {
    head.innerHTML = `
      <tr>
        <th>日期</th>
        <th>成員</th>
        <th>運動項目</th>
        <th>備註 (強度/時間)</th>
        <th>操作</th>
      </tr>
    `;
    
    if (fitnessDB.workoutLogs.length === 0) {
      body.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">尚無運動記錄。</td></tr>';
      return;
    }

    fitnessDB.workoutLogs.forEach((item, index) => {
      const tr = document.createElement('tr');
      const whoLabel = item.who === 'both' ? '👫 雙人' : (item.who === 'male' ? '🙋‍♂️ 男生' : '🙋‍♀️ 女生');
      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${whoLabel}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.desc || '-'}</td>
        <td><button class="remove-btn" style="position:static; padding:0.2rem 0.5rem;" onclick="deleteLogItem('workout', ${index})">🗑️ 刪除</button></td>
      `;
      body.appendChild(tr);
    });

  } else if (activeHistTab === 'weight') {
    head.innerHTML = `
      <tr>
        <th>日期</th>
        <th>🙋‍♂️ 男生體重 (kg)</th>
        <th>🙋‍♂️ 男生體脂 (%)</th>
        <th>🙋‍♀️ 女生體重 (kg)</th>
        <th>🙋‍♀️ 女生體脂 (%)</th>
        <th>操作</th>
      </tr>
    `;

    // Merge weight history dates
    const allDates = Array.from(new Set([
      ...fitnessDB.maleWeightHistory.map(h => h.date),
      ...fitnessDB.femaleWeightHistory.map(h => h.date)
    ])).sort((a,b) => b.localeCompare(a)); // desc

    if (allDates.length === 0) {
      body.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">尚無身體指標記錄。</td></tr>';
      return;
    }

    allDates.forEach((date) => {
      const maleItem = fitnessDB.maleWeightHistory.find(h => h.date === date);
      const femaleItem = fitnessDB.femaleWeightHistory.find(h => h.date === date);
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${date}</td>
        <td>${maleItem ? maleItem.weight + ' kg' : '-'}</td>
        <td>${maleItem && maleItem.fat ? maleItem.fat + ' %' : '-'}</td>
        <td>${femaleItem ? femaleItem.weight + ' kg' : '-'}</td>
        <td>${femaleItem && femaleItem.fat ? femaleItem.fat + ' %' : '-'}</td>
        <td><button class="remove-btn" style="position:static; padding:0.2rem 0.5rem;" onclick="deleteWeightItem('${date}')">🗑️ 刪除</button></td>
      `;
      body.appendChild(tr);
    });
  }
}

// Global scope exposed functions for delete buttons
window.deleteLogItem = function(type, index) {
  if (!confirm('確定要刪除此筆記錄嗎？')) return;
  if (type === 'food') {
    fitnessDB.foodLogs.splice(index, 1);
  } else if (type === 'workout') {
    fitnessDB.workoutLogs.splice(index, 1);
  }
  calculateTargets();
  saveSharedData();
  renderHistoryTable();
};

window.deleteWeightItem = function(date) {
  if (!confirm('確定要刪除此日期的所有體重指標嗎？')) return;
  fitnessDB.maleWeightHistory = fitnessDB.maleWeightHistory.filter(h => h.date !== date);
  fitnessDB.femaleWeightHistory = fitnessDB.femaleWeightHistory.filter(h => h.date !== date);
  
  // Sync inputs back to latest weight
  if (fitnessDB.maleWeightHistory.length > 0) {
    const latest = fitnessDB.maleWeightHistory[fitnessDB.maleWeightHistory.length - 1];
    maleWeightInput.value = latest.weight;
    if (latest.fat) maleTargetFatInput.value = latest.fat;
  }
  if (fitnessDB.femaleWeightHistory.length > 0) {
    const latest = fitnessDB.femaleWeightHistory[fitnessDB.femaleWeightHistory.length - 1];
    femaleWeightInput.value = latest.weight;
    if (latest.fat) femaleTargetWeightInput.value = latest.weight;
  }

  calculateTargets();
  updateRecipes();
  saveToLocalStorage();
  saveSharedData();
  renderHistoryTable();
};

// Handle selected image file
function handleImageFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedImageBase64 = e.target.result.split(',')[1];
    imagePreview.src = e.target.result;
    dropzone.style.display = 'none';
    imagePreviewContainer.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

// Calculate calorie goals and sum today's food logs
function calculateTargets() {
  // Male (Mifflin-St Jeor)
  const mWeight = parseFloat(maleWeightInput.value) || 85;
  const mHeight = parseFloat(maleHeightInput.value) || 180;
  const mAge = parseFloat(maleAgeInput.value) || 30;
  const mBMR = 10 * mWeight + 6.25 * mHeight - 5 * mAge + 5;
  const mTDEE = mBMR * 1.35; 
  const mTargetCal = Math.round(mTDEE - 600); 
  const mTargetProt = Math.round(mWeight * 2.0); 

  maleTargetCalEl.textContent = mTargetCal.toLocaleString();
  maleTargetProtEl.textContent = mTargetProt;

  // Female (Mifflin-St Jeor)
  const fWeight = parseFloat(femaleWeightInput.value) || 67;
  const fHeight = parseFloat(femaleHeightInput.value) || 170;
  const fAge = parseFloat(femaleAgeInput.value) || 30;
  const fBMR = 10 * fWeight + 6.25 * fHeight - 5 * fAge - 161;
  const fTDEE = fBMR * 1.35; 
  const fTargetCal = Math.round(fTDEE - 400); 
  const fTargetProt = Math.round(fWeight * 1.8);

  femaleTargetCalEl.textContent = fTargetCal.toLocaleString();
  femaleTargetProtEl.textContent = fTargetProt;

  updateTodayProgress(mTargetCal, mTargetProt, fTargetCal, fTargetProt);
}

// Sum today's logged meals and update progress bars
function updateTodayProgress(mCalGoal, mPGoal, fCalGoal, fPGoal) {
  const todayStr = new Date().toISOString().split('T')[0];
  
  let mCalAct = 0, mPAct = 0;
  let fCalAct = 0, fPAct = 0;

  fitnessDB.foodLogs.forEach(log => {
    if (log.date === todayStr) {
      if (log.who === 'male') {
        mCalAct += log.cal;
        mPAct += log.p;
      } else if (log.who === 'female') {
        fCalAct += log.cal;
        fPAct += log.p;
      } else if (log.who === 'both') {
        mCalAct += Math.round(log.cal / 2);
        mPAct += Math.round((log.p / 2) * 10) / 10;
        fCalAct += Math.round(log.cal / 2);
        fPAct += Math.round((log.p / 2) * 10) / 10;
      }
    }
  });

  const mCAct = Math.round((mCalAct * 0.4) / 4);
  const fCAct = Math.round((fCalAct * 0.4) / 4);
  const mCGoal = 150;
  const fCGoal = 130;

  maleCalRatio.textContent = `${mCalAct} / ${mCalGoal} kcal`;
  maleCalFill.style.width = `${Math.min((mCalAct / mCalGoal) * 100, 100)}%`;
  malePRatio.textContent = `${mPAct} / ${mPGoal}g`;
  malePFill.style.width = `${Math.min((mPAct / mPGoal) * 100, 100)}%`;
  maleCRatio.textContent = `${mCAct} / ${mCGoal}g`;
  maleCFill.style.width = `${Math.min((mCAct / mCGoal) * 100, 100)}%`;

  femaleCalRatio.textContent = `${fCalAct} / ${fCalGoal} kcal`;
  femaleCalFill.style.width = `${Math.min((fCalAct / fCalGoal) * 100, 100)}%`;
  femalePRatio.textContent = `${fPAct} / ${fPGoal}g`;
  femalePFill.style.width = `${Math.min((fPAct / fPGoal) * 100, 100)}%`;
  femaleCRatio.textContent = `${fCAct} / ${fCGoal}g`;
  femaleCFill.style.width = `${Math.min((fCAct / fCGoal) * 100, 100)}%`;
}

// Update Interactive Recipes view based on portion mode
function updateRecipes() {
  Object.keys(recipes).forEach(recipeKey => {
    const recipe = recipes[recipeKey];
    const ul = document.getElementById(`ing-list-${recipeKey}`);
    ul.innerHTML = '';

    recipe.ingredients.forEach(ing => {
      const li = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.className = 'ing-name';
      nameSpan.textContent = ing.name;

      const weightSpan = document.createElement('span');
      weightSpan.className = 'ing-weight';

      if (currentMode === 'both') {
        weightSpan.textContent = `男生: ${ing.male}${ing.unit} | 女生: ${ing.female}${ing.unit}`;
      } else if (currentMode === 'male') {
        weightSpan.textContent = `${ing.male}${ing.unit}`;
      } else if (currentMode === 'female') {
        weightSpan.textContent = `${ing.female}${ing.unit}`;
      }

      li.appendChild(nameSpan);
      li.appendChild(weightSpan);
      ul.appendChild(li);
    });
  });
}

// API Call dispatcher to Vercel Serverless `/api/analyze`
async function callAnalysisAPI({ type, imageBase64, text }) {
  const isLocalFile = window.location.protocol === 'file:';
  
  if (isLocalFile) {
    throw new Error('LOCAL_FALLBACK');
  }

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, imageBase64, text })
  });

  if (!response.ok) {
    throw new Error('SERVERLESS_API_FAILED');
  }

  return await response.json();
}

// Text analysis action
async function analyzeText() {
  const text = textInput.value.trim();
  if (!text) {
    alert("請輸入食材內容！");
    return;
  }

  showLoading(true, "AI 文字萃取與營養計算中...");

  try {
    parsedIngredientsList = await callAnalysisAPI({ type: 'text', text: text });
    displayAnalysisResults();
    showLoading(false);
  } catch (err) {
    console.log("AI Text Analysis failed or running offline, switching to regex parser:", err);
    setTimeout(() => {
      parsedIngredientsList = [];
      const lines = text.split('\n');
      
      lines.forEach(line => {
        if (!line.trim()) return;

        const numMatch = line.match(/(\d+(?:\.\d+)?)\s*(克|g|顆|盒|包|ml|cc|匙)?/i);
        let qty = 100; 
        let unit = "g";
        if (numMatch) {
          qty = parseFloat(numMatch[1]);
          if (numMatch[2]) {
            unit = numMatch[2].toLowerCase();
          }
        }

        let matchedKey = null;
        let matchedData = null;
        
        for (const key in nutritionDB) {
          if (line.includes(key)) {
            matchedKey = key;
            matchedData = nutritionDB[key];
            break;
          }
        }

        if (matchedData) {
          let factor = 1;
          let actualWeight = qty;
          
          if (matchedData.unit === "g") {
            if (unit === "盒" && (matchedKey.includes("豆腐") || matchedKey.includes("板豆腐"))) {
              actualWeight = qty * 300; 
            } else if (unit === "包" && matchedKey.includes("雞腿肉")) {
              actualWeight = qty * 500; 
            }
            factor = actualWeight / 100;
          } else {
            factor = qty;
            actualWeight = qty;
          }

          parsedIngredientsList.push({
            name: matchedKey,
            weight: actualWeight,
            unit: matchedData.unit,
            calories: Math.round(matchedData.cal * factor),
            protein: Math.round(matchedData.p * factor * 10) / 10,
            carbs: Math.round(matchedData.c * factor * 10) / 10,
            fat: Math.round(matchedData.f * factor * 10) / 10
          });
        } else {
          parsedIngredientsList.push({
            name: line.replace(/[\d\s克g顆盒包mlcc匙]/g, "") || "未知食材",
            weight: qty,
            unit: unit,
            calories: Math.round(qty * 0.8), 
            protein: Math.round(qty * 0.05 * 10) / 10,
            carbs: Math.round(qty * 0.1 * 10) / 10,
            fat: Math.round(qty * 0.02 * 10) / 10
          });
        }
      });

      displayAnalysisResults();
      showLoading(false);
    }, 800);
  }
}

// Photo analysis action
async function analyzePhoto() {
  if (!uploadedImageBase64) {
    alert("請先上傳食材相片！");
    return;
  }

  showLoading(true, "AI 照片辨識與發票分析中...");

  try {
    parsedIngredientsList = await callAnalysisAPI({ type: 'photo', imageBase64: uploadedImageBase64 });
    displayAnalysisResults();
    showLoading(false);
  } catch (err) {
    console.log("Photo analysis API failed, running mock simulation:", err);
    setTimeout(() => {
      parsedIngredientsList = [
        { name: "去骨雞腿肉 (Costco)", weight: 400, unit: "g", calories: 464, protein: 80, carbs: 0, fat: 16, box_2d: [150, 100, 500, 600] },
        { name: "義美板豆腐", weight: 300, unit: "g", calories: 240, protein: 24, carbs: 6, fat: 13.5, box_2d: [150, 550, 450, 830] },
        { name: "新鮮雞蛋", weight: 3, unit: "顆", calories: 225, protein: 19.5, carbs: 1.5, fat: 15, box_2d: [480, 500, 900, 820] },
        { name: "冷凍毛豆仁 (Costco)", weight: 150, unit: "g", calories: 180, protein: 16.5, carbs: 15, fat: 7.5, box_2d: [400, 100, 800, 450] }
      ];
      displayAnalysisResults();
      showLoading(false);
    }, 2000);
  }
}

// Toggle display of loading spinner and results placeholder
function showLoading(show, text = "") {
  if (show) {
    aiStatusText.textContent = text;
    aiLoading.style.display = 'flex';
    resultPlaceholder.style.display = 'none';
    resultsContainer.style.display = 'none';
  } else {
    aiLoading.style.display = 'none';
  }
}

// Display results in the table with editable inputs
function displayAnalysisResults() {
  analysisTableBody.innerHTML = '';
  
  if (parsedIngredientsList.length === 0) {
    resultsContainer.style.display = 'none';
    resultPlaceholder.style.display = 'block';
    if (imageOverlayContainer) imageOverlayContainer.innerHTML = '';
    return;
  }

  parsedIngredientsList.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.setAttribute('onmouseenter', `highlightIngredientBox(${index})`);
    tr.setAttribute('onmouseleave', 'clearIngredientHighlight()');
    
    tr.innerHTML = `
      <td><input type="text" class="inline-edit-input" style="min-width: 120px; width: 100%;" value="${item.name}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'name', this.value)"></td>
      <td>
        <div style="display:flex; gap:0.25rem; align-items:center;">
          <input type="number" class="inline-edit-input" style="width:60px;" value="${item.weight}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'weight', parseFloat(this.value) || 0)">
          <span style="font-size:0.75rem; color:var(--text-muted);">${item.unit || 'g'}</span>
        </div>
      </td>
      <td><input type="number" class="inline-edit-input" style="width:60px;" value="${item.calories}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'calories', parseFloat(this.value) || 0)"></td>
      <td><input type="number" class="inline-edit-input" style="width:50px;" value="${item.protein}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'protein', parseFloat(this.value) || 0)"></td>
      <td><input type="number" class="inline-edit-input" style="width:50px;" value="${item.carbs}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'carbs', parseFloat(this.value) || 0)"></td>
      <td><input type="number" class="inline-edit-input" style="width:50px;" value="${item.fat}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'fat', parseFloat(this.value) || 0)"></td>
      <td><button class="remove-btn" style="position:static; padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="deleteAiIngredient(${index})">🗑️ 刪除</button></td>
    `;
    analysisTableBody.appendChild(tr);
  });

  calculateAiTotals();
  resultPlaceholder.style.display = 'none';
  resultsContainer.style.display = 'block';
}

window.highlightIngredientBox = function(index) {
  if (!imageOverlayContainer) return;
  imageOverlayContainer.innerHTML = '';
  
  const item = parsedIngredientsList[index];
  if (item && item.box_2d && Array.isArray(item.box_2d) && item.box_2d.length === 4) {
    const [ymin, xmin, ymax, xmax] = item.box_2d;
    
    const box = document.createElement('div');
    box.className = 'bounding-box-highlight';
    
    // Position using percentages (responsive to container dimensions)
    box.style.top = `${ymin / 10}%`;
    box.style.left = `${xmin / 10}%`;
    box.style.width = `${(xmax - xmin) / 10}%`;
    box.style.height = `${(ymax - ymin) / 10}%`;
    
    // Add Label
    const label = document.createElement('span');
    label.className = 'box-label';
    label.textContent = item.name;
    box.appendChild(label);
    
    imageOverlayContainer.appendChild(box);
  }
};

window.clearIngredientHighlight = function() {
  if (imageOverlayContainer) {
    imageOverlayContainer.innerHTML = '';
  }
};

window.updateAiIngredient = function(index, field, value) {
  if (parsedIngredientsList[index]) {
    parsedIngredientsList[index][field] = value;
    
    // Auto-recalculate nutrition if name or weight changes
    if (field === 'name' || field === 'weight') {
      const currentName = parsedIngredientsList[index].name || "";
      // Fuzzy search in nutritionDB
      let matchKey = Object.keys(nutritionDB).find(key => currentName.includes(key) || key.includes(currentName));
      
      if (matchKey) {
        const nut = nutritionDB[matchKey];
        const weight = parsedIngredientsList[index].weight || 0;
        const isGramOrMl = nut.unit === 'g' || nut.unit === 'ml';
        const multiplier = isGramOrMl ? (weight / 100) : weight;

        parsedIngredientsList[index].calories = Math.round(nut.cal * multiplier);
        parsedIngredientsList[index].protein = Math.round(nut.p * multiplier * 10) / 10;
        parsedIngredientsList[index].carbs = Math.round(nut.c * multiplier * 10) / 10;
        parsedIngredientsList[index].fat = Math.round(nut.f * multiplier * 10) / 10;
        parsedIngredientsList[index].unit = nut.unit;

        // Re-render display to reflect automatically calculated values
        displayAnalysisResults();
        return;
      }
    }

    calculateAiTotals();
  }
};

window.deleteAiIngredient = function(index) {
  parsedIngredientsList.splice(index, 1);
  displayAnalysisResults();
};

function calculateAiTotals() {
  let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;
  parsedIngredientsList.forEach(item => {
    totalCal += item.calories;
    totalP += item.protein;
    totalC += item.carbs;
    totalF += item.fat;
  });

  totalAnalCal.textContent = Math.round(totalCal);
  totalAnalP.textContent = Math.round(totalP * 10) / 10;
  totalAnalC.textContent = Math.round(totalC * 10) / 10;
  totalAnalF.textContent = Math.round(totalF * 10) / 10;
}

// Import parsed items as a shared food log entry (1-click import using form selections)
function importIngredientsToLogs() {
  if (parsedIngredientsList.length === 0) return;

  const targetWho = aiTargetWho.value;
  const targetMeal = aiMealCategory.value;
  const dateStr = aiLogDate.value || new Date().toISOString().split('T')[0];

  // Combine items to import as a single aggregate entry
  let totalP = 0, totalCal = 0;
  let itemsStr = "";

  parsedIngredientsList.forEach(item => {
    totalCal += item.calories;
    totalP += item.protein;
    itemsStr += `${item.name}+`;
  });
  itemsStr = itemsStr.slice(0, -1); // remove trailing +

  fitnessDB.foodLogs.push({
    date: dateStr,
    who: targetWho,
    meal: targetMeal,
    name: `AI匯入: ${itemsStr}`,
    cal: Math.round(totalCal),
    p: Math.round(totalP * 10) / 10
  });

  fitnessDB.foodLogs.sort((a,b) => b.date.localeCompare(a.date));

  calculateTargets();
  saveSharedData();
  renderHistoryTable();
  
  navTabLog.click();
  
  const whoLabel = targetWho === 'both' ? '👫 雙人共餐' : (targetWho === 'male' ? '🙋‍♂️ 男生' : '🙋‍♀️ 女生');
  alert(`成功！已將 AI 解析的總計 ${Math.round(totalCal)} kcal / ${Math.round(totalP)}g 蛋白質 匯入至 ${dateStr} ${whoLabel} 的 ${targetMeal} 飲食日誌。`);
}

// Render dynamic charts using Chart.js
function drawCharts() {
  const dates = Array.from(new Set([
    ...fitnessDB.maleWeightHistory.map(h => h.date),
    ...fitnessDB.femaleWeightHistory.map(h => h.date)
  ])).sort((a,b) => a.localeCompare(b)); // chronological asc

  const maleWeights = dates.map(d => {
    const found = fitnessDB.maleWeightHistory.find(h => h.date === d);
    return found ? found.weight : null;
  });
  
  const femaleWeights = dates.map(d => {
    const found = fitnessDB.femaleWeightHistory.find(h => h.date === d);
    return found ? found.weight : null;
  });

  const maleFats = dates.map(d => {
    const found = fitnessDB.maleWeightHistory.find(h => h.date === d);
    return found ? found.fat : null;
  });

  const femaleFats = dates.map(d => {
    const found = fitnessDB.femaleWeightHistory.find(h => h.date === d);
    return found ? found.fat : null;
  });

  if (weightChartInstance) weightChartInstance.destroy();
  if (fatChartInstance) fatChartInstance.destroy();

  const ctxWeight = document.getElementById('weightChart').getContext('2d');
  const ctxFat = document.getElementById('fatChart').getContext('2d');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#f3f4f6', font: { family: 'Outfit', size: 12 } }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af' }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  weightChartInstance = new Chart(ctxWeight, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: '🙋‍♂️ 男生體重 (kg)',
          data: maleWeights,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          tension: 0.2,
          spanGaps: true
        },
        {
          label: '🙋‍♀️ 女生體重 (kg)',
          data: femaleWeights,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.2,
          spanGaps: true
        }
      ]
    },
    options: chartOptions
  });

  fatChartInstance = new Chart(ctxFat, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: '🙋‍♂️ 男生體脂 (%)',
          data: maleFats,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.05)',
          tension: 0.2,
          spanGaps: true
        },
        {
          label: '🙋‍♀️ 女生體脂 (%)',
          data: femaleFats,
          borderColor: '#34d399',
          backgroundColor: 'rgba(52, 211, 153, 0.05)',
          tension: 0.2,
          spanGaps: true
        }
      ]
    },
    options: chartOptions
  });
}

// Call /api/load to pull shared logs from Vercel KV
async function loadSharedData() {
  setSyncStatus('loading', '🔄 雲端載入中...');
  try {
    const isLocalFile = window.location.protocol === 'file:';
    if (isLocalFile) {
      throw new Error('LOCAL_OFFLINE');
    }

    const response = await fetch('/api/load');
    if (!response.ok) throw new Error('API_LOAD_ERROR');
    
    const cloudData = await response.json();
    
    if (cloudData) {
      if (cloudData.maleWeightHistory) fitnessDB.maleWeightHistory = cloudData.maleWeightHistory;
      if (cloudData.femaleWeightHistory) fitnessDB.femaleWeightHistory = cloudData.femaleWeightHistory;
      if (cloudData.foodLogs) fitnessDB.foodLogs = cloudData.foodLogs;
      if (cloudData.workoutLogs) fitnessDB.workoutLogs = cloudData.workoutLogs;
      
      // Sync sidebar inputs with the latest record
      if (fitnessDB.maleWeightHistory.length > 0) {
        const latest = fitnessDB.maleWeightHistory[fitnessDB.maleWeightHistory.length - 1];
        maleWeightInput.value = latest.weight;
        if (latest.fat) maleTargetFatInput.value = latest.fat;
      }
      if (fitnessDB.femaleWeightHistory.length > 0) {
        const latest = fitnessDB.femaleWeightHistory[fitnessDB.femaleWeightHistory.length - 1];
        femaleWeightInput.value = latest.weight;
        if (latest.fat) femaleTargetWeightInput.value = latest.weight;
      }
    }

    setSyncStatus('synced', '☁️ 雲端已同步');
  } catch (err) {
    console.warn("Could not load from Vercel KV, using local storage fallback:", err);
    setSyncStatus('error', '⚠️ 離線本地模式');
    
    const localBackup = localStorage.getItem('costco_fitness_db_backup');
    if (localBackup) {
      try {
        fitnessDB = JSON.parse(localBackup);
      } catch(e) {}
    }
  }

  calculateTargets();
  renderHistoryTable();
}

// Call /api/save to push updates to Vercel KV
async function saveSharedData() {
  localStorage.setItem('costco_fitness_db_backup', JSON.stringify(fitnessDB));
  
  setSyncStatus('loading', '🔄 雲端儲存中...');
  try {
    const isLocalFile = window.location.protocol === 'file:';
    if (isLocalFile) {
      throw new Error('LOCAL_OFFLINE');
    }

    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fitnessDB)
    });

    if (!response.ok) throw new Error('API_SAVE_ERROR');
    setSyncStatus('synced', '☁️ 雲端已同步');
  } catch (err) {
    console.warn("Could not write to Vercel KV:", err);
    setSyncStatus('error', '⚠️ 未同步到雲端');
  }
}

function setSyncStatus(state, text) {
  syncStatusEl.className = 'sync-status-indicator';
  syncStatusEl.textContent = text;
  
  if (state === 'synced') {
    syncStatusEl.classList.add('synced');
  }
}

// Local Settings storage
function saveToLocalStorage() {
  const settings = {
    maleWeight: maleWeightInput.value,
    maleHeight: maleHeightInput.value,
    maleAge: maleAgeInput.value,
    maleTargetFat: maleTargetFatInput.value,
    femaleWeight: femaleWeightInput.value,
    femaleHeight: femaleHeightInput.value,
    femaleAge: femaleAgeInput.value,
    femaleTargetWeight: femaleTargetWeightInput.value,
    currentMode: currentMode
  };
  localStorage.setItem('costco_fitness_settings', JSON.stringify(settings));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem('costco_fitness_settings');
  if (stored) {
    try {
      const settings = JSON.parse(stored);
      if (settings.maleWeight) maleWeightInput.value = settings.maleWeight;
      if (settings.maleHeight) maleHeightInput.value = settings.maleHeight;
      if (settings.maleAge) maleAgeInput.value = settings.maleAge;
      if (settings.maleTargetFat) maleTargetFatInput.value = settings.maleTargetFat;
      if (settings.femaleWeight) femaleWeightInput.value = settings.femaleWeight;
      if (settings.femaleHeight) femaleHeightInput.value = settings.femaleHeight;
      if (settings.femaleAge) femaleAgeInput.value = settings.femaleAge;
      if (settings.femaleTargetWeight) femaleTargetWeightInput.value = settings.femaleTargetWeight;
      if (settings.currentMode) {
        currentMode = settings.currentMode;
        portionBtns.forEach(btn => {
          if (btn.getAttribute('data-mode') === currentMode) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    } catch (e) {
      console.error('Error loading settings', e);
    }
  }
}

window.onload = init;
