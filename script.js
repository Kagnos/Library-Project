const library = [
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

let div = document.createElement("div");
let removeBookButton = document.createElement("button");
removeBookButton.classList.add("button", "library-button");
removeBookButton.id = "remove-book-button";
removeBookButton.textContent = "Remove";

function addBookToLibrary(title, author, pages, read) {
    let newBook = {
        title: title,
        author: author,
        pages: pages,
        read: read,
        id: crypto.randomUUID()
    };
    library.push(newBook);
    libraryContainer.appendChild(book);
    book.appendChild(div).textContent = `Title: ${newBook.title}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Author: ${newBook.author}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Pages: ${newBook.pages}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Read: ${newBook.read}`;
    book.appendChild(removeBookButton);
};

const libraryContainer = document.querySelector("#library-container");

let book = document.createElement("div")
book.classList.add("book");

function callLibrary() {
        for (i = 0; i < library.length; i++) {
            libraryContainer.appendChild(book);
            };
};

const dialogForm = document.querySelector("#dialog-form");

function createBook() {
    const data = new FormData(dialogForm);
    const entries = Object.fromEntries(data.entries());
    addBookToLibrary(entries.book_title, entries.book_author, entries.book_pages, entries.book_read);
}

const allButtons = document.querySelectorAll(".button");
const dialog = document.querySelector("dialog");

allButtons.forEach((button) => 
    button.addEventListener("click", () => {
        switch(button.id) {
            case "new-book-button":
                return dialog.showModal();
            case "cancel-button":
                return dialog.close();
            case "add-book-button":
                createBook();
                return dialog.close();
            case "remove-book-button":
                return alert("test");
        }
    })
);


// To Do:

// Figure out how to append multiple divs - DONE
// Clean up js file, create headers
// Remove "What are you reading" when a book is added
// Create edit and delete buttons, tbh I don't really need a side bar AND a header...
// Add view changer functionality

// Fix spacing on sidebar buttons and library books - DONE ish
// Add SVGs for buttons similar to admin dashboard, when width is small, remove button text but keep SVG