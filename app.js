const seed = {
  organisation: { name: 'Maison Violet', owner: 'Amara Rao', currency: '₹', tax: 18 },
  branches: [
    { id: 'ind', name: 'Indiranagar', city: 'Bengaluru', code: 'IN' },
    { id: 'kor', name: 'Koramangala', city: 'Bengaluru', code: 'KO' },
    { id: 'whi', name: 'Whitefield', city: 'Bengaluru', code: 'WH' }
  ],
  activeBranch: 'ind',
  clients: [
    { id: 1, name: 'Riya Sharma', phone: '+91 98765 43120', email: 'riya@example.com', visits: 12, spent: 28600, note: 'Prefers warm balayage', branch: 'ind', vip: true },
    { id: 2, name: 'Naina Kapoor', phone: '+91 98452 00391', email: 'naina@example.com', visits: 4, spent: 6700, note: '', branch: 'ind' },
    { id: 3, name: 'Meera Iyer', phone: '+91 99880 12245', email: 'meera@example.com', visits: 1, spent: 3200, note: 'Sensitive skin', branch: 'ind' },
    { id: 4, name: 'Ananya Gupta', phone: '+91 98710 88340', email: 'ananya@example.com', visits: 8, spent: 17100, note: '', branch: 'ind' },
    { id: 5, name: 'Devika Rao', phone: '+91 90110 55433', email: 'devika@example.com', visits: 7, spent: 15000, note: '', branch: 'kor' }
  ],
  services: [
    { id: 1, name: 'Haircut & style', category: 'Hair', duration: 60, price: 1800, icon: '✂' },
    { id: 2, name: 'Balayage + blow-dry', category: 'Hair', duration: 90, price: 6800, icon: '✦' },
    { id: 3, name: 'Signature facial', category: 'Skin', duration: 90, price: 3200, icon: '◌' },
    { id: 4, name: 'Gel manicure', category: 'Nails', duration: 60, price: 1600, icon: '◈' },
    { id: 5, name: 'Bridal makeup', category: 'Makeup', duration: 120, price: 8500, icon: '♕' }
  ],
  staff: [
    { id: 1, name: 'Sneha Patel', role: 'Senior stylist', speciality: 'Colour & styling', sales: 12400, target: 76, branch: 'ind', initials: 'SP' },
    { id: 2, name: 'Kavya Patel', role: 'Nail artist', speciality: 'Nail art & care', sales: 5200, target: 61, branch: 'ind', initials: 'KP' },
    { id: 3, name: 'Priya Iyer', role: 'Skin therapist', speciality: 'Advanced facials', sales: 4850, target: 58, branch: 'ind', initials: 'PI' },
    { id: 4, name: 'Anjali Nair', role: 'Salon manager', speciality: 'Operations', sales: 0, target: 0, branch: 'kor', initials: 'AN' }
  ],
  appointments: [
    { id: 1, clientId: 1, serviceId: 2, staffId: 1, time: '09:00', duration: 90, date: '2026-08-10', branch: 'ind', status: 'confirmed', paid: false },
    { id: 2, clientId: 2, serviceId: 4, staffId: 2, time: '10:45', duration: 60, date: '2026-08-11', branch: 'ind', status: 'confirmed', paid: false },
    { id: 3, clientId: 3, serviceId: 3, staffId: 3, time: '12:00', duration: 90, date: '2026-08-10', branch: 'ind', status: 'confirmed', paid: false },
    { id: 4, clientId: 4, serviceId: 1, staffId: 1, time: '13:45', duration: 60, date: '2026-08-11', branch: 'ind', status: 'completed', paid: true },
    { id: 5, clientId: 5, serviceId: 1, staffId: 4, time: '11:30', duration: 60, date: '2026-08-12', branch: 'kor', status: 'confirmed', paid: false }
  ],
  inventory: [
    { id: 1, name: 'Olaplex No.3', sku: 'OLX-003', category: 'Hair care', stock: 3, reorder: 8, unit: 2400, branch: 'ind' },
    { id: 2, name: 'Dermalogica cleanser', sku: 'DRM-202', category: 'Skin care', stock: 5, reorder: 6, unit: 1950, branch: 'ind' },
    { id: 3, name: 'Gel polish — Blush', sku: 'GEL-112', category: 'Nail care', stock: 2, reorder: 5, unit: 850, branch: 'ind' },
    { id: 4, name: 'Kerastase serum', sku: 'KRS-491', category: 'Hair care', stock: 11, reorder: 5, unit: 3100, branch: 'ind' },
    { id: 5, name: 'Olaplex No.3', sku: 'OLX-003', category: 'Hair care', stock: 6, reorder: 8, unit: 2400, branch: 'kor' }
  ],
  invoices: [{ id: 1001, clientId: 4, appointmentId: 4, total: 2124, payment: 'UPI', branch: 'ind', date: '2026-08-10' }],
  campaigns: [{ id: 1, name: 'Monsoon hair revival', channel: 'WhatsApp', audience: '132 clients', status: 'Sent', branch: 'ind' }, { id: 2, name: 'Facial follow-up', channel: 'Email', audience: '86 clients', status: 'Draft', branch: 'ind' }],
  purchaseOrders: [
    { id: 1, code: 'PO-2048', supplier: 'Beauty Supply Co.', expectedDate: '2026-08-12', status: 'Ordered', branch: 'ind', lines: [{ inventoryId: 1, quantity: 12 }, { inventoryId: 4, quantity: 6 }] },
    { id: 2, code: 'PO-2051', supplier: 'Nail Pro Studio', expectedDate: '2026-08-14', status: 'Draft', branch: 'ind', lines: [{ inventoryId: 3, quantity: 8 }] }
  ],
  marketingPlans: [],
  inventoryHistory: [
    { inventoryId: 1, branch: 'ind', weeks: [4, 5, 4, 6, 5, 4, 5, 6] }, { inventoryId: 2, branch: 'ind', weeks: [3, 4, 4, 3, 5, 4, 4, 5] },
    { inventoryId: 3, branch: 'ind', weeks: [2, 3, 3, 4, 3, 2, 4, 3] }, { inventoryId: 4, branch: 'ind', weeks: [5, 6, 5, 7, 6, 5, 6, 7] },
    { inventoryId: 5, branch: 'kor', weeks: [3, 3, 4, 3, 4, 3, 4, 3] }
  ]
};

let state = JSON.parse(localStorage.getItem('salon-genie-data') || 'null') || seed;
if (typeof state.organisation.multiBranch !== 'boolean') state.organisation.multiBranch = state.branches.length > 1;
if (!state.expenses || Array.isArray(state.expenses) || typeof state.expenses !== 'object') state.expenses = {};
if (!Array.isArray(state.purchaseOrders)) state.purchaseOrders = seed.purchaseOrders.map(order => ({ ...order, lines: order.lines.map(line => ({ ...line })) }));
if (!Array.isArray(state.inventoryHistory)) state.inventoryHistory = seed.inventoryHistory.map(record => ({ ...record, weeks: [...record.weeks] }));
if (!Array.isArray(state.marketingPlans)) state.marketingPlans = [];
if (!state.preferences || typeof state.preferences !== 'object') state.preferences = {};
if (!['normal', 'insight'].includes(state.preferences.displayMode)) state.preferences.displayMode = 'normal';
let view = new URLSearchParams(window.location.search).get('view') || 'overview';
let selectedAppointment = null;
let selectedPayment = 'UPI';
let walkInDraft = { clientId: null, date: new Date().toISOString().slice(0, 10), payment: 'UPI', items: [] };
let marketingCampaignPage = 0;
let reportView = 'sales';
let calendarMode = new URLSearchParams(window.location.search).get('calendar') || 'today';
let calendarStaffId = 'all';
let calendarLayout = 'calendar';
const calendarToday = '2026-08-10';
const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const toast = document.getElementById('toast');
const money = value => `₹${Number(value).toLocaleString('en-IN')}`;
const currentBranch = () => state.branches.find(b => b.id === state.activeBranch);
const local = (collection) => state[collection].filter(item => item.branch === state.activeBranch);
const client = id => state.clients.find(item => item.id === Number(id));
const service = id => state.services.find(item => item.id === Number(id));
const staff = id => state.staff.find(item => item.id === Number(id));
const persist = () => localStorage.setItem('salon-genie-data', JSON.stringify(state));
const initials = name => name.split(' ').map(n => n[0]).slice(0,2).join('');
const nextId = key => Math.max(0, ...state[key].map(x => Number(x.id) || 0)) + 1;
const appointmentDate = appointment => appointment.date || calendarToday;
const calendarDays = [
  { date: '2026-08-10', day: 'Mon', label: '10 Aug' }, { date: '2026-08-11', day: 'Tue', label: '11 Aug' },
  { date: '2026-08-12', day: 'Wed', label: '12 Aug' }, { date: '2026-08-13', day: 'Thu', label: '13 Aug' },
  { date: '2026-08-14', day: 'Fri', label: '14 Aug' }, { date: '2026-08-15', day: 'Sat', label: '15 Aug' },
  { date: '2026-08-16', day: 'Sun', label: '16 Aug' }
];
const calendarDates = () => calendarMode === 'week' ? calendarDays.map(day => day.date) : [calendarMode === 'tomorrow' ? '2026-08-11' : calendarToday];
const filteredCalendarAppointments = () => local('appointments').filter(appointment => calendarDates().includes(appointmentDate(appointment)) && (calendarStaffId === 'all' || appointment.staffId === Number(calendarStaffId)));
const bookedSalesEstimate = appointments => appointments.filter(appointment => appointment.status === 'confirmed').reduce((total, appointment) => total + service(appointment.serviceId).price, 0);
const calendarDateLabel = () => calendarMode === 'week' ? '10–16 August 2026' : calendarMode === 'tomorrow' ? 'Tuesday, 11 August' : 'Monday, 10 August';

function alertToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }
function navButton(key, icon, label, badge = '') { return `<button class="nav-item ${view === key ? 'active' : ''}" data-view="${key}"><span class="nav-icon">${icon}</span>${label}${badge ? `<b class="pill">${badge}</b>` : ''}</button>`; }
function layout(content) {
  const b = currentBranch();
  app.innerHTML = `<div class="shell"><aside class="sidebar"><div class="logo"><span class="logo-mark">S</span>Salon Genie</div><p class="workspace-label">YOUR SALON GROUP</p><button class="branch-switch" id="branch-switch"><span class="branch-dot">${b.code}</span><span><strong>${state.organisation.name}</strong><small>${b.name} · ${b.city}</small></span><span>⌄</span></button><div class="branch-menu" id="branch-menu" hidden>${state.branches.map(x => `<button data-branch="${x.id}">${x.name} · ${x.city}</button>`).join('')}<button class="branch-add" data-action="branch">＋ Add branch</button></div><nav>${navButton('overview','⌂','Overview')}${navButton('calendar','▦','Calendar',local('appointments').filter(x => x.status === 'confirmed').length)}${navButton('clients','◉','Clients')}${navButton('checkout','▣','Checkout')}${navButton('services','✦','Services')}${navButton('team','♧','Team')}${navButton('inventory','▤','Inventory',local('inventory').filter(x => x.stock <= x.reorder).length)}<p class="section-label">INSIGHTS</p>${navButton('reports','◔','Reports')}${navButton('marketing','◇','Marketing')}</nav><div class="sidebar-bottom"><section class="growth-platform-card"><span class="growth-platform-icon">↗</span><span><strong>Grow your salon</strong><small>with Growth Platform</small></span></section>${navButton('settings','⚙','Settings')}<button class="profile"><span class="avatar">AR</span><span><strong>${state.organisation.owner}</strong><small>Group owner</small></span><span>⋮</span></button></div></aside><main><header class="topbar"><button class="plain-icon mobile-menu" id="mobile-menu">☰</button><p>Monday, 10 August <span>·</span> <strong>${b.name} branch</strong></p><div class="top-actions"><button class="plain-icon" title="Search">⌕</button><button class="notification" title="Notifications">♧</button><button class="notification" title="Help">?</button></div></header><section class="page">${content}</section></main></div>`;
  const growthPlatformCopy = app.querySelector('.growth-platform-card span:last-child');
  if (growthPlatformCopy) growthPlatformCopy.innerHTML = '<strong>Grow your revenue</strong><small>with SalonGrowth Platform</small>';
  const growthPlatformLink = app.querySelector('.growth-platform-card');
  if (growthPlatformLink) { growthPlatformLink.tabIndex = 0; growthPlatformLink.setAttribute('role', 'link'); growthPlatformLink.onclick = () => { window.location.href = 'growth-platform.html'; }; growthPlatformLink.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') growthPlatformLink.click(); }; }
  const salonSummary = app.querySelector('.branch-switch span:nth-child(2)');
  if (salonSummary) salonSummary.innerHTML = `<strong>${state.organisation.name}</strong><small>${b.name} · ${b.city}</small>`;
  if (!state.organisation.multiBranch) { app.querySelector('#branch-switch')?.remove(); app.querySelector('#branch-menu')?.remove(); }
  app.querySelector('.profile')?.remove();
  if (growthPlatformLink) {
    growthPlatformLink.insertAdjacentHTML('afterend', '<section class="growth-platform-card marketplace-card" role="button" tabindex="0"><span class="growth-platform-icon">◇</span><span><strong>Expand Salon Genie</strong><small>Visit Salon Genie Marketplace</small></span></section>');
    const marketplaceCard = app.querySelector('.marketplace-card');
    const openMarketplace = () => alertToast('Salon Genie Marketplace is coming soon.');
    marketplaceCard.onclick = openMarketplace;
    marketplaceCard.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') openMarketplace(); };
  }
  app.querySelector('.shell').dataset.currentView = view;
  app.querySelector('.shell').dataset.displayMode = state.preferences.displayMode;
  applyDisplayDensity();
  if (view === 'settings') {
    app.querySelector('.page-head .actions')?.insertAdjacentHTML('beforeend', displayModeControl());
    app.querySelectorAll('button[data-display-mode]').forEach(button => button.addEventListener('click', () => {
      state.preferences.displayMode = button.dataset.displayMode;
      persist();
      render();
      alertToast(`${state.preferences.displayMode === 'insight' ? 'Insight' : 'Normal'} mode enabled.`);
    }));
  }
}
function pageHead(label, title, description, actions = '') { return `<div class="page-head"><div><p class="eyebrow">${label}</p><h1>${title}</h1>${description ? `<p>${description}</p>` : ''}</div><div class="actions">${actions}</div></div>`; }

function displayModeControl() {
  const mode = state.preferences.displayMode;
  return `<div class="display-mode-control" role="group" aria-label="Screen detail level"><span>Screen detail</span><button class="${mode === 'normal' ? 'active' : ''}" type="button" data-display-mode="normal">Normal</button><button class="${mode === 'insight' ? 'active' : ''}" type="button" data-display-mode="insight">Insight</button></div>`;
}

function applyDisplayDensity() {
  const clientTable = app.querySelector('.data-table');
  if (view === 'clients' && clientTable) {
    clientTable.classList.add('clients-density-table');
    if (app.querySelector('.client-follow-up-button')?.classList.contains('primary')) clientTable.classList.add('is-follow-up');
  }
}

function dashboard() {
  const appts = local('appointments'); const inventory = local('inventory'); const sales = local('invoices').reduce((sum, invoice) => sum + invoice.total, 26336); const upcoming = appts.filter(x => x.status === 'confirmed');
  layout(`${pageHead(`${currentBranch().name.toUpperCase()} BRANCH`, 'Here’s your day at a glance.', 'Keep the front desk moving, without losing the detail.', `<button class="btn secondary" data-action="walkin">＋ Walk-in</button><button class="btn primary" data-action="booking">＋ New booking</button>`)}<div class="stat-grid"><article class="stat"><span class="stat-icon">₹</span><div><p>Today’s sales</p><strong>${money(sales)}</strong><small class="good">↗ 18.2% <span>vs last Monday</span></small></div></article><article class="stat"><span class="stat-icon">◷</span><div><p>Appointments</p><strong>${appts.length} / 24</strong><small>${24-appts.length} slots still available</small></div></article><article class="stat"><span class="stat-icon">◉</span><div><p>New clients</p><strong>${local('clients').filter(c => c.visits <= 1).length}</strong><small class="good">↗ 2 more <span>than usual</span></small></div></article><article class="stat"><span class="stat-icon">★</span><div><p>Average rating</p><strong>4.9 / 5</strong><small>Based on 42 recent reviews</small></div></article></div><div class="grid"><article class="panel"><div class="panel-head"><div><h2>Today’s schedule</h2><p>Monday, 10 August</p></div><button class="text-link" data-view="calendar">View calendar →</button></div><div class="schedule-toolbar"><div class="date-control"><button>‹</button><strong>Today</strong><button>›</button></div><small>All available team members</small></div>${scheduleHtml(appts)}<button class="add-row" data-action="booking">＋ Add appointment</button></article><div class="side-stack"><article class="panel"><div class="panel-head"><div><h2>Revenue</h2><p>4–10 August</p></div><button class="text-link" data-view="reports">View report →</button></div><div class="revenue-total"><strong>${money(184320)}</strong><span class="tag">↗ 12.4%</span></div><div class="chart">${[45,68,52,83,64,94,38].map((n,i)=>`<i class="${i===5?'active':''}" style="height:${n}%" data-label="${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}"></i>`).join('')}</div></article><article class="panel"><div class="panel-head"><div><h2>Needs your attention</h2><p>Keep things running smoothly</p></div></div><div class="notice-list"><div class="notice"><span class="notice-icon">▤</span><span><strong>${inventory.filter(x=>x.stock<=x.reorder).length} products low in stock</strong><small>Reorder before Friday</small></span><button data-view="inventory">›</button></div><div class="notice"><span class="notice-icon">₹</span><span><strong>${upcoming.length} payments pending</strong><small>${money(upcoming.reduce((s,a)=>s+service(a.serviceId).price,0))} awaiting collection</small></span><button data-view="checkout">›</button></div></div></article></div></div><div class="lower-grid"><article class="panel"><div class="panel-head"><div><h2>Clients to welcome</h2><p>Arriving in the next two hours</p></div><button class="text-link" data-view="clients">View all →</button></div><div class="list">${upcoming.slice(0,3).map(a => personRow(a)).join('') || '<div class="empty">No upcoming appointments.</div>'}</div></article><article class="panel"><div class="panel-head"><div><h2>Team pulse</h2><p>Today’s performance</p></div><button class="text-link" data-view="team">Team report →</button></div>${teamPulse()}</article></div>`);
}
function scheduleHtml(appts) { const slots = ['9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM']; return `<div class="schedule"><div class="times">${slots.map(x=>`<span>${x}</span>`).join('')}</div><div class="appointments">${appts.map(a=>{const top=(parseInt(a.time.slice(0,2))-9)*56+(parseInt(a.time.slice(3))/60)*56; const c=client(a.clientId), s=service(a.serviceId), st=staff(a.staffId); return `<button class="appointment ${a.status==='completed'?'completed':a.paid?'completed':'pending'}" style="top:${top}px;height:${Math.max(44,a.duration/60*56-4)}px" data-appointment="${a.id}"><strong>${c.name}</strong><small>${a.time} · ${s.name} · ${st.name.split(' ')[0]}</small><span class="status">${a.paid?'Paid':a.status==='completed'?'Completed':'Confirmed'}</span></button>`}).join('')}</div></div>`; }
function personRow(a) { const c=client(a.clientId), s=service(a.serviceId); return `<div class="person-row"><span class="avatar">${initials(c.name)}</span><span class="person-copy"><strong>${c.name} ${c.vip?'<span class="badge gold">VIP</span>':''}</strong><small>${a.time} · ${s.name}</small></span><b>${money(s.price)}</b><button data-appointment="${a.id}">›</button></div>`; }
function teamPulse() { const members=local('staff'); const top=members.reduce((a,b)=>a.sales>b.sales?a:b, members[0]); return top ? `<div class="team-highlight"><div><span class="avatar">${top.initials}</span><span><strong>${top.name}</strong><small>Top performer today</small></span></div><strong>${money(top.sales)}</strong></div><div class="progress-copy"><span>Group sales target</span><strong>76%</strong></div><div class="progress"><i style="width:76%"></i></div>` : '<div class="empty">Add team members to see performance.</div>'; }
function calendar() { const appts=local('appointments'); layout(`${pageHead('APPOINTMENTS', 'Calendar', 'Manage schedules, walk-ins, and client time in one place.', `<button class="btn primary" data-action="booking">＋ New booking</button>`)}<article class="panel"><div class="panel-head"><div><h2>Monday, 10 August</h2><p>${appts.length} appointments · ${appts.filter(a=>a.status==='confirmed').length} confirmed</p></div><div class="date-control"><button>‹</button><strong>Today</strong><button>›</button></div></div><div class="schedule-toolbar"><small>Click an appointment to view its details or complete checkout.</small><button class="text-link" data-action="booking">＋ Add appointment</button></div>${scheduleHtml(appts)}</article>`); }
function clients() { const entries=local('clients'); layout(`${pageHead('CLIENT DIRECTORY','Clients','Know every preference, visit, and opportunity.', `<button class="btn primary" data-action="client">＋ Add client</button>`)}<article class="panel table-panel"><div class="table-head"><div><h2>All clients</h2><p>${entries.length} clients at ${currentBranch().name}</p></div><input class="search" id="client-search" placeholder="Search clients" /></div><table class="data-table"><thead><tr><th>CLIENT</th><th>CONTACT</th><th>VISITS</th><th>LIFETIME SPEND</th><th></th></tr></thead><tbody id="client-table">${clientsRows(entries)}</tbody></table></article>`); }
function clientsRows(entries) { return entries.length?entries.map(c=>`<tr><td><strong>${c.name} ${c.vip?'<span class="badge gold">VIP</span>':''}</strong><small>${c.note || 'No client note'}</small></td><td>${c.phone}<small>${c.email}</small></td><td>${c.visits}</td><td>${money(c.spent)}</td><td><button data-client="${c.id}">Open →</button></td></tr>`).join(''):`<tr><td colspan="5"><div class="empty">No clients match this search.</div></td></tr>`; }
function services() { const entries=state.services; layout(`${pageHead('SERVICE CATALOGUE','Services','Set prices, durations, and the treatments your team offers.', `<button class="btn primary" data-action="service">＋ Add service</button>`)}<div class="cards">${entries.map(s=>`<article class="service-card"><span class="service-icon">${s.icon}</span><h3>${s.name}</h3><p>${s.category} · ${s.duration} minutes</p><footer><span>${money(s.price)}</span><button class="text-link" data-service="${s.id}">Edit</button></footer></article>`).join('')}</div>`); }
function teamMemberAnalytics(member) {
  const appointments = local('appointments').filter(appointment => appointment.staffId === member.id && appointment.status !== 'cancelled');
  const appointmentSales = appointments.reduce((sum, appointment) => sum + (service(appointment.serviceId)?.price || 0), 0);
  const sales = Number(member.sales) || appointmentSales;
  const bookedMinutes = appointments.reduce((sum, appointment) => sum + Number(appointment.duration || 0), 0);
  const targetSales = member.target ? Math.round(sales / (member.target / 100)) : 0;
  const serviceBreakdown = Object.values(appointments.reduce((items, appointment) => {
    const treatment = service(appointment.serviceId);
    if (!treatment) return items;
    items[treatment.id] = items[treatment.id] || { name: treatment.name, count: 0, value: 0 };
    items[treatment.id].count += 1;
    items[treatment.id].value += treatment.price;
    return items;
  }, {})).sort((a, b) => b.value - a.value);
  return {
    appointments, sales, appointmentSales, bookedMinutes, targetSales,
    utilization: Math.min(100, Math.round(bookedMinutes / 480 * 100)),
    averageTicket: appointments.length ? Math.round(appointmentSales / appointments.length) : 0,
    clients: new Set(appointments.map(appointment => appointment.clientId)).size,
    rating: (4.6 + (member.id % 4) * 0.1).toFixed(1),
    rebookRate: 56 + member.id * 7,
    serviceBreakdown
  };
}

function team() {
  const entries = local('staff');
  const members = entries.map(member => ({ member, metrics: teamMemberAnalytics(member) }));
  const totalSales = members.reduce((sum, item) => sum + item.metrics.sales, 0);
  const totalTarget = members.reduce((sum, item) => sum + item.metrics.targetSales, 0);
  const totalAppointments = members.reduce((sum, item) => sum + item.metrics.appointments.length, 0);
  const averageRating = members.length ? (members.reduce((sum, item) => sum + Number(item.metrics.rating), 0) / members.length).toFixed(1) : '—';
  const teamTargetProgress = totalTarget ? Math.round(totalSales / totalTarget * 100) : 0;
  const leader = [...members].sort((a, b) => b.metrics.sales - a.metrics.sales)[0];
  layout(`${pageHead('TEAM PERFORMANCE', 'Team analytics', 'Know who is driving sales, delighting clients, and where coaching can help.', `<button class="btn primary" data-action="staff">Add team member</button>`)}${members.length ? `<div class="team-kpi-grid"><article class="team-kpi"><span>Team sales</span><strong>${money(totalSales)}</strong><small>${teamTargetProgress}% of this period’s target</small></article><article class="team-kpi"><span>Appointments</span><strong>${totalAppointments}</strong><small>${members.reduce((sum, item) => sum + item.metrics.clients, 0)} clients served</small></article><article class="team-kpi"><span>Average client rating</span><strong>${averageRating} <em>/ 5</em></strong><small>Across team feedback</small></article><article class="team-kpi"><span>Rebooking health</span><strong>${Math.round(members.reduce((sum, item) => sum + item.metrics.rebookRate, 0) / members.length)}%</strong><small>Clients likely to return</small></article></div><div class="team-analytics-grid"><article class="panel team-performance-panel"><div class="panel-head"><div><h2>Team performance</h2><p>Current period · ${currentBranch().name}</p></div><span class="team-period">This week</span></div><div class="team-performance-table"><div class="team-performance-head"><span>Team member</span><span>Sales & target</span><span>Bookings</span><span>Client care</span><span></span></div>${members.sort((a, b) => b.metrics.sales - a.metrics.sales).map(({ member, metrics }, index) => `<article class="team-performance-row"><div class="team-member-cell"><span class="team-rank">${index + 1}</span><span class="avatar">${member.initials}</span><span><strong>${member.name}</strong><small>${member.role} · ${member.speciality}</small></span></div><div class="team-sales-cell"><strong>${money(metrics.sales)}</strong><span><i style="width:${Math.min(member.target || 0, 100)}%"></i></span><small>${member.target || 0}% to target</small></div><div class="team-booking-cell"><strong>${metrics.appointments.length}</strong><small>${metrics.utilization}% chair time used</small></div><div class="team-care-cell"><strong>★ ${metrics.rating}</strong><small>${metrics.rebookRate}% rebook rate</small></div><button class="text-link" data-team-profile="${member.id}">View analytics →</button></article>`).join('')}</div></article><aside class="team-side-stack"><article class="team-leader-card"><div><span class="eyebrow">TOP PERFORMER</span><h2>${leader.member.name}</h2><p>${leader.member.role} · ${leader.member.speciality}</p></div><span class="avatar">${leader.member.initials}</span><strong>${money(leader.metrics.sales)}</strong><small>${leader.member.target}% of target · ★ ${leader.metrics.rating} client rating</small><button class="text-link" data-team-profile="${leader.member.id}">Open ${leader.member.name.split(' ')[0]}’s analytics →</button></article><article class="panel team-coaching-card"><div class="panel-head"><div><h2>Manager focus</h2><p>Useful conversations for this week</p></div></div><div class="team-focus-list">${members.sort((a, b) => a.metrics.utilization - b.metrics.utilization).slice(0, 2).map(({ member, metrics }) => `<div><span class="team-focus-icon">↗</span><p><strong>${member.name}</strong><small>${metrics.utilization < 40 ? `Has ${100 - metrics.utilization}% chair time open — consider assigning more suitable bookings.` : `Has a full schedule — check in on workload and support.`}</small></p></div>`).join('')}<div><span class="team-focus-icon">★</span><p><strong>Protect client loyalty</strong><small>Team rebooking is ${Math.round(members.reduce((sum, item) => sum + item.metrics.rebookRate, 0) / members.length)}%. Follow up with guests who have not booked their next visit.</small></p></div></div></article></aside></div><div class="team-detail-grid"><article class="panel"><div class="panel-head"><div><h2>Sales contribution</h2><p>Who is contributing to branch sales</p></div></div><div class="team-contribution-list">${members.sort((a, b) => b.metrics.sales - a.metrics.sales).map(({ member, metrics }) => `<div><span class="avatar">${member.initials}</span><span><strong>${member.name}</strong><small>${money(metrics.sales)} in sales</small></span><i><b style="width:${totalSales ? Math.round(metrics.sales / totalSales * 100) : 0}%"></b></i><em>${totalSales ? Math.round(metrics.sales / totalSales * 100) : 0}%</em></div>`).join('')}</div></article><article class="panel"><div class="panel-head"><div><h2>Service & capacity view</h2><p>Spot skills to promote and time to fill</p></div></div><div class="team-capacity-list">${members.map(({ member, metrics }) => `<div><span><strong>${member.name}</strong><small>${metrics.serviceBreakdown[0] ? `Most booked: ${metrics.serviceBreakdown[0].name}` : `Speciality: ${member.speciality}`}</small></span><span class="capacity-meter"><i style="width:${metrics.utilization}%"></i></span><b>${metrics.utilization}% used</b></div>`).join('')}</div></article></div><section class="team-attendance-section"><div><span class="eyebrow">ATTENDANCE & TIME</span><h2>Keep shifts and payroll visible</h2><p>These measures will become live once clock-in, shift, and leave records are connected.</p></div><div class="team-attendance-cards"><article><span class="team-attendance-icon">◷</span><div><strong>Attendance</strong><b>Not tracked yet</b><small>Working days, leave, and absences</small></div></article><article><span class="team-attendance-icon">✓</span><div><strong>On-time arrival</strong><b>Not tracked yet</b><small>Arrival compared with scheduled shift</small></div></article><article><span class="team-attendance-icon">₹</span><div><strong>OT due</strong><b>Not tracked yet</b><small>Approved overtime ready for payroll</small></div></article></div></section>` : '<article class="panel"><div class="empty">Add team members to start tracking performance, capacity, sales, and client care.</div></article>'}`);
}

function teamProfileModal(id) {
  const member = staff(id), metrics = teamMemberAnalytics(member);
  const topService = metrics.serviceBreakdown[0];
  modal(`${member.name}’s analytics`, `${member.role} · ${member.speciality}`, `<div class="team-profile-kpis"><span><small>Sales</small><strong>${money(metrics.sales)}</strong></span><span><small>Target progress</small><strong>${member.target || 0}%</strong></span><span><small>Client rating</small><strong>★ ${metrics.rating}</strong></span><span><small>Rebook rate</small><strong>${metrics.rebookRate}%</strong></span></div><div class="team-profile-section"><strong>Booking & capacity</strong><div><span>${metrics.appointments.length} booked appointment${metrics.appointments.length === 1 ? '' : 's'} · ${metrics.clients} client${metrics.clients === 1 ? '' : 's'}</span><span>${metrics.utilization}% chair time used</span></div><i><b style="width:${metrics.utilization}%"></b></i></div><div class="team-profile-section"><strong>Service insight</strong><p>${topService ? `${topService.name} is the highest-value booked service so far, bringing ${money(topService.value)} from ${topService.count} booking${topService.count === 1 ? '' : 's'}.` : `No services are booked yet. Promote ${member.speciality.toLowerCase()} to fill the next available slots.`}</p></div><div class="team-profile-section"><strong>Manager prompt</strong><p>${metrics.utilization < 40 ? `There is room in ${member.name.split(' ')[0]}’s schedule. Use targeted offers or route suitable walk-ins to build momentum.` : `${member.name.split(' ')[0]} has a healthy workload. Review client feedback and rebooking before adding more appointments.`}</p></div>`, 'Close');
  document.getElementById('modal-form').onsubmit = event => { event.preventDefault(); closeModal(); };
}
const serviceInventoryUsage = {
  1: [{ inventoryId: 4, quantity: .1 }], 2: [{ inventoryId: 1, quantity: .35 }, { inventoryId: 4, quantity: .15 }],
  3: [{ inventoryId: 2, quantity: .5 }], 4: [{ inventoryId: 3, quantity: .2 }]
};

function inventoryForecast(item) {
  const orders = state.purchaseOrders.filter(order => order.branch === state.activeBranch && order.status !== 'Received');
  const incoming = orders.reduce((sum, order) => sum + order.lines.filter(line => line.inventoryId === item.id).reduce((lineTotal, line) => lineTotal + Number(line.quantity), 0), 0);
  const bookedNeed = local('appointments').filter(appointment => appointment.status === 'confirmed' && appointmentDate(appointment) >= calendarToday).reduce((sum, appointment) => {
    const use = (serviceInventoryUsage[appointment.serviceId] || []).find(record => record.inventoryId === item.id);
    return sum + (use ? use.quantity : 0);
  }, 0);
  const history = state.inventoryHistory.find(record => record.branch === state.activeBranch && record.inventoryId === item.id)?.weeks || [];
  const weeklyForecast = history.length === 8 ? history.reduce((sum, week) => sum + week, 0) / 8 : null;
  const projectedNeed = weeklyForecast === null ? bookedNeed : Math.max(weeklyForecast, bookedNeed);
  const availableAfterBookings = item.stock - bookedNeed;
  const projectedAfterIncoming = item.stock + incoming - projectedNeed;
  return { incoming, bookedNeed, history, weeklyForecast, projectedNeed, availableAfterBookings, projectedAfterIncoming, suggestedOrder: Math.max(0, Math.ceil(projectedNeed - item.stock - incoming)) };
}

function inventory() {
  const entries = local('inventory');
  const products = entries.map(item => ({ item, forecast: inventoryForecast(item) }));
  const orders = state.purchaseOrders.filter(order => order.branch === state.activeBranch && order.status !== 'Received');
  const bookedRisks = products.filter(({ forecast }) => forecast.availableAfterBookings < 0);
  const forecastRisks = products.filter(({ forecast }) => forecast.projectedAfterIncoming < 0);
  const incomingUnits = products.reduce((sum, { forecast }) => sum + forecast.incoming, 0);
  layout(`${pageHead('INVENTORY PLANNING', 'Inventory', 'Keep the shelf stocked today while planning exactly what is needed next.', `<button class="btn secondary" data-action="purchase-order">Create purchase order</button><button class="btn primary" data-action="inventory">Add product</button>`)}<div class="inventory-kpi-grid"><article><span>Current inventory</span><strong>${entries.reduce((sum, item) => sum + item.stock, 0)} units</strong><small>${entries.length} stocked items at ${currentBranch().name}</small></article><article class="${bookedRisks.length ? 'is-risk' : ''}"><span>Appointment shortages</span><strong>${bookedRisks.length ? `${bookedRisks.length} at risk` : 'All covered'}</strong><small>Based on confirmed future appointments</small></article><article><span>Ordering inventory</span><strong>${incomingUnits} units</strong><small>${orders.length} open purchase order${orders.length === 1 ? '' : 's'}</small></article><article class="${forecastRisks.length ? 'is-risk' : ''}"><span>8-week forecast</span><strong>${forecastRisks.length ? `${forecastRisks.length} to order` : 'On track'}</strong><small>Demand based on the last 8 weeks</small></article></div><div class="inventory-planning-grid"><article class="panel inventory-current-panel"><div class="panel-head"><div><h2>Current inventory</h2><p>On hand, committed to bookings, and still available to use.</p></div><span class="inventory-key"><i></i> Appointment allocation</span></div><div class="inventory-current-table"><div class="inventory-table-head"><span>Product</span><span>On hand</span><span>Booked need</span><span>Available now</span><span>8-week need</span><span></span></div>${products.map(({ item, forecast }) => `<article class="inventory-current-row ${forecast.availableAfterBookings < 0 ? 'shortage' : ''}"><span><strong>${item.name}</strong><small>${item.category} · ${item.sku}</small></span><b>${item.stock}</b><b class="inventory-allocation">${forecast.bookedNeed ? forecast.bookedNeed.toFixed(1) : '—'}</b><b>${forecast.availableAfterBookings.toFixed(1)}</b><span class="inventory-forecast-value"><strong>${forecast.weeklyForecast === null ? 'Collecting data' : `${forecast.weeklyForecast.toFixed(1)} units`}</strong><small>${forecast.history.length === 8 ? 'Average weekly use' : 'Need 8 weeks of use'}</small></span><button class="text-link" data-restock="${item.id}">Update stock</button></article>`).join('')}</div></article><aside class="inventory-alert-stack"><article class="inventory-alert-card ${bookedRisks.length ? 'risk' : ''}"><span class="inventory-alert-icon">◷</span><div><h2>Appointment readiness</h2><strong>${bookedRisks.length ? 'Stock needs attention' : 'Every booked appointment is covered'}</strong><p>${bookedRisks.length ? `${bookedRisks.map(({ item }) => item.name).join(', ')} will fall below zero after booked services are allocated.` : 'Product allocation is checked against confirmed upcoming services.'}</p></div></article><article class="inventory-alert-card"><span class="inventory-alert-icon">↗</span><div><h2>How forecasts work</h2><p>Weekly demand uses the last 8 weeks of product consumption. It is compared with stock on hand and incoming orders before recommending a purchase.</p></div></article></aside></div><div class="inventory-forward-grid"><article class="panel inventory-order-panel"><div class="panel-head"><div><h2>Ordering inventory</h2><p>Open orders that will increase available stock.</p></div><button class="text-link" data-action="purchase-order">Create order →</button></div><div class="purchase-order-list">${orders.length ? orders.map(order => `<article><span class="purchase-order-mark">${order.status === 'Draft' ? '◌' : '✓'}</span><span><strong>${order.code} · ${order.supplier}</strong><small>${order.lines.map(line => `${entries.find(item => item.id === line.inventoryId)?.name || 'Product'} (${line.quantity})`).join(' · ')}</small></span><span><b>${order.status}</b><small>Expected ${order.expectedDate}</small></span></article>`).join('') : '<div class="empty">No orders are in progress.</div>'}</div></article><article class="panel inventory-order-panel"><div class="panel-head"><div><h2>Recommended order</h2><p>What to buy after accounting for stock and open orders.</p></div></div><div class="recommended-order-list">${products.filter(({ forecast }) => forecast.suggestedOrder > 0).length ? products.filter(({ forecast }) => forecast.suggestedOrder > 0).map(({ item, forecast }) => `<article><span><strong>${item.name}</strong><small>${forecast.weeklyForecast?.toFixed(1) || '—'} weekly forecast · ${forecast.incoming} incoming</small></span><b>Order ${forecast.suggestedOrder}</b></article>`).join('') : '<div class="inventory-covered">Everything is covered by on-hand and incoming stock for the current forecast.</div>'}</div></article></div>`);
}
function checkout() { const entries=local('appointments').filter(a=>!a.paid); const current=entries.find(a=>a.id===selectedAppointment)||entries[0]; selectedAppointment=current?.id||null; layout(`${pageHead('POINT OF SALE','Checkout','Close appointments with a clear, accurate bill.')}${current?`<div class="checkout-layout"><article class="panel"><div class="panel-head"><div><h2>Ready to checkout</h2><p>Select an appointment to prepare its bill.</p></div></div><div class="checkout-list">${entries.map(a=>`<button class="${current.id===a.id?'selected':''}" data-checkout="${a.id}"><span class="avatar">${initials(client(a.clientId).name)}</span><span><strong>${client(a.clientId).name}</strong><small>${a.time} · ${service(a.serviceId).name} with ${staff(a.staffId).name}</small></span><strong>${money(service(a.serviceId).price)}</strong></button>`).join('')}</div></article><article class="panel"><div class="panel-head"><div><h2>Invoice preview</h2><p>${currentBranch().name} · #SG-${1000+current.id}</p></div></div><div class="bill-lines"><div class="bill-line"><span>${service(current.serviceId).name}</span><strong>${money(service(current.serviceId).price)}</strong></div><div class="bill-line"><span>GST (${state.organisation.tax}%)</span><strong>${money(service(current.serviceId).price*state.organisation.tax/100)}</strong></div></div><div class="bill-total"><span>Total</span><span>${money(service(current.serviceId).price*(1+state.organisation.tax/100))}</span></div><label class="eyebrow">PAYMENT METHOD</label><div class="payment-methods">${['UPI','Card','Cash'].map(x=>`<button class="${selectedPayment===x?'active':''}" data-payment="${x}">${x}</button>`).join('')}</div><button class="btn primary full" data-action="pay">Collect ${money(service(current.serviceId).price*(1+state.organisation.tax/100))}</button></article></div>`:'<article class="panel"><div class="empty">All appointments are paid. Great work!</div></article>'}`); }
function reports() { const invoices=local('invoices'); const revenue=invoices.reduce((s,x)=>s+x.total,26336); const visits=local('appointments').length; layout(`${pageHead('BUSINESS INSIGHTS','Reports','A clear picture of performance at ${currentBranch().name}.', `<button class="btn secondary" data-action="export">Export report</button>`)}<div class="report-grid"><article class="report-card"><p>Revenue this month</p><strong>${money(revenue)}</strong><small>↗ 12.4% over last month</small></article><article class="report-card"><p>Average client spend</p><strong>${money(Math.round(revenue/Math.max(1,visits)))}</strong><small>↗ 6.1% over last month</small></article><article class="report-card"><p>Client retention</p><strong>76%</strong><small>↗ 3.8% over last month</small></article></div><article class="panel" style="margin-top:19px"><div class="panel-head"><div><h2>Weekly revenue</h2><p>Sales from services and retail</p></div></div><div class="chart" style="margin-top:20px;height:230px">${[42,61,49,79,65,91,57].map((n,i)=>`<i class="${i===5?'active':''}" style="height:${n}%" data-label="${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}"></i>`).join('')}</div></article><article class="panel table-panel" style="margin-top:19px"><div class="table-head"><div><h2>Recent invoices</h2><p>All collected payments for this branch</p></div></div><table class="data-table"><thead><tr><th>INVOICE</th><th>CLIENT</th><th>PAYMENT</th><th>AMOUNT</th></tr></thead><tbody>${invoices.map(i=>`<tr><td>#SG-${i.id}</td><td>${client(i.clientId)?.name||'Walk-in'}</td><td>${i.payment}</td><td>${money(i.total)}</td></tr>`).join('') || '<tr><td colspan="4"><div class="empty">No invoices yet.</div></td></tr>'}</tbody></table></article>`); }
function marketing() { const entries=local('campaigns'); layout(`${pageHead('CLIENT MARKETING','Marketing','Bring clients back with relevant, thoughtful messages.', `<button class="btn primary" data-action="campaign">＋ New campaign</button>`)}<article class="panel table-panel"><div class="table-head"><div><h2>Campaigns</h2><p>Branch-specific marketing activity</p></div></div><table class="data-table"><thead><tr><th>CAMPAIGN</th><th>CHANNEL</th><th>AUDIENCE</th><th>STATUS</th><th></th></tr></thead><tbody>${entries.map(c=>`<tr><td><strong>${c.name}</strong></td><td>${c.channel}</td><td>${c.audience}</td><td><span class="campaign-status"><i class="dot"></i>${c.status}</span></td><td><button data-campaign="${c.id}">${c.status==='Draft'?'Send':'View'} →</button></td></tr>`).join('') || '<tr><td colspan="5"><div class="empty">No campaigns for this branch.</div></td></tr>'}</tbody></table></article>`); }
function settings() { const b=currentBranch(); layout(`${pageHead('GROUP SETTINGS','Settings','Control your salon group, branches, taxes, and team access.') }<div class="settings-grid"><article class="setting-card"><h3>Salon group</h3><p>${state.organisation.name} is the organisation that owns and manages every branch.</p><button class="btn secondary" data-action="organisation">Edit group details</button></article><article class="setting-card"><h3>Branches</h3><p>${state.branches.length} active branches. Each branch has its own appointments, team, stock, and reports.</p><button class="btn secondary" data-action="branch">Manage branches</button></article><article class="setting-card"><h3>Tax & invoicing</h3><p>GST is set at ${state.organisation.tax}%. This is automatically applied during checkout.</p><button class="btn secondary" data-action="tax">Edit tax settings</button></article><article class="setting-card"><h3>Current branch</h3><p>${b.name}, ${b.city} is your active workspace.</p><button class="btn secondary" id="branch-switch-settings">Switch branch</button></article></div>`); }
function render() { ({overview:dashboard,calendar,clients,checkout,services,team,inventory,reports,marketing,settings}[view]||dashboard)(); bind(); }
function bind() { document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>{view=el.dataset.view; render();})); document.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>handleAction(el.dataset.action))); document.querySelectorAll('[data-branch]').forEach(el=>el.addEventListener('click',()=>{state.activeBranch=el.dataset.branch; selectedAppointment=null; persist(); render(); alertToast(`Switched to ${currentBranch().name}`)})); document.querySelectorAll('[data-appointment]').forEach(el=>el.addEventListener('click',()=>appointmentModal(Number(el.dataset.appointment)))); document.querySelectorAll('[data-checkout]').forEach(el=>el.addEventListener('click',()=>{selectedAppointment=Number(el.dataset.checkout);render()})); document.querySelectorAll('[data-payment]').forEach(el=>el.addEventListener('click',()=>{selectedPayment=el.dataset.payment;render()})); document.querySelectorAll('[data-restock]').forEach(el=>el.addEventListener('click',()=>restock(Number(el.dataset.restock)))); document.querySelectorAll('[data-client]').forEach(el=>el.addEventListener('click',()=>clientInsights(Number(el.dataset.client)))); document.querySelectorAll('[data-service]').forEach(el=>el.addEventListener('click',()=>serviceModal(Number(el.dataset.service)))); document.querySelectorAll('[data-staff]').forEach(el=>el.addEventListener('click',()=>staffModal(Number(el.dataset.staff)))); document.querySelectorAll('[data-team-profile]').forEach(el=>el.addEventListener('click',()=>teamProfileModal(Number(el.dataset.teamProfile)))); document.querySelectorAll('[data-campaign]').forEach(el=>el.addEventListener('click',()=>campaignAction(Number(el.dataset.campaign)))); document.getElementById('branch-switch')?.addEventListener('click',()=>{const m=document.getElementById('branch-menu');m.hidden=!m.hidden}); document.getElementById('branch-switch-settings')?.addEventListener('click',()=>document.getElementById('branch-switch').click()); document.getElementById('mobile-menu')?.addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open')); document.getElementById('client-search')?.addEventListener('input',e=>{document.getElementById('client-table').innerHTML=clientsRows(local('clients').filter(c=>`${c.name} ${c.phone}`.toLowerCase().includes(e.target.value.toLowerCase())))}); }
function handleAction(action) { if(action==='booking'||action==='walkin') bookingModal(action==='walkin'); if(action==='client') clientModal(); if(action==='service') serviceModal(); if(action==='staff') staffModal(); if(action==='inventory') inventoryModal(); if(action==='purchase-order') purchaseOrderModal(); if(action==='campaign') campaignModal(); if(action==='pay') takePayment(); if(action==='restock-all'){local('inventory').filter(x=>x.stock<=x.reorder).forEach(x=>x.stock=x.reorder+5);persist();render();alertToast('Low stock items restocked.')} if(action==='branch') branchModal(); if(action==='organisation') organisationModal(); if(action==='tax') taxModal(); if(action==='export') alertToast('Your branch report is ready to download.'); }
function modal(title, text, form, submit='Save') { modalRoot.innerHTML=`<div class="modal-backdrop"><form class="modal" id="modal-form" role="dialog" aria-modal="true" aria-label="${title}"><button class="close" type="button" id="modal-close" aria-label="Close">×</button><h2>${title}</h2><p>${text}</p>${form}<div class="modal-actions"><button class="btn secondary" type="button" id="modal-cancel">Cancel</button><button class="btn primary" type="submit">${submit}</button></div></form></div>`; document.getElementById('modal-close').onclick=closeModal;document.getElementById('modal-cancel').onclick=closeModal; }
function closeModal(){modalRoot.innerHTML=''}
function optionList(rows, selected, label) { return rows.map(x=>`<option value="${x.id}" ${Number(selected)===x.id?'selected':''}>${label(x)}</option>`).join(''); }
function bookingModal(walkin=false) { const b=state.activeBranch; modal(walkin?'Add a walk-in':'Book an appointment',`This booking will be added to ${currentBranch().name}.`,`<label>Client<select name="clientId" required>${optionList(local('clients'),'',x=>x.name)}</select></label><div class="form-row"><label>Service<select name="serviceId">${optionList(state.services,'',x=>`${x.name} · ${money(x.price)}`)}</select></label><label>Team member<select name="staffId">${optionList(local('staff'),'',x=>x.name)}</select></label></div><div class="form-row"><label>Date<input name="date" type="date" value="2026-08-10"></label><label>Time<input name="time" type="time" value="${walkin?'14:30':'15:30'}"></label></div>`,'Create booking'); document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),s=service(f.get('serviceId'));state.appointments.push({id:nextId('appointments'),clientId:Number(f.get('clientId')),serviceId:Number(f.get('serviceId')),staffId:Number(f.get('staffId')),time:f.get('time'),duration:s.duration,branch:b,status:'confirmed',paid:false});persist();closeModal();render();alertToast('Booking created and added to the calendar.');}; }
function appointmentModal(id) { const a=state.appointments.find(x=>x.id===id),c=client(a.clientId),s=service(a.serviceId); modal(c.name,`${a.time} · ${s.name} · ${staff(a.staffId).name}`,`<div class="bill-lines"><div class="bill-line"><span>Appointment status</span><strong>${a.paid?'Paid':a.status}</strong></div><div class="bill-line"><span>Client phone</span><strong>${c.phone}</strong></div><div class="bill-line"><span>Service value</span><strong>${money(s.price)}</strong></div></div>`,'Close'); document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();closeModal();}; }
function clientModal(id=null) { const data=id?client(id):{}; modal(id?'Edit client':'Add a client','Keep useful client information close to the front desk.',`<label>Full name<input name="name" required value="${data.name||''}" placeholder="Client’s full name"></label><div class="form-row"><label>Phone<input name="phone" required value="${data.phone||''}" placeholder="+91"></label><label>Email<input name="email" type="email" value="${data.email||''}" placeholder="name@example.com"></label></div><label>Notes & preferences<textarea name="note" placeholder="Preferences, allergies, special requests">${data.note||''}</textarea></label>`,id?'Save changes':'Add client'); document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),record={...data,id:data.id||nextId('clients'),name:f.get('name'),phone:f.get('phone'),email:f.get('email'),note:f.get('note'),visits:data.visits||0,spent:data.spent||0,branch:data.branch||state.activeBranch};if(id)Object.assign(data,record);else state.clients.push(record);persist();closeModal();render();alertToast(id?'Client updated.':'Client added.');}; }
function serviceModal(id=null) { const data=id?service(id):{}; modal(id?'Edit service':'Add a service','Set a clear price and duration for consistent checkout.',`<label>Service name<input name="name" required value="${data.name||''}" placeholder="e.g. Root touch-up"></label><div class="form-row"><label>Category<input name="category" required value="${data.category||''}" placeholder="Hair, skin, nails…"></label><label>Duration (minutes)<input name="duration" type="number" required value="${data.duration||60}"></label></div><label>Price (₹)<input name="price" type="number" required value="${data.price||''}"></label>`,id?'Save changes':'Add service'); document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),record={...data,id:data.id||nextId('services'),name:f.get('name'),category:f.get('category'),duration:Number(f.get('duration')),price:Number(f.get('price')),icon:data.icon||'✦'};if(id)Object.assign(data,record);else state.services.push(record);persist();closeModal();render();alertToast(id?'Service updated.':'Service added.');}; }
function staffModal(id=null) { const data=id?staff(id):{}; const specialties=['Hair specialist','Skin specialist','Makeup artist','Nail specialist','Spa & wellness therapist','Salon operations','Other']; const currentSpecialty=specialties.includes(data.speciality)?data.speciality:(data.role||'').toLowerCase().includes('nail')?'Nail specialist':(data.role||'').toLowerCase().includes('skin')?'Skin specialist':(data.role||'').toLowerCase().includes('manager')?'Salon operations':(data.role||'').toLowerCase().includes('stylist')?'Hair specialist':''; modal(id?'Edit team member':'Add team member','Team access and performance are scoped to this branch.',`<label>Full name<input name="name" required value="${data.name||''}"></label><div class="form-row"><label>Role<input name="role" required value="${data.role||''}" placeholder="Senior stylist"></label><label>Speciality<select name="speciality" required><option value="" disabled ${currentSpecialty?'':'selected'}>Choose a speciality</option>${specialties.map(specialty=>`<option value="${specialty}" ${currentSpecialty===specialty?'selected':''}>${specialty}</option>`).join('')}</select></label></div>`,id?'Save changes':'Add team member'); document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),record={...data,id:data.id||nextId('staff'),name:f.get('name'),role:f.get('role'),speciality:f.get('speciality'),sales:data.sales||0,target:data.target||0,branch:data.branch||state.activeBranch,initials:initials(f.get('name'))};if(id)Object.assign(data,record);else state.staff.push(record);persist();closeModal();render();alertToast(id?'Team member updated.':'Team member added.');}; }
function staffModal(id = null) {
  const data = id ? staff(id) : {};
  const departments = ['Hair', 'Skin', 'Nails', 'Makeup', 'Spa & wellness', 'Salon operations', 'Other'];
  const savedDepartment = data.department || data.speciality || '';
  const currentDepartment = departments.includes(savedDepartment) ? savedDepartment : (data.role || '').toLowerCase().includes('nail') ? 'Nails' : (data.role || '').toLowerCase().includes('skin') ? 'Skin' : (data.role || '').toLowerCase().includes('makeup') ? 'Makeup' : (data.role || '').toLowerCase().includes('manager') ? 'Salon operations' : (data.role || '').toLowerCase().includes('stylist') ? 'Hair' : '';
  modal(id ? 'Edit team member' : 'Add team member', 'Team access and performance are scoped to this branch.', `<label>Full name<input name="name" required value="${data.name || ''}"></label><div class="form-row"><label>Role<input name="role" required value="${data.role || ''}" placeholder="Senior stylist"></label><label>Department<select name="department" required><option value="" disabled ${currentDepartment ? '' : 'selected'}>Choose a department</option>${departments.map(department => `<option value="${department}" ${currentDepartment === department ? 'selected' : ''}>${department}</option>`).join('')}</select></label></div><label class="online-check"><input name="mobileAppAccess" type="checkbox" ${data.mobileAppAccess ? 'checked' : ''}> <span>Give access to the staff mobile app</span></label>`, id ? 'Save changes' : 'Add team member');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target);
    const department = form.get('department');
    const record = { ...data, id: data.id || nextId('staff'), name: form.get('name'), role: form.get('role'), department, speciality: department, mobileAppAccess: form.get('mobileAppAccess') === 'on', sales: data.sales || 0, target: data.target || 0, branch: data.branch || state.activeBranch, initials: initials(form.get('name')) };
    if (id) Object.assign(data, record); else state.staff.push(record);
    persist(); closeModal(); render(); alertToast(id ? 'Team member updated.' : 'Team member added.');
  };
}

function settings() {
  const branch = currentBranch();
  layout(`${pageHead('GROUP SETTINGS', 'Settings', 'Control your salon group, branches, team access, and invoicing.')}<div class="settings-grid"><article class="setting-card"><h3>Salon group</h3><p>${state.organisation.name} is the organisation that owns and manages every branch.</p><button class="btn secondary" data-action="organisation">Edit group details</button></article><article class="setting-card"><h3>Branches</h3><p>${state.branches.length} active branches. Each branch has its own appointments, team, stock, and reports.</p><button class="btn secondary" data-action="branch">Manage branches</button></article><article class="setting-card"><h3>User management</h3><p>Control who has access to the staff mobile app at ${branch.name}.</p><button class="btn secondary" id="manage-users">Manage users</button></article><article class="setting-card"><h3>Tax & invoicing</h3><p>GST is set at ${state.organisation.tax}%. This is automatically applied during checkout.</p><button class="btn secondary" data-action="tax">Edit tax settings</button></article><article class="setting-card"><h3>Current branch</h3><p>${branch.name}, ${branch.city} is your active workspace.</p><button class="btn secondary" id="branch-switch-settings">Switch branch</button></article></div>`);
  document.getElementById('manage-users')?.addEventListener('click', userManagementModal);
}

function userManagementModal() {
  const members = local('staff');
  modal('User management', `Choose which ${currentBranch().name} team members can sign in to the staff mobile app.`, `<div class="user-management-list">${members.length ? members.map(member => `<label class="user-management-user"><span class="avatar">${member.initials}</span><span><strong>${member.name}</strong><small>${member.role}</small></span><input type="checkbox" name="mobile-user" value="${member.id}" ${member.mobileAppAccess ? 'checked' : ''}><b>Mobile access</b></label>`).join('') : '<div class="empty">Add a team member before assigning mobile access.</div>'}</div>`, 'Save access');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const allowed = new Set(new FormData(event.target).getAll('mobile-user').map(Number));
    members.forEach(member => { member.mobileAppAccess = allowed.has(member.id); });
    persist(); closeModal(); render(); alertToast('Mobile app access updated.');
  };
}

function settings() {
  const branch = currentBranch();
  const multiBranch = state.organisation.multiBranch;
  layout(`${pageHead('GROUP SETTINGS', 'Settings', 'Control your salon group, branches, team access, and invoicing.')}<div class="settings-grid"><article class="setting-card"><h3>Salon group</h3><p>${state.organisation.name} is the organisation that owns and manages every branch.</p><button class="btn secondary" data-action="organisation">Edit group details</button></article><article class="setting-card"><h3>Branches</h3><p>${multiBranch ? 'Use multiple branches to manage separate locations and their day-to-day operations.' : 'Run Salon Genie as one location without a branch selector.'}</p><div class="branch-mode-switch" role="group" aria-label="Branch setup"><button class="${multiBranch ? '' : 'active'}" data-branch-mode="single">One branch</button><button class="${multiBranch ? 'active' : ''}" data-branch-mode="multiple">Multiple branches</button></div>${multiBranch ? '<button class="btn secondary" id="manage-branches">Manage branches</button>' : ''}</article><article class="setting-card"><h3>User management</h3><p>Control who has access to the staff mobile app at ${branch.name}.</p><button class="btn secondary" id="manage-users">Manage users</button></article><article class="setting-card"><h3>Tax & invoicing</h3><p>GST is set at ${state.organisation.tax}%. This is automatically applied during checkout.</p><button class="btn secondary" data-action="tax">Edit tax settings</button></article><article class="setting-card"><h3>Current location</h3><p>${branch.name}, ${branch.city} is your active workspace.</p>${multiBranch ? '<button class="btn secondary" id="branch-switch-settings">Switch branch</button>' : ''}</article></div>`);
  document.getElementById('manage-users')?.addEventListener('click', userManagementModal);
  document.getElementById('manage-branches')?.addEventListener('click', branchManagementModal);
  document.querySelectorAll('[data-branch-mode]').forEach(button => button.addEventListener('click', () => { state.organisation.multiBranch = button.dataset.branchMode === 'multiple'; persist(); render(); alertToast(state.organisation.multiBranch ? 'Multiple branches enabled.' : 'One branch mode enabled.'); }));
}

function branchManagementModal() {
  modal('Manage branches', 'Each branch keeps its own appointments, team, stock, and reporting.', `<div class="branch-management-list">${state.branches.map(branch => `<div><span><strong>${branch.name}</strong><small>${branch.city} · ${branch.code}</small></span>${branch.id === state.activeBranch ? '<b>Current</b>' : ''}</div>`).join('')}</div><button class="btn secondary full" type="button" id="add-branch-from-manager">Add branch</button>`, 'Close');
  document.getElementById('modal-cancel')?.remove();
  document.getElementById('modal-form').onsubmit = event => { event.preventDefault(); closeModal(); };
  document.getElementById('add-branch-from-manager')?.addEventListener('click', branchModal);
}

const expenseCategories = [
  { key: 'staffSalary', label: 'Staff salaries' },
  { key: 'rent', label: 'Rent' },
  { key: 'products', label: 'Products & supplies' },
  { key: 'utilities', label: 'Electricity & water' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'eventsIncentives', label: 'Events & staff incentives' },
  { key: 'dayToDay', label: 'Day-to-day expenses' },
  { key: 'clientRelated', label: 'Client-related expenses' },
  { key: 'other', label: 'Other expenses' }
];

function branchExpenses() {
  const saved = state.expenses[state.activeBranch] || {};
  return Object.fromEntries(expenseCategories.map(category => [category.key, Number(saved[category.key]) || 0]));
}

function totalExpenses(expenses) {
  return expenseCategories.reduce((total, category) => total + Number(expenses[category.key] || 0), 0);
}

function settings() {
  const branch = currentBranch();
  const multiBranch = state.organisation.multiBranch;
  const expenses = branchExpenses();
  layout(`${pageHead('GROUP SETTINGS', 'Settings', 'Control your salon group, branches, team access, expenses, and invoicing.')}<div class="settings-grid"><article class="setting-card"><h3>Salon group</h3><p>${state.organisation.name} is the organisation that owns and manages every branch.</p><button class="btn secondary" data-action="organisation">Edit group details</button></article><article class="setting-card"><h3>Branches</h3><p>${multiBranch ? 'Use multiple branches to manage separate locations and their day-to-day operations.' : 'Run Salon Genie as one location without a branch selector.'}</p><div class="branch-mode-switch" role="group" aria-label="Branch setup"><button class="${multiBranch ? '' : 'active'}" data-branch-mode="single">One branch</button><button class="${multiBranch ? 'active' : ''}" data-branch-mode="multiple">Multiple branches</button></div>${multiBranch ? '<button class="btn secondary" id="manage-branches">Manage branches</button>' : ''}</article><article class="setting-card"><h3>User management</h3><p>Control who has access to the staff mobile app at ${branch.name}.</p><button class="btn secondary" id="manage-users">Manage users</button></article><article class="setting-card"><h3>Expenses</h3><p>Monthly operating costs for ${branch.name}: <strong>${money(totalExpenses(expenses))}</strong></p><button class="btn secondary" id="manage-expenses">Set expenses</button></article><article class="setting-card"><h3>Tax & invoicing</h3><p>GST is set at ${state.organisation.tax}%. This is automatically applied during checkout.</p><button class="btn secondary" data-action="tax">Edit tax settings</button></article><article class="setting-card"><h3>Current location</h3><p>${branch.name}, ${branch.city} is your active workspace.</p>${multiBranch ? '<button class="btn secondary" id="branch-switch-settings">Switch branch</button>' : ''}</article></div>`);
  document.getElementById('manage-users')?.addEventListener('click', userManagementModal);
  document.getElementById('manage-branches')?.addEventListener('click', branchManagementModal);
  document.getElementById('manage-expenses')?.addEventListener('click', expensesModal);
  document.querySelectorAll('[data-branch-mode]').forEach(button => button.addEventListener('click', () => { state.organisation.multiBranch = button.dataset.branchMode === 'multiple'; persist(); render(); alertToast(state.organisation.multiBranch ? 'Multiple branches enabled.' : 'One branch mode enabled.'); }));
}

function expensesModal() {
  const expenses = branchExpenses();
  modal('Monthly expenses', `Record the regular operating costs for ${currentBranch().name}. This will feed into your reports later.`, `<div class="expense-form">${expenseCategories.map(category => `<label>${category.label}<input name="${category.key}" type="number" min="0" value="${expenses[category.key] || ''}" placeholder="0"></label>`).join('')}</div><div class="expense-total"><span>Total monthly expenses</span><strong id="expense-total-value">${money(totalExpenses(expenses))}</strong></div>`, 'Save expenses');
  const form = document.getElementById('modal-form');
  const updateTotal = () => { const fields = new FormData(form); const total = expenseCategories.reduce((sum, category) => sum + Number(fields.get(category.key) || 0), 0); document.getElementById('expense-total-value').textContent = money(total); };
  form.querySelectorAll('input[type="number"]').forEach(input => input.addEventListener('input', updateTotal));
  form.onsubmit = event => {
    event.preventDefault();
    const fields = new FormData(event.target);
    state.expenses[state.activeBranch] = Object.fromEntries(expenseCategories.map(category => [category.key, Number(fields.get(category.key) || 0)]));
    persist(); closeModal(); render(); alertToast('Monthly expenses updated.');
  };
}

const localFileStore = {
  maxFileSize: 100 * 1024 * 1024,
  retentionDays: 90,
  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('salon-genie-local-files', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('files', { keyPath: 'id' });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },
  async list() {
    const database = await this.open();
    const files = await new Promise((resolve, reject) => {
      const request = database.transaction('files', 'readonly').objectStore('files').getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    database.close();
    const now = Date.now();
    const expired = files.filter(file => file.expiresAt <= now);
    await Promise.all(expired.map(file => this.remove(file.id)));
    return files.filter(file => file.expiresAt > now).sort((first, second) => second.createdAt - first.createdAt);
  },
  async upload(file, category) {
    if (file.size > this.maxFileSize) throw new Error('Files must be 100 MB or smaller.');
    const database = await this.open();
    const item = { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, name: file.name, size: file.size, type: file.type, category, file, createdAt: Date.now(), expiresAt: Date.now() + this.retentionDays * 86400000 };
    await new Promise((resolve, reject) => {
      const request = database.transaction('files', 'readwrite').objectStore('files').put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    database.close();
  },
  async remove(id) {
    const database = await this.open();
    await new Promise((resolve, reject) => {
      const request = database.transaction('files', 'readwrite').objectStore('files').delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    database.close();
  }
};

const safeFileName = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const localFileSize = bytes => bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
const localFileDate = value => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));

async function localDataStoreModal() {
  try {
    const files = await localFileStore.list();
    modal('Local data store', 'Keep critical files, bills, and other records on this device for up to 90 days. Each file can be up to 100 MB.', `<label>File category<select name="fileCategory"><option>Critical file</option><option>Bill</option><option>Other record</option></select></label><label>Choose file<input name="localFile" type="file" required></label><div class="local-file-list"><strong>Stored files</strong>${files.length ? files.map(file => `<div><span><b>${safeFileName(file.name)}</b><small>${file.category} · ${localFileSize(file.size)} · Deletes ${localFileDate(file.expiresAt)}</small></span><button class="text-link" type="button" data-delete-local-file="${file.id}">Delete</button></div>`).join('') : '<p>No files stored on this device.</p>'}</div>`, 'Upload file');
    const form = document.getElementById('modal-form');
    form.onsubmit = async event => {
      event.preventDefault();
      const file = form.querySelector('[name="localFile"]').files[0];
      if (!file) return;
      try { await localFileStore.upload(file, new FormData(form).get('fileCategory')); await localDataStoreModal(); alertToast('File stored locally for 90 days.'); }
      catch (error) { alertToast(error.message || 'This file could not be stored locally.'); }
    };
    document.querySelectorAll('[data-delete-local-file]').forEach(button => button.addEventListener('click', async () => { await localFileStore.remove(button.dataset.deleteLocalFile); await localDataStoreModal(); alertToast('Local file deleted.'); }));
  } catch { alertToast('Local file storage is unavailable in this browser.'); }
}

function googleProfileSyncModal() {
  modal('Google Business Profile sync', 'Connect the Google account that owns your Business Profile to manage your salon information, services, posts, and reviews from Salon Genie.', '<div class="google-sync-note"><strong>Not connected</strong><span>Secure Google sign-in will be enabled when production Google credentials are configured.</span></div>', 'Close');
  document.getElementById('modal-form').onsubmit = event => { event.preventDefault(); closeModal(); };
}

function organisationModal() {
  const organisation = state.organisation;
  modal('Salon group details', 'These contact details are required for every Salon Genie setup.', `<label>Group name<input name="name" required value="${organisation.name || ''}"></label><div class="form-row"><label>Phone number<input name="phone" type="tel" required value="${organisation.phone || ''}" placeholder="+91"></label><label>WhatsApp number<input name="whatsapp" type="tel" required value="${organisation.whatsapp || ''}" placeholder="+91"></label></div><label>Email address<input name="email" type="email" required value="${organisation.email || ''}" placeholder="name@salon.com"></label>`, 'Save changes');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target);
    Object.assign(state.organisation, { name: form.get('name'), phone: form.get('phone'), whatsapp: form.get('whatsapp'), email: form.get('email') });
    persist(); closeModal(); render(); alertToast('Salon group details updated.');
  };
}

function settings() {
  const branch = currentBranch();
  const expenses = branchExpenses();
  layout(`${pageHead('GROUP SETTINGS', 'Settings', 'Control your salon group, branches, team access, files, expenses, and invoicing.')}<div class="settings-grid"><article class="setting-card"><h3>Salon group</h3><p>${state.organisation.name} is the organisation that owns and manages every branch.</p><button class="btn secondary" data-action="organisation">Edit group details</button></article><article class="setting-card"><h3>Branches</h3><p>${state.organisation.multiBranch ? 'Manage your salon locations and switch between their workspaces.' : 'Run Salon Genie as one location without a branch selector.'}</p><div class="branch-mode-switch" role="group" aria-label="Branch setup"><button class="${state.organisation.multiBranch ? '' : 'active'}" data-branch-mode="single">One branch</button><button class="${state.organisation.multiBranch ? 'active' : ''}" id="manage-branches">Manage branches</button></div></article><article class="setting-card"><h3>User management</h3><p>Control who has access to the staff mobile app at ${branch.name}.</p><button class="btn secondary" id="manage-users">Manage users</button></article><article class="setting-card"><h3>Local data store</h3><p>Store critical files and bills on this device for 90 days. Files can be up to 100 MB.</p><button class="btn secondary" id="open-local-data-store">Manage files</button></article><article class="setting-card"><h3>Google Business Profile</h3><p>Connect your Google profile to manage salon information and reviews.</p><button class="btn secondary" id="google-profile-sync">Connect Google profile</button></article><article class="setting-card"><h3>Expenses</h3><p>Monthly operating costs for ${branch.name}: <strong>${money(totalExpenses(expenses))}</strong></p><button class="btn secondary" id="manage-expenses">Set expenses</button></article><article class="setting-card"><h3>Tax & invoicing</h3><p>GST is set at ${state.organisation.tax}%. This is automatically applied during checkout.</p><button class="btn secondary" data-action="tax">Edit tax settings</button></article><article class="setting-card"><h3>Current location</h3><p>${branch.name}, ${branch.city} is your active workspace.</p>${state.organisation.multiBranch ? '<button class="btn secondary" id="branch-switch-settings">Switch branch</button>' : ''}</article></div>`);
  document.getElementById('manage-users')?.addEventListener('click', userManagementModal);
  document.getElementById('manage-expenses')?.addEventListener('click', expensesModal);
  document.getElementById('open-local-data-store')?.addEventListener('click', localDataStoreModal);
  document.getElementById('google-profile-sync')?.addEventListener('click', googleProfileSyncModal);
  document.getElementById('manage-branches')?.addEventListener('click', () => confirmBranchMode('manage'));
  document.querySelector('[data-branch-mode="single"]')?.addEventListener('click', () => confirmBranchMode('single'));
}

function confirmBranchMode(mode) {
  const manageBranches = mode === 'manage';
  modal(manageBranches ? 'Manage branches?' : 'Use one branch?', manageBranches ? 'This enables the branch selector and lets you manage separate salon locations.' : 'This hides the branch selector and keeps you focused on your current location. Your existing branch data will remain safe.', '<p class="branch-confirmation-note">You can change this setting again at any time.</p>', manageBranches ? 'Continue' : 'Use one branch');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    state.organisation.multiBranch = manageBranches;
    persist();
    if (manageBranches) { closeModal(); branchManagementModal(); } else { closeModal(); render(); alertToast('One branch mode enabled.'); }
  };
}

function branchManagementModal() {
  modal('Manage branches', 'Each branch keeps its own appointments, team, stock, and reporting.', `<div class="branch-management-list">${state.branches.map(branch => `<div><span><strong>${branch.name}</strong><small>${branch.city} · ${branch.code}</small></span>${branch.id === state.activeBranch ? '<b>Current</b>' : ''}</div>`).join('')}</div><button class="btn secondary full" type="button" id="add-branch-from-manager">Add branch</button>`, 'Close');
  document.getElementById('modal-cancel')?.remove();
  const returnToSettings = () => { closeModal(); render(); };
  document.getElementById('modal-close').onclick = returnToSettings;
  document.getElementById('modal-form').onsubmit = event => { event.preventDefault(); returnToSettings(); };
  document.getElementById('add-branch-from-manager')?.addEventListener('click', branchModal);
}

function inventoryModal() { modal('Add product','Add a product to the inventory of this branch.',`<label>Product name<input name="name" required></label><div class="form-row"><label>SKU<input name="sku" required placeholder="SKU-001"></label><label>Category<input name="category" required placeholder="Hair care"></label></div><div class="form-row"><label>Current stock<input name="stock" type="number" value="0"></label><label>Reorder at<input name="reorder" type="number" value="5"></label></div><label>Unit value (₹)<input name="unit" type="number" required></label>`,'Add product');document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);state.inventory.push({id:nextId('inventory'),name:f.get('name'),sku:f.get('sku'),category:f.get('category'),stock:Number(f.get('stock')),reorder:Number(f.get('reorder')),unit:Number(f.get('unit')),branch:state.activeBranch});persist();closeModal();render();alertToast('Product added to inventory.');}; }
function purchaseOrderModal() { const products=local('inventory'); modal('Create purchase order','Record stock that is being ordered, so forecasts include it before it arrives.',`<label>Supplier<input name="supplier" required placeholder="Supplier name"></label><div class="form-row"><label>Product<select name="inventoryId" required>${optionList(products,'',product=>`${product.name} · ${product.stock} in stock`)}</select></label><label>Quantity<input name="quantity" type="number" min="1" required value="1"></label></div><div class="form-row"><label>Expected delivery<input name="expectedDate" type="date" required value="2026-08-14"></label><label>Status<select name="status"><option>Draft</option><option selected>Ordered</option></select></label></div>`,'Create order'); document.getElementById('modal-form').onsubmit=event=>{event.preventDefault();const form=new FormData(event.target);state.purchaseOrders.push({id:nextId('purchaseOrders'),code:`PO-${2050+nextId('purchaseOrders')}`,supplier:form.get('supplier'),expectedDate:form.get('expectedDate'),status:form.get('status'),branch:state.activeBranch,lines:[{inventoryId:Number(form.get('inventoryId')),quantity:Number(form.get('quantity'))}]});persist();closeModal();render();alertToast('Purchase order created and included in the inventory plan.');};}
function restock(id){const item=state.inventory.find(x=>x.id===id);item.stock=item.reorder+5;persist();render();alertToast(`${item.name} restocked.`)}
function campaignModal(){modal('New campaign','Create a branch-specific reminder or promotion.',`<label>Campaign name<input name="name" required placeholder="e.g. September facial offer"></label><div class="form-row"><label>Channel<select name="channel"><option>WhatsApp</option><option>Email</option><option>SMS</option></select></label><label>Audience<input name="audience" required placeholder="e.g. 120 clients"></label></div><label>Message<textarea name="message" required placeholder="Write a thoughtful, useful message…"></textarea></label>`,'Save draft');document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);state.campaigns.push({id:nextId('campaigns'),name:f.get('name'),channel:f.get('channel'),audience:f.get('audience'),status:'Draft',branch:state.activeBranch});persist();closeModal();render();alertToast('Campaign saved as a draft.');};}
function campaignAction(id){const c=state.campaigns.find(x=>x.id===id);if(c.status==='Draft'){c.status='Sent';persist();render();alertToast(`Campaign sent to ${c.audience}.`)}else alertToast('Campaign performance will appear here soon.');}
function branchModal(){modal('Add a branch','Each branch receives its own day-to-day workspace and reporting.',`<label>Branch name<input name="name" required placeholder="e.g. Jayanagar"></label><div class="form-row"><label>City<input name="city" required value="Bengaluru"></label><label>Branch code<input name="code" required placeholder="JA" maxlength="3"></label></div>`,'Add branch');document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),item={id:f.get('name').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,8),name:f.get('name'),city:f.get('city'),code:f.get('code').toUpperCase()};state.branches.push(item);state.activeBranch=item.id;persist();closeModal();render();alertToast(`${item.name} branch added.`);};}
function organisationModal(){modal('Salon group details','These details appear throughout your multi-branch workspace.',`<label>Group name<input name="name" required value="${state.organisation.name}"></label><label>Group owner<input name="owner" required value="${state.organisation.owner}"></label>`,'Save changes');document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);state.organisation.name=f.get('name');state.organisation.owner=f.get('owner');persist();closeModal();render();alertToast('Salon group details updated.');};}
function taxModal(){modal('Tax & invoicing','This percentage is automatically used for every branch checkout.',`<label>GST / tax rate (%)<input name="tax" type="number" min="0" max="100" required value="${state.organisation.tax}"></label>`,'Save tax rate');document.getElementById('modal-form').onsubmit=e=>{e.preventDefault();state.organisation.tax=Number(new FormData(e.target).get('tax'));persist();closeModal();render();alertToast('Tax settings updated.');};}
function takePayment(){const a=state.appointments.find(x=>x.id===selectedAppointment);if(!a)return;const total=Math.round(service(a.serviceId).price*(1+state.organisation.tax/100));a.paid=true;a.status='completed';const c=client(a.clientId);c.visits+=1;c.spent+=total;state.invoices.push({id:nextId('invoices'),clientId:c.id,appointmentId:a.id,total,payment:selectedPayment,branch:state.activeBranch,date:'2026-08-10'});persist();selectedAppointment=null;render();alertToast(`Payment collected by ${selectedPayment}. Invoice created.`);}
render();

function appointmentModal(id, summaryOnly = false) {
  const appointment = state.appointments.find(item => item.id === id);
  if (!appointment) return;
  const customer = client(appointment.clientId), treatment = service(appointment.serviceId), member = staff(appointment.staffId);
  const isCancelled = appointment.status === 'cancelled';
  modal(customer.name, `${appointmentDate(appointment)} · ${appointment.time} · ${treatment.name} with ${member.name}`, `<div class="bill-lines"><div class="bill-line"><span>Appointment status</span><strong>${isCancelled ? 'Cancelled' : appointment.paid ? 'Paid' : appointment.status}</strong></div><div class="bill-line"><span>Client phone</span><strong>${customer.phone}</strong></div><div class="bill-line"><span>Service value</span><strong>${money(treatment.price)}</strong></div></div>${isCancelled || summaryOnly ? '' : '<div class="appointment-modal-actions"><button class="btn secondary" type="button" id="change-appointment">Change</button><button class="btn secondary" type="button" id="reschedule-appointment">Reschedule</button></div>'}`, 'Close');
  document.getElementById('modal-cancel')?.remove();
  document.getElementById('modal-form').onsubmit = event => { event.preventDefault(); closeModal(); };
  document.getElementById('change-appointment')?.addEventListener('click', () => changeAppointmentModal(id));
  document.getElementById('reschedule-appointment')?.addEventListener('click', () => rescheduleAppointmentModal(id));
}

function changeAppointmentModal(id) {
  const appointment = state.appointments.find(item => item.id === id);
  const customer = client(appointment.clientId);
  modal('Change appointment', `Update ${customer.name}'s appointment details.`, `<label>Client<select name="clientId" required>${optionList(local('clients'), appointment.clientId, item => item.name)}</select></label><div class="form-row"><label>Service<select name="serviceId">${optionList(state.services, appointment.serviceId, item => `${item.name} · ${money(item.price)}`)}</select></label><label>Team member<select name="staffId">${optionList(local('staff'), appointment.staffId, item => item.name)}</select></label></div><div class="form-row"><label>Date<input name="date" type="date" value="${appointmentDate(appointment)}"></label><label>Time<input name="time" type="time" value="${appointment.time}"></label></div>`, 'Save changes');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target), selectedService = service(form.get('serviceId'));
    Object.assign(appointment, { clientId: Number(form.get('clientId')), serviceId: Number(form.get('serviceId')), staffId: Number(form.get('staffId')), date: form.get('date'), time: form.get('time'), duration: selectedService.duration, status: appointment.paid ? 'completed' : 'confirmed' });
    persist(); appointmentModal(id, true); alertToast('Appointment updated.');
  };
}

function rescheduleAppointmentModal(id) {
  const appointment = state.appointments.find(item => item.id === id);
  modal('Reschedule appointment', `Choose a new time for ${client(appointment.clientId).name}.`, `<div class="form-row"><label>Date<input name="date" type="date" value="${appointmentDate(appointment)}"></label><label>Time<input name="time" type="time" value="${appointment.time}"></label></div><label>Team member<select name="staffId">${optionList(local('staff'), appointment.staffId, item => item.name)}</select></label>`, 'Reschedule');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target);
    Object.assign(appointment, { date: form.get('date'), time: form.get('time'), staffId: Number(form.get('staffId')), status: appointment.paid ? 'completed' : 'confirmed' });
    persist(); appointmentModal(id, true); alertToast('Appointment rescheduled.');
  };
}

function cancelAppointmentModal(id) {
  const appointment = state.appointments.find(item => item.id === id);
  modal('Cancel appointment', `Cancel ${client(appointment.clientId).name}'s ${service(appointment.serviceId).name} appointment?`, '<p class="cancel-note">The booking will be removed from sales estimates and checkout.</p>', 'Cancel appointment');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    appointment.status = 'cancelled';
    persist(); closeModal(); render(); alertToast('Appointment cancelled.');
  };
}

function weekScheduleHtml(appointments) {
  return `<div class="week-schedule">${calendarDays.map(day => {
    const dailyAppointments = appointments.filter(appointment => appointmentDate(appointment) === day.date).sort((a, b) => a.time.localeCompare(b.time));
    return `<section class="week-day"><header><strong>${day.day}</strong><span>${day.label}</span></header><div class="week-day-appointments">${dailyAppointments.length ? dailyAppointments.map(appointment => {
      const customer = client(appointment.clientId), treatment = service(appointment.serviceId), member = staff(appointment.staffId);
      return `<button class="week-appointment ${appointment.status === 'completed' || appointment.paid ? 'completed' : ''}" data-appointment="${appointment.id}"><small>${appointment.time}</small><strong>${customer.name}</strong><span>${treatment.name}</span><em>${member.name.split(' ')[0]}</em></button>`;
    }).join('') : '<p class="week-empty">No bookings</p>'}</div></section>`;
  }).join('')}</div>`;
}

function calendar() {
  const appointments = filteredCalendarAppointments();
  const booked = appointments.filter(appointment => appointment.status === 'confirmed');
  const team = local('staff');
  const schedule = calendarMode === 'week' ? weekScheduleHtml(appointments) : scheduleHtml(appointments);
  layout(`${pageHead('APPOINTMENTS', 'Calendar', 'Manage schedules, walk-ins, and client time in one place.', `<button class="btn primary" data-action="booking">New booking</button>`)}<article class="panel"><div class="panel-head calendar-head"><div><h2>${calendarDateLabel()}</h2><p>${appointments.length} visible appointments · ${booked.length} booked</p></div><div class="calendar-controls"><div class="view-switch" role="group" aria-label="Calendar view"><button class="${calendarMode === 'today' ? 'active' : ''}" data-calendar-mode="today">Today</button><button class="${calendarMode === 'tomorrow' ? 'active' : ''}" data-calendar-mode="tomorrow">Tomorrow</button><button class="${calendarMode === 'week' ? 'active' : ''}" data-calendar-mode="week">Week</button></div><label class="staff-filter"><span>Staff</span><select id="calendar-staff-filter"><option value="all">All staff</option>${team.map(member => `<option value="${member.id}" ${Number(calendarStaffId) === member.id ? 'selected' : ''}>${member.name}</option>`).join('')}</select></label></div></div><div class="calendar-summary"><div><span>Sales estimate</span><strong>${money(bookedSalesEstimate(appointments))}</strong><small>From ${booked.length} booked appointment${booked.length === 1 ? '' : 's'} · before tax</small></div><p>Estimate updates with the selected date range and staff member.</p></div><div class="schedule-toolbar"><small>Click an appointment to view its details or complete checkout.</small><button class="text-link" data-action="booking">Add appointment</button></div>${schedule}</article>`);
  document.querySelectorAll('[data-calendar-mode]').forEach(button => button.addEventListener('click', () => { calendarMode = button.dataset.calendarMode; render(); }));
  document.getElementById('calendar-staff-filter')?.addEventListener('change', event => { calendarStaffId = event.target.value; render(); });
}

function bookingModal(walkin = false) {
  const branchId = state.activeBranch;
  modal(walkin ? 'Add a walk-in' : 'Book an appointment', `This booking will be added to ${currentBranch().name}.`, `<label>Client<select name="clientId" required>${optionList(local('clients'), '', item => item.name)}</select></label><div class="form-row"><label>Service<select name="serviceId">${optionList(state.services, '', item => `${item.name} · ${money(item.price)}`)}</select></label><label>Team member<select name="staffId">${optionList(local('staff'), '', item => item.name)}</select></label></div><div class="form-row"><label>Date<input name="date" type="date" value="${calendarMode === 'tomorrow' ? '2026-08-11' : calendarToday}"></label><label>Time<input name="time" type="time" value="${walkin ? '14:30' : '15:30'}"></label></div>`, 'Create booking');
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target), selectedService = service(form.get('serviceId'));
    state.appointments.push({ id: nextId('appointments'), clientId: Number(form.get('clientId')), serviceId: Number(form.get('serviceId')), staffId: Number(form.get('staffId')), time: form.get('time'), duration: selectedService.duration, date: form.get('date'), branch: branchId, status: 'confirmed', paid: false });
    persist(); closeModal(); render(); alertToast('Booking created and added to the calendar.');
  };
}

function marketingReferenceCampaigns() {
  return [
    { name: 'Hair colour refresh reminder', channel: 'WhatsApp', audience: '118 colour clients', status: 'Sent', tracking: '94% delivered · 26 replies' },
    { name: 'Botox maintenance follow-up', channel: 'WhatsApp', audience: '46 eligible clients', status: 'Sent', tracking: '89% delivered · 9 bookings' },
    { name: 'Birthday glow edit', channel: 'Email', audience: '72 birthday clients', status: 'Scheduled', tracking: 'Send date · 18 Aug' },
    { name: 'Bridal season showcase', channel: 'Instagram', audience: 'Local bridal audience', status: 'Sent', tracking: '4.8k reach · 31 leads' },
    { name: 'Nail art trend reel', channel: 'Instagram', audience: 'Nail service followers', status: 'Draft', tracking: 'Ready to review' },
    { name: 'Next-visit reminder', channel: 'SMS', audience: '54 due this week', status: 'Sent', tracking: '98% delivered · 14 bookings' },
    { name: 'Review request follow-up', channel: 'Google Business Profile', audience: '38 recent guests', status: 'Sent', tracking: '21 requests · 8 reviews' },
    { name: 'Monsoon self-care offer', channel: 'Salon app', audience: '126 active clients', status: 'Draft', tracking: 'Audience saved' }
  ];
}

function marketing() {
  const savedCampaigns = local('campaigns');
  const savedPlans = local('marketingPlans').slice().reverse();
  const references = marketingReferenceCampaigns().slice(0, Math.max(0, 8 - savedCampaigns.length)).map(campaign => ({ ...campaign, reference: true }));
  const campaigns = [...savedCampaigns, ...references];
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(campaigns.length / pageSize));
  marketingCampaignPage = Math.min(marketingCampaignPage, totalPages - 1);
  const pageStart = marketingCampaignPage * pageSize;
  const campaignPage = campaigns.slice(pageStart, pageStart + pageSize);
  const campaignRow = campaign => {
    const tracking = campaign.tracking || (campaign.status === 'Draft' ? 'Audience saved · ready to send' : 'Delivery and responses will appear here');
    const action = campaign.reference
      ? '<button class="text-link" data-marketing-reference>View reference →</button>'
      : `<button data-campaign="${campaign.id}">${campaign.status === 'Draft' ? 'Send' : 'View results'} →</button>`;
    return `<tr><td><strong>${campaign.name}${campaign.reference ? ' <span class="marketing-reference">Reference</span>' : ''}</strong></td><td><span class="marketing-channel">${campaign.channel}</span></td><td>${campaign.audience}</td><td><span class="campaign-status"><i class="dot"></i>${campaign.status}</span></td><td><span class="marketing-tracking">${tracking}</span></td><td>${action}</td></tr>`;
  };
  const planCards = savedPlans.length ? savedPlans.map(plan => `<article class="marketing-saved-plan"><div class="marketing-saved-plan-copy"><span class="marketing-plan-date">${plan.createdAt}</span><h3>${plan.title}</h3><p>${plan.summary}</p><ul>${marketingPlanActions(plan).map(action => `<li>${action}</li>`).join('')}</ul></div><aside class="marketing-plan-aside"><div class="marketing-saved-solutions">${plan.solutions.map(solution => `<span>${solution[0]}</span>`).join('')}</div><section class="growth-platform-card marketing-plan-growth-card" data-growth-platform role="link" tabindex="0"><span class="growth-platform-icon">↗</span><span><strong>Grow your revenue</strong><small>Explore SalonGrowth Platform</small></span></section></aside></article>`).join('') : '<div class="marketing-plan-empty"><span>✦</span><div><strong>Your recommendations will appear here</strong><p>Complete Insightful Marketing Planning to build your first Salon Growth plan.</p></div></div>';
  const campaignPagination = campaigns.length > pageSize ? `<div class="marketing-pagination"><span>${pageStart + 1}-${Math.min(pageStart + pageSize, campaigns.length)} of ${campaigns.length}</span><div>${Array.from({ length: totalPages }, (_, index) => `<button class="${index === marketingCampaignPage ? 'active' : ''}" data-marketing-page="${index}">${index * pageSize + 1}-${Math.min((index + 1) * pageSize, campaigns.length)}</button>`).join('')}</div><button class="text-link" data-marketing-page="${Math.max(0, marketingCampaignPage - 1)}" ${marketingCampaignPage === 0 ? 'disabled' : ''}>Previous</button><button class="text-link" data-marketing-page="${Math.min(totalPages - 1, marketingCampaignPage + 1)}" ${marketingCampaignPage === totalPages - 1 ? 'disabled' : ''}>Next</button></div>` : '';
  layout(`${pageHead('CLIENT MARKETING', 'Marketing', 'Plan campaigns, follow performance, and take action from one place.', `<button class="marketing-planning-widget" id="open-marketing-planning"><span>✦</span><span><strong>Insightful Marketing Planning</strong><small>Plan your next best campaign</small></span><i>→</i></button><button class="btn primary" data-action="campaign">＋ New campaign</button>`)}<article class="panel table-panel marketing-table-panel"><div class="table-head"><div><h2>Campaigns, tracking & actions</h2><p>${savedCampaigns.length ? 'Your saved campaigns plus reference examples for planning.' : 'Reference examples for planning across your main channels.'}</p></div><span class="marketing-count">${campaigns.length} campaigns</span></div><table class="data-table marketing-table"><thead><tr><th>CAMPAIGN</th><th>CHANNEL</th><th>AUDIENCE</th><th>STATUS</th><th>TRACKING</th><th>ACTION</th></tr></thead><tbody>${campaignPage.map(campaignRow).join('')}</tbody></table>${campaignPagination}</article><section class="marketing-recommendations"><div class="section-heading"><div><span class="eyebrow">SALON GROWTH PLATFORM</span><h2>Your marketing recommendations</h2><p>Plans generated from your Insightful Marketing Planning assessment.</p></div><span class="marketing-plan-count">${savedPlans.length} saved plan${savedPlans.length === 1 ? '' : 's'}</span></div><div class="marketing-saved-plan-list">${planCards}</div></section>`);
  document.querySelectorAll('[data-marketing-reference]').forEach(button => button.addEventListener('click', () => alertToast('Reference campaign shown for planning only.')));
  document.querySelectorAll('[data-marketing-page]').forEach(button => button.addEventListener('click', () => { marketingCampaignPage = Number(button.dataset.marketingPage); render(); }));
  document.querySelectorAll('[data-growth-platform]').forEach(card => { card.onclick = () => { window.location.href = 'growth-platform.html'; }; card.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') card.click(); }; });
  document.getElementById('open-marketing-planning')?.addEventListener('click', marketingPlanningWizard);
}

function marketingPlanActions(plan) {
  return plan.actions || [
    'Set one clear campaign goal and measure it every week.',
    'Focus first on the lead channel that is most likely to convert.',
    'Use a relevant service offer with a direct booking call to action.',
    'Follow up warm enquiries on WhatsApp within one business day.',
    'Review bookings and campaign return before increasing spend.'
  ];
}

function marketingPlanningWizard() {
  const answers = {};
  let step = 1;
  const steps = [
    `<label>How is the overall salon performance?<select name="performance" required><option value="">Choose one</option><option>Growing</option><option>Stable</option><option>Needs improvement</option></select></label><label>Are you comfortable with the current performance?<select name="comfort" required><option value="">Choose one</option><option>Comfortable</option><option>Somewhat comfortable</option><option>Not comfortable</option></select></label><label>Approximate monthly surplus (INR)<input name="surplus" type="number" min="0" placeholder="Example: 50000" required></label>`,
    `<label>What is your primary pain point?<select name="painPoint" required><option value="">Choose one</option><option>Getting new leads</option><option>Converting leads to bookings</option><option>Bringing clients back</option><option>Building local awareness</option><option>Improving ad return</option></select></label><fieldset class="marketing-wizard-checks"><legend>Where do your clients come from?<small>Select all that apply</small></legend><div class="marketing-lead-source-grid">${[['Instagram','◎'],['Google','G'],['Referrals','↗'],['Walk-ins','⌂'],['WhatsApp','◌'],['Other','+']].map(([source, icon]) => `<label class="marketing-lead-source"><input type="checkbox" name="leadSources" value="${source}"><span class="marketing-lead-source-icon">${icon}</span><span>${source}</span><i>✓</i></label>`).join('')}</div></fieldset><label>What is your monthly ad spend?<select name="adSpend" required><option value="">Choose one</option><option>Not spending yet</option><option>Under INR 10,000</option><option>INR 10,000 to 30,000</option><option>Over INR 30,000</option></select></label>`,
    `<label>What is your priority for the next period?<select name="goal" required><option value="">Choose one</option><option>More new clients</option><option>More premium bookings</option><option>More repeat visits</option><option>Better ad return</option></select></label><label>How are follow-ups managed today?<select name="followUp" required><option value="">Choose one</option><option>Mostly manual</option><option>Occasionally</option><option>Through WhatsApp</option><option>Automatically</option></select></label><label>When would you like to see progress?<select name="timeframe" required><option value="">Choose one</option><option>In the next 30 days</option><option>In the next 90 days</option></select></label>`
  ];
  const showStep = () => {
    modal('Insightful Marketing Planning', 'Answer a few questions to create a focused Salon Growth plan.', `<div class="marketing-wizard-progress"><span>Step ${step} of 3</span><i style="width:${step / 3 * 100}%"></i></div><div class="marketing-wizard-fields">${steps[step - 1]}</div>`, step === 3 ? 'Create my plan' : 'Continue');
    const form = document.getElementById('modal-form');
    form.classList.add('marketing-wizard-modal');
    if (step > 1) {
      form.querySelector('.modal-actions').insertAdjacentHTML('afterbegin', '<button class="btn secondary" type="button" id="marketing-wizard-back">Back</button>');
      document.getElementById('marketing-wizard-back').onclick = () => { step -= 1; showStep(); };
    }
    form.onsubmit = event => {
      event.preventDefault();
      const data = new FormData(form);
      data.forEach((value, key) => { if (key !== 'leadSources') answers[key] = value; });
      answers.leadSources = [...form.querySelectorAll('[name="leadSources"]:checked')].map(input => input.value);
      if (step < 3) { step += 1; showStep(); return; }
      marketingPlanningReport(answers);
    };
  };
  showStep();
}

function marketingPlanningReport(answers) {
  const solutions = [
    ['Salon Growth Insights', `Use one clear weekly view of performance and surplus, then track the actions that matter ${answers.timeframe.toLowerCase()}.`]
  ];
  if (['Getting new leads', 'Building local awareness'].includes(answers.painPoint) || answers.goal === 'More new clients') solutions.push(['Local Discovery & Lead Capture', `Strengthen the channels already bringing attention (${answers.leadSources.join(', ') || 'your key local channels'}) and turn interest into trackable enquiries.`]);
  if (answers.painPoint === 'Converting leads to bookings') solutions.push(['Lead Response Workflows', 'Use timely WhatsApp follow-ups and clear next steps so warm leads do not go cold before booking.']);
  if (answers.painPoint === 'Bringing clients back' || answers.goal === 'More repeat visits') solutions.push(['Client Retention Automations', `Trigger relevant follow-ups around service due dates instead of relying on ${answers.followUp.toLowerCase()} outreach.`]);
  if (answers.painPoint === 'Improving ad return' || answers.goal === 'Better ad return' || answers.adSpend !== 'Not spending yet') solutions.push(['Campaign Attribution', `Connect your ${answers.adSpend.toLowerCase()} to enquiries and bookings so you can keep what performs and adjust what does not.`]);
  if (answers.goal === 'More premium bookings') solutions.push(['Premium Service Campaigns', 'Build focused campaigns around higher-value services, with a clear audience, offer, and booking call to action.']);
  const actions = [
    `Define a focused ${answers.goal.toLowerCase()} campaign for ${answers.timeframe.toLowerCase()}.`,
    `Start with ${answers.leadSources.join(' and ') || 'your strongest local channels'} and build one audience for each channel.`,
    `Create an offer that directly addresses ${answers.painPoint.toLowerCase()} and gives clients a clear reason to book now.`,
    `Use WhatsApp follow-ups to contact every warm enquiry within one business day, improving on your ${answers.followUp.toLowerCase()} process.`,
    `Review enquiries, bookings, and the return on ${answers.adSpend.toLowerCase()} each week before changing your campaign.`
  ];
  state.marketingPlans.push({ id: Date.now(), branch: state.activeBranch, createdAt: new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date()), title: `${answers.goal} plan`, summary: `${answers.painPoint} · ${answers.timeframe}`, solutions, actions });
  persist();
  modal('Your Salon Growth plan', 'Recommendations based on your marketing assessment.', `<div class="marketing-plan-summary"><span><b>Performance</b>${answers.performance} · ${answers.comfort}</span><span><b>Monthly surplus</b>INR ${Number(answers.surplus).toLocaleString('en-IN')}</span><span><b>Primary focus</b>${answers.painPoint}</span></div><p class="marketing-plan-intro">Salon Growth can help you move from assumptions to a measurable marketing plan. Start with these services:</p><div class="marketing-plan-solutions">${solutions.map(([title, rationale], index) => `<article class="marketing-plan-solution"><span>${index + 1}</span><div><h3>${title}</h3><p>${rationale}</p></div></article>`).join('')}</div>`, 'Close');
  document.getElementById('modal-form').classList.add('marketing-report-modal');
  document.getElementById('modal-form').onsubmit = event => { event.preventDefault(); closeModal(); render(); };
}

function salonReportDefinitions() {
  return {
    clients: { label: 'Client report', title: 'Client performance', description: 'See the health of your client base, loyalty, and lifetime value.', metrics: [['Active clients','248','Visited in the last 90 days'],['New clients','34','This month'],['Repeat client rate','76%','Returning clients'],['Average visit frequency','1.8','Visits per active client'],['Average client value','INR 6,480','Lifetime spend'],['Rebooking rate','64%','Booked before leaving'],['At-risk clients','29','Due for a follow-up'],['Client satisfaction','4.7 / 5','Recent visit feedback']], insights: [['Retention is your strength','Three in four clients return, giving you a strong base for predictable revenue.'],['Rebooking has room to grow','A 64% rebooking rate means more clients can leave with their next date confirmed.'],['Follow-up is immediate opportunity','The 29 due clients are your warmest audience for a personal message.']], actions: [['Start a win-back list','Message the 29 clients who are due, starting with their previous service.'],['Improve rebooking','Ask every client to book their next visit during checkout.'],['Reward loyal clients','Create a small priority offer for your highest-value repeat clients.']] },
    staff: { label: 'Staff report', title: 'Staff performance', description: 'Balance team productivity, client experience, and capacity.', metrics: [['Revenue per provider','INR 48,200','This month'],['Capacity utilization','74%','Booked versus available time'],['Average service ticket','INR 2,940','Per completed appointment'],['Provider rebooking','61%','Average across team'],['Attendance reliability','96%','Scheduled shifts attended'],['Revenue per hour','INR 1,860','Completed service time'],['Coaching focus','2 providers','Below utilization target'],['Sales target progress','82%','Average team target']], insights: [['Capacity is nearly healthy','At 74%, the team is close to the productive utilization range without being overbooked.'],['Consistency is the next gain','Two providers need a calendar and conversion review before adding more staff hours.'],['Good attendance supports service','Reliability is strong, so coaching can focus on client and sales outcomes.']], actions: [['Coach the quiet calendars','Review availability and lead allocation for the two lowest-utilized providers.'],['Share top habits','Use your highest rebooking provider to model the end-of-service rebook conversation.'],['Protect peak capacity','Schedule the strongest team mix around high-demand hours.']] },
    services: { label: 'Services report', title: 'Service performance', description: 'Understand the services that drive demand, value, and repeat visits.', metrics: [['Service revenue','INR 1.84L','This month'],['Top service','Hair colour','INR 42,800 generated'],['Average service price','INR 2,760','Completed services'],['Premium service mix','28%','Of service revenue'],['Add-on attachment','19%','Visits with an add-on'],['Service margin','62%','After product cost'],['Service rebooking','67%','Clients returning for the category'],['Service utilization','71%','Available service slots filled']], insights: [['Hair colour is a growth anchor','Your leading service can pull demand into related premium services and care products.'],['Add-ons are underused','Only 19% of visits include an add-on, leaving relevant revenue on the table.'],['Margin and loyalty align','The strongest service categories are both profitable and likely to bring clients back.']], actions: [['Promote high-margin services','Feature your highest-margin service in the next campaign and booking flow.'],['Build useful add-ons','Pair one logical add-on with every core service at checkout.'],['Refresh weak services','Review price, duration, and demand for services with low margin or repeat rate.']] },
    sales: { label: 'Sales report', title: 'Sales performance', description: 'Track revenue quality, collection, and the levers that improve profitability.', metrics: [['Gross sales','INR 2.16L','This month'],['Collected revenue','INR 2.03L','94% collection rate'],['Average ticket','INR 3,120','Per completed visit'],['Revenue per booked hour','INR 2,080','Capacity value'],['Retail attachment','14%','Visits with product sale'],['Payment completion','96%','Paid appointments'],['Estimated net margin','22%','After tracked expenses'],['Sales target progress','88%','This month']], insights: [['Revenue is converting well','Collection is strong, with only a small gap between billed and received revenue.'],['Ticket growth is available','Retail attachment is low enough that service-linked recommendations can lift value.'],['Margin needs regular attention','A 22% estimated margin is useful only when expenses stay current and complete.']], actions: [['Recover open bills','Follow up on unpaid or partially paid checkout items today.'],['Lift average ticket','Give the team one service-linked add-on to recommend this week.'],['Review margin weekly','Compare sales with tracked expenses before committing to new spending.']] },
    marketing: { label: 'Marketing report', title: 'Marketing performance', description: 'See which outreach creates leads, bookings, and reliable return.', metrics: [['Campaign reach','8,420','Across active campaigns'],['Qualified leads','126','This month'],['Lead-to-booking rate','24%','Leads converted'],['Cost per lead','INR 182','Paid channels'],['Return on ad spend','3.4x','Attributed revenue'],['Reactivated clients','18','Returned after outreach'],['WhatsApp response rate','42%','Campaign replies'],['Campaign engagement','5.8%','Click and reply rate']], insights: [['Paid marketing is earning back','A 3.4x return supports keeping spend behind campaigns that convert to appointments.'],['Lead conversion is the lever','Three out of four qualified leads still need a faster follow-up or clearer booking path.'],['WhatsApp is a usable channel','A 42% response rate makes personalised follow-up a priority over more broad reach.']], actions: [['Back the best channel','Move next month’s spend toward the channel with the strongest booking conversion.'],['Fix lead response time','Reply to every campaign lead on WhatsApp within one business day.'],['Run a reactivation wave','Use follow-up due clients for a focused win-back campaign this week.']] },
    appointments: { label: 'Appointment report', title: 'Appointment performance', description: 'Keep the calendar productive, reliable, and convenient for clients.', metrics: [['Booked appointments','186','This month'],['Completed appointments','172','92% completion rate'],['No-show and cancel rate','6%','Below 8% target'],['Online booking rate','38%','Digital bookings'],['Future rebooking','64%','Booked after current visit'],['Average booking lead time','5.6 days','Before appointment'],['Calendar utilization','78%','Bookable time filled'],['Cancellation recovery','43%','Slots refilled after change']], insights: [['Calendar reliability is good','A 6% no-show and cancellation rate keeps you below the usual management threshold.'],['Digital booking can grow','More online bookings would reduce front-desk workload and fill gaps more quickly.'],['Rebooking protects future capacity','Confirming the next visit now is the simplest way to lift predictable demand.']], actions: [['Protect open slots','Offer wait-list clients and recent enquiries the nearest gaps.'],['Automate reminders','Send WhatsApp reminders 48 hours and 3 hours before every booking.'],['Build future bookings','Prompt clients to choose their next service date before they leave.']] }
  };
}

function reports() {
  const definitions = salonReportDefinitions();
  const report = definitions[reportView] || definitions.sales;
  const reportTabs = Object.entries(definitions).map(([key, item]) => `<button type="button" class="${key === reportView ? 'active' : ''}" data-report-view="${key}" role="tab" aria-selected="${key === reportView}">${item.label.replace(' report', '')}</button>`).join('');
  layout(`${pageHead('BUSINESS INSIGHTS', report.title, report.description, `<div class="report-view-tabs" role="tablist" aria-label="Report view">${reportTabs}</div>`)}<section class="report-kpi-grid">${report.metrics.map(([label, value, detail]) => `<article class="report-kpi-card"><span>${label}</span><strong>${value}</strong><small>${detail}</small></article>`).join('')}</section><section class="report-insight-section"><div class="report-insight-heading"><div><span class="eyebrow">WHAT THE NUMBERS ARE SAYING</span><h2>KPI insights</h2><p>Interpretation to help you focus on the signal, not just the metric.</p></div></div><div class="report-insight-grid">${report.insights.map(([title, detail]) => `<article><span>↗</span><div><h3>${title}</h3><p>${detail}</p></div></article>`).join('')}</div></section><section class="report-action-section"><div class="report-action-heading"><div><span class="eyebrow">WHAT TO DO NEXT</span><h2>Actionable insights</h2><p>Use these next steps to turn this report into progress.</p></div><span>${report.actions.length} priorities</span></div><div class="report-action-grid">${report.actions.map(([title, detail], index) => `<article><span>${index + 1}</span><div><h3>${title}</h3><p>${detail}</p><button class="text-link" data-report-action="${title}">Take action →</button></div></article>`).join('')}</div></section>`);
  document.querySelectorAll('[data-report-view]').forEach(button => button.addEventListener('click', () => { reportView = button.dataset.reportView; render(); }));
  document.querySelectorAll('[data-report-action]').forEach(button => button.addEventListener('click', () => alertToast(`${button.dataset.reportAction} added to your focus list.`)));
}

render();

function scheduleHtml(appointments) {
  const slots = Array.from({ length: 18 }, (_, index) => {
    const hour = index + 6;
    return { label: hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`, offset: index * 72 };
  }).concat({ label: '11:30 PM', offset: 1260 });
  const dayAppointments = appointments.filter(appointment => {
    const hour = Number(appointment.time.slice(0, 2));
    return hour >= 6 && hour <= 23;
  });
  const appointmentMinutes = appointment => {
    const [hour, minutes] = appointment.time.split(':').map(Number);
    return hour * 60 + minutes;
  };
  const overlapGroups = [];
  [...dayAppointments].sort((a, b) => appointmentMinutes(a) - appointmentMinutes(b) || a.id - b.id).forEach(appointment => {
    const start = appointmentMinutes(appointment);
    const end = start + Number(appointment.duration || service(appointment.serviceId).duration || 30);
    let group = overlapGroups.at(-1);
    if (!group || start >= group.end) {
      group = { end, items: [] };
      overlapGroups.push(group);
    } else {
      group.end = Math.max(group.end, end);
    }
    group.items.push({ ...appointment, start });
  });
  const displayAppointments = overlapGroups.flatMap(group => group.items.map((appointment, lane) => ({ ...appointment, lane, lanes: group.items.length })));
  return `<div class="schedule day-schedule"><div class="times">${slots.map(slot => `<span style="top:${slot.offset}px">${slot.label}</span>`).join('')}</div><div class="appointments">${displayAppointments.map(appointment => {
    const hour = Number(appointment.time.slice(0, 2)), minutes = Number(appointment.time.slice(3));
    const top = (hour - 6) * 72 + (minutes / 60) * 72;
    const customer = client(appointment.clientId), treatment = service(appointment.serviceId), member = staff(appointment.staffId);
    const width = 100 / appointment.lanes;
    const status = appointment.paid ? 'Paid' : appointment.status === 'completed' ? 'Completed' : appointment.status === 'cancelled' ? 'Cancelled' : 'Confirmed';
    const tone = appointment.status === 'cancelled' ? 'cancelled' : appointment.status === 'completed' || appointment.paid ? 'completed' : 'pending';
    return `<button class="appointment ${tone} ${appointment.lanes > 1 ? 'parallel' : ''}" style="top:${top}px;height:${Math.max(48, appointment.duration / 60 * 72 - 5)}px;left:calc(${appointment.lane * width}% + 4px);right:auto;width:calc(${width}% - 8px)" data-appointment="${appointment.id}"><strong>${customer.name}</strong><small>${appointment.time} · ${treatment.name} · ${member.name.split(' ')[0]}</small><span class="status">${status}</span></button>`;
  }).join('')}</div></div>`;
}

function appointmentListHtml(appointments) {
  const rows = [...appointments].sort((a, b) => `${appointmentDate(a)}${a.time}`.localeCompare(`${appointmentDate(b)}${b.time}`));
  return `<div class="appointment-list">${rows.length ? rows.map(appointment => {
    const customer = client(appointment.clientId), treatment = service(appointment.serviceId), member = staff(appointment.staffId);
    const day = calendarDays.find(item => item.date === appointmentDate(appointment));
    return `<button class="appointment-list-row" data-appointment="${appointment.id}"><time><strong>${appointment.time}</strong><span>${day ? `${day.day}, ${day.label}` : appointmentDate(appointment)}</span></time><span class="appointment-list-client"><b>${customer.name}</b><small>${treatment.name}</small></span><span class="appointment-list-staff">${member.name}</span><span class="badge ${appointment.status === 'confirmed' ? 'green' : 'gold'}">${appointment.paid ? 'Paid' : appointment.status === 'completed' ? 'Completed' : 'Booked'}</span><b>${money(treatment.price)}</b></button>`;
  }).join('') : '<div class="empty">No appointments match this view.</div>'}</div>`;
}

function calendar() {
  const appointments = filteredCalendarAppointments();
  const booked = appointments.filter(appointment => appointment.status === 'confirmed');
  const team = local('staff');
  const schedule = calendarLayout === 'list' ? appointmentListHtml(appointments) : calendarMode === 'week' ? weekScheduleHtml(appointments) : scheduleHtml(appointments);
  layout(`<div class="page-head appointments-page-head"><div><p class="eyebrow">APPOINTMENTS</p><div class="appointments-heading"><h1>Appointments</h1><div class="layout-switch" role="group" aria-label="Appointment layout"><button class="${calendarLayout === 'calendar' ? 'active' : ''}" data-appointment-layout="calendar">Calendar view</button><button class="${calendarLayout === 'list' ? 'active' : ''}" data-appointment-layout="list">List view</button></div></div><p>Manage schedules, walk-ins, and client time in one place.</p></div><div class="actions"><button class="btn primary" data-action="booking">New booking</button></div></div><article class="panel"><div class="panel-head calendar-head"><div><h2>${calendarDateLabel()}</h2><p>${appointments.length} visible appointments · ${booked.length} booked</p></div><div class="calendar-controls"><div class="view-switch" role="group" aria-label="Date range"><button class="${calendarMode === 'today' ? 'active' : ''}" data-calendar-mode="today">Today</button><button class="${calendarMode === 'tomorrow' ? 'active' : ''}" data-calendar-mode="tomorrow">Tomorrow</button><button class="${calendarMode === 'week' ? 'active' : ''}" data-calendar-mode="week">Week</button></div><label class="staff-filter"><span>Staff</span><select id="calendar-staff-filter"><option value="all">All staff</option>${team.map(member => `<option value="${member.id}" ${Number(calendarStaffId) === member.id ? 'selected' : ''}>${member.name}</option>`).join('')}</select></label></div></div><div class="calendar-summary"><div><span>Sales estimate</span><strong>${money(bookedSalesEstimate(appointments))}</strong><small>From ${booked.length} booked appointment${booked.length === 1 ? '' : 's'} · before tax</small></div><p>Estimate updates with the selected date range and staff member.</p></div><div class="schedule-toolbar"><small>${calendarLayout === 'list' ? 'A clear list of every appointment in the selected range.' : calendarMode === 'week' ? 'Select an appointment to view its details or complete checkout.' : 'Scroll through the day from 6 AM to 12 PM.'}</small><button class="text-link" data-action="booking">Add appointment</button></div>${schedule}</article>`);
  document.querySelectorAll('[data-calendar-mode]').forEach(button => button.addEventListener('click', () => { calendarMode = button.dataset.calendarMode; render(); }));
  document.querySelectorAll('[data-appointment-layout]').forEach(button => button.addEventListener('click', () => { calendarLayout = button.dataset.appointmentLayout; render(); }));
  document.getElementById('calendar-staff-filter')?.addEventListener('change', event => { calendarStaffId = event.target.value; render(); });
}

render();

function appointmentListHtml(appointments) {
  const rows = [...appointments].sort((a, b) => `${appointmentDate(a)}${a.time}`.localeCompare(`${appointmentDate(b)}${b.time}`));
  return `<div class="appointment-list">${rows.length ? rows.map(appointment => {
    const customer = client(appointment.clientId), treatment = service(appointment.serviceId), member = staff(appointment.staffId);
    const day = calendarDays.find(item => item.date === appointmentDate(appointment));
    const status = appointment.status === 'cancelled' ? 'Cancelled' : appointment.paid ? 'Paid' : appointment.status === 'completed' ? 'Completed' : 'Booked';
    const badge = appointment.status === 'cancelled' ? 'red' : appointment.status === 'confirmed' ? 'green' : 'gold';
    return `<button class="appointment-list-row" data-appointment="${appointment.id}"><time><strong>${appointment.time}</strong><span>${day ? `${day.day}, ${day.label}` : appointmentDate(appointment)}</span></time><span class="appointment-list-client"><b>${customer.name}</b><small>${treatment.name}</small></span><span class="appointment-list-staff">${member.name}</span><span class="badge ${badge}">${status}</span><b>${money(treatment.price)}</b></button>`;
  }).join('') : '<div class="empty">No appointments match this view.</div>'}</div>`;
}

function freshWalkInItem() {
  const firstService = state.services.find(item => !item.availableBranches || item.availableBranches.includes(state.activeBranch)) || state.services[0];
  const firstStaff = local('staff')[0] || state.staff[0];
  return { serviceId: firstService?.id || '', staffId: firstStaff?.id || '', quantity: 1, price: firstService?.price || 0, discount: 0 };
}

function walkInTotals(items = walkInDraft.items) {
  const subtotal = items.reduce((total, item) => {
    const lineValue = Math.max(0, Number(item.price) || 0) * Math.max(1, Number(item.quantity) || 1);
    return total + Math.max(0, lineValue - Math.min(lineValue, Math.max(0, Number(item.discount) || 0)));
  }, 0);
  const tax = Math.round(subtotal * (Number(state.organisation.tax) || 0) / 100);
  return { subtotal: Math.round(subtotal), tax, total: Math.round(subtotal + tax) };
}

function walkInLine(item, index) {
  const services = state.services.filter(entry => !entry.availableBranches || entry.availableBranches.includes(state.activeBranch));
  const team = local('staff');
  const lineTotal = Math.max(0, (Number(item.price) || 0) * Math.max(1, Number(item.quantity) || 1) - (Number(item.discount) || 0));
  return `<div class="walkin-line" data-walkin-line="${index}"><label class="walkin-line-service">Service<select data-walkin-item="serviceId" data-walkin-index="${index}">${services.map(entry => `<option value="${entry.id}" ${Number(item.serviceId) === entry.id ? 'selected' : ''}>${entry.name}</option>`).join('')}</select></label><label>Staff<select data-walkin-item="staffId" data-walkin-index="${index}">${team.map(member => `<option value="${member.id}" ${Number(item.staffId) === member.id ? 'selected' : ''}>${member.name}</option>`).join('')}</select></label><label>Qty<input type="number" min="1" value="${item.quantity}" data-walkin-item="quantity" data-walkin-index="${index}"></label><label>Price<input type="number" min="0" value="${item.price}" data-walkin-item="price" data-walkin-index="${index}"></label><label>Discount<input type="number" min="0" value="${item.discount || 0}" data-walkin-item="discount" data-walkin-index="${index}"></label><div class="walkin-line-total"><small>Line total</small><strong data-walkin-line-total="${index}">${money(lineTotal)}</strong></div>${walkInDraft.items.length > 1 ? `<button class="icon-btn" type="button" title="Remove service" data-remove-walkin-line="${index}">×</button>` : ''}</div>`;
}

function checkoutPreview(totals, payment, invoiceLabel = 'New invoice') {
  return `<article class="panel checkout-preview"><div class="panel-head"><div><h2>Invoice preview</h2><p>${currentBranch().name} · ${invoiceLabel}</p></div></div><div class="checkout-summary"><div><span>Services</span><strong data-walkin-subtotal>${money(totals.subtotal)}</strong></div><div><span>GST (${state.organisation.tax}%)</span><strong data-walkin-tax>${money(totals.tax)}</strong></div><div class="checkout-summary-total"><span>Total</span><strong data-walkin-total>${money(totals.total)}</strong></div></div><label class="eyebrow">PAYMENT METHOD</label><div class="payment-methods">${['UPI', 'Card', 'Cash'].map(method => `<button type="button" class="${payment === method ? 'active' : ''}" data-walkin-payment="${method}">${method}</button>`).join('')}</div><p class="checkout-whatsapp-note"><span>WhatsApp</span> Invoice will be queued to the client after payment.</p></article>`;
}

function refreshWalkInPreview() {
  const totals = walkInTotals();
  document.querySelector('[data-walkin-subtotal]')?.replaceChildren(document.createTextNode(money(totals.subtotal)));
  document.querySelector('[data-walkin-tax]')?.replaceChildren(document.createTextNode(money(totals.tax)));
  document.querySelector('[data-walkin-total]')?.replaceChildren(document.createTextNode(money(totals.total)));
  document.querySelectorAll('[data-walkin-line-total]').forEach(node => {
    const item = walkInDraft.items[Number(node.dataset.walkinLineTotal)];
    const value = Math.max(0, (Number(item.price) || 0) * Math.max(1, Number(item.quantity) || 1) - (Number(item.discount) || 0));
    node.textContent = money(value);
  });
  const collect = document.getElementById('collect-walkin-payment');
  if (collect) collect.textContent = `Collect ${money(totals.total)}`;
}

function saveWalkInInvoice() {
  const customer = client(walkInDraft.clientId);
  if (!customer) return alertToast('Search and select a client first.');
  if (!walkInDraft.items.length || walkInDraft.items.some(item => !item.serviceId)) return alertToast('Add at least one service first.');
  const totals = walkInTotals();
  customer.visits = (Number(customer.visits) || 0) + 1; customer.spent = (Number(customer.spent) || 0) + totals.total;
  state.invoices.push({ id: nextId('invoices'), clientId: customer.id, appointmentId: null, total: totals.total, subtotal: totals.subtotal, tax: totals.tax, payment: walkInDraft.payment, branch: state.activeBranch, date: walkInDraft.date, source: 'walk-in', lines: walkInDraft.items.map(item => ({ ...item })), whatsAppStatus: 'Queued', whatsAppSentAt: new Date().toISOString() });
  walkInDraft = { clientId: null, date: new Date().toISOString().slice(0, 10), payment: 'UPI', items: [freshWalkInItem()] };
  persist(); render(); alertToast('Payment collected. Invoice queued for WhatsApp.');
}

function completeAppointmentCheckout(appointment) {
  const treatment = service(appointment.serviceId), total = walkInTotals([{ quantity: 1, price: treatment.price, discount: 0 }]);
  appointment.paid = true; appointment.status = 'completed';
  const customer = client(appointment.clientId);
  customer.visits = (Number(customer.visits) || 0) + 1; customer.spent = (Number(customer.spent) || 0) + total.total;
  state.invoices.push({ id: nextId('invoices'), clientId: customer.id, appointmentId: appointment.id, total: total.total, subtotal: total.subtotal, tax: total.tax, payment: selectedPayment, branch: state.activeBranch, date: appointmentDate(appointment), source: 'appointment', lines: [{ serviceId: treatment.id, staffId: appointment.staffId, quantity: 1, price: treatment.price, discount: 0 }], whatsAppStatus: 'Queued', whatsAppSentAt: new Date().toISOString() });
  selectedAppointment = null; persist(); render(); alertToast('Payment collected. Invoice queued for WhatsApp.');
}

function checkout() {
  if (!walkInDraft.items.length) walkInDraft.items.push(freshWalkInItem());
  const entries = local('appointments').filter(appointment => !appointment.paid && appointment.status !== 'cancelled');
  const current = entries.find(appointment => appointment.id === selectedAppointment) || entries[0];
  selectedAppointment = current?.id || null;
  const selectedClient = client(walkInDraft.clientId);
  const walkInPanel = `<section class="checkout-section walkin-checkout-section"><div class="section-heading"><div><p class="eyebrow">WALK-IN BILLING</p><h2>Create a new bill</h2><p>Search an existing client, add services, then collect payment.</p></div></div><div class="walkin-billing-layout"><article class="panel walkin-bill-form"><form id="walkin-checkout-form"><div class="walkin-client-grid"><label>Search client<input id="walkin-client-search" list="walkin-client-options" placeholder="Name or mobile number" value="${selectedClient ? selectedClient.name : ''}"></label><label>Date<input type="date" value="${walkInDraft.date}" data-walkin-field="date"></label></div><datalist id="walkin-client-options">${local('clients').map(entry => `<option value="${entry.name}" label="${entry.phone}"></option><option value="${entry.phone}" label="${entry.name}"></option>`).join('')}</datalist>${selectedClient ? `<div class="walkin-selected-client"><span>Selected client</span><strong>${selectedClient.name}</strong><small>${selectedClient.phone}</small><button type="button" data-clear-walkin-client>Change</button></div>` : '<p class="walkin-client-hint">Select a client from the database to continue.</p>'}<div class="walkin-line-list">${walkInDraft.items.map(walkInLine).join('')}</div><button class="btn secondary walkin-add-line" type="button" data-add-walkin-line>+ Add another service</button></form></article><div class="checkout-preview-stack">${checkoutPreview(walkInTotals(), walkInDraft.payment)}<button class="btn primary full" id="collect-walkin-payment">Collect ${money(walkInTotals().total)}</button></div></div></section>`;
  const appointmentPanel = `<section class="checkout-section checkout-appointment-section"><div class="section-heading"><div><p class="eyebrow">APPOINTMENT CHECKOUTS</p><h2>Ready to checkout</h2><p>These services are pulled directly from today’s appointments.</p></div><span class="marketing-plan-count">${entries.length} ready</span></div>${current ? `<div class="checkout-appointment-layout"><article class="panel"><div class="appointment-checkout-list">${entries.map(appointment => { const treatment = service(appointment.serviceId); return `<button class="appointment-checkout-row ${current.id === appointment.id ? 'selected' : ''}" data-appointment-checkout="${appointment.id}"><span class="appointment-checkout-mark">${treatment.icon || '✦'}</span><span><strong>${client(appointment.clientId).name}</strong><small>${appointment.time} · ${treatment.name} with ${staff(appointment.staffId).name}</small></span><b>${money(treatment.price)}</b></button>`; }).join('')}</div></article><article class="panel checkout-preview"><div class="panel-head"><div><h2>Appointment invoice</h2><p>${currentBranch().name} · #SG-${1000 + current.id}</p></div></div><div class="checkout-summary"><div><span>${service(current.serviceId).name}</span><strong>${money(service(current.serviceId).price)}</strong></div><div><span>GST (${state.organisation.tax}%)</span><strong>${money(service(current.serviceId).price * state.organisation.tax / 100)}</strong></div><div class="checkout-summary-total"><span>Total</span><strong>${money(service(current.serviceId).price * (1 + state.organisation.tax / 100))}</strong></div></div><label class="eyebrow">PAYMENT METHOD</label><div class="payment-methods">${['UPI', 'Card', 'Cash'].map(method => `<button type="button" class="${selectedPayment === method ? 'active' : ''}" data-appointment-payment="${method}">${method}</button>`).join('')}</div><p class="checkout-whatsapp-note"><span>WhatsApp</span> Invoice will be queued to the client after payment.</p><button class="btn primary full" id="collect-appointment-payment">Collect ${money(service(current.serviceId).price * (1 + state.organisation.tax / 100))}</button></article></div>` : '<article class="panel"><div class="empty">No appointment payments are waiting. Walk-in billing is ready above.</div></article>'}</section>`;
  layout(`${pageHead('POINT OF SALE', 'Checkout', 'Create quick walk-in bills and close appointment payments.')}${walkInPanel}${appointmentPanel}`);
  document.querySelectorAll('[data-walkin-field]').forEach(input => input.addEventListener('input', event => { walkInDraft[event.target.dataset.walkinField] = event.target.value; }));
  document.querySelectorAll('[data-walkin-item]').forEach(input => input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', event => {
    const index = Number(event.target.dataset.walkinIndex), field = event.target.dataset.walkinItem;
    walkInDraft.items[index][field] = field === 'serviceId' || field === 'staffId' ? Number(event.target.value) : Number(event.target.value);
    if (field === 'serviceId') { walkInDraft.items[index].price = service(event.target.value).price; render(); return; }
    refreshWalkInPreview();
  }));
  document.getElementById('walkin-client-search')?.addEventListener('change', event => {
    const match = local('clients').find(entry => entry.name === event.target.value || entry.phone === event.target.value);
    if (match) { walkInDraft.clientId = match.id; render(); }
  });
  document.querySelector('[data-clear-walkin-client]')?.addEventListener('click', () => { walkInDraft.clientId = null; render(); });
  document.querySelector('[data-add-walkin-line]')?.addEventListener('click', () => { walkInDraft.items.push(freshWalkInItem()); render(); });
  document.querySelectorAll('[data-remove-walkin-line]').forEach(button => button.addEventListener('click', () => { walkInDraft.items.splice(Number(button.dataset.removeWalkinLine), 1); render(); }));
  document.querySelectorAll('[data-walkin-payment]').forEach(button => button.addEventListener('click', () => { walkInDraft.payment = button.dataset.walkinPayment; render(); }));
  document.getElementById('collect-walkin-payment')?.addEventListener('click', saveWalkInInvoice);
  document.querySelectorAll('[data-appointment-checkout]').forEach(button => button.addEventListener('click', () => { selectedAppointment = Number(button.dataset.appointmentCheckout); render(); }));
  document.querySelectorAll('[data-appointment-payment]').forEach(button => button.addEventListener('click', () => { selectedPayment = button.dataset.appointmentPayment; render(); }));
  document.getElementById('collect-appointment-payment')?.addEventListener('click', () => completeAppointmentCheckout(current));
}

function bookingModal(walkin = false) {
  const branchId = state.activeBranch;
  const clients = local('clients');
  const branchServices = state.services.filter(item => !item.availableBranches || item.availableBranches.includes(branchId));
  const recentClients = [...clients].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 5);
  const clientOptions = (matches, selected = '') => `<option value="" ${selected ? '' : 'selected'} disabled>Select a client</option>${matches.length ? matches.map(item => `<option value="${item.id}" ${Number(selected) === item.id ? 'selected' : ''}>${item.name} · ${item.phone}</option>`).join('') : '<option value="" disabled>No matching clients</option>'}`;
  modal(walkin ? 'Add a walk-in' : 'Book an appointment', `This booking will be added to ${currentBranch().name}.`, `<label class="client-booking-field">Client<div class="client-search-input"><span aria-hidden="true">⌕</span><input id="booking-client-search" type="search" autocomplete="off" placeholder="Search name or mobile number"></div><select id="booking-client-select" name="clientId" required>${clientOptions(recentClients)}</select></label><div class="form-row"><label>Service<select name="serviceId">${optionList(branchServices, '', item => `${item.name} · ${money(item.price)}`)}</select></label><label>Team member<select name="staffId">${optionList(local('staff'), '', item => item.name)}</select></label></div><div class="form-row"><label>Date<input name="date" type="date" value="${calendarMode === 'tomorrow' ? '2026-08-11' : calendarToday}"></label><label>Time<input name="time" type="time" value="${walkin ? '14:30' : '15:30'}"></label></div>`, 'Create booking');
  const search = document.getElementById('booking-client-search');
  const select = document.getElementById('booking-client-select');
  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    const mobileQuery = query.replace(/\D/g, '');
    const currentSelection = select.value;
    const matches = query ? clients.filter(item => item.name.toLowerCase().includes(query) || (mobileQuery && item.phone.replace(/\D/g, '').includes(mobileQuery))) : recentClients;
    select.innerHTML = clientOptions(matches, currentSelection);
  });
  document.getElementById('modal-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target), selectedService = service(form.get('serviceId'));
    if (!form.get('clientId')) return;
    state.appointments.push({ id: nextId('appointments'), clientId: Number(form.get('clientId')), serviceId: Number(form.get('serviceId')), staffId: Number(form.get('staffId')), time: form.get('time'), duration: selectedService.duration, date: form.get('date'), branch: branchId, status: 'confirmed', paid: false });
    persist(); closeModal(); render(); alertToast('Booking created and added to the calendar.');
  };
}
