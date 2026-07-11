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

// Current Portion Mode ('both', 'male', 'female')
let currentMode = 'both';

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

// Initialization
function init() {
  loadFromLocalStorage();
  calculateTargets();
  updateRecipes();
  setupEventListeners();
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

  // Update Costco packaging calculation (e.g. for chicken)
  const rawWeight = parseFloat(rawMeatWeightInput.value) || 3000;
  const malePortion = 250; // default dinner raw chicken weight
  const femalePortion = 150; // default dinner raw chicken weight
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
  // Plan macros (from table)
  // Male: Breakfast (500 cal / 50g P / 50g C / 13g F) + Lunch (550 cal / 28g P / 45g C / 19g F) + Dinner (670 cal / 70g P / 18g C / 35.5g F) + Whey (120 cal / 24g P / 2g C / 1.5g F)
  // Total: 1840 kcal / 172g P / 115g C / 69g F
  const mCalAct = 1840;
  const mPAct = 172;
  const mCAct = 115;
  const mCGoal = 150; // Target carb
  
  maleCalRatio.textContent = `${mCalAct} / ${mCalGoal} kcal`;
  maleCalFill.style.width = `${Math.min((mCalAct / mCalGoal) * 100, 100)}%`;
  malePRatio.textContent = `${mPAct} / ${mPGoal}g`;
  malePFill.style.width = `${Math.min((mPAct / mPGoal) * 100, 100)}%`;
  maleCRatio.textContent = `${mCAct} / ${mCGoal}g`;
  maleCFill.style.width = `${Math.min((mCAct / mCGoal) * 100, 100)}%`;

  // Female: Breakfast (450 cal / 38g P / 47g C / 12.5g F) + Lunch (420 cal / 21g P / 36g C / 18g F) + Dinner (520 cal / 50g P / 15g C / 28.5g F) + Snack Egg (75 cal / 7g P / 0.5g C / 5g F)
  // Total: 1465 kcal / 116g P / 98.5g C / 64g F
  const fCalAct = 1465;
  const fPAct = 116;
  const fCAct = 98.5;
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
}

// Run app
window.onload = init;
