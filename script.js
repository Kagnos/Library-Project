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
    if (libraryContainer.classList[0] === "list-view-library") {
        book.classList.add("book", "list-view-book");
    } else {
        book.classList.add("book", "grid-view-book");
    }
    libraryContainer.appendChild(book);

    let bookText = document.createElement("div");
    bookText.classList.add("book-text");
    book.appendChild(bookText).innerHTML = `<b>Title: </b>`;
    bookText.append(newBook.title);

    bookText = document.createElement("div");
    bookText.classList.add("book-text");
    book.appendChild(bookText).innerHTML = `<b>Author: </b>`;
    bookText.append(newBook.author);
    
    bookText = document.createElement("div");
    bookText.classList.add("book-text");
    book.appendChild(bookText).innerHTML = `<b>Pages: </b>`;
    bookText.append(newBook.pages);
    
    bookText = document.createElement("div");
    bookText.classList.add("book-text");
    book.appendChild(bookText).innerHTML = `<b>Read: </b>`;
    bookText.append(newBook.read);

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

function toggleView() {
    const gridViewButton = document.querySelector("#grid-view-button");
    const listViewButton = document.querySelector("#list-view-button");
    const allBooks = document.querySelectorAll(".book");

    listViewButton.classList.toggle("hidden");
    gridViewButton.classList.toggle("hidden");
    libraryContainer.classList.toggle("list-view-library");
    libraryContainer.classList.toggle("grid-view-library");
    for (i = 0; i < library.length; i++) {
        allBooks[i].classList.toggle("list-view-book");
        allBooks[i].classList.toggle("grid-view-book");
    };
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
            case "grid-view-button":
                return toggleView();
            case "list-view-button":
                return toggleView();
        };
    })
);

usernameDialogForm.addEventListener("submit", () => {
    updateUsername();
    usernameDialogForm.reset();
});

newBookDialogForm.addEventListener("submit", () => {
    createBook();
    newBookDialogForm.reset();
});


// To Do:

// Add checkbox for read status that updates book text or create functioning edit button

// git message: