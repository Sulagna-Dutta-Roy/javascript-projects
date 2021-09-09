const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const alertDanger = document.getElementById('alert-danger');
let message = document.getElementById('alert-message');
let bookmarks = [];

// Show Modal, Focus on Input 
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
  modal.classList.remove('show-modal');
  clearAlertMessage();
});
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
    validateUrl(urlValue)
    return false;
  }
  if (!validateUrl(urlValue)) {
    return false;
  }
  // Valid
  return true;
}

// Build Bookmarks DOM
function buildBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = '';
  // Build items
  bookmarks.forEach((bookmark) => {
    const {name, url} = bookmark;
    // Item
    const item = document.createElement('div');
    item.classList.add('item', 'link');
    // Close icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times', 'delete-icon');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url})`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(linkInfo, closeIcon);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookmarks array in localStorage
    bookmarks = [
      {
        name: 'yahoo',
        url: 'https://yahoo.com/'
      },
      {
        name: 'google',
        url: 'https://google.com/'
      },
      {
        name: 'youtube',
        url: 'https://youtube.com/'
      }
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
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
  clearAlertMessage();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  // Add 'https://' if not there
  if (!urlValue.includes('https://', 'http://')) {
    urlValue = `https://${urlValue}`;
  }
  // Validate
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  // Set bookmark object, add to array
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  // Set bookmarks in localStorage, fetch, reset input fields
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
