const btns = document.querySelectorAll('#button');
btns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const ripple = document.createElement('div');
    ripple.className = 'animate';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.background = 'red';
    btn.append(ripple);
    setTimeout(function () {
      ripple.parentNode.removeChild(ripple);
    }, 200);
  });
});
