/* Analytics events for sujith.design, sent to Google Analytics 4 through gtag.
   One copy serves every page: home, CV, case studies and essays. It never sends personal data:
   no email address, no password, nothing typed into a field.
   Visit any page with ?notrack=1 to stop counting your own visits on that browser (?notrack=0 undoes it);
   the snippet in each page's <head> reads the same flag before Google's tag starts. */
(function(){
  if (typeof window.gtag !== 'function') return;

  var path = location.pathname;
  var pageType = /\/writing\//.test(path) ? 'essay'
    : /\/work\//.test(path) ? 'case_study'
    : /cv(\.html)?$/.test(path) ? 'cv' : 'home';
  var pageTitle = document.title.split(' — ')[0];

  function send(name, params){
    var p = { page_type: pageType };
    for (var k in params) if (params[k] !== undefined && params[k] !== '') p[k] = params[k];
    try { gtag('event', name, p); } catch (e) {}
  }
  window.track = send;

  function txt(el){
    if (!el) return '';
    // read what a sighted reader sees: skip hidden duplicates and arrows
    var c = el.cloneNode(true);
    [].forEach.call(c.querySelectorAll('[aria-hidden="true"]'), function(n){ n.remove(); });
    return c.textContent.replace(/[\u2190-\u21FF]/g, '').replace(/\s+/g, ' ').trim().slice(0, 100);
  }
  // Rolling labels repeat their text in a second, hidden span; essay and case links carry a title span.
  function label(el){ return txt(el.querySelector('.slide > span') || el.querySelector('.t') || el); }
  function sectionOf(el){
    if (el.closest('#sheet')) return 'phone_menu';
    if (el.closest('nav, .bar, .topbar, header.top')) return 'nav';
    var s = el.closest('#about, #work, #leadership, #writing, #cv, #contact, .vo, .po, footer, article, main');
    return s ? (s.id || s.className.split(' ')[0] || s.tagName.toLowerCase()) : 'page';
  }
  function cardInfo(card){
    var ic = card.classList.contains('ic'), seal = card.querySelector('.seal');
    return {
      view: ic ? 'hands_on' : 'manager',
      card_name: txt(card.querySelector('.nm')),
      card_area: txt(card.querySelector('.top span')),
      card_tier: txt(card.querySelector('.tier')),
      company: (seal && seal.getAttribute('aria-label')) || (ic ? '' : 'FYERS'),
      locked: card.hasAttribute('data-lock') ? 'yes' : undefined
    };
  }

  // Work: the intro's "Hands-on" link clicks the tab for the reader, so remember where it came from.
  var viaIntro = false;

  document.addEventListener('click', function(e){
    var t = e.target, el;
    if (!t || !t.closest) return;

    if ((el = t.closest('.w-tab'))) {
      if (el.getAttribute('aria-selected') !== 'true')
        send('work_view', { view: el.id === 'tabIc' ? 'hands_on' : 'manager', source: viaIntro ? 'intro_link' : 'toggle' });
      viaIntro = false; return;
    }
    if (t.closest('.tab-go')) { viaIntro = true; return; }
    if ((el = t.closest('.w-strip .chip'))) {
      send('work_filter', el.dataset.area ? { filter_type: 'area', filter_value: el.dataset.area === 'all' ? 'every area' : el.dataset.area }
        : { filter_type: 'order', filter_value: label(el) });
      return;
    }
    if (t.closest('#more')) {
      var area = document.getElementById('wArea');
      send('work_load_more', { filter_value: area ? area.options[area.selectedIndex].text : undefined });
      return;
    }
    if ((el = t.closest('.plate')) && (el.tagName === 'A' || el.querySelector('a'))) {
      send('work_card_click', cardInfo(el)); return;
    }
    if ((el = t.closest('#voExt, .vo-fb a'))) {
      send('video_youtube_open', { card_name: txt(document.getElementById('voTitle')) }); return;
    }
    if ((el = t.closest('.acc-head'))) {
      if (el.getAttribute('aria-expanded') !== 'true') send('essay_preview', { essay_title: txt(el.querySelector('.acc-title')) });
      return;
    }
    if (t.closest('#invert')) {
      var now = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      send('theme_toggle', { theme: now }); return;
    }
    if (t.closest('#copyMail')) { send('email_copy', { section: sectionOf(t) }); return; }
    if ((el = t.closest('#menuBtn'))) {
      send('menu_toggle', { state: el.getAttribute('aria-expanded') === 'true' ? 'close' : 'open' }); return;
    }
    if ((el = t.closest('#dl'))) { send('cv_download', { file_name: 'Sujith-Kumar-Anand-CV.pdf', cta_name: 'Download PDF' }); return; }

    el = t.closest('a[href]');
    if (!el) return;
    var href = el.getAttribute('href'), name = label(el) || el.getAttribute('aria-label') || '';
    if (el.closest('nav, #sheet') && href.charAt(0) === '#') {
      send('nav_click', { nav_item: name || 'Home', section: sectionOf(el) }); return;
    }
    if (/(^|\/)writing\/[^\/]+\.html|^[a-z0-9-]+\.html$/.test(href) && (pageType === 'essay' || /writing\//.test(href))) {
      var item = el.closest('.acc-item');
      send('essay_open', {
        essay_title: item ? txt(item.querySelector('.acc-title')) : name,
        source: pageType === 'essay' ? 'keep_reading' : 'home'
      });
      return;
    }
    if (pageType === 'case_study' && /^[a-z0-9-]+\.html$/.test(href)) {
      send('case_open', { case_title: name, source: 'next_case' });
      return;
    }
    if (/^mailto:/.test(href)) { send('email_click', { section: sectionOf(el) }); return; }
    send('cta_click', { cta_name: name, section: sectionOf(el), link_url: href.slice(0, 100) });
  }, true);

  // Manager cards open their video from the keyboard too.
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var link = e.target.closest && e.target.closest('a.pl-link[data-yt]');
    if (link) send('work_card_click', cardInfo(link.closest('.plate')));
  }, true);

  // Work filter dropdowns: which area and order readers pick.
  document.addEventListener('change', function(e){
    var s = e.target;
    if (s.id === 'wArea' || s.id === 'wSort')
      send('work_filter', { filter_type: s.id === 'wArea' ? 'area' : 'order', filter_value: s.options[s.selectedIndex].text });
  }, true);

  // Home: how far down the page readers get, once per section per visit.
  if (pageType === 'home' && 'IntersectionObserver' in window) {
    var seen = {};
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        var id = en.target.id;
        if (en.isIntersecting && !seen[id]) { seen[id] = 1; send('section_view', { section: id }); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -50% 0px' });
    ['about', 'work', 'leadership', 'writing', 'cv', 'contact'].forEach(function(id){
      var el = document.getElementById(id); if (el) io.observe(el);
    });
  }

  // Essays and case studies: how far readers scroll, and how long they spend reading.
  if (pageType === 'essay' || pageType === 'case_study') {
    var marks = [25, 50, 75, 100], hit = {};
    var onScroll = function(){
      var h = document.documentElement.scrollHeight - innerHeight;
      var pct = h > 0 ? (scrollY / h) * 100 : 100;
      marks.forEach(function(m){
        if (!hit[m] && pct >= (m === 100 ? 97 : m)) { hit[m] = 1; send('read_progress', { percent: m, content_title: pageTitle }); }
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('load', onScroll);

    // Time counts only while the page is on screen. Each time the reader leaves (another tab, another
    // app, closing the page) the seconds since the last report are sent, so they add up per page.
    var since = document.visibilityState === 'visible' ? Date.now() : 0;
    var report = function(){
      if (!since) return;
      var secs = Math.round((Date.now() - since) / 1000); since = 0;
      if (secs >= 1) send('read_time', { seconds: Math.min(secs, 3600), content_title: pageTitle });
    };
    document.addEventListener('visibilitychange', function(){
      if (document.visibilityState === 'hidden') report(); else since = Date.now();
    });
    addEventListener('pagehide', report);
  }
})();
