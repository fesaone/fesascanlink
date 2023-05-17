let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
let currentCamera = 0;

scanner.addListener('scan', function (content) {
if (content.startsWith('https://fesa.one')) {
window.location.href = content;
} else {
alert('Link tidak didukung. Harap gunakan QR Code yang mengandung domain fesa.one.');
}
});

function switchCamera() {
Instascan.Camera.getCameras().then(function (cameras) {
if (cameras.length > 0) {
currentCamera = (currentCamera + 1) % cameras.length;
scanner.start(cameras[currentCamera]);
if (cameras[currentCamera].name.toLowerCase().includes('back')) {
document.getElementById('preview').classList.remove('rear-camera');
document.getElementById('preview').classList.add('front-camera');
document.getElementById('preview').style.webkitTransform = '';
document.getElementById('preview').style.transform = '';
} else {
document.getElementById('preview').classList.remove('rear-camera');
document.getElementById('preview').classList.add('front-camera');
document.getElementById('preview').style.webkitTransform = 'scaleX(-1)';
document.getElementById('preview').style.transform = 'scaleX(-1)';
}
} else {
console.error('No cameras found.');
}
}).catch(function (e) {
console.error(e);
});
}

document.getElementById('switchCamera').addEventListener('click', switchCamera);
switchCamera();
