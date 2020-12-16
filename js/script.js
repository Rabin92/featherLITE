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
  const inputText = document.querySelector('#input-title').value;
  const textArea = document.querySelector('#textarea').value;
  const noteSec = document.querySelector('.note');
  const error = document.querySelector('.error');

  if (inputText === '' || textArea === '') {
    error.innerHTML = '<p id="js-error">Required</p>';
  } else {
    // Create a new element
    const divWrap = document.createElement('DIV');
    const noteWrap = document.createElement('DIV');
    const noteHeader = document.createElement('DIV');
    const noteDot = document.createElement('DIV');
    const noteBody = document.createElement('DIV');
    const span = document.createElement('SPAN');
    const header = document.createElement('H1');
    const content = document.createElement('P');

    // Set its attributes
    addClass(divWrap, 'wrap');
    addClass(noteWrap, 'note__wrap');
    addClass(noteHeader, 'note__header');
    addClass(noteDot, 'note__dot');
    addClass(noteBody, 'note__body');
    addClass(span, 'note__date');
    addClass(header, 'note__title');
    addClass(content, 'note__content');
    noteDot.style.backgroundColor = generateRandomColor();

    // Create a new text node
    span.textContent = noteDate;
    header.textContent = inputText;
    content.textContent = textArea;

    // Append
    noteSec.insertBefore(divWrap, noteSec.firstElementChild);
    appendEl(divWrap, noteWrap);
    appendEl(noteWrap, noteHeader);
    appendEl(noteWrap, noteBody);
    appendEl(noteHeader, noteDot);
    appendEl(noteHeader, span);
    appendEl(noteBody, header);
    appendEl(noteBody, content);

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
