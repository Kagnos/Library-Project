// Global Variables

const library = [];

const libraryContainer = document.querySelector("#library-container");

const allButtons = document.querySelectorAll("button");

const usernameDialog = document.querySelector("#username-dialog");
const usernameDialogForm = document.querySelector("#username-dialog-form");
const newBookDialog = document.querySelector("#new-book-dialog");
const newBookDialogForm = document.querySelector("#new-book-dialog-form");

// Functions

function createBook() {
    const data = new FormData(newBookDialogForm);
    const entries = Object.fromEntries(data.entries());
    addBookToLibrary(entries.book_title, entries.book_author, entries.book_pages, entries.book_read);
}

function addBookToLibrary(title, author, pages, read) {
    let placeholderBook = document.querySelector("#placeholder-book");

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

    addBookToDOM(newBook);
};

function addBookToDOM(newBook) {
    let book = document.createElement("div");
    book.classList.add("book");
    libraryContainer.appendChild(book);

    let div = document.createElement("div");
    book.appendChild(div).textContent = `Title: ${newBook.title}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Author: ${newBook.author}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Pages: ${newBook.pages}`;
    div = document.createElement("div");
    book.appendChild(div).textContent = `Read: ${newBook.read}`;

    let removeBookButton = document.createElement("button");
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
        };
    });
};

function updateUsername() {
    const data = new FormData(usernameDialogForm);
    const entries = Object.fromEntries(data.entries());

    const usernameButton = document.querySelector("#username-button");
    usernameButton.textContent = entries.username;
};

// Event Listeners

allButtons.forEach((button) => 
    button.addEventListener("click", () => {
        switch(button.id) {
            case "new-book-button":
                return newBookDialog.showModal();
            case "cancel-new-book-button":
                return newBookDialog.close();
            case "username-button":
                return usernameDialog.showModal();
            case "cancel-username-button":
                return usernameDialog.close();
        };
    })
);

usernameDialogForm.addEventListener("submit", () => {
    updateUsername();
    usernameDialog.close();
    usernameDialogForm.reset();
});

newBookDialogForm.addEventListener("submit", () => {
    createBook();
    newBookDialog.close();
    newBookDialogForm.reset();
});


// To Do:

// Add view changer functionality
// Add line breaks on books when they break container width
// Add checkbox for read status that updates book text
// Clean up js file, create headers - DONE ish
// Create functioning edit button

// git message: