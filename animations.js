(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    document.querySelectorAll('[data-animate],[data-animate-stagger]').forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  if (reduced || !window.IntersectionObserver) {
    revealAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('[data-animate],[data-animate-stagger]').forEach(function (el) {
    observer.observe(el);
  });
})();
