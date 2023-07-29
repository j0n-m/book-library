const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const formSubmitBtn = document.querySelector('#book-form');
const sidebar = document.querySelector('.sidebar');
const myLibrary = [];








toggleSidebarBtn.addEventListener('click', toggleSideBar);
formSubmitBtn.addEventListener('submit', (e) => {
  const bookTitle = document.querySelector('#book-title').value;
  const bookAuthor = document.querySelector('#book-author').value;
  const bookPages = document.querySelector('#book-pages').value;
  const bookComplete = document.querySelector('#book-complete').checked;

  e.preventDefault();
  //verify if form is complete
  //manipulate the dom to add card with form input
  addToLibrary(bookTitle, bookAuthor, bookPages, bookComplete);
  addCard(bookTitle, bookAuthor, bookPages, bookComplete)
  //add necessary class names


  formSubmitBtn.reset()

});

function toggleSideBar() {
  sidebar.classList.toggle('show');
  if (sidebar.className.includes("show")) {
    toggleSidebarBtn.textContent = "Close";
  } else {
    toggleSidebarBtn.textContent = "Add Book";
  }
}
function addCard(title, author, pages, isComplete) {
  const container = document.querySelector('.cards');
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = title;

  const bookAuthor = document.createElement('h2');
  bookAuthor.textContent = author;

  const bookPages = document.createElement('h2');
  bookPages.textContent = `${pages} pages`;

  const topCardSection = document.createElement('div');
  topCardSection.classList.add("top");
  topCardSection.appendChild(bookTitle);
  topCardSection.appendChild(bookAuthor);
  topCardSection.appendChild(bookPages);

  const readButton = document.createElement('a');
  readButton.classList.add('btn');
  isComplete = (isComplete == true) ? "read" : "not-read";
  readButton.classList.add(isComplete);

  if (isComplete) {
    isComplete = "Read";
  } else {
    isComplete = "Not Read";
  }

  readButton.textContent = isComplete;

  const deleteButton = document.createElement('a');
  deleteButton.classList.add('btn');
  deleteButton.textContent = "Delete";

  const bottomCardSection = document.createElement('div');
  bottomCardSection.classList.add('bottom');
  bottomCardSection.appendChild(readButton);
  bottomCardSection.appendChild(deleteButton);

  const card = document.createElement('div');
  card.classList.add('card');
  card.appendChild(topCardSection);
  card.appendChild(bottomCardSection);

  container.appendChild(card);
}
function addToLibrary(bookTitle, bookAuthor, bookPages, bookComplete) {
  myLibrary.push({
    title: bookTitle,
    author: bookAuthor,
    pages: bookPages,
    isComplete: bookComplete,
  });

  /*
  myLibrary.forEach(element =>{
    for(let prop in element){
            console.log(`${prop} -> ${element[prop]}`);
    }
})
  */
}