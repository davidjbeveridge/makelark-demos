(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const closeMenu = () => { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    mobileNav.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  mobileNav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
  window.matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);

  const industries = {
    automotive: { category: 'FOR AUTOMOTIVE BUSINESSES', headline: 'Great work deserves\nto be seen.', description: 'Make your services easy to understand. Show the care behind the work. Give the right customer a clear way to get in touch.', request: '“We’re adding fleet servicing. Give it a page and a way to request a quote.”', alt: 'An automotive professional talking with a customer in a modern workshop' },
    accounting: { category: 'FOR ACCOUNTING PRACTICES', headline: 'Make complex work\nfeel approachable.', description: 'Explain who you help and how. Turn your expertise into clear services, useful answers, and a straightforward first conversation.', request: '“We’re offering bookkeeping for small businesses. Help owners see how it works.”', alt: 'An accounting professional working with a notebook and laptop in a bright office' },
    'real-estate': { category: 'FOR REAL ESTATE BUSINESSES', headline: 'Turn a first look\ninto a conversation.', description: 'Let the property make an impression. Share the details that matter and give interested buyers a clear next step.', request: '“Add a private viewing request so buyers can tell us when they’d like to visit.”', alt: 'A contemporary home with large illuminated windows at dusk' },
    law: { category: 'FOR LEGAL PRACTICES', headline: 'Build confidence\nbefore the first call.', description: 'Make your areas of practice clear. Help people understand the process, meet your team, and feel ready to get in touch.', request: '“Make our estate planning service easier to understand and add a consultation request.”', alt: 'A legal professional listening to a client in a modern meeting room' },
    manufacturing: { category: 'FOR MANUFACTURERS', headline: 'Show what you\ncan make possible.', description: 'Give your capabilities room to speak. Show your process and help prospective customers bring you a useful project inquiry.', request: '“We’ve added CNC capacity. Show the new capability and how to request a quote.”', alt: 'An operator checking the controls of an enclosed CNC machine' },
    restaurant: { category: 'FOR RESTAURANTS', headline: 'Make the next visit\neasy to imagine.', description: 'Bring the atmosphere online. Keep menus, hours, and occasions clear so guests can plan their next visit.', request: '“Our winter menu is ready. Update the menu and feature our private dining room.”', alt: 'Evening service in a contemporary restaurant with warm lighting' }
  };
  const tabs = Array.from(document.querySelectorAll('.business-tabs [role="tab"][data-industry]'));
  const panel = document.querySelector('#business-panel');
  const setIndustry = (tab) => {
    const key = tab.dataset.industry; const item = industries[key];
    tabs.forEach((button) => { const selected = button === tab; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tab.id);
    document.querySelector('#business-image').src = window.MAKELARK_ASSETS?.[`${key}.webp`] || `assets/${key}.webp`;
    document.querySelector('#business-image').alt = item.alt;
    document.querySelector('#business-category').textContent = item.category;
    const headline = document.querySelector('#business-headline');
    headline.replaceChildren(...item.headline.split('\n').flatMap((line, index) => index ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    document.querySelector('#business-description').textContent = item.description;
    document.querySelector('#business-request').textContent = item.request;
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setIndustry(tab));
    tab.addEventListener('keydown', (event) => {
      let target;
      if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') target = tabs[(index + tabs.length - 1) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); setIndustry(target); target.focus(); }
    });
  });

  document.querySelector('#try-business-example').addEventListener('click', (event) => {
    if (!window.MakeLarkDemo) return;
    event.preventDefault();
    const selected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');
    window.MakeLarkDemo.setIndustry(selected.dataset.industry);
    document.querySelector('#studio-main-action').focus({ preventScroll: true });
    document.querySelector('#studio').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });

  const form = document.querySelector('#access-form');
  const ready = document.querySelector('#request-ready');
  let requestText = '';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    document.querySelector('#request-copy-fallback')?.remove();
    const data = new FormData(form);
    const name = String(data.get('name')).trim(); const email = String(data.get('email')).trim();
    if (!name) { const input = form.querySelector('#contact-name'); input.setCustomValidity('Please enter your name.'); input.reportValidity(); input.focus(); return; }
    requestText = `Hi MakeLark,\n\nI’d like to hear about early access to MakeLark Studio.\n\nName: ${name}\nEmail: ${email}\nBusiness or website: ${String(data.get('business')).trim() || 'Not provided'}\nWhat I’d like to improve: ${String(data.get('goal')).trim() || 'Let’s discuss it.'}\n\nThanks,\n${name}`;
    document.querySelector('#send-request').href = `mailto:admin@makelark.com?subject=${encodeURIComponent('MakeLark Studio early access')}&body=${encodeURIComponent(requestText)}`;
    document.querySelector('#copy-status').textContent = '';
    ready.hidden = false; ready.focus({ preventScroll: true });
    ready.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });
  form.addEventListener('input', (event) => { if (event.target.id === 'contact-name') event.target.setCustomValidity(''); if (!ready.hidden) ready.hidden = true; document.querySelector('#request-copy-fallback')?.remove(); document.querySelector('#copy-status').textContent = ''; });
  form.querySelector('button[type="submit"]').disabled = false;
  document.querySelector('#copy-request').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(`To: admin@makelark.com\nSubject: MakeLark Studio early access\n\n${requestText}`);
      status.textContent = 'Copied. Paste it into an email to admin@makelark.com.';
    } catch {
      let fallback = document.querySelector('#request-copy-fallback');
      if (!fallback) { fallback = document.createElement('textarea'); fallback.id = 'request-copy-fallback'; fallback.setAttribute('aria-label', 'Request text to copy manually'); fallback.readOnly = true; fallback.rows = 7; ready.append(fallback); }
      fallback.value = `To: admin@makelark.com\nSubject: MakeLark Studio early access\n\n${requestText}`; fallback.focus(); fallback.select();
      status.textContent = 'Automatic copying is unavailable. Copy the selected request below.';
    }
  });
})();
