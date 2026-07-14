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
  "豆腐": { cal: 80, p: 8, c: 2, f: 4.5, fiber: 0.8, unit: "g" },
  "板豆腐": { cal: 80, p: 8, c: 2, f: 4.5, fiber: 0.8, unit: "g" },
  "雞蛋": { cal: 75, p: 6.5, c: 0.5, f: 5, unit: "顆" },
  "蛋": { cal: 75, p: 6.5, c: 0.5, f: 5, unit: "顆" },
  "毛豆": { cal: 120, p: 11, c: 10, f: 5, fiber: 5, unit: "g" },
  "毛豆仁": { cal: 120, p: 11, c: 10, f: 5, fiber: 5, unit: "g" },
  "杏鮑菇": { cal: 35, p: 2.5, c: 6, f: 0.2, fiber: 2.3, unit: "g" },
  "花椰菜": { cal: 34, p: 3, c: 7, f: 0.3, fiber: 2.6, unit: "g" },
  "紅蘿蔔": { cal: 41, p: 1, c: 10, f: 0.2, fiber: 2.8, unit: "g" },
  "洋蔥": { cal: 40, p: 1.1, c: 9.3, f: 0.1, fiber: 1.7, unit: "g" },
  "高麗菜": { cal: 25, p: 1.3, c: 6, f: 0.1, fiber: 2.5, unit: "g" },
  "生菜": { cal: 15, p: 1, c: 3, f: 0.1, fiber: 1.3, unit: "g" },
  "沙拉": { cal: 15, p: 1, c: 3, f: 0.1, fiber: 1.3, unit: "g" },
  "地瓜": { cal: 86, p: 1.6, c: 20, f: 0.1, fiber: 3, unit: "g" },
  "番薯": { cal: 86, p: 1.6, c: 20, f: 0.1, fiber: 3, unit: "g" },
  "白飯": { cal: 130, p: 2.7, c: 28, f: 0.3, fiber: 0.4, unit: "g" },
  "米飯": { cal: 130, p: 2.7, c: 28, f: 0.3, fiber: 0.4, unit: "g" },
  "飯": { cal: 130, p: 2.7, c: 28, f: 0.3, fiber: 0.4, unit: "g" },
  "麥片": { cal: 380, p: 13, c: 67, f: 7, fiber: 10, unit: "g" },
  "燕麥片": { cal: 380, p: 13, c: 67, f: 7, fiber: 10, unit: "g" },
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
  return !!db && ['maleWeightHistory', 'femaleWeightHistory', 'foodLogs', 'workoutLogs', 'costcoInventory', 'recurringMeals']
    .some(k => Array.isArray(db[k]) && db[k].length > 0);
}

// Shared Database State
let fitnessDB = {
  maleWeightHistory: [],   // { date, weight, fat }
  femaleWeightHistory: [], // { date, weight, fat }
  foodLogs: [],            // { date, who, meal, name, cal, p }
  workoutLogs: [],          // { date, who, name, desc }
  costcoInventory: [],      // { name, total, remaining, unit }
  recurringMeals: []       // { id, who, meal, name, cal, p, c, f, fiber, sodium, active }
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
const aiSaveAsRecurring = document.getElementById('ai-save-as-recurring');

// Recurring Meals Elements
const recurringMealsList = document.getElementById('recurring-meals-list');
const addRecurringMealForm = document.getElementById('add-recurring-meal-form');
const recMealWho = document.getElementById('rec-meal-who');
const recMealCategory = document.getElementById('rec-meal-category');
const recMealName = document.getElementById('rec-meal-name');
const recMealCal = document.getElementById('rec-meal-cal');
const recMealP = document.getElementById('rec-meal-p');
const recMealC = document.getElementById('rec-meal-c');
const recMealF = document.getElementById('rec-meal-f');
const recMealFiber = document.getElementById('rec-meal-fiber');
const recMealSodium = document.getElementById('rec-meal-sodium');

// Quick Log Energy Bowl Elements
const quickEnergyBowlForm = document.getElementById('quick-energy-bowl-form');
const energyBowlWho = document.getElementById('energy-bowl-who');
const energyBowlDate = document.getElementById('energy-bowl-date');

// Navigation Tabs
const navTabKitchen = document.getElementById('tab-nav-kitchen');
const navTabRecipes = document.getElementById('tab-nav-recipes');
const navTabLog = document.getElementById('tab-nav-log');
const navTabCharts = document.getElementById('tab-nav-charts');
const navTabProfile = document.getElementById('tab-nav-profile');
const paneKitchen = document.getElementById('pane-kitchen');
const paneRecipes = document.getElementById('pane-recipes');
const paneLog = document.getElementById('pane-log');
const paneCharts = document.getElementById('pane-charts');
const paneProfile = document.getElementById('pane-profile');

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
  lastKnownDate = getLocalDateStr();
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
// between two devices) and keep dates aligned with the device clock,
// skipping while the user is typing in a field.
function setupAutoRefresh() {
  const isTyping = () => {
    const ae = document.activeElement;
    return ae && ['INPUT', 'TEXTAREA', 'SELECT'].includes(ae.tagName);
  };

  const refresh = () => {
    if (isTyping()) return;
    syncDatesWithDevice();
    loadSharedData();
  };

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh();
  });
  setInterval(refresh, 90000);

  // Lightweight date-only check so the midnight rollover (or re-opening the
  // phone days later) never waits on a full cloud refresh cycle
  setInterval(() => {
    if (!isTyping()) syncDatesWithDevice();
  }, 30000);
}

// Local device date as YYYY-MM-DD.
// Never use toISOString() for "today": it returns the UTC date, which in
// UTC+8 is still *yesterday* between 00:00 and 08:00 local time.
function getLocalDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Set default dates to today (device local time)
function setDefaultDates() {
  const today = getLocalDateStr();
  workoutLogDate.value = today;
  aiLogDate.value = today;
  if (chartMaleDate) chartMaleDate.value = today;
  if (chartFemaleDate) chartFemaleDate.value = today;
  if (energyBowlDate) energyBowlDate.value = today;
}

// Keep on-screen dates in sync with the device clock. When the local date
// rolls over (past midnight, or the phone re-opens the page days later),
// date inputs still holding the old auto-filled "today" advance to the new
// date, and today's intake sums are recalculated. Inputs the user changed
// to a different date on purpose are left untouched.
let lastKnownDate = null;

function syncDatesWithDevice() {
  const today = getLocalDateStr();
  if (today === lastKnownDate) return;

  [workoutLogDate, aiLogDate, chartMaleDate, chartFemaleDate, energyBowlDate].forEach(input => {
    if (input && (!input.value || input.value === lastKnownDate)) {
      input.value = today;
    }
  });

  lastKnownDate = today;
  calculateTargets(); // refresh "today" sums for the new date
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

  if (addRecurringMealForm) {
    addRecurringMealForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const who = recMealWho.value;
      const meal = recMealCategory.value;
      const name = recMealName.value.trim();
      const cal = parseFloat(recMealCal.value) || 0;
      const p = parseFloat(recMealP.value) || 0;
      const c = parseFloat(recMealC.value) || 0;
      const f = parseFloat(recMealF.value) || 0;
      const fiber = parseFloat(recMealFiber.value) || 0;
      const sodium = parseFloat(recMealSodium.value) || 0;

      if (!name || cal <= 0) return;

      const newId = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      fitnessDB.recurringMeals = fitnessDB.recurringMeals || [];
      fitnessDB.recurringMeals.push({
        id: newId,
        who,
        meal,
        name,
        cal,
        p,
        c,
        f,
        fiber,
        sodium,
        active: true
      });

      // Clear form inputs
      recMealName.value = '';
      recMealCal.value = '';
      recMealP.value = '';
      recMealC.value = '';
      recMealF.value = '';
      recMealFiber.value = '';
      recMealSodium.value = '';

      calculateTargets();
      saveSharedData();
      renderRecurringMealsList();
      alert(`已成功新增每日固定餐食範本「${name}」！`);
    });
  }

  if (quickEnergyBowlForm) {
    quickEnergyBowlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetWho = energyBowlWho.value;
      const targetDate = energyBowlDate.value || getLocalDateStr();

      const femaleSpec = {
        name: '能量碗 (自調配比)',
        cal: 448,
        p: 39.3,
        c: 36.1,
        f: 17.6,
        fiber: 7.5,
        sodium: 215
      };

      const addBowlLog = (who, spec) => {
        fitnessDB.foodLogs.push({
          date: targetDate,
          who: who,
          meal: '早餐',
          name: spec.name,
          cal: spec.cal,
          p: spec.p,
          c: spec.c,
          f: spec.f,
          fiber: spec.fiber,
          sodium: spec.sodium
        });
      };

      if (targetWho === 'female') {
        addBowlLog('female', femaleSpec);
      } else if (targetWho === 'male') {
        addBowlLog('male', {
          name: '能量碗 (自調配比)',
          cal: 896,
          p: 78.6,
          c: 72.2,
          f: 35.2,
          fiber: 15.0,
          sodium: 430
        });
      } else if (targetWho === 'both') {
        addBowlLog('female', femaleSpec);
        addBowlLog('male', {
          name: '能量碗 (自調配比)',
          cal: 896,
          p: 78.6,
          c: 72.2,
          f: 35.2,
          fiber: 15.0,
          sodium: 430
        });
      }

      fitnessDB.foodLogs.sort((a, b) => b.date.localeCompare(a.date));

      calculateTargets();
      saveSharedData();
      renderHistoryTable();

      const whoLabel = targetWho === 'both' ? '👫 雙人' : (targetWho === 'male' ? '🙋‍♂️ 男生' : '🙋‍♀️ 女生');
      alert(`已成功將 ${whoLabel} 能量碗早餐登錄至 ${targetDate} 的飲食日誌！`);
    });
  }
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
    { nav: navTabCharts, pane: paneCharts },
    { nav: navTabProfile, pane: paneProfile }
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
    workoutLogDesc.value = '';
    workoutLogLoad.value = '0';
    if (type === '健走步數') {
      workoutLogDuration.value = '10000';
      workoutLogName.value = '每日健步';
    } else {
      workoutLogDuration.value = '30';
      workoutLogName.value = '';
    }

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

    workoutLogType.addEventListener('change', () => {
      const type = workoutLogType.value;
      const durationLabel = document.querySelector('label[for="workout-log-duration"]');
      const loadGroup = workoutLogLoad.closest('.form-group');
      const intensityGroup = workoutLogIntensity.closest('.form-group');
      
      if (type === '健走步數') {
        if (durationLabel) durationLabel.innerHTML = '👣 走路步數 (步)';
        workoutLogDuration.value = 10000;
        workoutLogDuration.min = 1;
        workoutLogDuration.max = 100000;
        workoutLogName.value = '每日健步';
        
        if (loadGroup) loadGroup.style.display = 'none';
        if (intensityGroup) intensityGroup.style.display = 'none';
      } else {
        if (durationLabel) durationLabel.innerHTML = '⏱️ 運動時間 (分鐘)';
        workoutLogDuration.value = 30;
        workoutLogDuration.min = 1;
        workoutLogDuration.max = 300;
        if (workoutLogName.value === '每日健步') {
          workoutLogName.value = '';
        }
        
        if (loadGroup) loadGroup.style.display = 'block';
        if (intensityGroup) intensityGroup.style.display = 'block';
      }
    });

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
  
  let calories = 0;
  if (type === '健走步數') {
    // Calories = steps * 0.00055 * weight
    calories = Math.round(duration * 0.00055 * weight);
  } else {
    // MET values
    const selectedOpt = workoutLogType.options[workoutLogType.selectedIndex];
    if (!selectedOpt) return;
    const baseMet = parseFloat(selectedOpt.getAttribute('data-met')) || 4.0;
    
    // Intensity factor
    const selectedIntensityOpt = workoutLogIntensity.options[workoutLogIntensity.selectedIndex];
    const factor = selectedIntensityOpt ? parseFloat(selectedIntensityOpt.getAttribute('data-factor')) : 1.0;
    
    const met = baseMet * factor;
    
    // Calories = MET * (Weight + Load) * (Duration / 60)
    calories = Math.round(met * (weight + load) * (duration / 60));
  }
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
        <th>碳水 (g)</th>
        <th>脂肪 (g)</th>
        <th>操作</th>
      </tr>
    `;

    if (fitnessDB.foodLogs.length === 0) {
      body.innerHTML = '<tr><td colspan="9" style="text-align:center; color:var(--text-muted);">尚無飲食記錄。</td></tr>';
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
        <td>${item.c != null ? item.c + 'g' : '-'}</td>
        <td>${item.f != null ? item.f + 'g' : '-'}</td>
        <td>
          <div style="display: flex; gap: 0.35rem; justify-content: center;">
            <button class="remove-btn" style="position:static; padding:0.2rem 0.4rem; font-size: 0.75rem; background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2);" onclick="saveLogAsRecurring(${index})">🔁 設為固定</button>
            <button class="remove-btn" style="position:static; padding:0.2rem 0.4rem; font-size: 0.75rem;" onclick="deleteLogItem('food', ${index})">🗑️ 刪除</button>
          </div>
        </td>
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
      const isSteps = item.type === '健走步數';
      const whoLabel = item.who === 'both' ? '👫 雙人' : (item.who === 'male' ? '🙋‍♂️ 男生' : '🙋‍♀️ 女生');
      const loadDesc = item.load ? ` / 負重 ${item.load}kg` : '';
      const intensityDesc = item.intensity ? ` / ${escapeHTML(item.intensity)}` : '';
      const timeDesc = isSteps 
        ? `${item.duration || 0} 步${item.desc ? ` / ${escapeHTML(item.desc)}` : ''}`
        : `${item.duration || 30} 分鐘${loadDesc}${intensityDesc}${item.desc ? ` / ${escapeHTML(item.desc)}` : ''}`;
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
    const deletedLog = fitnessDB.foodLogs[index];
    if (deletedLog && deletedLog.recurringId) {
      fitnessDB.settings = fitnessDB.settings || {};
      fitnessDB.settings.skippedRecurring = fitnessDB.settings.skippedRecurring || {};
      const dateStr = deletedLog.date;
      fitnessDB.settings.skippedRecurring[dateStr] = fitnessDB.settings.skippedRecurring[dateStr] || [];
      if (!fitnessDB.settings.skippedRecurring[dateStr].includes(deletedLog.recurringId)) {
        fitnessDB.settings.skippedRecurring[dateStr].push(deletedLog.recurringId);
      }
    }
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

// Handle selected image file.
// Phone photos are several MB; base64 inflates them ~33% and Vercel rejects
// request bodies over ~4.5MB, which made photo analysis silently fail.
// Downscale + re-encode via canvas so the upload stays small (also strips EXIF).
function handleImageFile(file) {
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);

  img.onload = function() {
    const MAX_EDGE = 1280;
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    uploadedImageBase64 = dataUrl.split(',')[1];
    imagePreview.src = dataUrl;
    dropzone.style.display = 'none';
    imagePreviewContainer.style.display = 'block';
    URL.revokeObjectURL(objectUrl);
  };

  img.onerror = function() {
    URL.revokeObjectURL(objectUrl);
    alert('無法讀取這張圖片，請改用 JPG 或 PNG 格式再試一次。');
  };

  img.src = objectUrl;
}

const round1 = v => Math.round(v * 10) / 10;

// Daily nutrition targets per person (single source of truth for all tabs).
// Evidence-based cut-phase guidelines: protein 1.8~2.0 g/kg, fat ~0.8 g/kg,
// carbs = remaining calories, fiber 30g (M) / 25g (F), sodium < 2300 mg.
function getNutritionTargets(who) {
  if (who === 'male') {
    const w = parseFloat(maleWeightInput.value) || 85;
    const h = parseFloat(maleHeightInput.value) || 180;
    const age = parseFloat(maleAgeInput.value) || 30;
    const bmr = 10 * w + 6.25 * h - 5 * age + 5;
    const cal = Math.round(bmr * 1.35 - 600);
    const p = Math.round(w * 2.0);
    const f = Math.round(w * 0.8);
    const c = Math.max(0, Math.round((cal - p * 4 - f * 9) / 4));
    return { cal, p, c, f, fiber: 30, sodium: 2300, bmr: Math.round(bmr) };
  }
  const w = parseFloat(femaleWeightInput.value) || 67;
  const h = parseFloat(femaleHeightInput.value) || 170;
  const age = parseFloat(femaleAgeInput.value) || 30;
  const bmr = 10 * w + 6.25 * h - 5 * age - 161;
  const cal = Math.round(bmr * 1.35 - 400);
  const p = Math.round(w * 1.8);
  const f = Math.round(w * 0.8);
  const c = Math.max(0, Math.round((cal - p * 4 - f * 9) / 4));
  return { cal, p, c, f, fiber: 25, sodium: 2300, bmr: Math.round(bmr) };
}

// Sum today's logged nutrition & workout burn per person ('both' is split 50/50)
function computeTodayTotals() {
  const todayStr = getLocalDateStr();
  const blank = () => ({ cal: 0, p: 0, c: 0, f: 0, fiber: 0, sodium: 0, burned: 0 });
  const male = blank(), female = blank();

  const add = (t, log, ratio) => {
    t.cal += (log.cal || 0) * ratio;
    t.p += (log.p || 0) * ratio;
    t.c += (log.c || 0) * ratio;
    t.f += (log.f || 0) * ratio;
    t.fiber += (log.fiber || 0) * ratio;
    t.sodium += (log.sodium || 0) * ratio;
  };

  fitnessDB.foodLogs.forEach(log => {
    if (log.date !== todayStr) return;
    if (log.who === 'male') add(male, log, 1);
    else if (log.who === 'female') add(female, log, 1);
    else if (log.who === 'both') { add(male, log, 0.5); add(female, log, 0.5); }
  });

  fitnessDB.workoutLogs.forEach(log => {
    if (log.date !== todayStr) return;
    const cal = log.burnedCal || 0;
    if (log.who === 'male') male.burned += cal;
    else if (log.who === 'female') female.burned += cal;
    else if (log.who === 'both') { male.burned += Math.round(cal / 2); female.burned += Math.round(cal / 2); }
  });

  [male, female].forEach(t => {
    t.cal = Math.round(t.cal);
    t.p = round1(t.p); t.c = round1(t.c); t.f = round1(t.f);
    t.fiber = round1(t.fiber); t.sodium = Math.round(t.sodium);
  });
  return { male, female };
}

// Calculate calorie goals and refresh every tab that displays today's intake
function calculateTargets() {
  if (typeof checkAndLogRecurringMeals === 'function') {
    checkAndLogRecurringMeals();
  }

  const mT = getNutritionTargets('male');
  const fT = getNutritionTargets('female');

  maleTargetCalEl.textContent = mT.cal.toLocaleString();
  maleTargetProtEl.textContent = mT.p;
  femaleTargetCalEl.textContent = fT.cal.toLocaleString();
  femaleTargetProtEl.textContent = fT.p;

  updateTodayProgress(mT, fT);
}

// Fill one progress bar pair (ratio label + fill width)
function setBar(ratioId, fillId, val, goal, unit) {
  const ratioEl = document.getElementById(ratioId);
  const fillEl = document.getElementById(fillId);
  if (!ratioEl || !fillEl) return;
  ratioEl.textContent = `${val} / ${goal}${unit}`;
  fillEl.style.width = `${goal > 0 ? Math.min((val / goal) * 100, 100) : 0}%`;
}

// Render the per-nutrient breakdown list in the daily balance dashboard
function renderNutrientRows(containerId, totals, targets, accent) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const rows = [
    { icon: '🥩', label: '蛋白質', val: totals.p, goal: targets.p, unit: 'g' },
    { icon: '🍚', label: '碳水化合物', val: totals.c, goal: targets.c, unit: 'g' },
    { icon: '🥑', label: '脂肪', val: totals.f, goal: targets.f, unit: 'g' },
    { icon: '🥬', label: '膳食纖維', val: totals.fiber, goal: targets.fiber, unit: 'g' },
    { icon: '🧂', label: '鈉（每日上限）', val: totals.sodium, goal: targets.sodium, unit: 'mg', isLimit: true }
  ];

  el.innerHTML = rows.map(rw => {
    const pct = rw.goal > 0 ? Math.min((rw.val / rw.goal) * 100, 100) : 0;
    const over = rw.isLimit && rw.val > rw.goal;
    const color = over ? '#f87171' : (rw.isLimit ? '#94a3b8' : accent);
    const status = rw.isLimit
      ? (over ? ' ⚠️' : '')
      : (rw.val >= rw.goal ? ' ✔️' : '');
    return `
      <div class="nutrient-row">
        <div class="nutrient-row-label">
          <span>${rw.icon} ${rw.label}</span>
          <span>${rw.val} / ${rw.goal} ${rw.unit}${status}</span>
        </div>
        <div class="nutrient-bar-bg"><div class="nutrient-bar-fill" style="width:${pct}%; background:${color};"></div></div>
      </div>`;
  }).join('');
}

// Update per-person energy balance card (intake / burn / BMR / net)
function updateEnergyCard(prefix, totals, targets) {
  const intakeEl = document.getElementById(`${prefix}-energy-intake`);
  if (!intakeEl) return;
  document.getElementById(`${prefix}-energy-workout`).textContent = totals.burned;
  document.getElementById(`${prefix}-energy-bmr`).textContent = targets.bmr;
  intakeEl.textContent = totals.cal;

  const badge = document.getElementById(`${prefix}-energy-net-badge`);
  const net = totals.cal - totals.burned - targets.bmr;
  badge.textContent = `${net > 0 ? '+' : ''}${net} kcal`;
  if (net <= 0) {
    badge.style.background = 'rgba(16, 185, 129, 0.15)';
    badge.style.color = '#34d399';
    badge.textContent += ' (✔️ 熱量赤字)';
  } else {
    badge.style.background = 'rgba(239, 68, 68, 0.15)';
    badge.style.color = '#f87171';
    badge.textContent += ' (⚠️ 熱量盈餘)';
  }
}

// Sum today's logged meals and update every tab (kitchen bars + charts dashboard)
function updateTodayProgress(mT, fT) {
  const totals = computeTodayTotals();
  const m = totals.male, f = totals.female;

  // --- Kitchen tab: intake progress bars (real logged values, shared targets) ---
  maleCalRatio.innerHTML = `已攝取 ${m.cal} / 目標 ${mT.cal} kcal <span style="color: #38bdf8; font-size: 0.8rem; margin-left: 0.5rem; font-weight: normal;">🔥 已燃燒 ${m.burned} kcal</span>`;
  maleCalFill.style.width = `${Math.min((m.cal / mT.cal) * 100, 100)}%`;
  setBar('male-p-ratio', 'male-p-fill', m.p, mT.p, 'g');
  setBar('male-c-ratio', 'male-c-fill', m.c, mT.c, 'g');
  setBar('male-fat-ratio', 'male-fat-fill', m.f, mT.f, 'g');
  setBar('male-fiber-ratio', 'male-fiber-fill', m.fiber, mT.fiber, 'g');

  femaleCalRatio.innerHTML = `已攝取 ${f.cal} / 目標 ${fT.cal} kcal <span style="color: #10b981; font-size: 0.8rem; margin-left: 0.5rem; font-weight: normal;">🔥 已燃燒 ${f.burned} kcal</span>`;
  femaleCalFill.style.width = `${Math.min((f.cal / fT.cal) * 100, 100)}%`;
  setBar('female-p-ratio', 'female-p-fill', f.p, fT.p, 'g');
  setBar('female-c-ratio', 'female-c-fill', f.c, fT.c, 'g');
  setBar('female-fat-ratio', 'female-fat-fill', f.f, fT.f, 'g');
  setBar('female-fiber-ratio', 'female-fiber-fill', f.fiber, fT.fiber, 'g');

  // --- Charts tab: energy balance + nutrient breakdown (same data source) ---
  updateEnergyCard('m', m, mT);
  updateEnergyCard('f', f, fT);
  renderNutrientRows('m-nutrient-rows', m, mT, '#38bdf8');
  renderNutrientRows('f-nutrient-rows', f, fT, '#34d399');
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
    // Surface the real server-side reason so failures aren't silent
    let msg = `伺服器回應 HTTP ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson && errJson.error) msg = errJson.error;
    } catch (e) {}
    throw new Error(msg);
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
            protein: round1(matchedData.p * factor),
            carbs: round1(matchedData.c * factor),
            fat: round1(matchedData.f * factor),
            fiber: round1((matchedData.fiber || 0) * factor),
            sodium: 0
          });
        } else {
          parsedIngredientsList.push({
            name: line.replace(/[\d\s克g顆盒包mlcc匙]/g, "") || "未知食材",
            weight: qty,
            unit: unit,
            calories: Math.round(qty * 0.8),
            protein: round1(qty * 0.05),
            carbs: round1(qty * 0.1),
            fat: round1(qty * 0.02),
            fiber: 0,
            sodium: 0
          });
        }
      });

      displayAnalysisResults();
      showLoading(false);
      if (window.location.protocol !== 'file:') {
        alert('⚠️ AI 服務暫時無法連線，已改用內建離線資料庫估算，數值僅供參考（可直接在表格中修正）。');
      }
    }, 800);
  }
}

// Photo analysis action.
// On failure this must NOT show fake results — an honest error beats fabricated
// ingredients that don't match the photo. Demo data only on file:// local dev.
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
    console.error("Photo analysis API failed:", err);
    showLoading(false);

    if (window.location.protocol === 'file:') {
      // Local dev without serverless functions: show demo data, clearly labelled
      parsedIngredientsList = [
        { name: "去骨雞腿肉 (Costco)", weight: 400, unit: "g", calories: 464, protein: 80, carbs: 0, fat: 16, fiber: 0, sodium: 320, box_2d: [150, 100, 500, 600] },
        { name: "義美板豆腐", weight: 300, unit: "g", calories: 240, protein: 24, carbs: 6, fat: 13.5, fiber: 2.4, sodium: 20, box_2d: [150, 550, 450, 830] },
        { name: "新鮮雞蛋", weight: 3, unit: "顆", calories: 225, protein: 19.5, carbs: 1.5, fat: 15, fiber: 0, sodium: 210, box_2d: [480, 500, 900, 820] },
        { name: "冷凍毛豆仁 (Costco)", weight: 150, unit: "g", calories: 180, protein: 16.5, carbs: 15, fat: 7.5, fiber: 7.5, sodium: 10, box_2d: [400, 100, 800, 450] }
      ];
      displayAnalysisResults();
      alert('⚠️ 本地離線模式：以下為「示範資料」，並非真實辨識結果。');
      return;
    }

    parsedIngredientsList = [];
    displayAnalysisResults();
    alert(`❌ AI 照片辨識失敗：${err.message}\n\n請稍後再試一次；若持續失敗，可切換「✍️ 文字/收據輸入」直接輸入食材名稱與份量進行分析。`);
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
      <td><input type="number" class="inline-edit-input" style="width:50px;" value="${item.fiber || 0}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'fiber', parseFloat(this.value) || 0)"></td>
      <td><input type="number" class="inline-edit-input" style="width:55px;" value="${item.sodium || 0}" onfocus="highlightIngredientBox(${index})" onblur="clearIngredientHighlight()" onchange="updateAiIngredient(${index}, 'sodium', parseFloat(this.value) || 0)"></td>
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
        parsedIngredientsList[index].protein = round1(nut.p * multiplier);
        parsedIngredientsList[index].carbs = round1(nut.c * multiplier);
        parsedIngredientsList[index].fat = round1(nut.f * multiplier);
        parsedIngredientsList[index].fiber = round1((nut.fiber || 0) * multiplier);
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
  let totalCal = 0, totalP = 0, totalC = 0, totalF = 0, totalFiber = 0, totalSodium = 0;
  parsedIngredientsList.forEach(item => {
    totalCal += item.calories || 0;
    totalP += item.protein || 0;
    totalC += item.carbs || 0;
    totalF += item.fat || 0;
    totalFiber += item.fiber || 0;
    totalSodium += item.sodium || 0;
  });

  totalAnalCal.textContent = Math.round(totalCal);
  totalAnalP.textContent = round1(totalP);
  totalAnalC.textContent = round1(totalC);
  totalAnalF.textContent = round1(totalF);
  const fiberEl = document.getElementById('total-anal-fiber');
  const sodiumEl = document.getElementById('total-anal-sodium');
  if (fiberEl) fiberEl.textContent = round1(totalFiber);
  if (sodiumEl) sodiumEl.textContent = Math.round(totalSodium);
}

// Import parsed items as a shared food log entry (1-click import using form selections)
function importIngredientsToLogs() {
  if (parsedIngredientsList.length === 0) return;

  const targetWho = aiTargetWho.value;
  const targetMeal = aiMealCategory.value;
  const dateStr = aiLogDate.value || getLocalDateStr();

  // Combine items to import as a single aggregate entry
  let totalCal = 0, totalP = 0, totalC = 0, totalF = 0, totalFiber = 0, totalSodium = 0;
  let itemsStr = "";

  parsedIngredientsList.forEach(item => {
    totalCal += item.calories || 0;
    totalP += item.protein || 0;
    totalC += item.carbs || 0;
    totalF += item.fat || 0;
    totalFiber += item.fiber || 0;
    totalSodium += item.sodium || 0;
    itemsStr += `${item.name}+`;
  });
  itemsStr = itemsStr.slice(0, -1); // remove trailing +

  let newRecurringId = null;

  // If set to save as recurring meal
  if (aiSaveAsRecurring && aiSaveAsRecurring.checked) {
    const newId = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    newRecurringId = newId;

    fitnessDB.recurringMeals = fitnessDB.recurringMeals || [];
    fitnessDB.recurringMeals.push({
      id: newId,
      who: targetWho,
      meal: targetMeal,
      name: `AI匯入: ${itemsStr}`,
      cal: Math.round(totalCal),
      p: round1(totalP),
      c: round1(totalC),
      f: round1(totalF),
      fiber: round1(totalFiber),
      sodium: Math.round(totalSodium),
      active: true
    });
    aiSaveAsRecurring.checked = false; // Reset checkbox
    renderRecurringMealsList();
  }

  fitnessDB.foodLogs.push({
    date: dateStr,
    who: targetWho,
    meal: targetMeal,
    name: newRecurringId ? `[固定] AI匯入: ${itemsStr}` : `AI匯入: ${itemsStr}`,
    cal: Math.round(totalCal),
    p: round1(totalP),
    c: round1(totalC),
    f: round1(totalF),
    fiber: round1(totalFiber),
    sodium: Math.round(totalSodium),
    recurringId: newRecurringId
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
    const todayStr = getLocalDateStr();
    
    // Calculate total macros of the meal for this mode
    let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;
    if (mode === 'both') {
      totalCal = recipe.macros.male.cal + recipe.macros.female.cal;
      totalP = recipe.macros.male.p + recipe.macros.female.p;
      totalC = (recipe.macros.male.c || 0) + (recipe.macros.female.c || 0);
      totalF = (recipe.macros.male.f || 0) + (recipe.macros.female.f || 0);
    } else if (mode === 'male') {
      totalCal = recipe.macros.male.cal;
      totalP = recipe.macros.male.p;
      totalC = recipe.macros.male.c || 0;
      totalF = recipe.macros.male.f || 0;
    } else if (mode === 'female') {
      totalCal = recipe.macros.female.cal;
      totalP = recipe.macros.female.p;
      totalC = recipe.macros.female.c || 0;
      totalF = recipe.macros.female.f || 0;
    }

    fitnessDB.foodLogs.push({
      date: todayStr,
      who: mode,
      meal: "午餐", // default to lunch
      name: `烹飪: ${recipe.name}`,
      cal: totalCal,
      p: totalP,
      c: totalC,
      f: totalF
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
      if (cloudData.recurringMeals) fitnessDB.recurringMeals = cloudData.recurringMeals;
      if (cloudData.settings) fitnessDB.settings = cloudData.settings;
      
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

  // Seed default recurring meals if list is empty
  fitnessDB.recurringMeals = fitnessDB.recurringMeals || [];
  if (fitnessDB.recurringMeals.length === 0) {
    fitnessDB.recurringMeals = [
      {
        id: 'rec_default_female_bowl',
        who: 'female',
        meal: '早餐',
        name: '能量碗',
        cal: 448,
        p: 39.3,
        c: 36.1,
        f: 17.6,
        fiber: 7.5,
        sodium: 215,
        active: true
      },
      {
        id: 'rec_default_male_bowl',
        who: 'male',
        meal: '早餐',
        name: '能量碗',
        cal: 896,
        p: 78.6,
        c: 72.2,
        f: 35.2,
        fiber: 15.0,
        sodium: 430,
        active: true
      }
    ];
    saveSharedData();
  }

  // Persist migrated legacy data under the new private key right away
  if (migratedFromLegacy) {
    saveSharedData();
  }

  renderInventoryList();
  calculateTargets();
  updateRecipes();
  renderHistoryTable();
  if (typeof renderRecurringMealsList === 'function') {
    renderRecurringMealsList();
  }
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

// 🗓️ Daily Recurring/Fixed Meals Engine
function checkAndLogRecurringMeals(targetDateStr) {
  const todayStr = targetDateStr || getLocalDateStr();
  
  fitnessDB.recurringMeals = fitnessDB.recurringMeals || [];
  fitnessDB.settings = fitnessDB.settings || {};
  fitnessDB.settings.skippedRecurring = fitnessDB.settings.skippedRecurring || {};

  const skipped = fitnessDB.settings.skippedRecurring[todayStr] || [];
  let addedAny = false;

  fitnessDB.recurringMeals.forEach(rec => {
    if (rec.active === false) return;
    if (skipped.includes(rec.id)) return;

    // Check if already logged for this date and recurring ID
    const alreadyLogged = fitnessDB.foodLogs.some(log => log.date === todayStr && log.recurringId === rec.id);
    if (!alreadyLogged) {
      fitnessDB.foodLogs.push({
        date: todayStr,
        who: rec.who,
        meal: rec.meal,
        name: `[固定] ${rec.name}`,
        cal: Math.round(rec.cal) || 0,
        p: round1(rec.p) || 0,
        c: round1(rec.c) || 0,
        f: round1(rec.f) || 0,
        fiber: round1(rec.fiber) || 0,
        sodium: Math.round(rec.sodium) || 0,
        recurringId: rec.id
      });
      addedAny = true;
    }
  });

  if (addedAny) {
    fitnessDB.foodLogs.sort((a, b) => b.date.localeCompare(a.date));
    saveSharedData();
  }
}

function renderRecurringMealsList() {
  if (!recurringMealsList) return;
  recurringMealsList.innerHTML = '';

  fitnessDB.recurringMeals = fitnessDB.recurringMeals || [];

  if (fitnessDB.recurringMeals.length === 0) {
    recurringMealsList.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 2rem 0; font-size: 0.85rem;">
        🥣 尚無固定餐食範本，請從右側新增，或從飲食日誌中「設為固定」！
      </div>
    `;
    return;
  }

  fitnessDB.recurringMeals.forEach((rec, idx) => {
    const whoLabel = rec.who === 'both' ? '👫 雙人' : (rec.who === 'male' ? '🙋‍♂️ 男生' : '🙋‍♀️ 女生');
    const itemDiv = document.createElement('div');
    itemDiv.style.background = 'rgba(15, 23, 42, 0.4)';
    itemDiv.style.padding = '0.75rem 1rem';
    itemDiv.style.borderRadius = '8px';
    itemDiv.style.border = '1px solid rgba(255, 255, 255, 0.05)';
    itemDiv.style.display = 'flex';
    itemDiv.style.flexDirection = 'column';
    itemDiv.style.gap = '0.4rem';

    itemDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" id="chk-rec-${rec.id}" ${rec.active ? 'checked' : ''} onchange="toggleRecurringMeal('${rec.id}', this.checked)" style="width: 15px; height: 15px; cursor: pointer;">
          <strong style="font-size: 0.9rem; color: var(--text-main);">${escapeHTML(rec.name)}</strong>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.75rem; background: rgba(255, 255, 255, 0.1); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--text-muted);">${whoLabel} · ${escapeHTML(rec.meal)}</span>
          <button class="remove-btn" style="position: static; padding: 0.2rem 0.4rem; font-size: 0.75rem; border-radius: 4px;" onclick="deleteRecurringMeal('${rec.id}')">🗑️</button>
        </div>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 0.75rem; padding-left: 1.5rem;">
        <span>🔥 熱量: ${rec.cal} kcal</span>
        <span>🥩 蛋白: ${rec.p}g</span>
        <span>🍚 碳水: ${rec.c}g</span>
        <span>🥑 脂肪: ${rec.f}g</span>
        <span>🥬 纖維: ${rec.fiber}g</span>
        <span>🧂 鈉: ${rec.sodium}mg</span>
      </div>
    `;
    recurringMealsList.appendChild(itemDiv);
  });
}

window.toggleRecurringMeal = function(id, activeState) {
  fitnessDB.recurringMeals = fitnessDB.recurringMeals || [];
  const found = fitnessDB.recurringMeals.find(r => r.id === id);
  if (found) {
    found.active = activeState;
    saveSharedData();
    calculateTargets(); // Will automatically remove or re-apply for today based on activeState
    renderRecurringMealsList();
  }
};

window.deleteRecurringMeal = function(id) {
  fitnessDB.recurringMeals = fitnessDB.recurringMeals || [];
  const found = fitnessDB.recurringMeals.find(r => r.id === id);
  if (found) {
    if (confirm(`確定要刪除「${found.name}」固定餐食範本嗎？\n(已生成的歷史記錄不會受到影響)`)) {
      fitnessDB.recurringMeals = fitnessDB.recurringMeals.filter(r => r.id !== id);
      saveSharedData();
      calculateTargets();
      renderRecurringMealsList();
    }
  }
};

window.saveLogAsRecurring = function(index) {
  const item = fitnessDB.foodLogs[index];
  if (!item) return;

  let cleanName = item.name;
  if (cleanName.startsWith('[固定] ')) {
    cleanName = cleanName.substring(5);
  }

  fitnessDB.recurringMeals = fitnessDB.recurringMeals || [];
  const duplicate = fitnessDB.recurringMeals.find(r => r.name === cleanName && r.meal === item.meal && r.who === item.who);
  if (duplicate) {
    alert(`此餐食「${cleanName}」已經存在於每日固定餐食清單中。`);
    return;
  }

  const newId = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

  fitnessDB.recurringMeals.push({
    id: newId,
    who: item.who,
    meal: item.meal,
    name: cleanName,
    cal: item.cal || 0,
    p: item.p || 0,
    c: item.c || 0,
    f: item.f || 0,
    fiber: item.fiber || 0,
    sodium: item.sodium || 0,
    active: true
  });

  saveSharedData();
  renderRecurringMealsList();
  alert(`已將「${cleanName}」成功設為每日固定/常用餐食！之後每天將自動為您登錄該餐點。`);
};

window.onload = init;
