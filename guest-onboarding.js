function guestOnboardingUrl(branch) {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('onboard', branch.id);
  return url.toString();
}

function guestOnboardingQrUrl(branch) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&format=png&data=${encodeURIComponent(guestOnboardingUrl(branch))}`;
}

async function downloadGuestOnboardingQr(qrUrl, branch) {
  const filename = `${branch.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-guest-onboarding-qr.png`;
  try {
    const response = await fetch(qrUrl);
    if (!response.ok) throw new Error('QR download unavailable');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(await response.blob());
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    alertToast('Guest onboarding QR downloaded.');
  } catch {
    window.open(qrUrl, '_blank', 'noopener');
    alertToast('The QR opened in a new tab, ready to save.');
  }
}

function guestOnboardingFields() {
  return `<label>Full name<input name="name" required autocomplete="name" placeholder="Your full name"></label><label>Mobile number<input name="phone" required inputmode="tel" autocomplete="tel" placeholder="Your mobile number"></label><label>Gender<div class="gender-select"><label><input name="gender" type="radio" value="Male" required><span>Male</span></label><label><input name="gender" type="radio" value="Female"><span>Female</span></label></div></label><label>Instagram ID <small>(optional)</small><input name="instaId" autocomplete="username" placeholder="e.g. yourhandle"></label><div class="form-row"><label>Date of birth <small>(day / month)</small><input name="dob" inputmode="numeric" pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])" placeholder="DD/MM"></label><label>How did you hear about us?<select name="influencedBy"><option value="">Select source</option><option>Google Ads</option><option>Insta Ads</option><option>Walk-In</option><option>Referral</option></select></label></div><label>Notes or preferences <small>(optional)</small><textarea name="note" placeholder="Anything you'd like us to know?"></textarea></label>`;
}

function guestOnboardingForm(branchId) {
  const branch = state.branches.find(item => item.id === branchId);
  if (!branch) return;
  modalRoot.innerHTML = '';
  app.innerHTML = `<main class="guest-onboarding-page"><section class="guest-onboarding-card"><div class="guest-onboarding-brand"><span class="logo-mark">S</span><span>${state.organisation.name}</span></div><p class="eyebrow">${branch.name.toUpperCase()} · GUEST ONBOARDING</p><h1>Welcome to ${branch.name}</h1><p>Please share a few details before your visit.</p><form id="guest-onboarding-form">${guestOnboardingFields()}<button class="btn primary" type="submit">Submit details</button></form></section></main>`;
  document.getElementById('guest-onboarding-form').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target);
    state.clients.push({ id: nextId('clients'), name: form.get('name').trim(), phone: form.get('phone').trim(), instaId: form.get('instaId').trim().replace(/^@/, ''), gender: form.get('gender'), dob: form.get('dob').trim(), influencedBy: form.get('influencedBy'), note: form.get('note').trim(), visits: 0, spent: 0, branch: branch.id });
    persist();
    app.innerHTML = `<main class="guest-onboarding-page"><section class="guest-onboarding-card guest-onboarding-success"><div class="guest-onboarding-brand"><span class="logo-mark">S</span><span>${state.organisation.name}</span></div><span class="success-mark">✓</span><h1>You’re all set</h1><p>Thank you. Your details have been added for the ${branch.name} team.</p></section></main>`;
  };
}

const onboardingBranchId = new URLSearchParams(window.location.search).get('onboard');
if (onboardingBranchId && state.branches.some(branch => branch.id === onboardingBranchId)) guestOnboardingForm(onboardingBranchId);
