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

// Ingredients Nutrition Lookup Database
const nutritionDB = {
  "雞腿肉": { cal: 116, p: 20, c: 0, f: 4, unit: "g" },
  "去骨雞腿肉": { cal: 116, p: 20, c: 0, f: 4, unit: "g" },
  "雞胸肉": { cal: 110, p: 23, c: 0, f: 1.5, unit: "g" },
  "豬五花": { cal: 368, p: 17, c: 0, f: 33, unit: "g" },
  "五花肉": { cal: 368, p: 17, c: 0, f: 33, unit: "g" },
  "豬絞肉": { cal: 230, p: 18, c: 0, f: 17, unit: "g" },
  "絞肉": { cal: 230, p: 18, c: 0, f: 17, unit: "g" },
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
  "麥片": { cal: 380, p: 13, c: 67, f: 7, unit: "g" },
  "燕麥片": { cal: 380, p: 13, c: 67, f: 7, unit: "g" }
};

// Current Portion Mode ('both', 'male', 'female')
let currentMode = 'both';
let activeTab = 'photo';
let uploadedImageBase64 = null;
let parsedIngredientsList = [];

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

const rawMeatWeightInput = document.getElementById('raw-meat-weight');
const prepMaleGEl = document.getElementById('prep-male-g');
const prepMaleBagsEl = document.getElementById('prep-male-bags');
const prepFemaleGEl = document.getElementById('prep-female-g');
const prepFemaleBagsEl = document.getElementById('prep-female-bags');
const prepDaysEl = document.getElementById('prep-days');

const portionBtns = document.querySelectorAll('.portion-btn');

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

// AI Analysis Elements
const geminiKeyInput = document.getElementById('gemini-key');
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

// Imported macros offset
let importedOffset = { cal: 0, p: 0, c: 0, f: 0 };

// Initialization
function init() {
  loadFromLocalStorage();
  calculateTargets();
  updateRecipes();
  setupEventListeners();
  setupAIEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
  const inputs = [
    maleWeightInput, maleHeightInput, maleAgeInput, maleTargetFatInput,
    femaleWeightInput, femaleHeightInput, femaleAgeInput, femaleTargetWeightInput,
    rawMeatWeightInput
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
}

// Setup AI Event Listeners
function setupAIEventListeners() {
  // Tab Switching
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

  // Dropzone drag-and-drop
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

  // Actions
  analyzeTextBtn.addEventListener('click', analyzeText);
  analyzePhotoBtn.addEventListener('click', analyzePhoto);
  importIngredientsBtn.addEventListener('click', importIngredientsToMacros);

  geminiKeyInput.addEventListener('change', () => {
    localStorage.setItem('costco_gemini_key', geminiKeyInput.value);
  });
}

// Handle selected file
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

// Calculate Goals
function calculateTargets() {
  // Male (Mifflin-St Jeor)
  const mWeight = parseFloat(maleWeightInput.value) || 85;
  const mHeight = parseFloat(maleHeightInput.value) || 180;
  const mAge = parseFloat(maleAgeInput.value) || 30;
  const mBMR = 10 * mWeight + 6.25 * mHeight - 5 * mAge + 5;
  const mTDEE = mBMR * 1.35; // Kettlebell + Run active factor
  const mTargetCal = Math.round(mTDEE - 600); // Strict Fat Loss Deficit
  const mTargetProt = Math.round(mWeight * 2.0); // Strict protein ratio

  maleTargetCalEl.textContent = mTargetCal.toLocaleString();
  maleTargetProtEl.textContent = mTargetProt;

  // Female (Mifflin-St Jeor)
  const fWeight = parseFloat(femaleWeightInput.value) || 67;
  const fHeight = parseFloat(femaleHeightInput.value) || 170;
  const fAge = parseFloat(femaleAgeInput.value) || 30;
  const fBMR = 10 * fWeight + 6.25 * fHeight - 5 * fAge - 161;
  const fTDEE = fBMR * 1.35; // Kettlebell swings active factor
  const fTargetCal = Math.round(fTDEE - 400); // Deficit
  const fTargetProt = Math.round(fWeight * 1.8);

  femaleTargetCalEl.textContent = fTargetCal.toLocaleString();
  femaleTargetProtEl.textContent = fTargetProt;

  // Update Costco packaging calculation
  const rawWeight = parseFloat(rawMeatWeightInput.value) || 3000;
  const malePortion = 250; 
  const femalePortion = 150; 
  const combinedPortion = malePortion + femalePortion;
  
  const days = Math.floor(rawWeight / combinedPortion);
  const leftover = rawWeight % combinedPortion;

  prepMaleGEl.textContent = malePortion;
  prepMaleBagsEl.textContent = days;
  prepFemaleGEl.textContent = femalePortion;
  prepFemaleBagsEl.textContent = days;
  
  if (leftover > 0) {
    prepDaysEl.innerHTML = `${days} 天的晚餐！並剩下 ${leftover}g 可做配菜。`;
  } else {
    prepDaysEl.textContent = `${days} 天的晚餐！`;
  }

  // Update Macro Progress bars based on the One-Day Plan
  updateMacroProgress(mTargetCal, mTargetProt, fTargetCal, fTargetProt);
}

// Update Macro Progress indicators
function updateMacroProgress(mCalGoal, mPGoal, fCalGoal, fPGoal) {
  // Base daily plan macros
  // Male: 1840 cal / 172g P / 115g C / 69g F
  // Female: 1465 cal / 116g P / 98.5g C / 64g F
  
  // Include imported offsets if any
  const mCalAct = 1840 + importedOffset.cal;
  const mPAct = 172 + importedOffset.p;
  const mCAct = 115 + importedOffset.c;
  const mCGoal = 150; 
  
  maleCalRatio.textContent = `${mCalAct} / ${mCalGoal} kcal`;
  maleCalFill.style.width = `${Math.min((mCalAct / mCalGoal) * 100, 100)}%`;
  malePRatio.textContent = `${mPAct} / ${mPGoal}g`;
  malePFill.style.width = `${Math.min((mPAct / mPGoal) * 100, 100)}%`;
  maleCRatio.textContent = `${mCAct} / ${mCGoal}g`;
  maleCFill.style.width = `${Math.min((mCAct / mCGoal) * 100, 100)}%`;

  const fCalAct = 1465 + importedOffset.cal;
  const fPAct = 116 + importedOffset.p;
  const fCAct = 98.5 + importedOffset.c;
  const fCGoal = 130;
  
  femaleCalRatio.textContent = `${fCalAct} / ${fCalGoal} kcal`;
  femaleCalFill.style.width = `${Math.min((fCalAct / fCalGoal) * 100, 100)}%`;
  femalePRatio.textContent = `${fPAct} / ${fPGoal}g`;
  femalePFill.style.width = `${Math.min((fPAct / fPGoal) * 100, 100)}%`;
  femaleCRatio.textContent = `${fCAct} / ${fCGoal}g`;
  femaleCFill.style.width = `${Math.min((fCAct / fCGoal) * 100, 100)}%`;
}

// Update Interactive Recipes view based on portion mode ('both', 'male', 'female')
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

// Text input parsing logic (Regex & Database matching)
function analyzeText() {
  const text = textInput.value.trim();
  if (!text) {
    alert("請輸入食材內容！");
    return;
  }

  showLoading(true, "文字萃取與營養計算中...");

  setTimeout(() => {
    parsedIngredientsList = [];
    const lines = text.split('\n');
    
    lines.forEach(line => {
      if (!line.trim()) return;

      // Extract quantity and weight
      // Matches: 400g, 400克, 3顆, 1盒, 2包 etc.
      const numMatch = line.match(/(\d+(?:\.\d+)?)\s*(克|g|顆|盒|包|ml|cc|匙)?/i);
      let qty = 100; // default weight 100g
      let unit = "g";
      if (numMatch) {
        qty = parseFloat(numMatch[1]);
        if (numMatch[2]) {
          unit = numMatch[2].toLowerCase();
        }
      }

      // Find keyword in database
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
          // If unit in DB is grams, the database values are per 100g.
          // Handle conversions
          if (unit === "盒" && (matchedKey.includes("豆腐") || matchedKey.includes("板豆腐"))) {
            actualWeight = qty * 300; // 1 box tofu = ~300g
          } else if (unit === "包" && matchedKey.includes("雞腿肉")) {
            actualWeight = qty * 500; // 1 pack chicken thigh = ~500g
          }
          factor = actualWeight / 100;
        } else {
          // Unit-based (e.g. egg)
          factor = qty;
          actualWeight = qty; // represent unit count
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
        // Fallback for unknown ingredient
        parsedIngredientsList.push({
          name: line.replace(/[\d\s克g顆盒包mlcc匙]/g, "") || "未知食材",
          weight: qty,
          unit: unit,
          calories: Math.round(qty * 0.8), // general estimate
          protein: Math.round(qty * 0.05 * 10) / 10,
          carbs: Math.round(qty * 0.1 * 10) / 10,
          fat: Math.round(qty * 0.02 * 10) / 10
        });
      }
    });

    displayAnalysisResults();
    showLoading(false);
  }, 1000);
}

// Photo analysis logic (Calls Gemini API or uses Mock simulator if no key)
async function analyzePhoto() {
  if (activeTab === 'photo' && !uploadedImageBase64) {
    alert("請先上傳食材相片！");
    return;
  }

  const apiKey = geminiKeyInput.value.trim() || localStorage.getItem('costco_gemini_key');
  
  if (!apiKey) {
    // Simulated mock analysis
    showLoading(true, "本地模擬分析中 (輸入 Gemini Key 可啟用真實 AI)...");
    setTimeout(() => {
      // Mock result using user's initial setup
      parsedIngredientsList = [
        { name: "去骨雞腿肉 (Costco)", weight: 400, unit: "g", calories: 464, protein: 80, carbs: 0, fat: 16 },
        { name: "義美板豆腐", weight: 300, unit: "g", calories: 240, protein: 24, carbs: 6, fat: 13.5 },
        { name: "新鮮雞蛋", weight: 3, unit: "顆", calories: 225, protein: 19.5, carbs: 1.5, fat: 15 },
        { name: "冷凍毛豆仁 (Costco)", weight: 150, unit: "g", calories: 180, protein: 16.5, carbs: 15, fat: 7.5 }
      ];
      displayAnalysisResults();
      showLoading(false);
    }, 2500);
    return;
  }

  showLoading(true, "連接 Google Gemini Vision AI 辨識中...");

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const prompt = `請分析這張照片中的食材（主要是 Costco 購買的健身增肌減脂食材，例如去骨雞腿肉、豬五花、毛豆、豆腐、雞蛋、蔬菜等）。
請辨識出食材的名稱、估計克數（如果是雞蛋、盒裝豆腐等單位，可以用顆或盒，但盡量提供換算克數）。
請估算出卡路里(calories), 蛋白質(protein), 碳水化合物(carbs)與脂肪(fat)含量。
你必須只回覆一個 JSON 格式的陣列，且不要用 markdown (\`\`\`json) 標記。格式範例如下：
[
  {"name": "去骨雞腿肉", "weight": 400, "unit": "g", "calories": 464, "protein": 80.0, "carbs": 0.0, "fat": 16.0},
  {"name": "雞蛋", "weight": 3, "unit": "顆", "calories": 225, "protein": 19.5, "carbs": 1.5, "fat": 15.0}
]`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: uploadedImageBase64 } }
          ]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API 請求失敗: ${response.statusText}`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text.trim();
    
    // Clean JSON markdown tags if present
    const cleanedJson = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    parsedIngredientsList = JSON.parse(cleanedJson);

    displayAnalysisResults();
  } catch (err) {
    console.error(err);
    alert(`AI 辨識發生錯誤: ${err.message}\n已切換為本地模擬分析。`);
    // Fallback
    parsedIngredientsList = [
      { name: "去骨雞腿肉 (Costco)", weight: 400, unit: "g", calories: 464, protein: 80, carbs: 0, fat: 16 },
      { name: "新鮮雞蛋", weight: 3, unit: "顆", calories: 225, protein: 19.5, carbs: 1.5, fat: 15 }
    ];
    displayAnalysisResults();
  } finally {
    showLoading(false);
  }
}

// Display results in the table
function displayAnalysisResults() {
  analysisTableBody.innerHTML = '';
  let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;

  parsedIngredientsList.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td>${item.weight} ${item.unit}</td>
      <td>${item.calories} kcal</td>
      <td>${item.protein}g</td>
      <td>${item.carbs}g</td>
      <td>${item.fat}g</td>
    `;
    analysisTableBody.appendChild(tr);

    totalCal += item.calories;
    totalP += item.protein;
    totalC += item.carbs;
    totalF += item.fat;
  });

  totalAnalCal.textContent = Math.round(totalCal);
  totalAnalP.textContent = Math.round(totalP * 10) / 10;
  totalAnalC.textContent = Math.round(totalC * 10) / 10;
  totalAnalF.textContent = Math.round(totalF * 10) / 10;

  resultPlaceholder.style.display = 'none';
  resultsContainer.style.display = 'block';
}

// Import parsed macros into the progress bars
function importIngredientsToMacros() {
  if (parsedIngredientsList.length === 0) return;

  let totalP = 0, totalCal = 0, totalC = 0, totalF = 0;
  parsedIngredientsList.forEach(item => {
    totalCal += item.calories;
    totalP += item.protein;
    totalC += item.carbs;
    totalF += item.fat;
  });

  // Distribute equally or apply to cumulative offset
  importedOffset.cal = Math.round(totalCal);
  importedOffset.p = Math.round(totalP);
  importedOffset.c = Math.round(totalC);
  importedOffset.f = Math.round(totalF);

  calculateTargets();
  alert(`成功匯入！今日攝取進度已累加該食材的營養價值。`);
}

// Toggle loading state
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

// Local Storage helpers
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
    rawMeatWeight: rawMeatWeightInput.value,
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
      if (settings.rawMeatWeight) rawMeatWeightInput.value = settings.rawMeatWeight;
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

  const savedKey = localStorage.getItem('costco_gemini_key');
  if (savedKey) {
    geminiKeyInput.value = savedKey;
  }
}

// Run app
window.onload = init;
