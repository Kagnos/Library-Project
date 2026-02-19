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
    book.textContent = `${newBook.title} written by ${newBook.author}\n\n${newBook.pages} pages read: ${newBook.read}`;
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
        }
    })
);


// To Do:

// Fix spacing on sidebar buttons and library books - DONE ish
// Add header and style page format to match admin dashboard - DONE
// Add SVGs for buttons similar to admin dashboard, when width is small, remove button text but keep SVG