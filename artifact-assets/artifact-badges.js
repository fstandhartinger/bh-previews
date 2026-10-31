(() => {
  'use strict';
  const items = [{"id": "56dbce", "selector": "header, h1", "title": "Benchmark Heaven Vorschauen"}, {"id": "1081b1", "selector": "main, body", "title": "Release-Vorschau"}, {"id": "389609", "selector": "#jev-capability-title", "title": "Bildverständnis"}, {"id": "389dcc", "selector": "#jev-bubbles-title", "title": "Qualität, Kosten und Geschwindigkeit"}, {"id": "8fca98", "selector": "#jev14-chart-title", "title": "Zusammengesetzter Vergleich"}, {"id": "4eea8f", "selector": "#jev15-compare", "title": "Systemvergleich"}, {"id": "c37022", "selector": "#image-jev-examples-heading", "title": "Öffentliche Bildbeispiele"}, {"id": "3925ae", "selector": ".grid > .card:nth-child(1)", "title": "Gewichtung der Achsen"}, {"id": "f70f67", "selector": ".grid > .card:nth-child(2)", "title": "Gewichtung der Aufgaben"}, {"id": "f21364", "selector": ".grid > .card:nth-child(3)", "title": "Korrekturen, Tempo und Kosten"}, {"id": "1e057e", "selector": ".grid > .card:nth-child(4)", "title": "Filter und Vergleichsmaßstab"}, {"id": "c75f31", "selector": "#rank", "title": "Explorative Rangliste"}];
  function attach() {
    for (const item of items) {
      const host = document.querySelector(item.selector);
      if (!host || Array.from(host.children).some(n => n.dataset.aid === item.id)) continue;
      host.classList.add('aid-host');
      const badge = document.createElement('span');
      badge.className = 'aid'; badge.dataset.aid = item.id;
      badge.textContent = 'a#' + item.id; badge.title = 'Artefakt-ID – klicken zum Kopieren';
      badge.setAttribute('role', 'button'); badge.tabIndex = 0;
      badge.setAttribute('aria-label', item.title + ': a#' + item.id + ' kopieren');
      async function copy(event) {
        event.preventDefault(); event.stopPropagation();
        const text = 'a#' + item.id;
        try {
          if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
          else {
            const field = document.createElement('textarea');
            field.value = text; field.style.position = 'fixed'; field.style.opacity = '0';
            document.body.append(field); field.select();
            const ok = document.execCommand('copy'); field.remove(); badge.focus();
            if (!ok) throw new Error('copy failed');
          }
          badge.title = 'Kopiert: ' + text;
        } catch { badge.title = 'Kopieren nicht möglich: ' + text; }
      }
      badge.addEventListener('click', copy);
      badge.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') copy(event); });
      host.append(badge);
    }
  }
  let queued = false;
  const observer = new MutationObserver(() => {
    if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; attach(); }); }
  });
  attach(); observer.observe(document.body, {childList:true, subtree:true});
})();
