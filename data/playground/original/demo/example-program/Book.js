function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.toggleRead = function() {
    this.read = !this.read;
  };
}

module.exports = Book;
