// Global Variables

const library = [];

const libraryContainer = document.querySelector("#library-container");

let currentBookID;

const allButtons = document.querySelectorAll("button");

const usernameDialog = document.querySelector("#username-dialog");
const usernameDialogForm = document.querySelector("#username-dialog-form");
const newBookDialog = document.querySelector("#new-book-dialog");
const newBookDialogForm = document.querySelector("#new-book-dialog-form");
const editBookDialog = document.querySelector("#edit-book-dialog");
const editBookDialogForm = document.querySelector("#edit-book-dialog-form");

// Functions

// New Book Functions

function createBook() {
    const data = new FormData(newBookDialogForm);
    const entries = Object.fromEntries(data.entries());
    addBookToLibrary(entries.book_title, entries.book_author, entries.book_pages, entries.book_read);
};

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
    book.id = newBook.id;
    if (libraryContainer.classList[0] === "list-view-library") {
        book.classList.add("book", "list-view-book");
    } else {
        book.classList.add("book", "grid-view-book");
    };
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

    let bookButtonsContainer = document.createElement("div");
    bookButtonsContainer.classList.add("book-buttons-container");
    book.appendChild(bookButtonsContainer);

    let editBookButton = document.createElement("button");
    editBookButton.classList.add("book-button", "blue-button");
    editBookButton.id = newBook.id;
    editBookButton.textContent = "Edit";
    bookButtonsContainer.appendChild(editBookButton);

    let removeBookButton = document.createElement("button");
    removeBookButton.classList.add("book-button", "red-button");
    removeBookButton.id = newBook.id;
    removeBookButton.textContent = "Remove";
    bookButtonsContainer.appendChild(removeBookButton);

    // Book button event listeners must be added when the buttons are created since book buttons don't exist in the DOM yet.

    editBookButton.addEventListener("click", (event) => openEditBookDialog(event));
    removeBookButton.addEventListener("click", (event) => removeBook(event, book));
};

// Edit and Remove Book Functions

function openEditBookDialog(event) {
    currentBookID = event.target.id;
    const bookIndex = library.findIndex(item => item.id === event.target.id);
    const bookTitle = document.querySelector("#edit-book-dialog-form > .form-item-container > #title");
    const bookAuthor = document.querySelector("#edit-book-dialog-form > .form-item-container > #author");
    const bookPages = document.querySelector("#edit-book-dialog-form > .form-item-container > #pages");
    const bookReadYes = document.querySelector("#edit-book-dialog-form > .form-item-container > .form-radio-container > #yes");
    const bookReadNo = document.querySelector("#edit-book-dialog-form > .form-item-container > .form-radio-container > #no");

    editBookDialog.showModal();
    bookTitle.value = library[bookIndex].title;
    bookAuthor.value = library[bookIndex].author;
    bookPages.value = library[bookIndex].pages;   
    if (library[bookIndex].read === "Yes") {
        bookReadYes.setAttribute("checked", "");
        bookReadNo.removeAttribute("checked");
    } else {
        bookReadNo.setAttribute("checked", "");
        bookReadYes.removeAttribute("checked");
    };
};

function removeBook(event, book) {
    const bookIndex = library.findIndex(item => item.id === event.target.id);
    library.splice(bookIndex, 1);
    libraryContainer.children[bookIndex].remove();
    if(library.length === 0) {
        placeholderBook = book;
        placeholderBook.id = "placeholder-book";
        placeholderBook.textContent = "What are you reading?";
        libraryContainer.appendChild(placeholderBook);
    };
};

function editBook() {
    const bookIndex = library.findIndex(item => item.id === currentBookID);
    const data = new FormData(editBookDialogForm);
    const entries = Object.fromEntries(data.entries());

    editLibrary(bookIndex, entries.book_title, entries.book_author, entries.book_pages, entries.book_read);
    editBookDOM(bookIndex, entries.book_title, entries.book_author, entries.book_pages, entries.book_read);
};

function editLibrary(bookIndex, bookTitle, bookAuthor, bookPages, bookRead) {
    library[bookIndex].title = bookTitle;
    library[bookIndex].author = bookAuthor;
    library[bookIndex].pages = bookPages;
    library[bookIndex].read = bookRead;
};

function editBookDOM(bookIndex, bookTitle, bookAuthor, bookPages, bookRead) {
    libraryContainer.children[bookIndex].children[0].innerHTML = `<b>Title: </b>`;
    libraryContainer.children[bookIndex].children[0].append(bookTitle);

    libraryContainer.children[bookIndex].children[1].innerHTML = `<b>Author: </b>`;
    libraryContainer.children[bookIndex].children[1].append(bookAuthor);

    libraryContainer.children[bookIndex].children[2].innerHTML = `<b>Pages: </b>`;
    libraryContainer.children[bookIndex].children[2].append(bookPages);

    libraryContainer.children[bookIndex].children[3].innerHTML = `<b>Read: </b>`;
    libraryContainer.children[bookIndex].children[3].append(bookRead);
};

// Other Functions

function updateUsername() {
    const data = new FormData(usernameDialogForm);
    const entries = Object.fromEntries(data.entries());
    const usernameButton = document.querySelector("#username-button");
    
    usernameButton.textContent = entries.username;
};

function clearCheckedAttributes() {
    const bookReadYes = document.querySelector("#edit-book-dialog-form > .form-item-container > .form-radio-container > #yes");
    const bookReadNo = document.querySelector("#edit-book-dialog-form > .form-item-container > .form-radio-container > #no");

    bookReadYes.removeAttribute("checked");
    bookReadNo.removeAttribute("checked");
};

function toggleView() {
    const gridViewSVG = document.querySelector("#grid-view-svg");
    const listViewSVG = document.querySelector("#list-view-svg");
    const allBooks = document.querySelectorAll(".book");

    listViewSVG.classList.toggle("hidden");
    gridViewSVG.classList.toggle("hidden");
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
                newBookDialogForm.reset();
                return newBookDialog.close();
            case "cancel-edit-book-button":
                clearCheckedAttributes();
                editBookDialogForm.reset();
                return editBookDialog.close();
            case "reset-edit-book-button":
                return clearCheckedAttributes();
            case "username-button":
                return usernameDialog.showModal();
            case "cancel-username-button":
                usernameDialogForm.reset();
                return usernameDialog.close();
            case "view-toggle-button":
                return toggleView();
            case "list-view-button":
                return toggleView();
        };
    })
);

newBookDialogForm.addEventListener("submit", () => {
    createBook();
    newBookDialogForm.reset();
});

editBookDialogForm.addEventListener("submit", () => {
    editBook();
    editBookDialogForm.reset();
});

usernameDialogForm.addEventListener("submit", () => {
    updateUsername();
    usernameDialogForm.reset();
});

newBookDialog.addEventListener("cancel", (event) => {
  newBookDialogForm.reset();
});

usernameDialog.addEventListener("cancel", (event) => {
  usernameDialogForm.reset();
});