import fetch from 'node-fetch';
import FormData from 'form-data';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image } = req.body;
    const botToken = "8098677151:AAHw3ofWspeagUJWjWejk91whH9z9y_PoYA";
    const chatId = "802683583";

    try {
      // Convert base64 to buffer
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Prepare FormData
      const form = new FormData();
      form.append("chat_id", chatId);
      form.append("photo", buffer, "photo.jpg");

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: form
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
