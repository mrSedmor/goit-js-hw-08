import throttle from 'lodash.throttle';

const FEADBACK_FORM_STATE_KEY = 'feedback-form-state';
const FEADBACK_FORM_SELECTOR = '.feedback-form';

const formElem = document.querySelector(FEADBACK_FORM_SELECTOR);

restoreFormData(formElem);

formElem.addEventListener('input', throttle(onFormInput, 500));
formElem.addEventListener('submit', onSubmit);

function storeFormData(formElem) {
  const formData = new FormData(formElem);
  const data = Object.fromEntries(formData.entries());

  localStorage.setItem(FEADBACK_FORM_STATE_KEY, JSON.stringify(data));
}

function restoreFormData(formElem) {
  let data = localStorage.getItem(FEADBACK_FORM_STATE_KEY);

  if (!data) {
    return;
  }

  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(e);
    return;
  }

  Object.entries(data).forEach(([key, value]) => {
    formElem.elements[key].value = value;
  });
}

function onFormInput(event) {
  storeFormData(event.target.closest(FEADBACK_FORM_SELECTOR));
}

function onSubmit(event) {
  event.preventDefault();

  const formElem = event.currentTarget;
  const formData = new FormData(formElem);

  const data = Object.fromEntries(formData.entries());
  data.email = data.email.trim().toLowerCase();

  for (const [key, value] of Object.entries(data)) {
    if (value !== '') {
      continue;
    }

    formElem.elements[key].focus();
    alert('Заповніть, будь ласка, всі поля форми');

    return;
  }

  formElem.reset();
  localStorage.removeItem(FEADBACK_FORM_STATE_KEY);

  console.log(data);
}
