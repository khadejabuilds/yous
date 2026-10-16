(function () {
  'use strict';
 
  /* ---------- Scroll-driven tree growth ---------- */
  var els = [].slice.call(document.querySelectorAll('#tree [data-s]'));
  var wrap = document.querySelector('.wrap');
  var art = document.querySelector('.art');
  var hd = document.querySelector('header');
  var tick = false;
 
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
 
  els.forEach(function (e) {
    if (e.dataset.o) e.style.transformOrigin = e.dataset.o.split(' ').join('px ') + 'px';
  });
 
  function draw() {
    tick = false;
    var r = wrap.getBoundingClientRect();
    var den = r.height - art.offsetHeight;
    var p = den > 0 ? cl((hd.offsetHeight - r.top) / den) : 0;
 
    els.forEach(function (e) {
      var d = e.dataset;
      var mn = +(d.min || 0);
      var k = mn + (1 - mn) * cl((p - d.s) / (d.e - d.s));
      if (d.f) k *= 1 - cl((p - d.f) / 0.12);
 
      if (d.m === 'd') {
        e.style.strokeDashoffset = 1 - k;
        e.style.opacity = k > 0 ? 1 : 0;
      } else {
        var sc = d.a ? 0.7 + 0.3 * k : k;
        e.style.transform = 'scale(' + sc + ')';
        e.style.opacity = k;
      }
    });
  }
 
  function req() {
    if (!tick) {
      tick = true;
      requestAnimationFrame(draw);
    }
  }
 
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  draw();
 
  /* ---------- Copy email button ---------- */
  var btn = document.getElementById('copy');
  var out = document.getElementById('copied');
  var addr = document.getElementById('addr');
 
  btn.addEventListener('click', function () {
    function fallback() {
      try {
        var s = getSelection();
        var g = document.createRange();
        g.selectNodeContents(addr);
        s.removeAllRanges();
        s.addRange(g);
        out.textContent = 'Selected. Press copy on your keyboard.';
      } catch (e) {}
    }
    try {
      navigator.clipboard.writeText(addr.textContent).then(function () {
        out.textContent = 'Copied to clipboard';
      }, fallback);
    } catch (e) {
      fallback();
    }
  });
})();

const heading = document.getElementById('animated-heading');
const lines = heading.querySelectorAll('.text-effect-line span');

// Apply stagger delay per line (0s, 0.2s, 0.4s)
lines.forEach((line, index) => {
    line.style.transitionDelay = `${index * 0.2}s`;
});

// Trigger on load or when scrolled into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

observer.observe(heading);
