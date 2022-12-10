function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.toggleRead = function() {
    this.read = !this.read;
  };
}

function Library() {
  this.books = [];

  this.addBook = function(book) {
    this.books.push(book);
  };

  this.removeBook = function(book) {
    this.books = this.books.filter(function(b) {
      return b !== book;
    });
  };

  this.getBooks = function() {
    return this.books;
  };
}

module.exports.Book = Book;
module.exports.Library = Library;
