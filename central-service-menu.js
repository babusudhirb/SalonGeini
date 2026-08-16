let serviceMenuSection = 'services';
let comboLayout = 'grid';
let discountLayout = 'list';

function prepareCentralServiceMenu() {
  let changed = false;
  if (!Array.isArray(state.combos)) { state.combos = []; changed = true; }
  if (!Array.isArray(state.discounts)) { state.discounts = []; changed = true; }
  if (typeof state.onlineBookingEnabled !== 'boolean') { state.onlineBookingEnabled = false; changed = true; }
  state.services.forEach(item => {
    if (!Array.isArray(item.availableBranches)) { item.availableBranches = state.branches.map(branch => branch.id); changed = true; }
    if (typeof item.onlineBookable !== 'boolean') { item.onlineBookable = true; changed = true; }
  });
  state.combos.forEach(item => {
    if (!Array.isArray(item.availableBranches)) { item.availableBranches = state.branches.map(branch => branch.id); changed = true; }
    if (typeof item.onlineBookable !== 'boolean') { item.onlineBookable = true; changed = true; }
  });
  if (changed) persist();
}

const centralBranchNames = ids => state.branches.filter(branch => ids?.includes(branch.id)).map(branch => branch.name).join(', ') || 'No branches';
const centralServicePrice = item => item.pricingType === 'length' ? `From ${money(item.lengthPrices?.short ?? item.price)}` : money(item.price);
const centralServiceIcon = item => serviceCategory(item.category)?.icon || item.icon || '✦';
const serviceTabs = [{ id: 'services', label: 'Services' }, { id: 'combos', label: 'Combos' }, { id: 'discounts', label: 'Offers & Discounts' }, { id: 'online', label: 'Online Booking' }];

function services() {
  prepareCentralServiceMenu();
  if (state.preferences?.displayMode === 'normal' && serviceMenuSection === 'online') serviceMenuSection = 'services';
  layout(`${pageHead('CENTRAL SERVICE MENU', 'Services', 'One menu for every branch, the front desk, and your future booking website.', serviceMenuActions())}<section class="service-section-overview" aria-label="Service menu sections">${serviceTabs.map(serviceSectionCard).join('')}</section><section class="central-menu-note"><span>✦</span><p><strong>Managed centrally</strong> · Changes to services, combos, and offers stay consistent across your salon group.</p></section><div id="central-service-content">${centralMenuContent()}</div>`);
  document.querySelectorAll('[data-service-menu-tab]').forEach(button => button.addEventListener('click', () => { serviceMenuSection = button.dataset.serviceMenuTab; render(); }));
  document.getElementById('add-central-service')?.addEventListener('click', () => serviceModal());
  document.getElementById('add-central-combo')?.addEventListener('click', () => comboModal());
  document.getElementById('add-central-combo-card')?.addEventListener('click', () => comboModal());
  document.getElementById('add-central-discount')?.addEventListener('click', () => discountModal());
  document.getElementById('add-central-discount-card')?.addEventListener('click', () => discountModal());
  document.getElementById('quick-menu-setup')?.addEventListener('click', () => serviceSetupWizard());
  document.getElementById('manage-online-booking-card')?.addEventListener('click', () => { serviceMenuSection = 'online'; render(); });
  document.querySelectorAll('[data-combo]').forEach(button => button.addEventListener('click', () => comboModal(Number(button.dataset.combo))));
  document.querySelectorAll('[data-discount]').forEach(button => button.addEventListener('click', () => discountModal(Number(button.dataset.discount))));
  document.querySelectorAll('[data-service-layout]').forEach(button => button.addEventListener('click', () => { const [section, layout] = button.dataset.serviceLayout.split(':'); if (section === 'combos') comboLayout = layout; if (section === 'discounts') discountLayout = layout; render(); }));
  document.getElementById('online-booking-toggle')?.addEventListener('change', event => { state.onlineBookingEnabled = event.target.checked; persist(); render(); alertToast(state.onlineBookingEnabled ? 'Online booking is enabled.' : 'Online booking is paused.'); });
  document.querySelectorAll('[data-online-service]').forEach(input => input.addEventListener('change', event => { service(Number(event.target.dataset.onlineService)).onlineBookable = event.target.checked; persist(); }));
  document.querySelectorAll('[data-online-combo]').forEach(input => input.addEventListener('change', event => { state.combos.find(combo => combo.id === Number(event.target.dataset.onlineCombo)).onlineBookable = event.target.checked; persist(); }));
}

function serviceSectionCard(tab) {
  const details = {
    services: { icon: '✦', count: `${state.services.length} services`, copy: 'Individual treatments, prices, timings, and branch availability.' },
    combos: { icon: '⊞', count: `${state.combos.length} combos`, copy: 'Packages made from more than one individual service.' },
    discounts: { icon: '%', count: `${state.discounts.filter(item => item.active).length} active`, copy: 'Offers for selected services, categories, combos, or every guest.' },
    online: { icon: '↗', count: state.onlineBookingEnabled ? 'Booking live' : 'Booking paused', copy: 'Control exactly what clients can book through your website.' }
  }[tab.id];
  const actions = tab.id === 'services' ? '<div class="service-section-actions two-actions"><button class="service-section-action secondary" id="quick-menu-setup">Quick setup</button><button class="service-section-action" id="add-central-service">＋ Add service</button></div>' : tab.id === 'combos' ? '<div class="service-section-actions"><button class="service-section-action" id="add-central-combo-card">＋ Create combo</button></div>' : tab.id === 'discounts' ? '<div class="service-section-actions"><button class="service-section-action" id="add-central-discount-card">＋ Create offer</button></div>' : '<div class="service-section-actions"><button class="service-section-action" id="manage-online-booking-card">Manage booking</button></div>';
  return `<article class="service-section-card ${serviceMenuSection === tab.id ? 'active' : ''}"><button class="service-section-card-main" data-service-menu-tab="${tab.id}"><span class="service-section-icon">${details.icon}</span><span><strong>${tab.label}</strong><small>${details.copy}</small></span></button>${actions}</article>`;
}

function serviceMenuActions() { return ''; }

function serviceLayoutSwitch(section, activeLayout) {
  return `<div class="layout-switch service-layout-switch" role="group" aria-label="${section} layout"><button class="${activeLayout === 'grid' ? 'active' : ''}" data-service-layout="${section}:grid">Grid view</button><button class="${activeLayout === 'list' ? 'active' : ''}" data-service-layout="${section}:list">List view</button></div>`;
}

function centralMenuContent() {
  if (serviceMenuSection === 'combos') return combosContent();
  if (serviceMenuSection === 'discounts') return discountsContent();
  if (serviceMenuSection === 'online') return onlineBookingContent();
  return individualServicesContent();
}

function individualServicesContent() {
  const groups = [...new Set(state.services.map(item => item.category || 'Other services'))].sort((a, b) => a.localeCompare(b));
  return `<section class="central-intro"><div><strong>Individual services</strong><p>Every service has its own price, duration, branch availability, and online-booking setting.</p></div><span class="service-total-badge"><b>${state.services.length}</b> active services</span></section>${groups.map(group => `<section class="central-service-group"><header><span class="service-icon">${centralServiceIcon({ category: group })}</span><div><h2>${group}</h2><p>${state.services.filter(item => item.category === group).length} services</p></div></header><div class="central-service-grid">${state.services.filter(item => item.category === group).map(serviceCard).join('')}</div></section>`).join('') || '<div class="empty">Add your first service or use Quick menu setup.</div>'}`;
}

function serviceCard(item) {
  return `<article class="central-service-card"><div class="central-service-card-head"><span class="service-icon">${centralServiceIcon(item)}</span><button class="text-link" data-service="${item.id}">Edit</button></div><h3>${item.name}</h3><p>${item.duration} min${item.pricingType === 'length' ? ' · Short / medium / long' : ''}</p><strong>${centralServicePrice(item)}</strong><footer><span>${item.onlineBookable ? 'Online bookable' : 'In-salon only'}</span><small>${item.availableBranches.length}/${state.branches.length} branches</small></footer></article>`;
}

function combosContent() {
  const combos = state.combos.map(comboLayout === 'grid' ? comboCard : comboListRow).join('') || '<div class="empty">Create a combo such as “Hair Refresh” or “Weekend Glow”.</div>';
  return `<section class="central-intro"><div><strong>Packages guests can book in one visit</strong><p>Create a combo from individual services. We total the time and show the customer their saving.</p></div><div class="central-intro-actions"><span class="combo-total-badge"><b>${state.combos.length}</b> active combos</span>${serviceLayoutSwitch('combos', comboLayout)}</div></section><div class="${comboLayout === 'grid' ? 'combo-grid' : 'combo-list'}">${combos}</div>`;
}

function comboCard(combo) {
  const included = combo.serviceIds.map(id => service(id)).filter(Boolean); const normalPrice = included.reduce((total, item) => total + item.price, 0);
  const saving = Math.max(0, normalPrice - combo.price); const percentage = normalPrice ? Math.round((saving / normalPrice) * 100) : 0;
  return `<article class="combo-card"><div class="combo-card-top"><span class="combo-mark">✦</span><button class="text-link" data-combo="${combo.id}">Edit</button></div><h2>${combo.name}</h2><p>${included.map(item => item.name).join(' + ')}</p><div class="combo-pricing"><strong>${money(combo.price)}</strong><span>Save ${money(saving)} · ${percentage}% off</span></div><footer><small>${combo.duration} min · ${centralBranchNames(combo.availableBranches)}</small><b>${combo.onlineBookable ? 'Online bookable' : 'In-salon only'}</b></footer></article>`;
}

function comboListRow(combo) {
  const included = combo.serviceIds.map(id => service(id)).filter(Boolean); const normalPrice = included.reduce((total, item) => total + item.price, 0); const saving = Math.max(0, normalPrice - combo.price);
  return `<article class="combo-list-row"><span class="combo-mark">✦</span><div><strong>${combo.name}</strong><p>${included.map(item => item.name).join(' + ')}</p><small>${combo.duration} min · ${centralBranchNames(combo.availableBranches)} · ${combo.onlineBookable ? 'Online bookable' : 'In-salon only'}</small></div><span class="combo-list-price"><strong>${money(combo.price)}</strong><small>Save ${money(saving)}</small></span><button class="text-link" data-combo="${combo.id}">Edit</button></article>`;
}

function discountsContent() {
  const discounts = state.discounts.map(discountLayout === 'grid' ? discountCard : discountRow).join('') || '<div class="empty">Create your first offer. Expiry dates and no-stacking are recommended defaults.</div>';
  return `<section class="central-intro"><div><strong>Planned offers with guardrails</strong><p>Control where each offer applies, when it runs, and whether it can combine with another offer.</p></div><div class="central-intro-actions"><span class="discount-total-badge"><b>${state.discounts.filter(item => item.active).length}</b> active offers</span>${serviceLayoutSwitch('discounts', discountLayout)}</div></section><div class="${discountLayout === 'grid' ? 'discount-grid' : 'discount-list'}">${discounts}</div>`;
}

function discountTarget(item) {
  return item.scope === 'all' ? 'All salon services' : item.scope === 'category' ? item.targets.join(', ') : item.scope === 'combo' ? item.targets.map(id => state.combos.find(combo => combo.id === Number(id))?.name).filter(Boolean).join(', ') : item.targets.map(id => service(id)?.name).filter(Boolean).join(', ');
}

function discountRow(item) {
  const target = discountTarget(item);
  return `<article class="discount-row"><span class="discount-mark">%</span><div><strong>${item.name}</strong><p>${item.type === 'percent' ? `${item.value}% off` : `${money(item.value)} off`} · ${target || 'Selected items'} · ${item.channels === 'both' ? 'Online and in-salon' : item.channels}</p><small>${item.startDate || 'Starts now'} – ${item.endDate || 'No expiry'} · ${item.stackable ? 'Can stack' : 'Does not stack'}</small></div><span class="discount-status ${item.active ? 'on' : ''}">${item.active ? 'Active' : 'Paused'}</span><button class="text-link" data-discount="${item.id}">Edit</button></article>`;
}

function discountCard(item) {
  const target = discountTarget(item);
  return `<article class="discount-card"><div class="discount-card-top"><span class="discount-mark">%</span><button class="text-link" data-discount="${item.id}">Edit</button></div><h2>${item.name}</h2><p>${item.type === 'percent' ? `${item.value}% off` : `${money(item.value)} off`} · ${target || 'Selected items'}</p><div><span class="discount-status ${item.active ? 'on' : ''}">${item.active ? 'Active' : 'Paused'}</span><small>${item.startDate || 'Starts now'} – ${item.endDate || 'No expiry'}</small></div><footer><span>${item.channels === 'both' ? 'Online and in-salon' : item.channels}</span><b>${item.stackable ? 'Can stack' : 'Does not stack'}</b></footer></article>`;
}

function onlineBookingContent() {
  const onlineServices = state.services.filter(item => item.onlineBookable).length; const onlineCombos = state.combos.filter(item => item.onlineBookable).length;
  return `<section class="online-booking-hero"><div><p class="eyebrow">CUSTOMER BOOKING WEBSITE</p><div class="online-heading-row"><h2>Let guests book from your live menu</h2><span class="online-status-badge ${state.onlineBookingEnabled ? 'live' : ''}">${state.onlineBookingEnabled ? 'Booking live' : 'Booking paused'}</span></div><p>Only services and combos marked below will appear. When a guest chooses a time, it will create an appointment in the salon calendar.</p></div><div class="online-booking-actions"><a class="customer-page-link" href="booking.html" target="_blank" rel="noopener">Preview customer page ↗</a><label class="booking-toggle"><input id="online-booking-toggle" type="checkbox" ${state.onlineBookingEnabled ? 'checked' : ''}><span></span>${state.onlineBookingEnabled ? 'Pause booking' : 'Enable booking'}</label></div></section><section class="online-booking-summary"><span><strong>${onlineServices}</strong> services shown online</span><span><strong>${onlineCombos}</strong> combos shown online</span><span><strong>${state.branches.length}</strong> branches available</span></section><section class="online-visibility-list"><h2>Choose what guests can book</h2>${state.services.map(item => `<label><input type="checkbox" data-online-service="${item.id}" ${item.onlineBookable ? 'checked' : ''}><span><strong>${item.name}</strong><small>${item.category} · ${centralServicePrice(item)} · ${item.duration} min</small></span></label>`).join('')}${state.combos.map(combo => `<label><input type="checkbox" data-online-combo="${combo.id}" ${combo.onlineBookable ? 'checked' : ''}><span><strong>${combo.name}</strong><small>Combo · ${money(combo.price)} · ${combo.duration} min</small></span></label>`).join('')}</section><p class="online-booking-note">Before publishing the public booking page, connect a shared online database so bookings from guests’ phones appear on every salon device.</p>`;
}

function centralBranchChecks(selected = []) {
  return `<div class="branch-checks">${state.branches.map(branch => `<label><input type="checkbox" name="branches" value="${branch.id}" ${selected.includes(branch.id) ? 'checked' : ''}><span>${branch.name}</span></label>`).join('')}</div>`;
}

function serviceModal(id = null) {
  prepareCentralServiceMenu();
  const data = id ? service(id) : { category: SERVICE_CATEGORIES[0].name, duration: 60, price: 1500, availableBranches: state.branches.map(branch => branch.id), onlineBookable: true };
  const templateOptions = SERVICE_CATEGORIES.flatMap(category => category.services.map((item, index) => `<option value="${category.id}:${index}">${category.name} · ${item.name}</option>`)).join('');
  const prices = data.lengthPrices || lengthPricing(data.price);
  modal(id ? `Edit ${data.name}` : 'Add service', id ? 'Update the service, price, availability, or online-booking setting.' : 'Start from a ready-made service, then change only what you need.', `${id ? `<div class="service-edit-summary"><strong>${data.category}</strong><span>${data.duration} minutes</span></div>` : `<label>Start with a common service<select id="central-service-template"><option value="custom">Custom service</option>${templateOptions}</select></label>`}<div class="form-row"><label>Service name<input name="name" required value="${data.name || ''}" placeholder="e.g. Haircut & style"></label><label>Category<select name="category">${SERVICE_CATEGORIES.map(category => `<option ${data.category === category.name ? 'selected' : ''}>${category.name}</option>`).join('')}<option ${!serviceCategory(data.category) ? 'selected' : ''}>Other services</option></select></label></div><div class="form-row"><label>Duration (minutes)<input name="duration" type="number" min="15" step="15" required value="${data.duration}"></label><label>Pricing style<select id="central-pricing-style"><option value="flat" ${data.pricingType !== 'length' ? 'selected' : ''}>One price</option><option value="length" ${data.pricingType === 'length' ? 'selected' : ''}>By hair length</option></select></label></div><div id="central-flat-price" ${data.pricingType === 'length' ? 'hidden' : ''}><label>Price (₹)<input name="price" type="number" min="0" required value="${data.price}"></label></div><div id="central-length-prices" class="length-price-grid" ${data.pricingType === 'length' ? '' : 'hidden'}><label>Short hair<input name="short" type="number" min="0" value="${prices.short}"></label><label>Medium hair<input name="medium" type="number" min="0" value="${prices.medium}"></label><label>Long hair<input name="long" type="number" min="0" value="${prices.long}"></label></div><label>Available at<div class="branch-checks">${centralBranchChecks(data.availableBranches)}</div></label><label class="online-check"><input name="onlineBookable" type="checkbox" ${data.onlineBookable ? 'checked' : ''}> <span>Allow customers to book this online</span></label>`, id ? 'Save service' : 'Add service');
  const pricing = document.getElementById('central-pricing-style');
  pricing.addEventListener('change', () => { document.getElementById('central-flat-price').hidden = pricing.value === 'length'; document.getElementById('central-length-prices').hidden = pricing.value !== 'length'; });
  document.getElementById('central-service-template')?.addEventListener('change', event => {
    if (event.target.value === 'custom') return;
    const [categoryId, index] = event.target.value.split(':'); const category = SERVICE_CATEGORIES.find(item => item.id === categoryId); const preset = category.services[Number(index)];
    document.querySelector('[name="name"]').value = preset.name; document.querySelector('[name="category"]').value = category.name; document.querySelector('[name="duration"]').value = preset.duration; document.querySelector('[name="price"]').value = preset.price;
    if (preset.length) { pricing.value = 'length'; pricing.dispatchEvent(new Event('change')); const presetPrices = lengthPricing(preset.price); document.querySelector('[name="short"]').value = presetPrices.short; document.querySelector('[name="medium"]').value = presetPrices.medium; document.querySelector('[name="long"]').value = presetPrices.long; }
    else { pricing.value = 'flat'; pricing.dispatchEvent(new Event('change')); }
  });
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault(); const form = new FormData(event.target); const pricingType = pricing.value; const lengthPrices = pricingType === 'length' ? { short: Number(form.get('short')), medium: Number(form.get('medium')), long: Number(form.get('long')) } : null;
    const record = { ...data, id: data.id || nextId('services'), name: form.get('name').trim(), category: form.get('category'), duration: Number(form.get('duration')), price: pricingType === 'length' ? lengthPrices.medium : Number(form.get('price')), pricingType, lengthPrices, availableBranches: form.getAll('branches'), onlineBookable: form.get('onlineBookable') === 'on', icon: centralServiceIcon({ category: form.get('category') }) };
    if (id) Object.assign(data, record); else state.services.push(record);
    persist(); closeModal(); render(); alertToast(id ? 'Service updated.' : 'Service added to the central menu.');
  };
}

function comboModal(id = null) {
  prepareCentralServiceMenu();
  const data = id ? state.combos.find(combo => combo.id === id) : { serviceIds: [], availableBranches: state.branches.map(branch => branch.id), onlineBookable: true };
  modal(id ? `Edit ${data.name}` : 'Create combo', 'Choose the individual services. The normal price and duration are calculated for you.', `<label>Combo name<input name="name" required value="${data.name || ''}" placeholder="e.g. Hair Refresh"></label><div class="combo-picker"><section><label>Selected services</label><div class="combo-selected-list" id="combo-selected-services"></div></section><section><label for="combo-service-search">Find services to add</label><input id="combo-service-search" class="combo-service-search" type="search" autocomplete="off" placeholder="Search services or categories"><div class="selectable-services" id="combo-service-options">${state.services.map(item => `<label class="combo-service-option" data-service-search="${item.name} ${item.category}"><input type="checkbox" name="serviceIds" value="${item.id}" ${data.serviceIds.includes(item.id) ? 'checked' : ''}><span><strong>${item.name}</strong><small>${item.category} · ${centralServicePrice(item)} · ${item.duration} min</small></span></label>`).join('')}<p class="combo-search-empty" id="combo-search-empty" hidden>No services match your search.</p></div></section></div><div class="combo-calculation" id="combo-calculation">Select services to see the normal price and duration.</div><label>Combo price (₹)<input name="price" type="number" min="0" required value="${data.price || ''}" placeholder="Your bundle price"></label><div class="combo-discount-preview" id="combo-discount-preview">Enter a combo price to see the saving.</div><label>Available at${centralBranchChecks(data.availableBranches)}</label><label class="online-check"><input name="onlineBookable" type="checkbox" ${data.onlineBookable ? 'checked' : ''}> <span>Allow customers to book this combo online</span></label>`, id ? 'Save combo' : 'Create combo');
  const form = document.getElementById('modal-form'); const calculation = document.getElementById('combo-calculation'); const discountPreview = document.getElementById('combo-discount-preview'); const priceInput = form.querySelector('[name="price"]');
  const calculate = () => { const included = form.querySelectorAll('[name="serviceIds"]:checked'); const rows = [...included].map(input => service(input.value)); const normal = rows.reduce((total, item) => total + item.price, 0); const duration = rows.reduce((total, item) => total + item.duration, 0); calculation.innerHTML = rows.length ? `<strong>${rows.length} services · ${duration} min · normal value ${money(normal)}</strong><span>Set a lower combo price to show the guest their saving.</span>` : 'Select services to see the normal price and duration.'; const comboPrice = Number(priceInput.value); const saving = Math.max(0, normal - comboPrice); const percentage = normal ? Math.round((saving / normal) * 100) : 0; discountPreview.innerHTML = rows.length && priceInput.value !== '' ? `<strong>Guest saves ${money(saving)} · ${percentage}% off</strong><span>${comboPrice < normal ? 'This is the discount created by your combo price.' : 'Set a price below the normal value to create a saving.'}</span>` : 'Enter a combo price to see the saving.'; return { ids: rows.map(item => item.id), duration }; };
  const renderSelectedServices = () => { const selected = [...form.querySelectorAll('[name="serviceIds"]:checked')].map(input => service(input.value)); const selectedList = document.getElementById('combo-selected-services'); selectedList.innerHTML = selected.length ? selected.map(item => `<button type="button" data-remove-combo-service="${item.id}"><span><strong>${item.name}</strong><small>${item.category} · ${centralServicePrice(item)}</small></span><b>×</b></button>`).join('') : '<p>Select services from the search list.</p>'; selectedList.querySelectorAll('[data-remove-combo-service]').forEach(button => button.addEventListener('click', () => { const checkbox = form.querySelector(`[name="serviceIds"][value="${button.dataset.removeComboService}"]`); checkbox.checked = false; calculate(); renderSelectedServices(); })); };
  form.querySelectorAll('[name="serviceIds"]').forEach(input => input.addEventListener('change', () => { calculate(); renderSelectedServices(); })); priceInput.addEventListener('input', calculate); document.getElementById('combo-service-search').addEventListener('input', event => { const query = event.target.value.trim().toLowerCase(); let matches = 0; form.querySelectorAll('.combo-service-option').forEach(option => { const show = !query || option.dataset.serviceSearch.toLowerCase().includes(query); option.classList.toggle('is-filtered-out', !show); if (show) matches += 1; }); document.getElementById('combo-search-empty').hidden = matches > 0; }); calculate(); renderSelectedServices();
  form.onsubmit = event => { event.preventDefault(); const details = calculate(); if (!details.ids.length) return alertToast('Choose at least one service for this combo.'); const fields = new FormData(event.target); const record = { ...data, id: data.id || nextId('combos'), name: fields.get('name').trim(), serviceIds: details.ids, duration: details.duration, price: Number(fields.get('price')), availableBranches: fields.getAll('branches'), onlineBookable: fields.get('onlineBookable') === 'on' }; if (id) Object.assign(data, record); else state.combos.push(record); persist(); closeModal(); render(); alertToast(id ? 'Combo updated.' : 'Combo created.'); };
}

function discountModal(id = null) {
  prepareCentralServiceMenu();
  const data = id ? state.discounts.find(discount => discount.id === id) : { type: 'percent', scope: 'all', channels: 'both', active: true, stackable: false, availableBranches: state.branches.map(branch => branch.id), targets: [] };
  modal(id ? `Edit ${data.name}` : 'Create offer', 'Use an expiry date and keep stacking off unless you deliberately want two offers to combine.', `<label>Offer name<input name="name" required value="${data.name || ''}" placeholder="e.g. Weekday hair revival"></label><div class="form-row"><label>Discount<select name="type"><option value="percent" ${data.type === 'percent' ? 'selected' : ''}>Percentage off</option><option value="amount" ${data.type === 'amount' ? 'selected' : ''}>Fixed amount off</option></select></label><label>Value<input name="value" type="number" min="0" required value="${data.value || ''}" placeholder="e.g. 15"></label></div><div class="form-row"><label>Apply to<select id="discount-scope" name="scope"><option value="all" ${data.scope === 'all' ? 'selected' : ''}>Entire salon menu</option><option value="category" ${data.scope === 'category' ? 'selected' : ''}>A category</option><option value="service" ${data.scope === 'service' ? 'selected' : ''}>Selected services</option><option value="combo" ${data.scope === 'combo' ? 'selected' : ''}>Selected combos</option></select></label><label>Where<select name="channels"><option value="both" ${data.channels === 'both' ? 'selected' : ''}>Online and in-salon</option><option value="online" ${data.channels === 'online' ? 'selected' : ''}>Online only</option><option value="in-salon" ${data.channels === 'in-salon' ? 'selected' : ''}>In-salon only</option></select></label></div><div id="discount-targets"></div><div class="form-row"><label>Starts<input name="startDate" type="date" value="${data.startDate || ''}"></label><label>Ends<input name="endDate" type="date" value="${data.endDate || ''}"></label></div><label>Branches${centralBranchChecks(data.availableBranches)}</label><label class="online-check"><input name="stackable" type="checkbox" ${data.stackable ? 'checked' : ''}> <span>Allow this offer to combine with another offer</span></label><label class="online-check"><input name="active" type="checkbox" ${data.active ? 'checked' : ''}> <span>Offer is active</span></label>`, id ? 'Save offer' : 'Create offer');
  const form = document.getElementById('modal-form'); const targetArea = document.getElementById('discount-targets'); const scope = document.getElementById('discount-scope');
  const populateTargets = () => { const kind = scope.value; if (kind === 'all') { targetArea.innerHTML = '<p class="field-help">This offer applies to every service and combo at the selected branches.</p>'; return; } if (kind === 'category') { targetArea.innerHTML = `<label>Category<select name="targets">${[...new Set(state.services.map(item => item.category))].map(category => `<option ${data.targets.includes(category) ? 'selected' : ''}>${category}</option>`).join('')}</select></label>`; return; } const label = kind === 'combo' ? 'combos' : 'services'; const rows = kind === 'combo' ? state.combos.map(item => ({ ...item, detail: `Combo · ${money(item.price)}` })) : state.services.map(item => ({ ...item, detail: `${item.category} · ${centralServicePrice(item)}` })); targetArea.innerHTML = `<div class="combo-picker offer-target-picker"><section><label>Selected ${label}</label><div class="combo-selected-list" id="offer-selected-targets"></div></section><section><label for="offer-target-search">Find ${label} to add</label><input id="offer-target-search" class="combo-service-search" type="search" autocomplete="off" placeholder="Search ${label}"><div class="selectable-services compact" id="offer-target-options">${rows.map(item => `<label class="combo-service-option offer-target-option" data-offer-target-search="${item.name} ${item.detail}"><input type="checkbox" name="targets" value="${item.id}" ${data.targets.map(String).includes(String(item.id)) ? 'checked' : ''}><span><strong>${item.name}</strong><small>${item.detail}</small></span></label>`).join('')}<p class="combo-search-empty" id="offer-target-empty" hidden>No ${label} match your search.</p></div></section></div>`; const selectedList = document.getElementById('offer-selected-targets'); const renderSelected = () => { const selected = [...targetArea.querySelectorAll('[name="targets"]:checked')].map(input => rows.find(item => Number(item.id) === Number(input.value))); selectedList.innerHTML = selected.length ? selected.map(item => `<button type="button" data-remove-offer-target="${item.id}"><span><strong>${item.name}</strong><small>${item.detail}</small></span><b>×</b></button>`).join('') : `<p>Select ${label} from the search list.</p>`; selectedList.querySelectorAll('[data-remove-offer-target]').forEach(button => button.addEventListener('click', () => { const checkbox = targetArea.querySelector(`[name="targets"][value="${button.dataset.removeOfferTarget}"]`); checkbox.checked = false; renderSelected(); })); }; targetArea.querySelectorAll('[name="targets"]').forEach(input => input.addEventListener('change', renderSelected)); document.getElementById('offer-target-search').addEventListener('input', event => { const query = event.target.value.trim().toLowerCase(); let matches = 0; targetArea.querySelectorAll('.offer-target-option').forEach(option => { const show = !query || option.dataset.offerTargetSearch.toLowerCase().includes(query); option.classList.toggle('is-filtered-out', !show); if (show) matches += 1; }); document.getElementById('offer-target-empty').hidden = matches > 0; }); renderSelected(); };
  scope.addEventListener('change', () => { data.targets = []; populateTargets(); }); populateTargets();
  form.onsubmit = event => { event.preventDefault(); const fields = new FormData(event.target); const record = { ...data, id: data.id || nextId('discounts'), name: fields.get('name').trim(), type: fields.get('type'), value: Number(fields.get('value')), scope: fields.get('scope'), channels: fields.get('channels'), targets: fields.getAll('targets'), startDate: fields.get('startDate'), endDate: fields.get('endDate'), availableBranches: fields.getAll('branches'), stackable: fields.get('stackable') === 'on', active: fields.get('active') === 'on' }; if (id) Object.assign(data, record); else state.discounts.push(record); persist(); closeModal(); render(); alertToast(id ? 'Offer updated.' : 'Offer created.'); };
}
