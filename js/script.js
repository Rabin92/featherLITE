// Variables
const body = document.querySelector('body');
const nav = document.querySelector('#js-nav');
const menuIcon = document.querySelector('#js-menuIcon');
const navLists = document.querySelector('#js-navLists');
const overlay = document.querySelector('#js-overlay');
const openModal = document.querySelector('#js-addnote');
const closeModal = document.querySelector('#js-closebtn');
const section = document.querySelector('#js-section');
const noteSec = section.nextElementSibling;
const postBtn = document.querySelector('#js-post-btn');
const searchBar = document.querySelector('#input-search');

// Reusable function
const display = (element, style) => {
  element.style.display = style;
};
const filter = (element, style) => {
  element.style.filter = style;
};
const animation = (element, style) => {
  element.style.animation = style;
};
const overflow = (element, style) => {
  element.style.overflow = style;
};
const addClass = (element, className) => {
  element.classList.add(className);
};
const appendEl = (element, childEl) => {
  element.appendChild(childEl);
};

// Functions
const displayModal = () => {
  display(overlay, 'flex');
  filter(section, 'blur(3px)');
  filter(noteSec, 'blur(3px)');
};

const modalClose = () => {
  display(overlay, 'none');
  filter(section, 'none');
  filter(noteSec, 'none');
};

navLists.style.display = 'none';
const toggleMenuIcon = () => {
  menuIcon.classList.toggle('active');

  if (navLists.style.display === 'none') {
    display(navLists, 'block');
    animation(nav, 'navSlideDown 0.8s ease-in-out forwards');
    overflow(body, 'hidden');
  } else {
    display(navLists, 'none');
    animation(nav, 'navSlideUp 0.8s ease-in-out forwards');
    overflow(body, 'auto');
  }
};

// Delete Post
const removePost = () => {
  const delNotes = document.querySelectorAll('.note__body');

  delNotes.forEach(delNote => {
    delNote.addEventListener('click', e => {
      const theTarget = e.target;
      if (theTarget.tagName === 'BUTTON') {
        delNote.parentNode.remove();
      }
    });
  });
};

removePost();

// Create a date object for note
const monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const today = new Date();
const month = monthNames[today.getMonth()];
const date = today.getDate();
const year = today.getFullYear();

const noteDate = `${month} ${date}, ${year}`;

// Generate a random colour
const dotColors = document.querySelectorAll('.note__dot');

const generateRandomColor = () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

dotColors.forEach(dotColor => {
  dotColor.style.backgroundColor = generateRandomColor();
});

// Add this to page when user post notes
const createNewNote = () => {
  let inputText = document.querySelector('#input-title');
  let textArea = document.querySelector('#textarea');
  const noteSec = document.querySelector('.note');
  const error = document.querySelector('.error');

  if (inputText.value === '' || textArea.value === '') {
    error.innerHTML = '<p id="js-error">Both fields required</p>';
  } else {
    error.innerHTML = '';

    // Create a new element
    let divWrap = document.createElement('div');
    let noteWrap = document.createElement('div');
    let noteHeader = document.createElement('div');
    let noteDot = document.createElement('div');
    let noteBody = document.createElement('div');
    let delBtn = document.createElement('button');
    let span = document.createElement('span');
    let header = document.createElement('h1');
    let content = document.createElement('p');

    // Set its attributes
    addClass(divWrap, 'wrap');
    addClass(noteWrap, 'note__wrap');
    addClass(noteHeader, 'note__header');
    addClass(noteDot, 'note__dot');
    addClass(noteBody, 'note__body');
    addClass(delBtn, 'btn');
    delBtn.setAttribute('type', 'button');
    addClass(span, 'note__date');
    addClass(header, 'note__title');
    addClass(content, 'note__content');
    noteDot.style.backgroundColor = generateRandomColor();

    // Create a new text node
    span.textContent = noteDate;
    header.textContent = inputText.value;
    content.textContent = textArea.value;
    delBtn.textContent = 'Delete Post';

    inputText.value = '';
    textArea.value = '';

    // Append
    noteSec.insertBefore(divWrap, noteSec.firstElementChild);
    appendEl(divWrap, noteWrap);
    appendEl(noteWrap, noteHeader);
    appendEl(noteHeader, noteDot);
    appendEl(noteHeader, span);
    appendEl(noteWrap, noteBody);
    appendEl(noteBody, delBtn);
    appendEl(noteBody, header);
    appendEl(noteBody, content);

    // Remove button
    delBtn = removePost();

    modalClose();
  }
};

// Search function
const searchNotes = e => {
  const theTarget = e.target;
  const noteTitles = document.querySelectorAll('.note__title');
  const noteWrap = document.querySelectorAll('.note__wrap');
  const searchVal = theTarget.value.toUpperCase();

  noteTitles.forEach((noteTitle, i) => {
    const title = noteTitle.textContent.toUpperCase();
    console.log(title);

    if (title.includes(searchVal)) {
      noteWrap[i].style.display = 'block';
    } else {
      noteWrap[i].style.display = 'none';
    }
  });
};

// Event Listeners
menuIcon.addEventListener('click', toggleMenuIcon);
openModal.addEventListener('click', displayModal);
closeModal.addEventListener('click', modalClose);
postBtn.addEventListener('click', createNewNote);
searchBar.addEventListener('keyup', searchNotes);
