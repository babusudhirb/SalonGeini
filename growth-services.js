const modal = document.getElementById('request-modal');
let selectedService = '';
document.querySelectorAll('.request').forEach(button => button.addEventListener('click', () => {
  selectedService = button.dataset.service;
  document.getElementById('modal-service').textContent = selectedService;
  document.getElementById('modal-points').textContent = `${Number(button.dataset.points).toLocaleString('en-IN')} SalonGrowth Points required. Your request will be reviewed by the SalonGrowth team.`;
  modal.hidden = false;
}));
document.getElementById('close-modal').onclick = () => { modal.hidden = true; };
document.getElementById('submit-request').onclick = () => { modal.querySelector('div').innerHTML = `<p class="eyebrow">REQUEST SENT</p><h2>${selectedService} requested</h2><p>Your request has been added to the SalonGrowth team queue. You will see an estimate, phases, and updates here once it is reviewed.</p><button class="button" onclick="document.getElementById('request-modal').hidden=true">Close</button>`; };
document.getElementById('mobile-menu').onclick = () => document.querySelector('.sidebar').classList.toggle('open');
