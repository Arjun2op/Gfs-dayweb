export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { image } = req.body;
        const botToken = process.env.BOT_TOKEN;
        const chatId = process.env.CHAT_ID;

        if (!image) {
            return res.status(400).json({ error: 'No image received' });
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                photo: image
            })
        });

        const data = await response.json();
        return res.status(200).json({ success: true, data });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
