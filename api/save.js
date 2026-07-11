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

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return res.status(500).json({ error: 'Vercel KV is not connected. Please create and connect KV database in Vercel Storage settings.' });
  }

  try {
    const data = req.body;
    const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);

    // Call Vercel KV REST API to SET key "fitness_data"
    const response = await fetch(`${kvUrl}/set/fitness_data`, {
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
