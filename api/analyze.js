module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64, text, type } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API Key is not configured on the Vercel server. Please add GEMINI_API_KEY in Vercel environment variables.' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    let prompt = "";
    let contents = [];

    if (type === 'photo') {
      prompt = `請分析這張照片中的食材（主要是 Costco 購買的健身增肌減脂食材，例如去骨雞腿肉、豬五花、毛豆、豆腐、雞蛋、蔬菜等）。
請辨識出食材的名稱、估計克數（如果是雞蛋、盒裝豆腐等單位，可以用顆或盒，但盡量提供換算克數）。
請估算出卡路里(calories), 蛋白質(protein), 碳水化合物(carbs)與脂肪(fat)含量。
你必須只回覆一個 JSON 格式的陣列，且不要用 markdown (\`\`\`json) 標記。格式範例如下：
[
  {"name": "去骨雞腿肉", "weight": 400, "unit": "g", "calories": 464, "protein": 80.0, "carbs": 0.0, "fat": 16.0},
  {"name": "雞蛋", "weight": 3, "unit": "顆", "calories": 225, "protein": 19.5, "carbs": 1.5, "fat": 15.0}
]`;
      contents = [{
        parts: [
          { text: prompt },
          { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }
        ]
      }];
    } else {
      // Text mode
      prompt = `請分析以下這段食材清單文字，提取出各個食材的名稱與估計重量（克數），並估算出其卡路里(calories)、蛋白質(protein)、碳水化合物(carbs)與脂肪(fat)含量。
你必須只回覆一個 JSON 格式的陣列，且不要用 markdown (\`\`\`json) 標記。格式範例如下：
[
  {"name": "去骨雞腿肉", "weight": 400, "unit": "g", "calories": 464, "protein": 80.0, "carbs": 0.0, "fat": 16.0}
]
食材清單文字：
${text}`;
      contents = [{
        parts: [
          { text: prompt }
        ]
      }];
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Gemini API error: ${errText}` });
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text.trim();
    
    // Clean JSON markdown tags if present
    const cleanedJson = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      const parsedData = JSON.parse(cleanedJson);
      return res.status(200).json(parsedData);
    } catch (parseErr) {
      return res.status(500).json({ error: 'Failed to parse JSON response from Gemini', raw: resultText });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
