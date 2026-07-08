// Vercel Serverless Function — proxy seguro para a API da Anthropic.
// A chave de API fica só aqui no servidor (variável de ambiente ANTHROPIC_API_KEY),
// nunca é exposta no navegador do usuário.

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Método não permitido.' } });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: {
        message: 'ANTHROPIC_API_KEY não configurada no servidor. Adicione essa variável de ambiente nas configurações do projeto na Vercel e faça um novo deploy.'
      }
    });
    return;
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await anthropicRes.json();
    res.status(anthropicRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message || 'Erro ao contatar a API da Anthropic.' } });
  }
};
