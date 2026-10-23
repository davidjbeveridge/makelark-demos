/* MakeLark Studio: a local, illustrative product interaction. No data is sent. */
(() => {
  'use strict';
  const host = document.getElementById('studio-demo');
  if (!host) return;

  const asset = (name) => window.MAKELARK_ASSETS?.[name] || `assets/${name}`;
  const icons = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    window: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/>',
    message: '<path d="M20 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z"/><path d="M7 8h9M7 12h6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    undo: '<path d="M3 9h11a6 6 0 0 1 0 12M3 9l5-5M3 9l5 5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    cursor: '<path d="m5 3 14 10-7 1-3 7-4-18Z"/>',
    sparkle: '<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z"/>',
  };
  const icon = (name, extra = '') => `<svg class="studio-icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
  const projects = {
    'real-estate': { name: 'Northline', sub: 'HOMES', image: 'real-estate.webp', alt: 'Illustrative modern home with stone walls, large windows and warm evening light.', kicker: 'A place for what comes next', heading: 'Find a place to<br>call your own.', body: 'Thoughtful spaces. Local knowledge. A home that feels like you.', cta: 'Explore homes', request: 'Add a private viewing request.', newHeading: 'Your next chapter<br>starts here.', newBody: 'Found a place you love? Take a closer look with a private viewing.', newCta: 'Request a viewing', change: 'Added a clear next step for interested buyers.', short: 'Private viewings', nav: ['Properties', 'Our approach'], detail: 'Explore this example home', detailBody: 'A modern home, a more personal introduction. In a finished website, this is where your visitor would explore the property or request a private viewing.' },
    automotive: { name: 'Northline', sub: 'AUTO', image: 'automotive.webp', alt: 'Illustrative automotive professional and customer beside a car in a modern service bay.', kicker: 'Expert care. Every mile.', heading: 'Keep your business<br>moving.', body: 'Practical advice and dependable care for the vehicles you rely on.', cta: 'Our services', request: 'Add fleet servicing with a quote request.', newHeading: 'Your fleet.<br>In good hands.', newBody: 'Keep your team on the road with servicing built around your business.', newCta: 'Request a fleet quote', change: 'Added fleet servicing and a direct quote request.', short: 'Fleet servicing', nav: ['Services', 'Our workshop'], detail: 'Explore this example service', detailBody: 'This is an illustrative automotive site. In a finished website, this is where customers would learn about the service and send a quote request.' },
    restaurant: { name: 'Gather', sub: 'KITCHEN', image: 'restaurant.webp', alt: 'Illustrative contemporary restaurant with warm lighting and guests enjoying dinner.', kicker: 'Good food. Better company.', heading: 'A seat at<br>our table.', body: 'Seasonal plates and familiar faces. Make an evening of it.', cta: 'Explore the menu', request: 'Add a private dining enquiry.', newHeading: 'Make it<br>an occasion.', newBody: 'Bring your people together over a menu made for sharing.', newCta: 'Plan a private dinner', change: 'Added private dining and an enquiry action.', short: 'Private dining', nav: ['Our food', 'Visit us'], detail: 'Explore this example restaurant', detailBody: 'This is an illustrative restaurant site. In a finished website, guests could browse the menu or enquire about a private dinner.' },
    accounting: { name: 'Ledger', sub: 'ADVISORY', image: 'accounting.webp', alt: 'Illustrative accounting professional reviewing documents at a bright office desk.', kicker: 'More clarity. Better decisions.', heading: 'Know where<br>you stand.', body: 'Straightforward accounting for the business you are building.', cta: 'Our services', request: 'Add a tax-planning consultation.', newHeading: 'Plan ahead.<br>Move forward.', newBody: 'Make room for a clearer conversation about your next financial year.', newCta: 'Request a consultation', change: 'Added tax planning and a consultation request.', short: 'Tax planning', nav: ['Services', 'Our approach'], detail: 'Explore this example practice', detailBody: 'This is an illustrative accounting site. In a finished website, prospective clients could explore services and request a consultation.' },
    law: { name: 'Fieldwork', sub: 'LAW', image: 'law.webp', alt: 'Illustrative legal professional listening to a client at a meeting table.', kicker: 'A clear way forward', heading: 'The right support.<br>The next step.', body: 'Practical guidance for the decisions that matter.', cta: 'How we help', request: 'Add an initial consultation request.', newHeading: 'Let’s talk about<br>what comes next.', newBody: 'Tell us what you need help with. Start with a conversation.', newCta: 'Request a consultation', change: 'Added a clear route to an initial consultation.', short: 'Initial consultations', nav: ['Expertise', 'Our people'], detail: 'Explore this example firm', detailBody: 'This is an illustrative law firm site. In a finished website, prospective clients could learn about the firm and request an initial consultation.' },
    manufacturing: { name: 'Form', sub: 'PRECISION', image: 'manufacturing.webp', alt: 'Illustrative operator at the controls of an enclosed CNC machine.', kicker: 'Ideas, made precisely', heading: 'Built around<br>your next part.', body: 'Clear capabilities. Considered processes. A practical manufacturing partner.', cta: 'Our capabilities', request: 'Add a custom machining quote request.', newHeading: 'From your drawing<br>to the next step.', newBody: 'Bring us your project. Start a conversation about what it takes to make it.', newCta: 'Discuss your project', change: 'Added custom machining and a project enquiry.', short: 'Custom machining', nav: ['Capabilities', 'Our process'], detail: 'Explore this example manufacturer', detailBody: 'This is an illustrative manufacturing site. In a finished website, buyers could review capabilities and send a project enquiry.' },
  };
  let projectId = 'real-estate';
  let stage = 'request';
  let version = 'original';
  let detailOpen = false;

  host.innerHTML = `
    <div class="studio-app">
      <div class="studio-toolbar">
        <div class="studio-app-name"><img src="${asset('lark.svg')}" alt="" width="25" height="24"><span>Studio</span><span class="studio-breadcrumb-divider">/</span><span id="studio-project-label">Northline</span></div>
        <span class="studio-example-label"><span aria-hidden="true"></span>Interactive example</span>
      </div>
      <div class="studio-workspace">
        <aside class="studio-rail" aria-label="Example workspace">
          <span class="studio-rail-item studio-rail-current" title="Website">${icon('window')}<span>Site</span></span>
          <button class="studio-rail-item" type="button" id="studio-feedback-jump" aria-label="Go to the example website change">${icon('message')}<span>Change</span></button>
          <span class="studio-rail-bottom" aria-hidden="true">N</span>
        </aside>
        <div class="studio-canvas">
          <div class="studio-preview-bar"><span>${icon('globe')}<span id="studio-preview-address">northline.example</span></span><span class="studio-preview-badge" id="studio-version-label">Original</span></div>
          <div class="studio-website" id="studio-website">
            <div class="studio-site-nav"><span class="studio-site-brand"><strong id="studio-site-name">NORTHLINE</strong><small id="studio-site-sub">HOMES</small></span><div class="studio-site-links" aria-hidden="true"><span id="studio-site-nav-1">Properties</span><span id="studio-site-nav-2">Our approach</span></div><span class="studio-site-menu" aria-hidden="true"><i></i><i></i></span></div>
            <div class="studio-site-hero">
              <img class="studio-site-photo" id="studio-site-photo" src="${asset('real-estate.webp')}" alt="Illustrative modern home with warm evening light." width="1536" height="1024" fetchpriority="high">
              <div class="studio-site-copy"><span class="studio-site-kicker" id="studio-site-kicker"></span><h3 id="studio-site-heading"></h3><p id="studio-site-body"></p><button type="button" class="studio-site-cta" id="studio-site-cta"><span></span>${icon('arrow')}</button></div>
              <button type="button" class="studio-annotation" id="studio-annotation" aria-label="See the suggested website change"><span>1</span><span class="studio-annotation-label">Make a change</span></button>
            </div>
            <div class="studio-site-bottom"><span id="studio-site-bottom-label">Thoughtful spaces. Personal guidance.</span><span aria-hidden="true">01 — 03</span></div>
          </div>
          <div class="studio-detail-panel" id="studio-detail-panel" hidden>
            <button class="studio-detail-close" id="studio-detail-close" type="button" aria-label="Close example site detail">${icon('close')}</button>
            <span class="studio-panel-eyebrow">Example website</span><h3 id="studio-detail-title"></h3><p id="studio-detail-body"></p><p class="studio-detail-note">This guided example does not collect or send enquiries.</p>
            <button class="studio-secondary-action" id="studio-detail-back" type="button">Back to Studio ${icon('arrow')}</button>
          </div>
        </div>
        <section class="studio-change-panel" aria-labelledby="studio-panel-title">
          <div class="studio-panel-topline"><span class="studio-panel-eyebrow">Your website, your direction</span><button type="button" class="studio-reset" id="studio-reset" aria-label="Reset the website example" title="Reset example">${icon('undo')}</button></div>
          <h3 id="studio-panel-title">What’s your next move?</h3>
          <p class="studio-panel-intro" id="studio-panel-intro">Start with a simple request. See what changes before you decide.</p>
          <div class="studio-request-card" id="studio-request-card"><div class="studio-request-label"><span class="studio-person-avatar" aria-hidden="true">You</span><span>A simple request</span></div><p id="studio-request-text"></p></div>
          <div id="studio-review" class="studio-review" hidden><div class="studio-review-heading">${icon('check')}<span>Ready for your review</span></div><p id="studio-review-summary"></p><div class="studio-version-toggle" role="group" aria-label="Compare website versions"><button type="button" id="studio-original" aria-pressed="false">Original</button><button type="button" id="studio-updated" aria-pressed="true">Updated</button></div></div>
          <div id="studio-approved" class="studio-approved" hidden><span class="studio-approved-check">${icon('check')}</span><h4>Example approved.</h4><p>That’s the idea: you direct the change and review the result.</p></div>
          <button type="button" class="studio-main-action" id="studio-main-action"><span>Preview the change</span>${icon('arrow')}</button>
          <p class="studio-action-note" id="studio-action-note">A prepared example. Try a simple change.</p>
          <div class="studio-step-indicator" aria-label="Example progress"><span class="studio-step studio-step-active" id="studio-step-1"><i>1</i>Describe</span><span class="studio-step-line" aria-hidden="true"></span><span class="studio-step" id="studio-step-2"><i>2</i>Review</span><span class="studio-step-line" aria-hidden="true"></span><span class="studio-step" id="studio-step-3"><i>3</i>Approve</span></div>
        </section>
      </div>
      <div class="studio-app-footer"><span>${icon('cursor')}Explore the sample website</span><span>Website creation, with you in control.</span></div>
      <div class="studio-sr-only" id="studio-live" role="status" aria-live="polite" aria-atomic="true"></div>
    </div>`;

  const $ = (id) => host.querySelector(`#${id}`);
  function text(id, value) { $(id).textContent = value; }
  function announce(message) { text('studio-live', message); }
  function update() {
    const p = projects[projectId];
    const changed = stage !== 'request' && version === 'updated';
    text('studio-project-label', p.name);
    text('studio-preview-address', `${p.name.toLowerCase()}.example`);
    text('studio-site-name', p.name.toUpperCase());
    text('studio-site-sub', p.sub);
    text('studio-site-nav-1', p.nav[0]);
    text('studio-site-nav-2', p.nav[1]);
    const img = $('studio-site-photo');
    const src = asset(p.image);
    if (img.getAttribute('src') !== src) img.src = src;
    img.alt = p.alt;
    text('studio-site-kicker', p.kicker);
    // Only authored strings from the closed project map enter this markup.
    $('studio-site-heading').innerHTML = changed ? p.newHeading : p.heading;
    text('studio-site-body', changed ? p.newBody : p.body);
    $('studio-site-cta').querySelector('span').textContent = changed ? p.newCta : p.cta;
    $('studio-site-cta').classList.toggle('studio-site-cta-changed', changed);
    text('studio-site-bottom-label', changed ? `${p.short} · An easier next step` : 'Your business. A clear first impression.');
    text('studio-request-text', p.request);
    text('studio-review-summary', p.change);
    text('studio-version-label', stage === 'approved' ? 'Approved example' : changed ? 'Updated preview' : 'Original');
    $('studio-version-label').classList.toggle('studio-preview-badge-changed', changed);
    $('studio-review').hidden = stage !== 'review';
    $('studio-approved').hidden = stage !== 'approved';
    $('studio-request-card').hidden = stage === 'approved';
    $('studio-annotation').hidden = stage !== 'request';
    $('studio-original').setAttribute('aria-pressed', String(version === 'original'));
    $('studio-updated').setAttribute('aria-pressed', String(version === 'updated'));
    text('studio-panel-title', stage === 'approved' ? 'You make the call.' : stage === 'review' ? 'See the difference.' : 'What’s your next move?');
    text('studio-panel-intro', stage === 'approved' ? 'A website that can move with your business.' : stage === 'review' ? 'Compare the change. Keep what works.' : 'Start with a simple request. See what changes before you decide.');
    $('studio-main-action').querySelector('span').textContent = stage === 'request' ? 'Preview the change' : stage === 'review' ? (version === 'original' ? 'View updated version' : 'Approve example') : 'Try it again';
    text('studio-action-note', stage === 'approved' ? 'Nothing was published. This stays in the demo.' : stage === 'review' ? 'Your approval is part of this example only.' : 'A prepared example. Try a simple change.');
    ['request', 'review', 'approved'].forEach((s, i) => {
      const step = $(`studio-step-${i + 1}`);
      step.classList.toggle('studio-step-active', s === stage);
      if (s === stage) step.setAttribute('aria-current', 'step'); else step.removeAttribute('aria-current');
    });
    host.dataset.stage = stage;
    host.dataset.industry = projectId;
    $('studio-website').classList.toggle('studio-website-updated', changed);
  }
  function reset(shouldAnnounce = true) {
    stage = 'request'; version = 'original'; closeDetail(false); update();
    if (shouldAnnounce) announce('Example reset. Preview the suggested change to start again.');
  }
  function pointToChange() {
    closeDetail(false);
    $('studio-main-action').focus({ preventScroll: true });
    if (window.matchMedia('(max-width: 720px)').matches) $('studio-panel-title').scrollIntoView({ block: 'nearest', behavior: 'auto' });
    const panel = host.querySelector('.studio-change-panel');
    panel.classList.remove('studio-panel-pointed');
    void panel.offsetWidth;
    panel.classList.add('studio-panel-pointed');
  }
  function closeDetail(restoreFocus = true) {
    $('studio-detail-panel').hidden = true;
    $('studio-website').inert = false;
    detailOpen = false;
    if (restoreFocus) $('studio-site-cta').focus({ preventScroll: true });
  }
  $('studio-main-action').addEventListener('click', () => {
    if (stage === 'request') {
      stage = 'review'; version = 'updated'; update();
      announce('Updated example ready. The headline and customer action have changed. Compare the original and updated versions, then approve the example.');
    } else if (stage === 'review' && version === 'original') {
      version = 'updated'; update();
      announce('Showing the updated website. Review it before approving the example.');
    } else if (stage === 'review') {
      stage = 'approved'; version = 'updated'; update();
      announce('Example approved. Nothing was published.');
    } else reset();
  });
  $('studio-original').addEventListener('click', () => { version = 'original'; update(); announce('Showing the original website.'); });
  $('studio-updated').addEventListener('click', () => { version = 'updated'; update(); announce('Showing the updated website.'); });
  $('studio-reset').addEventListener('click', () => reset());
  $('studio-feedback-jump').addEventListener('click', pointToChange);
  $('studio-annotation').addEventListener('click', pointToChange);
  $('studio-site-cta').addEventListener('click', () => {
    const p = projects[projectId];
    text('studio-detail-title', stage === 'request' ? p.detail : p.newCta);
    text('studio-detail-body', p.detailBody);
    $('studio-detail-panel').hidden = false;
    $('studio-website').inert = true;
    detailOpen = true;
    $('studio-detail-close').focus({ preventScroll: true });
  });
  $('studio-detail-close').addEventListener('click', () => closeDetail());
  $('studio-detail-back').addEventListener('click', () => closeDetail());
  host.addEventListener('keydown', (event) => { if (event.key === 'Escape' && detailOpen) { event.preventDefault(); closeDetail(); } });
  window.MakeLarkDemo = Object.freeze({
    setIndustry(id) {
      if (!Object.hasOwn(projects, id)) return false;
      projectId = id; reset(false); announce(`${projects[id].name} ${projects[id].sub.toLowerCase()} example selected.`);
      host.dispatchEvent(new CustomEvent('makelark:industry-change', { bubbles: true, detail: { industry: id } }));
      return true;
    },
    reset: () => reset(),
    getState: () => ({ industry: projectId, stage, version }),
  });
  update();
})();
