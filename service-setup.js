const SERVICE_CATEGORIES = [
  { id: 'hair', name: 'Hair', icon: '✂', groups: [{ name: 'Haircuts & Styling', services: [{ name: 'Haircut & style', duration: 60, price: 1800 }, { name: 'Blow-dry', duration: 45, price: 1200 }, { name: 'Hair wash & styling', duration: 45, price: 1000 }] }, { name: 'Hair Colour', services: [{ name: 'Root touch-up', duration: 90, price: 2500 }, { name: 'Global hair colour', duration: 120, price: 4200, length: true }, { name: 'Balayage', duration: 180, price: 6800, length: true }, { name: 'Highlights', duration: 150, price: 5500, length: true }] }, { name: 'Hair Treatments', services: [{ name: 'Hair treatment', duration: 75, price: 2500, length: true }, { name: 'Hair spa', duration: 75, price: 2200, length: true }, { name: 'Keratin treatment', duration: 180, price: 7500, length: true }] }] },
  { id: 'skin', name: 'Skin', icon: '◐', groups: [{ name: 'Facials & Clean-up', services: [{ name: 'Signature facial', duration: 90, price: 3200 }, { name: 'Clean-up', duration: 60, price: 1600 }, { name: 'De-tan', duration: 45, price: 1200 }] }, { name: 'Skin Treatments', services: [{ name: 'Hydra facial', duration: 75, price: 4500 }, { name: 'Chemical peel', duration: 60, price: 3500 }, { name: 'Skin consultation', duration: 30, price: 800 }] }] },
  { id: 'makeup', name: 'Makeup', icon: '✧', groups: [{ name: 'Occasion Makeup', services: [{ name: 'Party makeup', duration: 75, price: 3500 }, { name: 'Bridal makeup', duration: 120, price: 8500 }, { name: 'Engagement makeup', duration: 90, price: 5500 }] }, { name: 'Makeup Add-ons', services: [{ name: 'Saree draping', duration: 30, price: 900 }, { name: 'False lashes', duration: 15, price: 500 }, { name: 'Hairstyling for makeup', duration: 45, price: 1800 }] }] },
  { id: 'nails', name: 'Nails', icon: '◈', groups: [{ name: 'Manicure', services: [{ name: 'Gel manicure', duration: 60, price: 1600 }, { name: 'Classic manicure', duration: 45, price: 900 }] }, { name: 'Pedicure', services: [{ name: 'Gel pedicure', duration: 75, price: 2000 }, { name: 'Classic pedicure', duration: 60, price: 1200 }] }, { name: 'Nail Enhancements', services: [{ name: 'Nail extensions', duration: 120, price: 3000 }, { name: 'Nail art', duration: 30, price: 700 }] }] },
  { id: 'spa', name: 'Spa', icon: '◌', groups: [{ name: 'Body Spa', services: [{ name: 'Swedish massage', duration: 60, price: 3000 }, { name: 'Deep tissue massage', duration: 75, price: 4200 }, { name: 'Body polish', duration: 60, price: 2800 }] }, { name: 'Wellness', services: [{ name: 'Head massage', duration: 30, price: 900 }, { name: 'Foot reflexology', duration: 45, price: 1800 }] }] },
  { id: 'others', name: 'Others', icon: '✦', groups: [{ name: 'Grooming & Add-ons', services: [{ name: 'Eyebrow shaping', duration: 15, price: 300 }, { name: 'Threading', duration: 20, price: 400 }, { name: 'Consultation', duration: 20, price: 500 }] }] }
];
SERVICE_CATEGORIES.forEach(category => { category.services = category.groups.flatMap(group => group.services.map(service => ({ ...service, subgroup: group.name }))); });

const serviceCategory = name => SERVICE_CATEGORIES.find(category => category.name === name || category.groups.some(group => group.name === name));
const servicePriceLabel = service => service.pricingType === 'length' ? `From ${money(service.lengthPrices?.shoulder ?? service.lengthPrices?.short ?? service.price)}` : money(service.price);
const lengthPricing = price => ({ shoulder: Math.round(price * 0.8), belowWaist: price, beyondWaist: Math.round(price * 1.2), long: Math.round(price * 1.4), short: Math.round(price * 0.8), medium: price });

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

function serviceCatalogChoices() {
  return SERVICE_CATEGORIES.flatMap(category => category.groups.flatMap(group => group.services.map(service => ({ ...service, category, subgroup: group.name }))));
}

function serviceSetupWizard() {
  const choices = serviceCatalogChoices();
  modal('Build your service menu', 'Select the services you offer and set prices as you go. Use the template if your catalog is already in a spreadsheet.', `<div class="catalog-setup-tools"><span>Start with the popular catalog or import your own.</span><button type="button" class="text-link" id="catalog-download-template">Download Excel template</button><button type="button" class="text-link" id="catalog-upload-file">Upload catalog</button></div><input id="catalog-upload-input" type="file" accept=".xlsx,.csv" hidden><div class="catalog-accordion">${SERVICE_CATEGORIES.map((category, categoryIndex) => `<section class="catalog-category"><button type="button" class="catalog-category-toggle" data-catalog-toggle="${categoryIndex}" aria-expanded="${categoryIndex === 0}"><span class="service-icon">${category.icon}</span><span><strong>${category.name}</strong><small>${category.groups.length} subcategories</small></span><b>⌄</b></button><div class="catalog-category-body" id="catalog-category-${categoryIndex}" ${categoryIndex === 0 ? '' : 'hidden'}>${category.groups.map(group => `<section class="catalog-subcategory"><h3>${group.name}</h3>${choices.map((choice, index) => choice.category.id === category.id && choice.subgroup === group.name ? catalogServiceRow(choice, index) : '').join('')}</section>`).join('')}<div class="catalog-custom-slot" id="catalog-custom-${category.id}"></div><button type="button" class="catalog-add-custom" data-catalog-custom="${category.id}">＋ Add custom service in ${category.name}</button></div></section>`).join('')}</div>`, 'Add selected services');
  const form = document.getElementById('modal-form');
  form.classList.add('catalog-setup-modal');
  const updateRow = row => {
    const enabled = row.querySelector('[data-catalog-enabled]').checked;
    const length = row.querySelector('[data-catalog-length]');
    const price = row.querySelector('[data-catalog-price]');
    const lengthGrid = row.querySelector('.catalog-length-grid');
    row.classList.toggle('is-selected', enabled);
    length.disabled = !enabled;
    price.disabled = !enabled || length.checked;
    lengthGrid.hidden = !enabled || !length.checked;
    lengthGrid.querySelectorAll('input').forEach(input => { input.disabled = !enabled || !length.checked; });
  };
  form.querySelectorAll('[data-catalog-service-row]').forEach(row => { row.querySelector('[data-catalog-enabled]').addEventListener('change', () => updateRow(row)); row.querySelector('[data-catalog-length]').addEventListener('change', () => updateRow(row)); updateRow(row); });
  form.querySelectorAll('[data-catalog-toggle]').forEach(toggle => toggle.addEventListener('click', () => { const body = document.getElementById(`catalog-category-${toggle.dataset.catalogToggle}`); body.hidden = !body.hidden; toggle.setAttribute('aria-expanded', String(!body.hidden)); }));
  form.querySelectorAll('[data-catalog-custom]').forEach(button => button.addEventListener('click', () => { const category = SERVICE_CATEGORIES.find(item => item.id === button.dataset.catalogCustom); document.getElementById(`catalog-custom-${category.id}`).insertAdjacentHTML('beforeend', catalogCustomRow(category)); }));
  form.addEventListener('change', event => { if (!event.target.matches('[data-custom-category]')) return; const row = event.target.closest('[data-catalog-custom-row]'); row.querySelector('[data-custom-new-category]').hidden = event.target.value !== '__new__'; });
  document.getElementById('catalog-download-template').onclick = downloadServiceTemplate;
  document.getElementById('catalog-upload-file').onclick = () => document.getElementById('catalog-upload-input').click();
  document.getElementById('catalog-upload-input').onchange = event => importServiceCatalog(event.target.files?.[0], true);
  form.onsubmit = event => {
    event.preventDefault(); let added = 0;
    form.querySelectorAll('[data-catalog-service-row]').forEach(row => {
      if (!row.querySelector('[data-catalog-enabled]').checked) return;
      const choice = choices[Number(row.dataset.catalogChoice)]; const byLength = row.querySelector('[data-catalog-length]').checked;
      const lengthPrices = byLength ? { shoulder: Number(row.querySelector('[data-length-shoulder]').value), belowWaist: Number(row.querySelector('[data-length-below-waist]').value), beyondWaist: Number(row.querySelector('[data-length-beyond-waist]').value), long: Number(row.querySelector('[data-length-long]').value) } : null;
      const price = byLength ? lengthPrices.belowWaist : Number(row.querySelector('[data-catalog-price]').value);
      if (!price || state.services.some(service => service.category === choice.subgroup && service.name.toLowerCase() === choice.name.toLowerCase())) return;
      state.services.push({ id: nextId('services'), name: choice.name, category: choice.subgroup, duration: choice.duration, price, pricingType: byLength ? 'length' : 'flat', lengthPrices, icon: choice.category.icon, availableBranches: state.branches.map(branch => branch.id), onlineBookable: true }); added += 1;
    });
    form.querySelectorAll('[data-catalog-custom-row]').forEach(row => {
      const name = row.querySelector('[data-custom-name]').value.trim(); const selectedCategory = row.querySelector('[data-custom-category]').value; const category = selectedCategory === '__new__' ? row.querySelector('[data-custom-new-category]').value.trim() : selectedCategory; const price = Number(row.querySelector('[data-custom-price]').value);
      if (!name || !category || !price || state.services.some(service => service.category === category && service.name.toLowerCase() === name.toLowerCase())) return;
      const owner = SERVICE_CATEGORIES.find(item => item.id === row.dataset.catalogCustomOwner); state.services.push({ id: nextId('services'), name, category, duration: Number(row.querySelector('[data-custom-duration]').value) || 60, price, pricingType: 'flat', icon: owner?.icon || '✦', availableBranches: state.branches.map(branch => branch.id), onlineBookable: true }); added += 1;
    });
    if (!added) return alertToast('Select a service and add its price, or add a custom service.');
    state.serviceSetupComplete = true; persist(); closeModal(); render(); alertToast(`${added} services added to your menu.`);
  };
}

function catalogServiceRow(choice, index) {
  const prices = lengthPricing(choice.price);
  return `<article class="catalog-service-row" data-catalog-service-row data-catalog-choice="${index}"><label class="catalog-service-select"><input type="checkbox" data-catalog-enabled><span><strong>${choice.name}</strong><small>${choice.duration} min</small></span></label><div class="catalog-service-pricing"><label>Price (INR)<input data-catalog-price type="number" min="0" value="${choice.price}"></label>${choice.length ? `<label class="catalog-length-toggle"><input type="checkbox" data-catalog-length> Price by length</label><div class="catalog-length-grid" hidden><label>Shoulder<input data-length-shoulder type="number" min="0" value="${prices.shoulder}"></label><label>Below waist<input data-length-below-waist type="number" min="0" value="${prices.belowWaist}"></label><label>Beyond waist<input data-length-beyond-waist type="number" min="0" value="${prices.beyondWaist}"></label><label>Long<input data-length-long type="number" min="0" value="${prices.long}"></label></div>` : '<input data-catalog-length type="checkbox" hidden>'}</div></article>`;
}

function catalogCustomRow(category) {
  const subcategories = category.groups.map(group => `<option>${group.name}</option>`).join('');
  return `<article class="catalog-custom-row" data-catalog-custom-row data-catalog-custom-owner="${category.id}"><input data-custom-name placeholder="Custom service name"><select data-custom-category>${subcategories}<option value="__new__">Create new category</option></select><input data-custom-new-category hidden placeholder="New category name"><input data-custom-duration type="number" min="15" step="15" value="60" placeholder="Minutes"><input data-custom-price type="number" min="0" placeholder="Price (INR)"></article>`;
}

function downloadServiceTemplate() {
  const rows = [{ Category: 'Hair', Subcategory: 'Hair Colour', 'Service Name': 'Global hair colour', 'Duration (minutes)': '120', 'Pricing Type': 'Length', 'Price (INR)': '', 'Shoulder Price': '3360', 'Below Waist Price': '4200', 'Beyond Waist Price': '5040', 'Long Price': '5880' }, { Category: 'Skin', Subcategory: 'Facials & Clean-up', 'Service Name': 'Signature facial', 'Duration (minutes)': '90', 'Pricing Type': 'Flat', 'Price (INR)': '3200', 'Shoulder Price': '', 'Below Waist Price': '', 'Beyond Waist Price': '', 'Long Price': '' }];
  const link = document.createElement('a'); link.href = URL.createObjectURL(downloadClientWorkbook(rows, 'Services')); link.download = 'salon-genie-service-template.xlsx'; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); alertToast('Service template downloaded.');
}

async function importServiceCatalog(file, closeSetup = false) {
  if (!file) return;
  try {
    const rows = await clientRowsFromFile(file); let added = 0, updated = 0, skipped = 0;
    rows.forEach(row => {
      const read = (...keys) => keys.map(key => row[key]).find(value => value !== undefined && String(value).trim() !== '') || '';
      const name = String(read('Service Name', 'Name', 'service name')).trim(); const category = String(read('Subcategory', 'Category', 'category')).trim(); const duration = Number(read('Duration (minutes)', 'Duration', 'duration')) || 60; const type = String(read('Pricing Type', 'Pricing', 'pricing type')).trim().toLowerCase(); const byLength = type === 'length' || type === 'by length';
      const lengthPrices = byLength ? { shoulder: Number(read('Shoulder Price', 'Shoulder')) || 0, belowWaist: Number(read('Below Waist Price', 'Below Waist')) || 0, beyondWaist: Number(read('Beyond Waist Price', 'Beyond Waist')) || 0, long: Number(read('Long Price', 'Long')) || 0 } : null;
      const price = byLength ? lengthPrices.belowWaist : Number(read('Price (INR)', 'Price', 'price'));
      if (!name || !category || !price) { skipped += 1; return; }
      const owner = serviceCategory(category); const record = { name, category, duration, price, pricingType: byLength ? 'length' : 'flat', lengthPrices, icon: owner?.icon || '✦', availableBranches: state.branches.map(branch => branch.id), onlineBookable: true };
      const existing = state.services.find(item => item.category === category && item.name.toLowerCase() === name.toLowerCase());
      if (existing) { Object.assign(existing, record); updated += 1; } else { state.services.push({ id: nextId('services'), ...record }); added += 1; }
    });
    if (!added && !updated) return alertToast('No services were added. Check the template columns and prices.');
    state.serviceSetupComplete = true; persist(); if (closeSetup) closeModal(); render(); alertToast(`Service catalog updated: ${added} added, ${updated} updated${skipped ? `, ${skipped} skipped` : ''}.`);
  } catch { alertToast('We could not read that file. Please use the Salon Genie Excel template or CSV format.'); }
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
