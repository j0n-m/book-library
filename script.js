const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const formSubmitBtn = document.querySelector('#book-form');
const sidebar = document.querySelector('.sidebar');
const myLibrary = [new Book('moby dick', 'author', 400, true)];

function Book(title, author, pages, bookComplete) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.bookComplete = bookComplete;
}

loadLibrary();
console.log(myLibrary);

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
  readButton.classList.add('--btn-inverse-outline');
  readButton.classList.add('toggle-read-btn');
  readButton.textContent = 'Not Read';
  if (isComplete == true) {
    readButton.classList.add('read');
    readButton.textContent = 'Read';
  }

  const deleteButton = document.createElement('a');
  deleteButton.classList.add('btn', '--btn-inverse-outline', 'delete-btn');
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

  let toggleReadBtn = document.querySelectorAll('.toggle-read-btn');
  let deleteBtn = document.querySelectorAll('.delete-btn');


  toggleReadBtn.forEach(readBtn => {
    readBtn.addEventListener('click', toggleRead);
  })
  deleteBtn.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', deleteCard);
  })

}
function addToLibrary(bookTitle, bookAuthor, bookPages, bookComplete) {
  myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookComplete));
  console.log(myLibrary);


}
function loadLibrary() {
  if (!myLibrary.length) return;
  let bookProperties = [];
  myLibrary.forEach((book) => {
    for (let property in book) {
      bookProperties.push(book[property]);
    }
  })
  addCard(...bookProperties);
}
function toggleRead(e) {
  let readBtnElement = e.target;
  readBtnElement.classList.toggle('read');
  if (readBtnElement.textContent == "Read") {
    readBtnElement.textContent = "Not Read";
  } else {
    readBtnElement.textContent = "Read";
  }
}
function deleteCard(e) {
  const card = e.srcElement.parentElement.parentElement;
  const bookTitle = e.srcElement.parentElement.parentElement.childNodes[0].childNodes[0].textContent;

  const book = myLibrary.filter(book => {
    return (book.title.includes(bookTitle));
  });

  const myLibrary_index = myLibrary.findIndex(bookIndex => {
    return bookIndex.title == bookTitle;
  });

  myLibrary.splice(myLibrary_index, 1);

  card.remove();

  console.log(myLibrary);



}
