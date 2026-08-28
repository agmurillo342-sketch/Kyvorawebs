const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  });
});

const configurator = document.querySelector('#configurador');
const form = document.querySelector('#web-form');
const steps = [...document.querySelectorAll('.config-step')];
const progress = [...document.querySelectorAll('.progress-step')];
const nextButton = document.querySelector('.config-next');
const backButton = document.querySelector('.config-back');
const success = document.querySelector('.config-success');
const planInputs = [...document.querySelectorAll('input[name="plan"]')];
const sectionInputs = [...document.querySelectorAll('input[name="sections"]')];
const sectionLimit = document.querySelector('#section-limit');
let currentStep = 0;

function showStep(step) {
  currentStep = step;
  steps.forEach((item, index) => item.classList.toggle('active', index === step));
  progress.forEach((item, index) => item.classList.toggle('active', index <= step));
  backButton.style.visibility = step === 0 ? 'hidden' : 'visible';
  nextButton.textContent = step === steps.length - 1 ? 'Finalizar →' : 'Continuar →';
}

function closeConfigurator() {
  configurator.classList.remove('open');
  configurator.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.configurator-trigger').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    configurator.classList.add('open');
    configurator.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    form.reset();
    form.style.display = '';
    document.querySelector('.config-progress').style.display = '';
    success.classList.remove('show');
    updateSectionLimit();
    showStep(0);
  });
});
document.querySelector('.config-close').addEventListener('click', closeConfigurator);
configurator.addEventListener('click', (event) => { if (event.target === configurator) closeConfigurator(); });
backButton.addEventListener('click', () => showStep(Math.max(0, currentStep - 1)));
nextButton.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    const currentFields = [...steps[currentStep].querySelectorAll('input, textarea, select')];
    const invalidField = currentFields.find((field) => !field.checkValidity());
    if (invalidField) { invalidField.reportValidity(); return; }
    showStep(currentStep + 1);
    return;
  }
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const data = new FormData(form);
  const sections = data.getAll('sections').join(', ');
  const message = `Hola, quiero crear mi web.%0A%0APlan: ${data.get('plan')}%0ANegocio: ${data.get('business')}%0ADescripción: ${data.get('description')}%0ASecciones: ${sections}%0AEstilo: ${data.get('style')}%0AColores: ${data.get('colors') || 'Por definir'}%0AContacto: ${data.get('name')} - ${data.get('phone')}%0AEmail: ${data.get('email') || 'No indicado'}%0ANotas: ${data.get('notes') || 'Ninguna'}`;
  document.querySelector('.whatsapp-submit').href = `https://wa.me/523222085916?text=${message}`;
  form.style.display = 'none';
  document.querySelector('.config-progress').style.display = 'none';
  success.classList.add('show');
});

function updateSectionLimit() {
  const selectedPlan = planInputs.find((input) => input.checked);
  const limit = selectedPlan ? Number(selectedPlan.dataset.maxSections) : 4;
  sectionLimit.textContent = limit;
  const selectedSections = sectionInputs.filter((input) => input.checked);
  sectionInputs.forEach((input) => {
    input.disabled = !input.checked && selectedSections.length >= limit;
    input.closest('.choice').classList.toggle('disabled', input.disabled);
  });
}

planInputs.forEach((input) => input.addEventListener('change', updateSectionLimit));
sectionInputs.forEach((input) => input.addEventListener('change', updateSectionLimit));