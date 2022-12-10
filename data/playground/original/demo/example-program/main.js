var Book = require('./Book');
var Library = require('./Library');

var myLibrary = new Library();

var book1 = new Book('The Catcher in the Rye', 'J.D. Salinger', 277, true);
var book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 281, false);
var book3 = new Book('Pride and Prejudice', 'Jane Austen', 278, true);
myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

var books = myLibrary.getBooks();
books.forEach(function(book) {
      console.log(book.title);
});
