const SHARE_KEY_FORMAT = /^[A-Za-z0-9_-]{8,64}$/;

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return res.status(500).json({ error: 'Vercel KV is not connected. Please create and connect KV database in Vercel Storage settings.' });
  }

  // Writes always require a valid per-couple share key — the legacy shared
  // "fitness_data" record is read-only from now on.
  const rawKey = (req.query && req.query.key) || '';
  if (!SHARE_KEY_FORMAT.test(rawKey)) {
    return res.status(400).json({ error: 'Missing or invalid share key.' });
  }
  const kvKey = `fitness_data_${rawKey}`;

  try {
    const data = req.body;
    const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);

    const response = await fetch(`${kvUrl}/set/${kvKey}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`
      },
      body: bodyStr
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `KV error: ${errText}` });
    }

    const resJson = await response.json();
    return res.status(200).json({ success: true, result: resJson.result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
