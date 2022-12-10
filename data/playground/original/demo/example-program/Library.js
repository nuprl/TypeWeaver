var Book = require('./Book');

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

module.exports = Library;
