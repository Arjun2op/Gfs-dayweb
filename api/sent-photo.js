export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image } = req.body;
    const botToken = "8098677151:AAHw3ofWspeagUJWjWejk91whH9z9y_PoYA";
    const chatId = "802683583";

    try {
      const resp = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: new URLSearchParams({
          chat_id: chatId,
          photo: image
        })
      });
      const data = await resp.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
