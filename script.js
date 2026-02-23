const library = [];

let div = document.createElement("div");

let removeBookButton = document.createElement("button");
removeBookButton.classList.add("button", "library-button", "remove-book-button");
removeBookButton.textContent = "Remove";

let placeholderBook = document.querySelector("#placeholder-book");

const libraryContainer = document.querySelector("#library-container");

let book = document.createElement("div")
book.classList.add("book");

const dialogForm = document.querySelector("#dialog-form");

const allButtons = document.querySelectorAll(".button");
const dialog = document.querySelector("dialog");

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
    removeBookButton.classList.add("button", "library-button", "remove-book-button");
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
    const data = new FormData(dialogForm);
    const entries = Object.fromEntries(data.entries());
    addBookToLibrary(entries.book_title, entries.book_author, entries.book_pages, entries.book_read);
}

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
        }
    })
);


// To Do:

// Fix bug: form isn't required anymore
// Implement remove button functionality
// Clean up js file, create headers
// Create functioning edit and delete buttons, tbh I don't really need a side bar AND a header...
// Add view changer functionality
// Add SVGs for buttons similar to admin dashboard, when width is small, remove button text but keep SVG
// Add line breaks on books when they break container width.

// Fix spacing on sidebar buttons and library books - DONE ish
// Figure out how to append multiple divs - DONE
// Remove "What are you reading" when a book is added - DONE

// git message:
