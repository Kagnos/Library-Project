document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded and script running!");
});

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, you ${this.read} read it before.`;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "have not");

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function() {
    console.log(this.name)
  };
}

const player1 = new Player('steve', 'X');
const player2 = new Player('also steve', 'O');

Player.prototype.sayHello = function() {
   console.log("Hello, I'm a player!");
};