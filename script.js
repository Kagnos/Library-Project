const library = [];

let div = document.createElement("div");

let removeBookButton = document.createElement("button");
removeBookButton.classList.add("button", "library-button", "remove-book-button");
removeBookButton.textContent = "Remove";

let placeholderBook = document.querySelector("#placeholder-book");

const libraryContainer = document.querySelector("#library-container");

let book = document.createElement("div")
book.classList.add("book");

const newBookDialogForm = document.querySelector("#new-book-dialog-form");

const allButtons = document.querySelectorAll("button");

const usernameDialog = document.querySelector("#username-dialog");
const newBookDialog = document.querySelector("#new-book-dialog");

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

function addBookToLibrary(title, author, pages, read) {
    if(library.length === 0) {
        placeholderBook.remove();
    };

    let newBook = {
        title: title,
        author: author,
        pages: pages,
        read: read,
        id: crypto.randomUUID()
    };
    library.push(newBook);

    book = document.createElement("div");
    book.classList.add("book");
    libraryContainer.appendChild(book);

    div = document.createElement("div");
    book.appendChild(div).textContent = `Title: ${newBook.title}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Author: ${newBook.author}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Pages: ${newBook.pages}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Read: ${newBook.read}`;

    removeBookButton = document.createElement("button");
    removeBookButton.classList.add("library-button", "red-button");
    removeBookButton.id = newBook.id;
    removeBookButton.textContent = "Remove";
    book.appendChild(removeBookButton);

    removeBookButton.addEventListener("click", (event) => {
        const bookIndex = library.findIndex(item => item.id === event.target.id)
        library.splice(bookIndex, 1);
        libraryContainer.children[bookIndex].remove();
        if(library.length === 0) {
            placeholderBook = book;
            placeholderBook.id = "placeholder-book";
            placeholderBook.textContent = "What are you reading?";
            libraryContainer.appendChild(placeholderBook);
        }
});
};

function callLibrary() {
    for (i = 0; i < library.length; i++) {
        libraryContainer.appendChild(book);
    };
};

function createBook() {
    const data = new FormData(newBookDialogForm);
    const entries = Object.fromEntries(data.entries());
    addBookToLibrary(entries.book_title, entries.book_author, entries.book_pages, entries.book_read);
}

allButtons.forEach((button) => 
    button.addEventListener("click", () => {
        switch(button.id) {
            case "new-book-button":
                return newBookDialog.showModal();
            case "cancel-new-book-button":
                return newBookDialog.close();
            case "add-new-book-button":
                createBook();
                return newBookDialog.close();
            case "username-button":
                return usernameDialog.showModal();
            case "cancel-username-button":
                return usernameDialog.close();
            case "add-username-button":
                return usernameDialog.close();
        }
    })
);


// To Do:

// Fix bug: forms aren't required anymore
// Add view changer functionality
// Add line breaks on books when they break container width
// Add checkbox for read status that updates book text
// Clean up js file, create headers
// Create functioning edit button

// git message:
