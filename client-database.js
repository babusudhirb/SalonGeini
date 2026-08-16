function clientTableRows(entries) {
  return entries.length ? entries.map(entry => `<tr><td><strong>${entry.name}</strong><small>${entry.gender || 'Gender not recorded'}${entry.dob ? ` · ${entry.dob}` : ''}</small></td><td>${entry.phone}<small>${entry.instaId ? `@${entry.instaId.replace(/^@/, '')}` : 'No Instagram ID'}</small></td><td>${entry.influencedBy || 'Not recorded'}</td><td>${entry.visits}</td><td>${money(entry.spent)}</td><td><button data-client="${entry.id}">Open →</button></td></tr>`).join('') : '<tr><td colspan="6"><div class="empty">No clients match this search.</div></td></tr>';
}

function clientsRows(entries) {
  return clientTableRows(entries);
}

function clients() {
  const entries = local('clients').sort((first, second) => first.name.localeCompare(second.name));
  const branch = currentBranch();
  const qrUrl = guestOnboardingQrUrl(branch);
  layout(`<div class="page-head clients-page-head"><div><p class="eyebrow">CLIENT DIRECTORY</p><h1>Clients</h1><p>Know every preference, visit, and opportunity.</p></div><div class="actions clients-actions"><button class="btn secondary" id="upload-client-database">Upload database</button><button class="btn secondary" id="download-client-database">Download clients</button><button class="btn primary" id="open-guest-onboarding">Guest Onboarding</button><div class="guest-qr guest-qr-action" title="Guest onboarding QR code for ${branch.name}"><img src="${qrUrl}" alt="Guest onboarding QR code for ${branch.name}"><span><strong>Guest QR</strong><small>${branch.name}</small><button class="text-link" id="download-guest-qr">Download</button></span></div></div></div><input id="client-database-file" type="file" accept=".xlsx,.csv" hidden><article class="panel table-panel"><div class="table-head"><div><h2>All clients</h2><p>${entries.length} clients at ${branch.name}</p></div><input class="search" id="client-search" placeholder="Search clients" /></div><table class="data-table"><thead><tr><th>CLIENT</th><th>MOBILE & INSTA</th><th>VISIT INFLUENCED BY</th><th>VISITS</th><th>LIFETIME SPEND</th><th></th></tr></thead><tbody id="client-table">${clientTableRows(entries)}</tbody></table></article>`);
  document.getElementById('upload-client-database')?.addEventListener('click', () => document.getElementById('client-database-file').click());
  document.getElementById('download-client-database')?.addEventListener('click', exportClientsDatabase);
  document.getElementById('client-database-file')?.addEventListener('change', event => importClientsDatabase(event.target.files?.[0]));
  document.getElementById('download-guest-qr')?.addEventListener('click', () => downloadGuestOnboardingQr(qrUrl, branch));
  document.getElementById('open-guest-onboarding')?.addEventListener('click', () => clientModal());
}

function clientModal(id = null) {
  const data = id ? client(id) : {};
  const attributionOptions = ['Google Ads', 'Insta Ads', 'Walk-In', 'Referral'];
  modal(id ? 'Edit client' : 'Guest Onboarding', 'Keep useful client information close to the front desk.', `<label>Full name<input name="name" required value="${data.name || ''}" placeholder="Client’s full name"></label><div class="form-row"><label>Mobile number<input name="phone" required inputmode="tel" value="${data.phone || ''}" placeholder="+91"></label><label>Instagram ID<input name="instaId" value="${data.instaId || ''}" placeholder="e.g. salonclient"></label></div><label>Gender<div class="gender-select"><label><input name="gender" type="radio" value="Male" ${data.gender === 'Male' ? 'checked' : ''} required><span>Male</span></label><label><input name="gender" type="radio" value="Female" ${data.gender === 'Female' ? 'checked' : ''}><span>Female</span></label></div></label><div class="form-row"><label>Date of birth (day / month)<input name="dob" value="${data.dob || ''}" inputmode="numeric" pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])" placeholder="DD/MM"></label><label>Visit influenced by<select name="influencedBy"><option value="">Select source</option>${attributionOptions.map(option => `<option ${data.influencedBy === option ? 'selected' : ''}>${option}</option>`).join('')}</select></label></div><label>Notes & preferences<textarea name="note" placeholder="Preferences, allergies, special requests">${data.note || ''}</textarea></label>`, id ? 'Save changes' : 'Save guest');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target);
    const record = { ...data, id: data.id || nextId('clients'), name: form.get('name'), phone: form.get('phone'), instaId: form.get('instaId').replace(/^@/, ''), gender: form.get('gender'), dob: form.get('dob'), influencedBy: form.get('influencedBy'), note: form.get('note'), visits: data.visits || 0, spent: data.spent || 0, branch: data.branch || state.activeBranch };
    if (id) Object.assign(data, record); else state.clients.push(record);
    persist(); closeModal(); render(); alertToast(id ? 'Client updated.' : 'Client added.');
  };
}

function exportClientsDatabase() {
  excelExportClientsDatabase();
}

function importClientsDatabase(file) {
  return excelImportClientsDatabase(file);
}
