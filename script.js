const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const cursor = document.querySelector('.cursor-dot');
if (cursor && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('pointerenter', () => cursor.classList.add('active'));
    el.addEventListener('pointerleave', () => cursor.classList.remove('active'));
  });
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const qrAssets = {\n  pixelluka: 'assets/qr/pixelluka.png',
  bluwis: 'assets/qr/bluwis.png',
  khilonamart: 'assets/qr/khilonamart.png',
  dyochef: 'assets/qr/dyochef.png',
  localgyan: 'assets/qr/localgyan.png'
};
// Destinations decoded from the original PDF QR artwork.
const projectLinks = {\n  pixelluka: 'https://hqr.la/2ea4244d',
  bluwis: 'https://drive.google.com/drive/folders/1AHdclUqyGjhuJkQBllW8UtfGgwgzDmM9?usp=drive_link',
  khilonamart: 'https://hqr.la/d221ffe7',
  dyochef: 'https://drive.google.com/drive/folders/1OHprPzt8sh22gvX631C00OluKAD4IASd?usp=drive_link',
  localgyan: 'https://drive.google.com/drive/folders/1IFbd84PYhANG_h-Pqjsn39n8bwSKThHH?usp=drive_link'
};

const modal = document.querySelector('.qr-modal');
const modalTitle = document.querySelector('#qr-title');
const modalQR = document.querySelector('.modal-qr');
const folderLink = document.querySelector('.open-folder');\nconst clientList = document.querySelector('.modal-client-list');
const closeButton = document.querySelector('.modal-close');
let lastTrigger = null;

function openQR(name, key, trigger) {
  lastTrigger = trigger;
  modalTitle.textContent = name.toUpperCase() + '.';
  modalQR.src = qrAssets[key];
  modalQR.alt = 'Original QR code for ' + name;
  folderLink.href = projectLinks[key];\n  clientList.hidden = key !== 'pixelluka';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeButton.focus();
}
function closeQR() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalQR.removeAttribute('src');
  document.body.style.overflow = '';
  if (lastTrigger) lastTrigger.focus();
}
document.querySelectorAll('.qr-trigger').forEach(button => {
  button.addEventListener('click', () => openQR(button.dataset.brand, button.dataset.qr, button));
});
closeButton.addEventListener('click', closeQR);
modal.querySelector('.modal-backdrop').addEventListener('click', closeQR);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeQR();
});
