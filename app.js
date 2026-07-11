// Recipe Data Definition
const recipes = {
  oats: {
    name: "香蕉花生醬燕麥粥",
    ingredients: [
      { name: "科克蘭燕麥片", male: 50, female: 40, unit: "g" },
      { name: "乳清蛋白粉", male: 1.5, female: 1, unit: "匙" },
      { name: "花生醬", male: 15, female: 10, unit: "g" },
      { name: "香蕉", male: 1, female: 0.5, unit: "根" }
    ],
    macros: {
      male: { cal: 450, p: 35, c: 55, f: 12 },
      female: { cal: 320, p: 25, c: 38, f: 8 }
    }
  },
  patty: {
    name: "洋蔥豆腐雞肉餅",
    ingredients: [
      { name: "去骨雞胸肉", male: 150, female: 120, unit: "g" },
      { name: "板豆腐", male: 50, female: 40, unit: "g" },
      { name: "洋蔥", male: 30, female: 20, unit: "g" },
      { name: "新鮮雞蛋", male: 0.5, female: 0.5, unit: "顆" }
    ],
    macros: {
      male: { cal: 320, p: 38, c: 6, f: 14 },
      female: { cal: 250, p: 30, c: 5, f: 11 }
    }
  },
  chicken: {
    name: "蒜香嫩煎雞腿肉",
    ingredients: [
      { name: "去骨雞腿肉", male: 250, female: 150, unit: "g" },
      { name: "蒜頭", male: 15, female: 10, unit: "g" }
    ],
    macros: {
      male: { cal: 420, p: 48, c: 2, f: 23 },
      female: { cal: 260, p: 29, c: 1, f: 14 }
    }
  },
  egg: {
    name: "毛豆滑蛋炒洋蔥",
    ingredients: [
      { name: "冷凍毛豆仁", male: 80, female: 60, unit: "g" },
      { name: "新鮮雞蛋", male: 2, female: 1.5, unit: "顆" },
      { name: "洋蔥", male: 30, female: 20, unit: "g" }
    ],
    macros: {
      male: { cal: 280, p: 22, c: 10, f: 15 },
      female: { cal: 210, p: 16, c: 8, f: 11 }
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

// Escape user-provided strings before injecting into innerHTML / attributes
function escapeHTML(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Private share key: isolates each couple's data in its own KV record
const SHARE_KEY_STORAGE = 'costco_fitness_share_key';
const SHARE_KEY_FORMAT = /^[A-Za-z0-9_-]{8,64}$/;
let shareKey = null;
let needsLegacyMigration = false;

function generateShareKey() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, '');
  }
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function initShareKey() {
  let urlKey = null;
  try {
    urlKey = new URLSearchParams(window.location.search).get('key');
  } catch (e) {}
  const storedKey = localStorage.getItem(SHARE_KEY_STORAGE);

  if (urlKey && SHARE_KEY_FORMAT.test(urlKey)) {
    // Joining via a shared link: adopt the partner's key
    shareKey = urlKey;
    localStorage.setItem(SHARE_KEY_STORAGE, shareKey);
  } else if (storedKey && SHARE_KEY_FORMAT.test(storedKey)) {
    shareKey = storedKey;
  } else {
    shareKey = generateShareKey();
    localStorage.setItem(SHARE_KEY_STORAGE, shareKey);
    // First run on this device: pull data from the old shared pool once
    needsLegacyMigration = true;
  }

  // Keep the key in the address bar so copying the browser URL also shares it
  try {
    if (window.location.protocol !== 'file:') {
      history.replaceState(null, '', `${window.location.pathname}?key=${shareKey}`);
    }
  } catch (e) {}
}

function buildShareLink() {
  return `${window.location.origin}${window.location.pathname}?key=${shareKey}`;
}

function hasAnyContent(db) {
  return !!db && ['maleWeightHistory', 'femaleWeightHistory', 'foodLogs', 'workoutLogs', 'costcoInventory']
    .some(k => Array.isArray(db[k]) && db[k].length > 0);
}

// Shared Database State
let fitnessDB = {
  maleWeightHistory: [],   // { date, weight, fat }
  femaleWeightHistory: [], // { date, weight, fat }
  foodLogs: [],            // { date, who, meal, name, cal, p }
  workoutLogs: [],          // { date, who, name, desc }
  costcoInventory: []      // { name, total, remaining, unit }
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
const navTabRecipes = document.getElementById('tab-nav-recipes');
const navTabLog = document.getElementById('tab-nav-log');
const navTabCharts = document.getElementById('tab-nav-charts');
const paneKitchen = document.getElementById('pane-kitchen');
const paneRecipes = document.getElementById('pane-recipes');
const paneLog = document.getElementById('pane-log');
const paneCharts = document.getElementById('pane-charts');

// Inventory Elements
const inventoryList = document.getElementById('inventory-list');
const addInventoryForm = document.getElementById('add-inventory-form');
const invItemName = document.getElementById('inv-item-name');
const invItemQty = document.getElementById('inv-item-qty');
const invItemUnit = document.getElementById('inv-item-unit');
const importToInventoryBtn = document.getElementById('import-to-inventory-btn');

// Log Form elements
const workoutLogDate = document.getElementById('workout-log-date');
const workoutLogForm = document.getElementById('workout-log-form');

const workoutLogWho = document.getElementById('workout-log-who');
const workoutLogType = document.getElementById('workout-log-type');
const workoutLogDuration = document.getElementById('workout-log-duration');
const workoutLogName = document.getElementById('workout-log-name');
const workoutLogLoad = document.getElementById('workout-log-load');
const workoutLogIntensity = document.getElementById('workout-log-intensity');
const workoutLogDesc = document.getElementById('workout-log-desc');
const workoutLogBurned = document.getElementById('workout-log-burned');

// Energy Balance Sheet Elements
const mEnergyIntake = document.getElementById('m-energy-intake');
const mEnergyWorkout = document.getElementById('m-energy-workout');
const mEnergyBmr = document.getElementById('m-energy-bmr');
const mEnergyNetBadge = document.getElementById('m-energy-net-badge');

const fEnergyIntake = document.getElementById('f-energy-intake');
const fEnergyWorkout = document.getElementById('f-energy-workout');
const fEnergyBmr = document.getElementById('f-energy-bmr');
const fEnergyNetBadge = document.getElementById('f-energy-net-badge');

const chartMaleWeightForm = document.getElementById('chart-male-weight-form');
const chartFemaleWeightForm = document.getElementById('chart-female-weight-form');
const chartMaleDate = document.getElementById('chart-male-date');
const chartMaleW = document.getElementById('chart-male-w');
const chartMaleF = document.getElementById('chart-male-f');
const chartFemaleDate = document.getElementById('chart-female-date');
const chartFemaleW = document.getElementById('chart-female-w');
const chartFemaleF = document.getElementById('chart-female-f');
const workoutInfoTip = document.getElementById('workout-info-tip');

// History logs tab buttons
const histTabFood = document.getElementById('hist-tab-food');
const histTabWorkout = document.getElementById('hist-tab-workout');
const histTabWeight = document.getElementById('hist-tab-weight');
let activeHistTab = 'food';

// Initialization
function init() {
  initShareKey();
  setDefaultDates();
  loadFromLocalStorage();
  calculateTargets();
  updateRecipes();
  setupEventListeners();
  setupAIEventListeners();
  setupNavigation();
  setupLogFormListeners();
  setupWorkoutListeners();
  setupAutoRefresh();

  // Load cloud data from Vercel KV
  loadSharedData();
}

// Re-pull cloud data when returning to the page (reduces stale-overwrite risk
// between two devices), skipping while the user is typing in a field.
function setupAutoRefresh() {
  const refresh = () => {
    const ae = document.activeElement;
    if (ae && ['INPUT', 'TEXTAREA', 'SELECT'].includes(ae.tagName)) return;
    loadSharedData();
  };
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh();
  });
  setInterval(refresh, 90000);
}

// Set default dates to today
function setDefaultDates() {
  const today = new Date().toISOString().split('T')[0];
  workoutLogDate.value = today;
  aiLogDate.value = today;
  if (chartMaleDate) chartMaleDate.value = today;
  if (chartFemaleDate) chartFemaleDate.value = today;
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
    navigator.clipboard.writeText(buildShareLink());
    alert('已複製共享網址（內含你們專屬的同步金鑰）！\n請只發送給您的伴侶，開啟後即可實時同步健身日誌。');
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
  if (importToInventoryBtn) {
    importToInventoryBtn.addEventListener('click', importIngredientsToInventory);
  }
}

// Setup Navigation Pane Switching
function setupNavigation() {
  const tabs = [
    { nav: navTabKitchen, pane: paneKitchen },
    { nav: navTabRecipes, pane: paneRecipes },
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


  // Workout log submission
  workoutLogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = workoutLogDate.value;
    const who = workoutLogWho.value;
    const type = workoutLogType.value;
    const name = workoutLogName.value.trim();
    const duration = parseFloat(workoutLogDuration.value) || 0;
    const load = parseFloat(workoutLogLoad.value) || 0;
    const intensity = workoutLogIntensity.value;
    const desc = workoutLogDesc.value.trim();
    const burnedCal = parseFloat(workoutLogBurned.textContent) || 0;

    fitnessDB.workoutLogs.push({ date, who, type, name, duration, load, intensity, desc, burnedCal });
    fitnessDB.workoutLogs.sort((a,b) => b.date.localeCompare(a.date));

    // Reset
    workoutLogName.value = '';
    workoutLogLoad.value = '0';
    workoutLogDesc.value = '';
    workoutLogDuration.value = '30';

    calculateBurnedCalories();
    calculateTargets();
    saveSharedData();
    renderHistoryTable();
    alert('運動紀錄成功儲存！');
  });

  // History logs navigation
  histTabFood.addEventListener('click', () => setHistoryTabActive('food'));
  histTabWorkout.addEventListener('click', () => setHistoryTabActive('workout'));
  histTabWeight.addEventListener('click', () => setHistoryTabActive('weight'));

  // Add Inventory Form submission
  if (addInventoryForm) {
    addInventoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = invItemName.value.trim();
      const qty = parseFloat(invItemQty.value) || 0;
      const unit = invItemUnit.value;
      
      if (!name || qty <= 0) return;
      
      // Look for duplicate exact name
      let existing = fitnessDB.costcoInventory.find(inv => inv.name === name);
      if (existing) {
        existing.total += qty;
        existing.remaining += qty;
      } else {
        fitnessDB.costcoInventory.push({
          name: name,
          total: qty,
          remaining: qty,
          unit: unit
        });
      }
      
      // Reset form
      invItemName.value = '';
      invItemQty.value = '';
      
      saveSharedData();
      renderInventoryList();
      updateRecipes();
      alert(`已成功將「${name}」${qty}${unit} 存入冰箱庫存！`);
    });
  }

  // Chart Male Weight Form submission
  if (chartMaleWeightForm) {
    chartMaleWeightForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = chartMaleDate.value;
      const maleW = parseFloat(chartMaleW.value);
      const maleF = parseFloat(chartMaleF.value);

      if (isNaN(maleW) || maleW <= 0) return;

      const existing = fitnessDB.maleWeightHistory.find(h => h.date === date);
      if (existing) {
        existing.weight = maleW;
        existing.fat = isNaN(maleF) ? null : maleF;
      } else {
        fitnessDB.maleWeightHistory.push({ date, weight: maleW, fat: isNaN(maleF) ? null : maleF });
      }
      fitnessDB.maleWeightHistory.sort((a,b) => a.date.localeCompare(b.date));

      // Sync sidebar current weight (target fields stay as user-set goals)
      maleWeightInput.value = maleW;

      calculateTargets();
      saveSharedData();
      renderHistoryTable();
      drawCharts();
      alert('男生體重體脂登錄成功！圖表與每日基礎代謝率已同步更新！');
    });
  }

  // Chart Female Weight Form submission
  if (chartFemaleWeightForm) {
    chartFemaleWeightForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = chartFemaleDate.value;
      const femaleW = parseFloat(chartFemaleW.value);
      const femaleF = parseFloat(chartFemaleF.value);

      if (isNaN(femaleW) || femaleW <= 0) return;

      const existing = fitnessDB.femaleWeightHistory.find(h => h.date === date);
      if (existing) {
        existing.weight = femaleW;
        existing.fat = isNaN(femaleF) ? null : femaleF;
      } else {
        fitnessDB.femaleWeightHistory.push({ date, weight: femaleW, fat: isNaN(femaleF) ? null : femaleF });
      }
      fitnessDB.femaleWeightHistory.sort((a,b) => a.date.localeCompare(b.date));

      // Sync sidebar current weight (target fields stay as user-set goals)
      femaleWeightInput.value = femaleW;

      calculateTargets();
      saveSharedData();
      renderHistoryTable();
      drawCharts();
      alert('女生體重體脂登錄成功！圖表與每日基礎代謝率已同步更新！');
    });
  }
}

// Workout Calorie Auto-Estimation Setup
function setupWorkoutListeners() {
  if (workoutLogWho && workoutLogType && workoutLogDuration && workoutLogLoad && workoutLogIntensity) {
    [workoutLogWho, workoutLogType, workoutLogIntensity].forEach(el => {
      el.addEventListener('change', calculateBurnedCalories);
    });
    [workoutLogDuration, workoutLogLoad].forEach(el => {
      el.addEventListener('input', calculateBurnedCalories);
    });
    
    // Listen to weight changes to update MET calculation
    maleWeightInput.addEventListener('input', calculateBurnedCalories);
    femaleWeightInput.addEventListener('input', calculateBurnedCalories);

    // Initial calculation
    calculateBurnedCalories();
  }
}

function calculateBurnedCalories() {
  if (!workoutLogWho || !workoutLogType || !workoutLogDuration || !workoutLogBurned || !workoutLogLoad || !workoutLogIntensity) return;
  
  const who = workoutLogWho.value;
  const type = workoutLogType.value;
  const duration = parseFloat(workoutLogDuration.value) || 0;
  const load = parseFloat(workoutLogLoad.value) || 0;
  
  // Default weights from profile inputs or fallbacks
  let weight = 70;
  if (who === 'male') {
    weight = parseFloat(maleWeightInput.value) || 85;
  } else if (who === 'female') {
    weight = parseFloat(femaleWeightInput.value) || 67;
  } else if (who === 'both') {
    const mw = parseFloat(maleWeightInput.value) || 85;
    const fw = parseFloat(femaleWeightInput.value) || 67;
    weight = (mw + fw) / 2;
  }
  
  // MET values
  const selectedOpt = workoutLogType.options[workoutLogType.selectedIndex];
  if (!selectedOpt) return;
  const baseMet = parseFloat(selectedOpt.getAttribute('data-met')) || 4.0;
  
  // Intensity factor
  const selectedIntensityOpt = workoutLogIntensity.options[workoutLogIntensity.selectedIndex];
  const factor = selectedIntensityOpt ? parseFloat(selectedIntensityOpt.getAttribute('data-factor')) : 1.0;
  
  const met = baseMet * factor;
  
  // Calories = MET * (Weight + Load) * (Duration / 60)
  const calories = Math.round(met * (weight + load) * (duration / 60));
  workoutLogBurned.textContent = calories;
  
  // Dynamic Tip text
  let tip = "";
  if (type === '重量訓練') {
    tip = `💡 重訓的『後燃效應』能持續消耗脂肪。目前負重 ${load} kg，承受重量越大，肌肉收縮能耗與後燃效果越強！`;
  } else if (type === '有氧跑步') {
    tip = "💡 跑步是極佳的心肺訓練。建議控制強度在慢跑配速，以最大心率 60-70% 達到最高燃脂效率。";
  } else if (type === '單車飛輪') {
    tip = "💡 飛輪主要鍛鍊大腿與臀部肌群，是爆發力與耐力雙修的高燃脂運動項目！";
  } else if (type === '游泳') {
    tip = "💡 游泳提供全身浮力支撐，低衝擊力，對膝關節與腰部負擔極小，特別適合減脂。";
  } else if (type === '瑜珈伸展') {
    tip = "💡 瑜珈主要用於拉伸、修復以及放鬆肌肉，並能降低壓力荷爾蒙，避免多餘脂肪囤積。";
  } else {
    tip = "💡 養成規律的運動習慣是健身的關鍵！運動後請記得補充適量水份與優質蛋白質。";
  }
  if (workoutInfoTip) workoutInfoTip.textContent = tip;
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
        <td>${escapeHTML(item.date)}</td>
        <td>${whoLabel}</td>
        <td>${escapeHTML(item.meal)}</td>
        <td><strong>${escapeHTML(item.name)}</strong></td>
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
        <th>時間/強度</th>
        <th>消耗熱量</th>
        <th>操作</th>
      </tr>
    `;
    
    if (fitnessDB.workoutLogs.length === 0) {
      body.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">尚無運動記錄。</td></tr>';
      return;
    }

    fitnessDB.workoutLogs.forEach((item, index) => {
      const tr = document.createElement('tr');
      const whoLabel = item.who === 'both' ? '👫 雙人' : (item.who === 'male' ? '🙋‍♂️ 男生' : '🙋‍♀️ 女生');
      const loadDesc = item.load ? ` / 負重 ${item.load}kg` : '';
      const intensityDesc = item.intensity ? ` / ${escapeHTML(item.intensity)}` : '';
      const timeDesc = `${item.duration || 30} 分鐘${loadDesc}${intensityDesc}${item.desc ? ` / ${escapeHTML(item.desc)}` : ''}`;
      const calDesc = `${item.burnedCal || 0} kcal`;
      tr.innerHTML = `
        <td>${escapeHTML(item.date)}</td>
        <td>${whoLabel}</td>
        <td><strong>[${escapeHTML(item.type || '運動')}] ${escapeHTML(item.name)}</strong></td>
        <td>${timeDesc}</td>
        <td>${calDesc}</td>
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
  
  // Sync inputs back to latest weight (target fields stay as user-set goals)
  if (fitnessDB.maleWeightHistory.length > 0) {
    const latest = fitnessDB.maleWeightHistory[fitnessDB.maleWeightHistory.length - 1];
    maleWeightInput.value = latest.weight;
  }
  if (fitnessDB.femaleWeightHistory.length > 0) {
    const latest = fitnessDB.femaleWeightHistory[fitnessDB.femaleWeightHistory.length - 1];
    femaleWeightInput.value = latest.weight;
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

  // Sum today's exercise calories burned
  let mCalBurned = 0;
  let fCalBurned = 0;
  fitnessDB.workoutLogs.forEach(log => {
    if (log.date === todayStr) {
      const cal = log.burnedCal || 0;
      if (log.who === 'male') {
        mCalBurned += cal;
      } else if (log.who === 'female') {
        fCalBurned += cal;
      } else if (log.who === 'both') {
        mCalBurned += Math.round(cal / 2);
        fCalBurned += Math.round(cal / 2);
      }
    }
  });

  const mCAct = Math.round((mCalAct * 0.4) / 4);
  const fCAct = Math.round((fCalAct * 0.4) / 4);
  const mCGoal = 150;
  const fCGoal = 130;

  maleCalRatio.innerHTML = `已攝取 ${mCalAct} / 目標 ${mCalGoal} kcal <span style="color: #38bdf8; font-size: 0.8rem; margin-left: 0.5rem; font-weight: normal;">🔥 已燃燒 ${mCalBurned} kcal</span>`;
  maleCalFill.style.width = `${Math.min((mCalAct / mCalGoal) * 100, 100)}%`;
  malePRatio.textContent = `${mPAct} / ${mPGoal}g`;
  malePFill.style.width = `${Math.min((mPAct / mPGoal) * 100, 100)}%`;
  maleCRatio.textContent = `${mCAct} / ${mCGoal}g`;
  maleCFill.style.width = `${Math.min((mCAct / mCGoal) * 100, 100)}%`;

  femaleCalRatio.innerHTML = `已攝取 ${fCalAct} / 目標 ${fCalGoal} kcal <span style="color: #10b981; font-size: 0.8rem; margin-left: 0.5rem; font-weight: normal;">🔥 已燃燒 ${fCalBurned} kcal</span>`;
  femaleCalFill.style.width = `${Math.min((fCalAct / fCalGoal) * 100, 100)}%`;
  femalePRatio.textContent = `${fPAct} / ${fPGoal}g`;
  femalePFill.style.width = `${Math.min((fPAct / fPGoal) * 100, 100)}%`;
  femaleCRatio.textContent = `${fCAct} / ${fCGoal}g`;
  femaleCFill.style.width = `${Math.min((fCAct / fCGoal) * 100, 100)}%`;

  // Update Deficit Dashboard elements
  if (mEnergyIntake) {
    const mWeight = parseFloat(maleWeightInput.value) || 85;
    const mHeight = parseFloat(maleHeightInput.value) || 180;
    const mAge = parseFloat(maleAgeInput.value) || 30;
    const mBMR = Math.round(10 * mWeight + 6.25 * mHeight - 5 * mAge + 5);

    mEnergyIntake.textContent = mCalAct;
    mEnergyWorkout.textContent = mCalBurned;
    mEnergyBmr.textContent = mBMR;

    const mNet = mCalAct - mCalBurned - mBMR;
    mEnergyNetBadge.textContent = `${mNet > 0 ? '+' : ''}${mNet} kcal`;
    if (mNet <= 0) {
      mEnergyNetBadge.style.background = 'rgba(16, 185, 129, 0.15)';
      mEnergyNetBadge.style.color = '#34d399';
      mEnergyNetBadge.textContent += ' (✔️ 熱量赤字)';
    } else {
      mEnergyNetBadge.style.background = 'rgba(239, 68, 68, 0.15)';
      mEnergyNetBadge.style.color = '#f87171';
      mEnergyNetBadge.textContent += ' (⚠️ 熱量盈餘)';
    }
  }

  if (fEnergyIntake) {
    const fWeight = parseFloat(femaleWeightInput.value) || 67;
    const fHeight = parseFloat(femaleHeightInput.value) || 170;
    const fAge = parseFloat(femaleAgeInput.value) || 30;
    const fBMR = Math.round(10 * fWeight + 6.25 * fHeight - 5 * fAge - 161);

    fEnergyIntake.textContent = fCalAct;
    fEnergyWorkout.textContent = fCalBurned;
    fEnergyBmr.textContent = fBMR;

    const fNet = fCalAct - fCalBurned - fBMR;
    fEnergyNetBadge.textContent = `${fNet > 0 ? '+' : ''}${fNet} kcal`;
    if (fNet <= 0) {
      fEnergyNetBadge.style.background = 'rgba(16, 185, 129, 0.15)';
      fEnergyNetBadge.style.color = '#34d399';
      fEnergyNetBadge.textContent += ' (✔️ 熱量赤字)';
    } else {
      fEnergyNetBadge.style.background = 'rgba(239, 68, 68, 0.15)';
      fEnergyNetBadge.style.color = '#f87171';
      fEnergyNetBadge.textContent += ' (⚠️ 熱量盈餘)';
    }
  }
}

// Unit conversion helper for Costco Inventory.
// Returns the remaining stock expressed in recipeUnit, or null when the two
// units cannot be converted (e.g. 包 vs g) — callers must handle null.
function getConvertedStock(invItem, recipeUnit) {
  if (!invItem) return 0;

  const invUnit = invItem.unit;
  const rem = invItem.remaining;

  if (invUnit === recipeUnit) {
    return rem;
  }

  // g <-> kg
  if (invUnit === 'kg' && recipeUnit === 'g') {
    return rem * 1000;
  }
  if (invUnit === 'g' && recipeUnit === 'kg') {
    return rem / 1000;
  }

  // 顆 <-> 粒
  if ((invUnit === '顆' && recipeUnit === '粒') || (invUnit === '粒' && recipeUnit === '顆')) {
    return rem;
  }

  return null; // Incompatible units
}

// Returns true when stock was deducted; false when units are incompatible
// (in that case stock is left untouched instead of guessing).
function deductStock(invItem, recipeAmount, recipeUnit) {
  if (!invItem) return false;

  const invUnit = invItem.unit;

  if (invUnit === recipeUnit) {
    invItem.remaining = Math.max(0, invItem.remaining - recipeAmount);
    return true;
  }

  // g <-> kg
  if (invUnit === 'kg' && recipeUnit === 'g') {
    const neededInKg = recipeAmount / 1000;
    invItem.remaining = Math.max(0, invItem.remaining - neededInKg);
    return true;
  }
  if (invUnit === 'g' && recipeUnit === 'kg') {
    const neededInG = recipeAmount * 1000;
    invItem.remaining = Math.max(0, invItem.remaining - neededInG);
    return true;
  }

  // 顆 <-> 粒
  if ((invUnit === '顆' && recipeUnit === '粒') || (invUnit === '粒' && recipeUnit === '顆')) {
    invItem.remaining = Math.max(0, invItem.remaining - recipeAmount);
    return true;
  }

  return false; // Incompatible units — do not deduct blindly
}

// Update Interactive Recipes view based on portion mode
function updateRecipes() {
  Object.keys(recipes).forEach(recipeKey => {
    const recipe = recipes[recipeKey];
    const ul = document.getElementById(`ing-list-${recipeKey}`);
    if (!ul) return;
    ul.innerHTML = '';

    recipe.ingredients.forEach(ing => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.padding = '0.35rem 0';
      li.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'ing-name';
      nameSpan.style.color = 'var(--text-main)';
      nameSpan.style.fontWeight = '500';
      nameSpan.textContent = ing.name;

      const weightSpan = document.createElement('span');
      weightSpan.className = 'ing-weight';
      weightSpan.style.fontSize = '0.8rem';
      weightSpan.style.color = 'var(--text-muted)';

      let needed = 0;
      if (currentMode === 'both') {
        needed = ing.male + ing.female;
        weightSpan.innerHTML = `👦${ing.male}${ing.unit} + 👧${ing.female}${ing.unit} = <strong style="color:var(--text-main);">${needed}${ing.unit}</strong>`;
      } else if (currentMode === 'male') {
        needed = ing.male;
        weightSpan.innerHTML = `<strong style="color:var(--text-main);">${needed}${ing.unit}</strong>`;
      } else if (currentMode === 'female') {
        needed = ing.female;
        weightSpan.innerHTML = `<strong style="color:var(--text-main);">${needed}${ing.unit}</strong>`;
      }

      // Check stock levels with unit conversion
      let invItem = null;
      if (fitnessDB.costcoInventory) {
        invItem = fitnessDB.costcoInventory.find(inv => inv.name.includes(ing.name) || ing.name.includes(inv.name));
      }
      const remConverted = invItem ? getConvertedStock(invItem, ing.unit) : 0;

      const stockBadge = document.createElement('span');
      stockBadge.style.fontSize = '0.75rem';
      stockBadge.style.padding = '0.1rem 0.4rem';
      stockBadge.style.borderRadius = '4px';
      stockBadge.style.marginLeft = '0.5rem';
      stockBadge.style.display = 'inline-block';

      if (invItem && remConverted === null && needed > 0) {
        stockBadge.style.background = 'rgba(245, 158, 11, 0.15)';
        stockBadge.style.color = '#fbbf24';
        stockBadge.textContent = `⚠️ 單位不符 (庫存 ${Math.round(invItem.remaining * 10)/10}${invItem.unit}，需 ${ing.unit})`;
      } else if (remConverted >= needed && needed > 0) {
        stockBadge.style.background = 'rgba(16, 185, 129, 0.15)';
        stockBadge.style.color = '#34d399';
        stockBadge.textContent = `✔️ 庫存足 (剩 ${Math.round(invItem.remaining * 10)/10}${invItem.unit})`;
      } else if (needed > 0) {
        stockBadge.style.background = 'rgba(239, 68, 68, 0.15)';
        stockBadge.style.color = '#f87171';
        stockBadge.textContent = `❌ 庫存缺 (缺 ${Math.round((needed - remConverted) * 10)/10}${ing.unit})`;
      } else {
        stockBadge.style.background = 'rgba(255, 255, 255, 0.05)';
        stockBadge.style.color = 'var(--text-muted)';
        stockBadge.textContent = `無需`;
      }

      const rightDiv = document.createElement('div');
      rightDiv.style.display = 'flex';
      rightDiv.style.alignItems = 'center';
      rightDiv.appendChild(weightSpan);
      rightDiv.appendChild(stockBadge);

      li.appendChild(nameSpan);
      li.appendChild(rightDiv);
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
      <td><input type="text" class="inline-edit-input" style="min-width: 120px; width: 100%;" value="${escapeHTML(item.name)}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'name', this.value)"></td>
      <td>
        <div style="display:flex; gap:0.25rem; align-items:center;">
          <input type="number" class="inline-edit-input" style="width:60px;" value="${item.weight}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'weight', parseFloat(this.value) || 0)">
          <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(item.unit || 'g')}</span>
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

// Import parsed items as Costco purchased inventory items
function importIngredientsToInventory() {
  if (parsedIngredientsList.length === 0) return;

  parsedIngredientsList.forEach(item => {
    const name = item.name.trim();
    const qty = parseFloat(item.weight) || 0;
    const unit = item.unit || 'g';

    if (qty <= 0) return;

    // Fuzzy matching or exact matching — only merge when units are convertible
    let existing = fitnessDB.costcoInventory.find(inv => inv.name.includes(name) || name.includes(inv.name));
    let addQty = null;
    if (existing) {
      if (existing.unit === unit) {
        addQty = qty;
      } else if (existing.unit === 'kg' && unit === 'g') {
        addQty = qty / 1000;
      } else if (existing.unit === 'g' && unit === 'kg') {
        addQty = qty * 1000;
      } else if ((existing.unit === '顆' && unit === '粒') || (existing.unit === '粒' && unit === '顆')) {
        addQty = qty;
      }
    }

    if (existing && addQty !== null) {
      existing.total += addQty;
      existing.remaining += addQty;
    } else {
      // No match, or units incompatible — keep as a separate entry
      fitnessDB.costcoInventory.push({
        name: name,
        total: qty,
        remaining: qty,
        unit: unit
      });
    }
  });

  saveSharedData();
  renderInventoryList();
  updateRecipes();

  navTabRecipes.click(); // Automatically switch to the recipes tab
  alert('成功！已將 AI 分析的食材採買存入冰箱庫存管理。');
}

function renderInventoryList() {
  if (!inventoryList) return;
  inventoryList.innerHTML = '';
  
  if (!fitnessDB.costcoInventory || fitnessDB.costcoInventory.length === 0) {
    inventoryList.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding: 2rem 0; font-size:0.85rem;">🥫 庫存中無食材，請手動新增或使用 AI 匯入！</p>';
    return;
  }
  
  fitnessDB.costcoInventory.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'inventory-item';
    itemDiv.style.marginBottom = '1rem';
    itemDiv.style.background = 'rgba(15, 23, 42, 0.4)';
    itemDiv.style.padding = '0.75rem 1rem';
    itemDiv.style.borderRadius = '10px';
    itemDiv.style.border = '1px solid rgba(255,255,255,0.05)';
    
    itemDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--text-main); font-size:0.95rem;">${escapeHTML(item.name)}</strong>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <input type="number" class="inline-edit-input" style="width:75px; padding:0.15rem 0.3rem; text-align:center; font-weight:bold; font-size:0.85rem; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); color:var(--text-main); border-radius:4px;" value="${Math.round(item.remaining * 10) / 10}" onchange="updateInventoryItem(${index}, parseFloat(this.value) || 0)">
          
          <select style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); color:var(--text-main); font-size:0.8rem; border-radius:4px; padding:0.15rem 0.3rem; font-weight:500;" onchange="updateInventoryItemUnit(${index}, this.value)">
            <option value="g" ${item.unit === 'g' ? 'selected' : ''}>g</option>
            <option value="kg" ${item.unit === 'kg' ? 'selected' : ''}>kg</option>
            <option value="ml" ${item.unit === 'ml' ? 'selected' : ''}>ml</option>
            <option value="顆" ${item.unit === '顆' ? 'selected' : ''}>顆</option>
            <option value="粒" ${item.unit === '粒' ? 'selected' : ''}>粒</option>
            <option value="包" ${item.unit === '包' ? 'selected' : ''}>包</option>
            <option value="袋" ${item.unit === '袋' ? 'selected' : ''}>袋</option>
            <option value="盒" ${item.unit === '盒' ? 'selected' : ''}>盒</option>
            <option value="罐" ${item.unit === '罐' ? 'selected' : ''}>罐</option>
            <option value="瓶" ${item.unit === '瓶' ? 'selected' : ''}>瓶</option>
            <option value="根" ${item.unit === '根' ? 'selected' : ''}>根</option>
            <option value="支" ${item.unit === '支' ? 'selected' : ''}>支</option>
            <option value="把" ${item.unit === '把' ? 'selected' : ''}>把</option>
            <option value="片" ${item.unit === '片' ? 'selected' : ''}>片</option>
          </select>
          
          <button class="remove-btn" style="position:static; padding:0.2rem 0.4rem; font-size:0.75rem; border-radius:4px; cursor:pointer;" onclick="deleteInventoryItem(${index})">🗑️</button>
        </div>
      </div>
    `;
    inventoryList.appendChild(itemDiv);
  });
}

window.updateInventoryItem = function(index, val) {
  if (fitnessDB.costcoInventory && fitnessDB.costcoInventory[index]) {
    fitnessDB.costcoInventory[index].remaining = Math.max(0, val);
    fitnessDB.costcoInventory[index].total = Math.max(0.1, val);
    saveSharedData();
    renderInventoryList();
    updateRecipes();
  }
};

window.updateInventoryItemUnit = function(index, unit) {
  if (fitnessDB.costcoInventory && fitnessDB.costcoInventory[index]) {
    fitnessDB.costcoInventory[index].unit = unit;
    saveSharedData();
    renderInventoryList();
    updateRecipes();
  }
};

window.deleteInventoryItem = function(index) {
  if (fitnessDB.costcoInventory && fitnessDB.costcoInventory[index]) {
    const name = fitnessDB.costcoInventory[index].name;
    if (confirm(`確定要刪除庫存中的「${name}」嗎？`)) {
      fitnessDB.costcoInventory.splice(index, 1);
      saveSharedData();
      renderInventoryList();
      updateRecipes();
    }
  }
};

window.cookRecipe = function(recipeKey) {
  const recipe = recipes[recipeKey];
  if (!recipe) return;
  
  // 1. Calculate required ingredients based on current portion mode
  const mode = currentMode; // 'both', 'male', 'female'
  
  // Verify if we have enough stock for all ingredients
  let outOfStock = [];
  let unitMismatch = [];
  recipe.ingredients.forEach(ing => {
    let needed = 0;
    if (mode === 'both') {
      needed = ing.male + ing.female;
    } else if (mode === 'male') {
      needed = ing.male;
    } else if (mode === 'female') {
      needed = ing.female;
    }

    // Find item with unit conversion
    let invItem = fitnessDB.costcoInventory.find(inv => inv.name.includes(ing.name) || ing.name.includes(inv.name));
    const remConverted = invItem ? getConvertedStock(invItem, ing.unit) : 0;
    if (invItem && remConverted === null) {
      unitMismatch.push(`${ing.name}（庫存單位 ${invItem.unit} 與食譜單位 ${ing.unit} 無法換算，將不扣減）`);
    } else if (!invItem || remConverted < needed) {
      outOfStock.push(`${ing.name} (缺 ${Math.round((needed - remConverted) * 10) / 10}${ing.unit})`);
    }
  });

  if (outOfStock.length > 0 || unitMismatch.length > 0) {
    const warnings = [];
    if (outOfStock.length > 0) warnings.push(`⚠️ 以下食材庫存不足：\n${outOfStock.join('\n')}`);
    if (unitMismatch.length > 0) warnings.push(`⚠️ 以下食材單位不符：\n${unitMismatch.join('\n')}\n（請先到庫存清單把單位改成可換算的單位）`);
    if (!confirm(`${warnings.join('\n\n')}\n\n是否仍然繼續標記已烹飪？`)) {
      return;
    }
  }
  
  // 2. Deduct from inventory
  recipe.ingredients.forEach(ing => {
    let needed = 0;
    if (mode === 'both') {
      needed = ing.male + ing.female;
    } else if (mode === 'male') {
      needed = ing.male;
    } else if (mode === 'female') {
      needed = ing.female;
    }
    
    let invItem = fitnessDB.costcoInventory.find(inv => inv.name.includes(ing.name) || ing.name.includes(inv.name));
    if (invItem) {
      deductStock(invItem, needed, ing.unit);
    }
  });
  
  // 3. Save and refresh
  saveSharedData();
  renderInventoryList();
  updateRecipes();
  
  // 4. Ask to auto-import to Daily Log
  if (confirm(`🍳 庫存已成功扣減！\n是否要將此料理「${recipe.name}」自動匯入今天的飲食日誌？`)) {
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Calculate total calories and protein of the meal for this mode
    let totalCal = 0;
    let totalP = 0;
    if (mode === 'both') {
      totalCal = recipe.macros.male.cal + recipe.macros.female.cal;
      totalP = recipe.macros.male.p + recipe.macros.female.p;
    } else if (mode === 'male') {
      totalCal = recipe.macros.male.cal;
      totalP = recipe.macros.male.p;
    } else if (mode === 'female') {
      totalCal = recipe.macros.female.cal;
      totalP = recipe.macros.female.p;
    }
    
    fitnessDB.foodLogs.push({
      date: todayStr,
      who: mode,
      meal: "午餐", // default to lunch
      name: `烹飪: ${recipe.name}`,
      cal: totalCal,
      p: totalP
    });
    fitnessDB.foodLogs.sort((a,b) => b.date.localeCompare(a.date));
    
    calculateTargets();
    saveSharedData();
    renderHistoryTable();
    
    navTabLog.click(); // Switch to the shared log tab
    alert('已成功匯入今日飲食日誌！');
  }
};

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
  let migratedFromLegacy = false;
  try {
    const isLocalFile = window.location.protocol === 'file:';
    if (isLocalFile) {
      throw new Error('LOCAL_OFFLINE');
    }

    const response = await fetch(`/api/load?key=${shareKey}`);
    if (!response.ok) throw new Error('API_LOAD_ERROR');

    let cloudData = await response.json();

    // One-time migration: this device has no share key yet and its private
    // record is empty — pull the old shared-pool data so nothing is lost.
    if (needsLegacyMigration && !hasAnyContent(cloudData)) {
      try {
        const legacyRes = await fetch('/api/load');
        if (legacyRes.ok) {
          const legacyData = await legacyRes.json();
          if (hasAnyContent(legacyData)) {
            cloudData = legacyData;
            migratedFromLegacy = true;
          }
        }
      } catch (e) {}
    }
    needsLegacyMigration = false;

    if (cloudData) {
      if (cloudData.maleWeightHistory) fitnessDB.maleWeightHistory = cloudData.maleWeightHistory;
      if (cloudData.femaleWeightHistory) fitnessDB.femaleWeightHistory = cloudData.femaleWeightHistory;
      if (cloudData.foodLogs) fitnessDB.foodLogs = cloudData.foodLogs;
      if (cloudData.workoutLogs) fitnessDB.workoutLogs = cloudData.workoutLogs;
      if (cloudData.costcoInventory) fitnessDB.costcoInventory = cloudData.costcoInventory;
      
      // Sync sidebar current weight with the latest record
      // (target fields stay as user-set goals)
      if (fitnessDB.maleWeightHistory.length > 0) {
        const latest = fitnessDB.maleWeightHistory[fitnessDB.maleWeightHistory.length - 1];
        maleWeightInput.value = latest.weight;
      }
      if (fitnessDB.femaleWeightHistory.length > 0) {
        const latest = fitnessDB.femaleWeightHistory[fitnessDB.femaleWeightHistory.length - 1];
        femaleWeightInput.value = latest.weight;
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

  // Seed sample inventory only on a completely fresh install,
  // so a deliberately emptied inventory stays empty.
  if (!hasAnyContent(fitnessDB)) {
    fitnessDB.costcoInventory = [
      { name: "去骨雞腿肉", total: 2000, remaining: 1200, unit: "g" },
      { name: "板豆腐", total: 900, remaining: 600, unit: "g" },
      { name: "新鮮雞蛋", total: 30, remaining: 18, unit: "顆" },
      { name: "冷凍毛豆仁", total: 1000, remaining: 850, unit: "g" }
    ];
  }

  // Persist migrated legacy data under the new private key right away
  if (migratedFromLegacy) {
    saveSharedData();
  }

  renderInventoryList();
  calculateTargets();
  updateRecipes();
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

    const response = await fetch(`/api/save?key=${shareKey}`, {
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
