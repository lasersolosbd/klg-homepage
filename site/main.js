// Reveal-on-scroll (content is visible by default; .js class enables the effect)
(function () {
  var reveals = document.querySelectorAll('.reveal');
  var art = document.querySelector('.hero-art');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }
  if (art) { requestAnimationFrame(function () { art.classList.add('in'); }); }

  // Mobile sticky CTA: show after the hero, hide while the final CTA is on screen
  var bar = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');
  var book = document.getElementById('book');
  if (bar && hero && book && 'IntersectionObserver' in window) {
    var pastHero = false, atBook = false;
    var update = function () { bar.classList.toggle('show', pastHero && !atBook); };
    new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (e) { atBook = e[0].isIntersecting; update(); }, { threshold: 0.2 }).observe(book);
  }
})();
