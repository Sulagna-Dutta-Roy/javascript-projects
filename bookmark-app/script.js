const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const alertDanger = document.getElementById('alert-danger');
let message = document.getElementById('alert-message');

// Show Modal, Focus on Input 
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show-modal');
    clearAlertMessage();
  }
})

// Validate URL
function validateUrl(urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!urlValue.match(regex)) {
    message.textContent = 'Please provide a valid web address.';
    alertDanger.classList.add('alert-danger');
    alertDanger.hidden = false;
    bookmarkForm[1].style.borderColor = "coral";
    return false;
  }
  return true;
}

// Validate Form
function validate(nameValue, urlValue) {
  clearAlertMessage();
  if (!nameValue || !urlValue) {
    message.textContent = 'Please submit values for both fields.';
    alertDanger.classList.add('alert-danger');
    alertDanger.hidden = false;
    bookmarkForm[0].style.borderColor = "coral";
    validateUrl(urlValue);
    return false;
  }
  validateUrl(urlValue);
  return true;
}

// Clear Alert Message
function clearAlertMessage() {
  message.textContent = '';
  alertDanger.classList.remove('alert-danger');
  alertDanger.hidden = true;
  bookmarkForm[0].style.borderColor = "";
  bookmarkForm[1].style.borderColor = "";
}

// Alert Event Listener
window.addEventListener('click', (e) => {
  if (e.target === alertDanger) {
    clearAlertMessage();
  }
})

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  message.textContent = '';
  alertDanger.classList.remove('alert-danger');
  alertDanger.hidden = true;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('https://', 'http://')) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);
