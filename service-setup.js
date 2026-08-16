const SERVICE_CATEGORIES = [
  { id: 'cut-style', name: 'Haircut & Styling', icon: '✂', services: [
    { name: 'Haircut & style', duration: 60, price: 1800 }, { name: 'Blow-dry', duration: 45, price: 1200 }, { name: 'Hair wash & styling', duration: 45, price: 1000 }
  ] },
  { id: 'colour', name: 'Hair Colour', icon: '✦', services: [
    { name: 'Root touch-up', duration: 90, price: 2500 }, { name: 'Global hair colour', duration: 120, price: 4200, length: true }, { name: 'Balayage', duration: 180, price: 6800, length: true }, { name: 'Highlights', duration: 150, price: 5500, length: true }
  ] },
  { id: 'care-spa', name: 'Hair Care & Spa', icon: '◌', services: [
    { name: 'Hair treatment', duration: 75, price: 2500, length: true }, { name: 'Hair spa', duration: 75, price: 2200, length: true }, { name: 'Keratin treatment', duration: 180, price: 7500, length: true }
  ] },
  { id: 'skin', name: 'Skin & Facial', icon: '◐', services: [
    { name: 'Signature facial', duration: 90, price: 3200 }, { name: 'Clean-up', duration: 60, price: 1600 }, { name: 'De-tan', duration: 45, price: 1200 }
  ] },
  { id: 'nails', name: 'Nails', icon: '◈', services: [
    { name: 'Gel manicure', duration: 60, price: 1600 }, { name: 'Gel pedicure', duration: 75, price: 2000 }, { name: 'Nail extensions', duration: 120, price: 3000 }
  ] },
  { id: 'makeup', name: 'Makeup', icon: '✧', services: [
    { name: 'Party makeup', duration: 75, price: 3500 }, { name: 'Bridal makeup', duration: 120, price: 8500 }, { name: 'Saree draping', duration: 30, price: 900 }
  ] }
];

const serviceCategory = name => SERVICE_CATEGORIES.find(category => category.name === name);
const servicePriceLabel = service => service.pricingType === 'length' ? `From ${money(service.lengthPrices?.short || service.price)}` : money(service.price);
const lengthPricing = price => ({ short: Math.round(price * 0.8), medium: price, long: Math.round(price * 1.25) });

function services() {
  const entries = state.services;
  const grouped = [...new Set(entries.map(item => item.category || 'Other services'))].sort((a, b) => a.localeCompare(b));
  const setupMessage = state.serviceSetupComplete ? 'Add another category or adjust a service whenever you need.' : 'Start with the treatments you offer. Suggested names, timings, and prices are ready for you.';
  layout(`${pageHead('SERVICE MENU', 'Services', 'A simple service menu your team can keep up to date.', `<button class="btn secondary" id="open-service-wizard">Guided setup</button><button class="btn primary" id="open-custom-service">＋ Add custom service</button>`)}<section class="service-setup-banner"><span class="service-setup-icon">✦</span><div><strong>${state.serviceSetupComplete ? 'Keep your menu current' : 'Set up your service menu in minutes'}</strong><p>${setupMessage}</p></div><button class="text-link" id="open-service-wizard-banner">${state.serviceSetupComplete ? 'Add ready-made services →' : 'Start guided setup →'}</button></section><div class="service-catalogue">${grouped.map(category => serviceCategorySection(category, entries.filter(item => (item.category || 'Other services') === category))).join('') || '<div class="empty">Start with Guided setup to add your services.</div>'}</div>`);
  document.getElementById('open-service-wizard')?.addEventListener('click', () => serviceSetupWizard());
  document.getElementById('open-service-wizard-banner')?.addEventListener('click', () => serviceSetupWizard());
  document.getElementById('open-custom-service')?.addEventListener('click', () => serviceModal());
}

function serviceCategorySection(category, entries) {
  const presetCategory = serviceCategory(category);
  return `<section class="service-category-section"><div class="service-category-title"><span class="service-icon">${presetCategory?.icon || '✦'}</span><div><h2>${category}</h2><p>${entries.length} service${entries.length === 1 ? '' : 's'}</p></div></div><div class="service-grid">${entries.map(service => `<article class="service-card service-menu-card"><h3>${service.name}</h3><p>${service.duration} minutes${service.pricingType === 'length' ? ' · by hair length' : ''}</p><footer><span>${servicePriceLabel(service)}</span><button class="text-link" data-service="${service.id}">Edit price</button></footer></article>`).join('')}</div></section>`;
}

function serviceSetupWizard(selectedIds = ['cut-style', 'colour', 'care-spa']) {
  modal('Set up your services', 'Step 1 of 2 · Choose the areas your salon offers. You can add or remove services later.', `<div class="service-category-picker">${SERVICE_CATEGORIES.map(category => `<label class="service-category-choice"><input type="checkbox" name="service-category" value="${category.id}" ${selectedIds.includes(category.id) ? 'checked' : ''}><span class="service-icon">${category.icon}</span><span><strong>${category.name}</strong><small>${category.services.slice(0, 2).map(service => service.name).join(' · ')}</small></span></label>`).join('')}</div>`, 'Next: choose services');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const selected = [...new FormData(event.target).getAll('service-category')];
    if (!selected.length) return alertToast('Choose at least one service category.');
    serviceSetupServicesStep(selected);
  };
}

function serviceSetupServicesStep(selectedIds) {
  const choices = SERVICE_CATEGORIES.filter(category => selectedIds.includes(category.id)).flatMap(category => category.services.map(service => ({ ...service, category })));
  modal('Choose services', 'Step 2 of 2 · We have pre-selected popular services and sensible starting prices. Untick anything you do not offer.', `<div class="wizard-service-list">${choices.map((choice, index) => wizardServiceRow(choice, index)).join('')}</div>`, 'Add selected services');
  const form = document.getElementById('modal-form');
  form.querySelectorAll('[data-wizard-pricing]').forEach(select => select.addEventListener('change', () => {
    const row = select.closest('[data-wizard-service]');
    row.querySelector('.wizard-flat-price').hidden = select.value === 'length';
    row.querySelector('.wizard-length-prices').hidden = select.value !== 'length';
  }));
  form.onsubmit = event => {
    event.preventDefault();
    let added = 0;
    form.querySelectorAll('[data-wizard-service]').forEach((row, index) => {
      if (!row.querySelector('input[type="checkbox"]').checked) return;
      const choice = choices[index];
      if (state.services.some(service => service.category === choice.category.name && service.name.toLowerCase() === choice.name.toLowerCase())) return;
      const pricingType = row.querySelector('[data-wizard-pricing]').value;
      const price = Number(row.querySelector('[name="price"]').value);
      const lengthPrices = pricingType === 'length' ? {
        short: Number(row.querySelector('[name="short"]').value), medium: Number(row.querySelector('[name="medium"]').value), long: Number(row.querySelector('[name="long"]').value)
      } : null;
      state.services.push({ id: nextId('services'), name: choice.name, category: choice.category.name, duration: choice.duration, price: pricingType === 'length' ? lengthPrices.medium : price, pricingType, lengthPrices, icon: choice.category.icon });
      added += 1;
    });
    state.serviceSetupComplete = true;
    persist(); closeModal(); render(); alertToast(added ? `${added} services added to your menu.` : 'Those services are already on your menu.');
  };
}

function wizardServiceRow(choice, index) {
  const prices = lengthPricing(choice.price);
  return `<div class="wizard-service" data-wizard-service><label class="wizard-service-main"><input type="checkbox" checked><span><strong>${choice.name}</strong><small>${choice.category.name} · ${choice.duration} min</small></span></label><div class="wizard-price-controls">${choice.length ? `<select data-wizard-pricing><option value="flat">One price</option><option value="length">By hair length</option></select>` : '<input data-wizard-pricing value="flat" hidden>'}<label class="wizard-flat-price">₹ <input name="price" type="number" min="0" value="${choice.price}"></label><div class="wizard-length-prices" hidden><label>Short<input name="short" type="number" min="0" value="${prices.short}"></label><label>Medium<input name="medium" type="number" min="0" value="${prices.medium}"></label><label>Long<input name="long" type="number" min="0" value="${prices.long}"></label></div></div></div>`;
}

function serviceModal(id = null) {
  const data = id ? service(id) : null;
  if (data) return editServicePricing(data);
  const defaultCategory = SERVICE_CATEGORIES[0];
  modal('Add custom service', 'Choose a ready-made service, then only adjust the price if you need to.', `<div class="form-row"><label>Category<select id="new-service-category">${SERVICE_CATEGORIES.map(category => `<option value="${category.id}">${category.name}</option>`).join('')}</select></label><label>Service<select id="new-service-preset"></select></label></div><label id="new-service-name-wrap" hidden>Custom service name<input name="name" placeholder="e.g. Fringe trim"></label><div class="form-row"><label>Duration (minutes)<input name="duration" type="number" min="15" step="15" value="${defaultCategory.services[0].duration}"></label><label>Price (₹)<input name="price" type="number" min="0" value="${defaultCategory.services[0].price}"></label></div>`, 'Add service');
  const categorySelect = document.getElementById('new-service-category');
  const presetSelect = document.getElementById('new-service-preset');
  const populatePresets = () => {
    const category = SERVICE_CATEGORIES.find(item => item.id === categorySelect.value);
    presetSelect.innerHTML = `${category.services.map((item, index) => `<option value="${index}">${item.name}</option>`).join('')}<option value="custom">Custom service</option>`;
    applyPreset();
  };
  const applyPreset = () => {
    const category = SERVICE_CATEGORIES.find(item => item.id === categorySelect.value);
    const preset = category.services[Number(presetSelect.value)];
    const custom = presetSelect.value === 'custom';
    document.getElementById('new-service-name-wrap').hidden = !custom;
    if (!custom) { document.querySelector('[name="duration"]').value = preset.duration; document.querySelector('[name="price"]').value = preset.price; }
  };
  categorySelect.addEventListener('change', populatePresets); presetSelect.addEventListener('change', applyPreset); populatePresets();
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target); const category = SERVICE_CATEGORIES.find(item => item.id === categorySelect.value); const preset = category.services[Number(presetSelect.value)];
    const name = presetSelect.value === 'custom' ? form.get('name').trim() : preset.name;
    if (!name) return;
    state.services.push({ id: nextId('services'), name, category: category.name, duration: Number(form.get('duration')), price: Number(form.get('price')), pricingType: 'flat', icon: category.icon });
    persist(); closeModal(); render(); alertToast('Service added.');
  };
}

function editServicePricing(data) {
  const isLength = data.pricingType === 'length'; const prices = data.lengthPrices || lengthPricing(data.price);
  modal(`Update ${data.name}`, 'Change the price only. Use pricing by hair length when the service needs it.', `<div class="service-edit-summary"><strong>${data.category}</strong><span>${data.duration} minutes</span></div><label>Pricing style<select id="service-pricing-style"><option value="flat" ${!isLength ? 'selected' : ''}>One price</option><option value="length" ${isLength ? 'selected' : ''}>By hair length</option></select></label><div id="flat-service-price" ${isLength ? 'hidden' : ''}><label>Price (₹)<input name="price" type="number" min="0" value="${data.price}"></label></div><div id="length-service-prices" class="length-price-grid" ${isLength ? '' : 'hidden'}><label>Short hair<input name="short" type="number" min="0" value="${prices.short}"></label><label>Medium hair<input name="medium" type="number" min="0" value="${prices.medium}"></label><label>Long hair<input name="long" type="number" min="0" value="${prices.long}"></label></div>`, 'Save price');
  const typeSelect = document.getElementById('service-pricing-style');
  typeSelect.addEventListener('change', () => { document.getElementById('flat-service-price').hidden = typeSelect.value === 'length'; document.getElementById('length-service-prices').hidden = typeSelect.value !== 'length'; });
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault(); const form = new FormData(event.target); data.pricingType = typeSelect.value;
    if (data.pricingType === 'length') { data.lengthPrices = { short: Number(form.get('short')), medium: Number(form.get('medium')), long: Number(form.get('long')) }; data.price = data.lengthPrices.medium; }
    else { data.price = Number(form.get('price')); delete data.lengthPrices; }
    persist(); closeModal(); render(); alertToast('Service price updated.');
  };
}
