const library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: "295",
    read: "have not",
    id: crypto.randomUUID()
  },
  {
    title: "Test Book 1",
    author: "Edward Scissorhands",
    pages: "351",
    read: "have",
    id: crypto.randomUUID()
  },
  {
    title: "Test Book 2",
    author: "Jacob Reinstein",
    pages: "147",
    read: "have not",
    id: crypto.randomUUID()
  }
];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  id = crypto.randomUUID();
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, you ${this.read} read it before.`;
  };
}

function addBookToLibrary (title, author, pages, read) {
  let newBook = {
  title: title,
  author: author,
  pages: pages,
  read: read,
  id: crypto.randomUUID()
  };
  library.push(newBook);
};

const libraryContainer = document.querySelector("#library-container");

function callLibrary() {
  libraryContainer.textContent = "";
  for (i = 0; i < library.length; i++) {
    libraryContainer.textContent += `Title: ${library[i].title}\nAuthor: ${library[i].author}\nPages: ${library[i].pages}\nRead: ${library[i].read}\nid: ${library[i].id}\n\n`;
  }
};

const newBookButton = document.querySelector("#new-book-button");
const dialog = document.querySelector("dialog");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});