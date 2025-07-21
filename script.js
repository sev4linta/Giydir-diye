const butonlar = document.querySelectorAll('.buton');
const karakterAlani = document.getElementById('karakter-alani');
const copKutusu = document.getElementById('cop');
const sesToggle = document.getElementById('ses-toggle');
const ses = document.getElementById('oyun-sesi');

let seciliKatman = null;

// Buton tıklamada katman üretir
butonlar.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.src;
    const type = btn.dataset.type;
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('katman');
    img.style.position = 'absolute';
    img.style.left = '0';
    img.style.top = '0';
    img.draggable = false;
    img.style.width = type === 'sac' ? '300px' : '600px';
    img.style.height = type === 'sac' ? '350px' : 'auto';

    img.addEventListener('pointerdown', e => {
      seciliKatman = img;
      img.setPointerCapture(e.pointerId);
      img.dataset.offsetX = e.offsetX;
      img.dataset.offsetY = e.offsetY;
    });

    img.addEventListener('pointermove', e => {
      if (seciliKatman === img) {
        const rect = karakterAlani.getBoundingClientRect();
        img.style.left = (e.clientX - rect.left - img.dataset.offsetX) + 'px';
        img.style.top = (e.clientY - rect.top - img.dataset.offsetY) + 'px';
      }
    });

img.addEventListener('pointerup', e => {
  img.releasePointerCapture(e.pointerId);
  seciliKatman = null;

  const imgRect = img.getBoundingClientRect();
  const copRect = copKutusu.getBoundingClientRect();

  const kesisiyor =
    imgRect.left < copRect.right &&
    imgRect.right > copRect.left &&
    imgRect.top < copRect.bottom &&
    imgRect.bottom > copRect.top;

  if (kesisiyor) {
    img.remove();
    console.log("Silindi");
  } else {
    console.log("Silinmedi");
  }
});


    karakterAlani.appendChild(img);
  });
});

// Ses kontrolü
let sesAcik = false;
sesToggle.addEventListener('click', () => {
  if (!sesAcik) { ses.play().catch(() => {}); }
  else { ses.pause(); }
  sesAcik = !sesAcik;
});

