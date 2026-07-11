module.exports = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'No API key' });

  const models = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-2.0-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash',
    'gemini-3.5-flash'
  ];

  const results = {};

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hello' }] }]
        })
      });
      const resText = await response.text();
      results[model] = {
        status: response.status,
        response: resText.substring(0, 250)
      };
    } catch (err) {
      results[model] = { error: err.message };
    }
  }

  return res.status(200).json(results);
};
