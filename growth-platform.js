const sections = {
  overview: ['SALONGROWTH', 'Growth overview', 'See what is bringing in revenue, and what to improve next.'],
  ads: ['PAID ADS', 'Paid ads', 'Manage Google and Meta campaigns, spend, leads, and returns.'],
  campaigns: ['CAMPAIGNS', 'Campaigns', 'Bring clients back with timely WhatsApp and API campaigns.'],
  seo: ['WEBSITE & SEO', 'Website & SEO', 'Increase discovery through service pages, local search, and booking pages.'],
  profile: ['GOOGLE PROFILE', 'Google profile', 'Improve local visibility, reviews, directions, and direct bookings.'],
  leads: ['LEADS & REVENUE', 'Leads & revenue', 'See the journey from lead to booking, visit, and revenue.'],
  reports: ['GROWTH REPORTS', 'Reports', 'Keep a clear view of channels, efficiency, and growth over time.']
};

document.querySelectorAll('[data-growth-section]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-growth-section]').forEach(item => item.classList.toggle('active', item === button));
  const [label, title, description] = sections[button.dataset.growthSection];
  document.getElementById('section-label').textContent = label;
  document.getElementById('section-title').textContent = title;
  document.getElementById('section-description').textContent = description;
}));

document.getElementById('growth-mobile-menu').addEventListener('click', () => document.querySelector('.growth-sidebar').classList.toggle('open'));
