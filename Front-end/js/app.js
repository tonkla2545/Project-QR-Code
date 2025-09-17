var form = document.getElementById('qrForm');
var urlInput = document.getElementById('url');
var sizeSel = document.getElementById('size');
var eccSel = document.getElementById('ecc');
var box = document.getElementById('qrcode');
var downloadBtn = document.getElementById('downloadBtn');
var clearBtn = document.getElementById('clearBtn');
var saveBtn = document.getElementById('saveBtn'); 

function hideDownload() {
  downloadBtn.classList.add('d-none');      // ซ่อนด้วยคลาส (ชนะ !important)
  downloadBtn.removeAttribute('href');
}
function showDownload(href) {
  downloadBtn.href = href;
  downloadBtn.classList.remove('d-none');   // โชว์
}
function hideSave() {                               
  if (saveBtn) saveBtn.classList.add('d-none');
}
function showSave() {                               
  if (saveBtn) saveBtn.classList.remove('d-none');
}
function clearQR() {
  box.innerHTML = '';
  hideDownload();
  hideSave(); 
}

if (clearBtn) {
  clearBtn.onclick = function () {
    clearQR();
    urlInput.value = '';
    urlInput.focus();
  };
}

if (saveBtn) {
  saveBtn.onclick = function () {
    alert('ยังไม่เชื่อมฐานข้อมูล');
  };
}

if (form) {
  form.onsubmit = function (e) {
    e.preventDefault();

    // อ่าน URL แบบพื้นฐาน
    var url = (urlInput.value || '').replace(/^\s+|\s+$/g, '');
    if (!url) { alert('กรุณากรอกลิงก์'); return; }
    if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
      url = 'https://' + url;
    }

    clearQR();

    // ECC 
    var eccLevel = QRCode.CorrectLevel.M;
    var ecc = eccSel.value;
    if (ecc === 'L') eccLevel = QRCode.CorrectLevel.L;
    if (ecc === 'Q') eccLevel = QRCode.CorrectLevel.Q;
    if (ecc === 'H') eccLevel = QRCode.CorrectLevel.H;

    var size = parseInt(sizeSel.value, 10) || 256;

    // สร้าง QR
    new QRCode(box, {
      text: url,
      width: size,
      height: size,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: eccLevel
    });

    // รอให้วาดเสร็จจริง: ลองเช็คซ้ำ ๆ สูงสุด ~3 วินาที
    var tries = 0;
    (function waitReady() {
      var canvas = box.getElementsByTagName('canvas')[0];
      if (canvas && canvas.toDataURL) {
        showDownload(canvas.toDataURL('image/png'));
        showSave();  
        return;
      }
      var img = box.getElementsByTagName('img')[0];
      if (img && img.src) {
        showDownload(img.src);
        showSave();  
        return;
      }
      if (tries++ < 30) {            // 30 * 100ms = ~3s
        setTimeout(waitReady, 100);
      } else {
        console.warn('QR not ready yet; download button stays hidden.');
      }
    })();
  };
}
