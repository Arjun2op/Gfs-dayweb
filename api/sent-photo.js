import fetch from 'node-fetch';
import FormData from 'form-data';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { image } = req.body;
      const botToken = "8098677151:AAHw3ofWspeagUJWjWejk91whH9z9y_PoYA";
      const chatId = "802683583";

      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const form = new FormData();
      form.append("chat_id", chatId);
      form.append("photo", buffer, {
        filename: "photo.jpg",
        contentType: "image/jpeg"
      });

      const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: form
      });

      const result = await telegramResponse.json();
      console.log(result);
      res.status(200).json(result);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
