const SHARE_KEY_FORMAT = /^[A-Za-z0-9_-]{8,64}$/;

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return res.status(500).json({ error: 'Vercel KV is not connected. Please create and connect KV database in Vercel Storage settings.' });
  }

  // Per-couple private record when a share key is provided;
  // the bare "fitness_data" record is kept readable only for one-time
  // migration of data saved before share keys existed.
  const rawKey = (req.query && req.query.key) || '';
  const kvKey = SHARE_KEY_FORMAT.test(rawKey) ? `fitness_data_${rawKey}` : 'fitness_data';

  try {
    const response = await fetch(`${kvUrl}/get/${kvKey}`, {
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
        workoutLogs: [],
        costcoInventory: []
      });
    }

    const parsedData = JSON.parse(rawResult);
    return res.status(200).json(parsedData);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
