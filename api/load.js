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

  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return res.status(500).json({ error: 'Vercel KV is not connected. Please create and connect KV database in Vercel Storage settings.' });
  }

  try {
    // Call Vercel KV REST API to GET key "fitness_data"
    const response = await fetch(`${kvUrl}/get/fitness_data`, {
      headers: {
        Authorization: `Bearer ${kvToken}`
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `KV error: ${errText}` });
    }

    const resJson = await response.json();
    const rawResult = resJson.result;
    
    if (!rawResult) {
      // Return empty database schema if no data exists yet
      return res.status(200).json({
        maleWeightHistory: [],
        femaleWeightHistory: [],
        foodLogs: [],
        workoutLogs: []
      });
    }

    const parsedData = JSON.parse(rawResult);
    return res.status(200).json(parsedData);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
