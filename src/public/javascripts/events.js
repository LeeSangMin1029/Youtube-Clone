const path = document.location.href;

const menuToggle = function (guideMenu) {
  guideMenu.toggleAttribute('opened');
};

const btns = document.querySelectorAll('#button');
btns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const ripple = document.createElement('div');
    btn.append(ripple);
    ripple.className = 'animate';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.background = 'red';
    setTimeout(() => btn.removeChild(ripple), 200);
  });
});

const guideAnchor = document.querySelectorAll('.guide-item');
guideAnchor.forEach((a) => {
  if (a.href === path) {
    a.setAttribute('active', '');
  }
});

const menuBtn = document.querySelector('#menu button');
const guideMenu = document.querySelector('#guide-menu');
menuBtn.addEventListener('click', () => {
  menuToggle(guideMenu);
});
