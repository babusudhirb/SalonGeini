let clientDirectoryMode = 'all';

function serviceFollowUpDays(treatment) {
  if (Number.isFinite(Number(treatment?.followUpDays))) return Number(treatment.followUpDays);
  const name = (treatment?.name || '').toLowerCase();
  if (name.includes('botox')) return 180;
  if (name.includes('balayage') || name.includes('colour') || name.includes('color')) return 120;
  if (name.includes('haircut') || name.includes('hair cut')) return 90;
  if (name.includes('facial')) return 45;
  if (name.includes('manicure') || name.includes('pedicure') || name.includes('nail')) return 21;
  return null;
}

function upcomingBirthday(customer, today = new Date()) {
  const match = String(customer?.dob || '').match(/^(\d{2})\/(\d{2})$/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let birthday = new Date(start.getFullYear(), month, day);
  if (birthday.getMonth() !== month || birthday.getDate() !== day) return null;
  if (birthday < start) birthday = new Date(start.getFullYear() + 1, month, day);
  const daysUntil = Math.round((birthday - start) / 86400000);
  return daysUntil <= 21 ? { birthdayDate: birthday, daysUntil } : null;
}

function followUpClients() {
  const latestServices = new Map();
  state.appointments
    .filter(appointment => appointment.branch === state.activeBranch && (appointment.paid || appointment.status === 'completed'))
    .forEach(appointment => {
      const key = `${appointment.clientId}:${appointment.serviceId}`;
      const existing = latestServices.get(key);
      if (!existing || `${appointmentDate(appointment)} ${appointment.time}` > `${appointmentDate(existing)} ${existing.time}`) latestServices.set(key, appointment);
    });

  const today = new Date();
  const dueByClient = new Map();
  latestServices.forEach(appointment => {
    const treatment = service(appointment.serviceId);
    const days = serviceFollowUpDays(treatment);
    if (!days) return;
    const dueDate = new Date(`${appointmentDate(appointment)}T00:00:00`);
    dueDate.setDate(dueDate.getDate() + days);
    if (dueDate > today) return;
    const customer = client(appointment.clientId);
    if (!customer) return;
    const entry = dueByClient.get(customer.id) || { client: customer, dueServices: [] };
    entry.dueServices.push({ appointment, treatment, dueDate, daysOverdue: Math.max(0, Math.floor((today - dueDate) / 86400000)) });
    dueByClient.set(customer.id, entry);
  });

  local('clients').forEach(customer => {
    const birthday = upcomingBirthday(customer, today);
    if (!birthday) return;
    const entry = dueByClient.get(customer.id) || { client: customer, dueServices: [] };
    entry.birthday = birthday;
    dueByClient.set(customer.id, entry);
  });

  const priority = entry => Math.max(0, ...entry.dueServices.map(item => item.daysOverdue), entry.birthday ? 21 - entry.birthday.daysUntil : 0);
  return [...dueByClient.values()].sort((first, second) => priority(second) - priority(first));
}

function followUpClientRows(entries) {
  const formatDate = value => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(value);
  return entries.length ? entries.map(({ client: entry, dueServices, birthday }) => {
    const leadService = dueServices[0];
    const serviceNames = dueServices.map(item => item.treatment?.name || 'Service').join(', ');
    const reason = [serviceNames && `<strong>${serviceNames}</strong><small>Service follow-up due</small>`, birthday && `<strong>Birthday outreach</strong><small>${birthday.daysUntil ? `Birthday in ${birthday.daysUntil} day${birthday.daysUntil === 1 ? '' : 's'} · ${formatDate(birthday.birthdayDate)}` : 'Birthday today'}</small>`].filter(Boolean).join('');
    const lastVisit = leadService ? `${formatDate(new Date(`${appointmentDate(leadService.appointment)}T00:00:00`))}<small>Last completed visit</small>` : '—<small>No service follow-up due</small>';
    const urgency = [leadService && `<span class="follow-up-overdue">${leadService.daysOverdue ? `${leadService.daysOverdue} days overdue` : 'Service due today'}</span>`, birthday && `<span class="follow-up-birthday">${birthday.daysUntil ? `Birthday in ${birthday.daysUntil} days` : 'Birthday today'}</span>`].filter(Boolean).join('<br>');
    return `<tr><td><strong>${entry.name} <span class="badge red">Follow-up required</span></strong><small>${entry.phone}</small></td><td>${reason}</td><td>${lastVisit}</td><td>${urgency}</td><td><button data-client="${entry.id}">View insights →</button></td></tr>`;
  }).join('') : '<tr><td colspan="5"><div class="empty">No client follow-ups are due right now.</div></td></tr>';
}

function clientTableRows(entries) {
  const followUps = new Map(followUpClients().map(item => [item.client.id, item]));
  return entries.length ? entries.map(entry => `<tr><td><strong>${entry.name}${followUps.has(entry.id) ? ' <span class="badge red">Follow-up required</span>' : ''}</strong><small>${entry.gender || 'Gender not recorded'}${entry.dob ? ` · ${entry.dob}` : ''}</small></td><td>${entry.phone}<small>${entry.instaId ? `@${entry.instaId.replace(/^@/, '')}` : 'No Instagram ID'}</small></td><td>${entry.influencedBy || 'Not recorded'}</td><td>${entry.visits}</td><td>${money(entry.spent)}</td><td><button data-client="${entry.id}">View insights →</button></td></tr>`).join('') : '<tr><td colspan="6"><div class="empty">No clients match this search.</div></td></tr>';
}

function clientsRows(entries) {
  return clientTableRows(entries);
}

function clients() {
  const followUps = followUpClients();
  const birthdayFollowUps = followUps.filter(entry => entry.birthday);
  const isFollowUpView = clientDirectoryMode === 'follow-up';
  const isBirthdayView = clientDirectoryMode === 'birthday';
  const isActionView = isFollowUpView || isBirthdayView;
  const entries = isFollowUpView ? followUps : isBirthdayView ? birthdayFollowUps : local('clients').sort((first, second) => first.name.localeCompare(second.name));
  const viewTitle = isBirthdayView ? 'Birthday follow-ups' : isFollowUpView ? 'Clients for follow-up' : 'All clients';
  const viewDescription = isBirthdayView ? 'Clients with birthdays in the next three weeks.' : isFollowUpView ? 'Clients with a service due or birthday in the next three weeks.' : `${entries.length} clients at ${currentBranch().name}`;
  const branch = currentBranch();
  const qrUrl = guestOnboardingQrUrl(branch);
  layout(`<div class="page-head clients-page-head"><div><p class="eyebrow">CLIENT DIRECTORY</p><h1>Clients</h1><p>Know every preference, visit, and opportunity.</p></div><div class="actions clients-actions"><button class="btn secondary" id="upload-client-database">Upload database</button><button class="btn secondary" id="download-client-database">Download clients</button><button class="btn ${isFollowUpView ? 'primary' : 'secondary'} client-follow-up-button" id="show-follow-up-clients">Clients for follow-up${followUps.length ? ` · ${followUps.length}` : ''}</button><button class="btn ${isBirthdayView ? 'primary' : 'secondary'} client-follow-up-button" id="show-birthday-follow-ups">Birthday follow-ups${birthdayFollowUps.length ? ` · ${birthdayFollowUps.length}` : ''}</button><button class="btn primary" id="open-guest-onboarding">Guest Onboarding</button><div class="guest-qr guest-qr-action" title="Guest onboarding QR code for ${branch.name}"><img src="${qrUrl}" alt="Guest onboarding QR code for ${branch.name}"><span><strong>Guest QR</strong><small>${branch.name}</small><button class="text-link" id="download-guest-qr">Download</button></span></div></div></div><input id="client-database-file" type="file" accept=".xlsx,.csv" hidden><article class="panel table-panel"><div class="table-head"><div><h2>${viewTitle}</h2><p>${viewDescription}</p></div><div class="client-table-actions">${isActionView ? '<button class="text-link" id="show-all-clients">View all clients</button>' : ''}<input class="search" id="client-search" placeholder="Search clients" /></div></div><table class="data-table"><thead>${isActionView ? '<tr><th>CLIENT</th><th>FOLLOW-UP REASON</th><th>LAST VISIT</th><th>FOLLOW-UP</th><th></th></tr>' : '<tr><th>CLIENT</th><th>MOBILE & INSTA</th><th>VISIT INFLUENCED BY</th><th>VISITS</th><th>LIFETIME SPEND</th><th></th></tr>'}</thead><tbody id="client-table">${isActionView ? followUpClientRows(entries) : clientTableRows(entries)}</tbody></table></article>`);
  document.getElementById('upload-client-database')?.addEventListener('click', () => document.getElementById('client-database-file').click());
  document.getElementById('download-client-database')?.addEventListener('click', exportClientsDatabase);
  document.getElementById('client-database-file')?.addEventListener('change', event => importClientsDatabase(event.target.files?.[0]));
  document.getElementById('download-guest-qr')?.addEventListener('click', () => downloadGuestOnboardingQr(qrUrl, branch));
  document.getElementById('open-guest-onboarding')?.addEventListener('click', () => clientModal());
  document.getElementById('show-follow-up-clients')?.addEventListener('click', () => { clientDirectoryMode = 'follow-up'; render(); });
  document.getElementById('show-birthday-follow-ups')?.addEventListener('click', () => { clientDirectoryMode = 'birthday'; render(); });
  document.getElementById('show-all-clients')?.addEventListener('click', () => { clientDirectoryMode = 'all'; render(); });
  document.getElementById('client-search')?.addEventListener('input', event => {
    event.stopImmediatePropagation();
    const query = event.target.value.toLowerCase();
    const filtered = isFollowUpView ? entries.filter(item => `${item.client.name} ${item.client.phone}`.toLowerCase().includes(query)) : entries.filter(item => `${item.name} ${item.phone}`.toLowerCase().includes(query));
    document.getElementById('client-table').innerHTML = isActionView ? followUpClientRows(filtered) : clientTableRows(filtered);
    document.querySelectorAll('#client-table [data-client]').forEach(button => button.addEventListener('click', () => clientInsights(Number(button.dataset.client))));
  });
}

function clientModal(id = null, returnToInsights = false) {
  const data = id ? client(id) : {};
  const attributionOptions = ['Google Ads', 'Insta Ads', 'Walk-In', 'Referral'];
  modal(id ? 'Edit client' : 'Guest Onboarding', 'Keep useful client information close to the front desk.', `<label>Full name<input name="name" required value="${data.name || ''}" placeholder="Client’s full name"></label><div class="form-row"><label>Mobile number<input name="phone" required inputmode="tel" value="${data.phone || ''}" placeholder="+91"></label><label>Instagram ID<input name="instaId" value="${data.instaId || ''}" placeholder="e.g. salonclient"></label></div><label>Gender<div class="gender-select"><label><input name="gender" type="radio" value="Male" ${data.gender === 'Male' ? 'checked' : ''} required><span>Male</span></label><label><input name="gender" type="radio" value="Female" ${data.gender === 'Female' ? 'checked' : ''}><span>Female</span></label></div></label><div class="form-row"><label>Date of birth (day / month)<input name="dob" value="${data.dob || ''}" inputmode="numeric" pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])" placeholder="DD/MM"></label><label>Visit influenced by<select name="influencedBy"><option value="">Select source</option>${attributionOptions.map(option => `<option ${data.influencedBy === option ? 'selected' : ''}>${option}</option>`).join('')}</select></label></div><label>Notes & preferences<textarea name="note" placeholder="Preferences, allergies, special requests">${data.note || ''}</textarea></label>`, id ? 'Save changes' : 'Save guest');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target);
    const record = { ...data, id: data.id || nextId('clients'), name: form.get('name'), phone: form.get('phone'), instaId: form.get('instaId').replace(/^@/, ''), gender: form.get('gender'), dob: form.get('dob'), influencedBy: form.get('influencedBy'), note: form.get('note'), visits: data.visits || 0, spent: data.spent || 0, branch: data.branch || state.activeBranch };
    if (id) Object.assign(data, record); else state.clients.push(record);
    persist();
    if (returnToInsights) clientInsights(id); else { closeModal(); render(); }
    alertToast(id ? 'Client updated.' : 'Client added.');
  };
  if (returnToInsights) {
    const returnToProfile = () => clientInsights(id);
    document.getElementById('modal-cancel').onclick = returnToProfile;
    document.getElementById('modal-close').onclick = returnToProfile;
  }
}

function clientInsights(id) {
  const data = client(id);
  if (!data) return;

  const visits = state.appointments
    .filter(appointment => appointment.clientId === data.id && appointment.status !== 'cancelled')
    .sort((first, second) => `${appointmentDate(second)} ${second.time}`.localeCompare(`${appointmentDate(first)} ${first.time}`));
  const invoices = state.invoices.filter(invoice => invoice.clientId === data.id);
  const serviceCounts = visits.reduce((counts, appointment) => {
    const name = service(appointment.serviceId)?.name || 'Service not recorded';
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});
  const staffCounts = visits.reduce((counts, appointment) => {
    const name = staff(appointment.staffId)?.name || 'Team member not recorded';
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});
  const favouriteService = Object.entries(serviceCounts).sort((first, second) => second[1] - first[1])[0];
  const favouriteStaff = Object.entries(staffCounts).sort((first, second) => second[1] - first[1])[0];
  const bookedVisit = visits.filter(appointment => appointment.status === 'confirmed')[0];
  const followUp = followUpClients().find(item => item.client.id === data.id);
  const dueServiceNames = followUp?.dueServices.map(item => item.treatment?.name || 'Service').join(', ');
  const followUpDetail = [dueServiceNames && `Service due · ${dueServiceNames}`, followUp?.birthday && (followUp.birthday.daysUntil ? `Birthday in ${followUp.birthday.daysUntil} days` : 'Birthday today')].filter(Boolean).join(' · ');
  const totalSpend = invoices.reduce((sum, invoice) => sum + Number(invoice.total || 0), 0) || Number(data.spent || 0);
  const averageSpend = data.visits ? Math.round(totalSpend / data.visits) : 0;
  const recordedRating = Number(data.satisfaction);
  const formatDate = value => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
  const statusLabel = appointment => appointment.paid ? 'Paid' : appointment.status === 'completed' ? 'Completed' : 'Booked';

  modal(`${data.name} · Client insights`, 'A clear view of this client’s relationship with your salon.', `<div class="client-insights">
    <div class="client-insight-topline">
      <div><span class="avatar client-insight-avatar">${initials(data.name)}</span><span><strong>${data.phone}</strong><small>${data.instaId ? `@${data.instaId}` : 'No Instagram ID'}${data.vip ? ' · VIP client' : ''}</small></span></div>
      <div class="client-insight-actions"><button class="btn secondary" type="button" id="edit-client-details">Edit client details</button><span class="client-follow-up-tab ${followUp ? 'is-due' : ''}">${followUp ? 'Follow-up required' : 'Follow-up not required'}</span></div>
    </div>
    <div class="client-insight-kpis">
      <article><small>Lifetime spend</small><strong>${money(totalSpend)}</strong><span>${data.visits || 0} recorded visits</span></article>
      <article><small>Average visit</small><strong>${money(averageSpend)}</strong><span>${invoices.length ? 'Based on paid invoices' : 'Will improve with checkout data'}</span></article>
      <article><small>Client satisfaction</small><strong>${recordedRating ? `${recordedRating.toFixed(1)} / 5` : 'Not recorded'}</strong><span>${recordedRating ? 'From client feedback' : 'Request feedback after the next visit'}</span></article>
    </div>
    <div class="client-insight-grid">
      <section class="client-insight-section"><div class="client-insight-section-head"><div><h3>Relationship snapshot</h3><p>Preferences and booking signals at a glance.</p></div></div><div class="client-signal-list">
        <div><span>Favourite service</span><strong>${favouriteService ? `${favouriteService[0]} · ${favouriteService[1]} visit${favouriteService[1] === 1 ? '' : 's'}` : 'Still learning'}</strong></div>
        <div><span>Preferred team member</span><strong>${favouriteStaff ? favouriteStaff[0] : 'Still learning'}</strong></div>
        <div><span>Next booked visit</span><strong>${bookedVisit ? `${formatDate(appointmentDate(bookedVisit))} · ${bookedVisit.time}` : 'No booking scheduled'}</strong></div>
        <div><span>Follow-up</span><strong>${followUp ? `Required · ${followUpDetail}` : 'Not required'}</strong></div>
        <div><span>How they found you</span><strong>${data.influencedBy || 'Not recorded'}</strong></div>
      </div></section>
      <section class="client-insight-section client-preferences"><div class="client-insight-section-head"><div><h3>Preferences & notes</h3><p>Give the team the context they need.</p></div></div><p>${data.note || 'No preferences, allergies, or special requests have been recorded yet.'}</p>${data.dob ? `<small>Birthday: ${data.dob}</small>` : ''}</section>
    </div>
    <section class="client-insight-section client-history"><div class="client-insight-section-head"><div><h3>Visit history</h3><p>Appointments currently recorded for this client.</p></div><span>${visits.length} record${visits.length === 1 ? '' : 's'}</span></div>${visits.length ? `<div class="client-history-list">${visits.map(appointment => { const treatment = service(appointment.serviceId); const member = staff(appointment.staffId); return `<div><time><strong>${formatDate(appointmentDate(appointment))}</strong><small>${appointment.time}</small></time><span><strong>${treatment?.name || 'Service not recorded'}</strong><small>${member?.name || 'Team member not recorded'}</small></span><span class="badge ${appointment.paid || appointment.status === 'completed' ? 'green' : 'gold'}">${statusLabel(appointment)}</span><b>${money(treatment?.price || 0)}</b></div>`; }).join('')}</div>` : '<div class="empty client-history-empty">No appointment history has been recorded yet.</div>'}</section>
  </div>`, 'Close');

  document.querySelector('.modal')?.classList.add('client-insights-modal');
  document.getElementById('modal-cancel')?.remove();
  document.getElementById('modal-form').onsubmit = event => { event.preventDefault(); closeModal(); };
  document.getElementById('edit-client-details')?.addEventListener('click', () => clientModal(id, true));
}

function exportClientsDatabase() {
  excelExportClientsDatabase();
}

function importClientsDatabase(file) {
  return excelImportClientsDatabase(file);
}
